<template>
	<view class="container">
		<view v-if="authUser">
			<view class="d-flex justify-content-end mb-4">
				<!-- 按钮触发模态框 -->
				<button type="button" class="btn btn-primary" @click="showModal = true">
					Open Modal
				</button>
			</view>
		
	  <!-- 订阅者列表 -->
	    <uni-table ref="table"  border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange">
	    				<uni-tr>
	    					<uni-th width="150" align="center">First Name</uni-th>
	    					<uni-th width="150" align="center">Last Name</uni-th>
	    					<uni-th align="center">Email</uni-th>
	    					<uni-th width="204" align="center">Action</uni-th>
	    				</uni-tr>
	    				<uni-tr v-for="(item, index) in Subscribers" :key="index">
	    					<uni-td>{{ item.firstName }}</uni-td>
	    					<uni-td>
	    						<view class="name">{{ item.lastName }}</view>
	    					</uni-td>
	    					<uni-td align="center">{{ item.email }}</uni-td>
	    					<uni-td>
	    						<view class="uni-group">
	    							<button class="uni-button" size="mini" type="primary">修改</button>
	    							<button class="uni-button" size="mini" type="warn">删除</button>
	    						</view>
	    					</uni-td>
	    				</uni-tr>
	    			</uni-table>
		
		</view>
		<view v-else class="text-center">
			Please login to enable CRUD operations.
		</view>

		<!-- 模态框的实现，这里你需要根据uni-app的对话框组件来实现 -->
		<!-- uni-app 中模态框通常通过条件渲染来控制显示隐藏 -->

<!-- Modal -->
		<view v-if="showModal" class="modal">
		    <view class="modal-dialog">
		      <view class="modal-content">
		        <view class="modal-header">
		          <view class="modal-title">Add New Subscriber</view>
		          <view @click="closeModal" class="modal-close">X</view>
		        </view>
		        <view class="modal-body">
		          <view class="form">
		            <!-- 名字和姓氏的输入框 -->
		            <view class="row mb-4">
		              <view class="col">
		                <view>First name</view>
		                <input type="text" class="form-control" placeholder="First Name" v-model="addSubscribersData.firstName" />
		              </view>
		              <view class="col">
		                <view>Last name</view>
		                <input type="text" class="form-control" placeholder="Last Name" v-model="addSubscribersData.lastName" />
		              </view>
		            </view>
		
		            <!-- Email输入框 -->
		            <view class="mb-4">
		              <view>Email address</view>
		              <input type="email" class="form-control" placeholder="Email" v-model="addSubscribersData.email" />
		            </view>
		
		            <!-- 提交按钮 -->
		            <button @click="addSubscriber(addSubscribersData)">Add</button>
		          </view>
		        </view>
		      </view>
		    </view>
		  </view>

	</view>

</template>

<script>
	import axios from 'axios'
	import {
		stsAuthority
	} from '@/config/config'
	const urlApiContent = stsAuthority + 'api/content/'
	const urlApiGraphql = stsAuthority + 'api/graphql'
	export default {
		data() {
			return {
				// toastNotification: useToast(),
				showModal: false,
				authUser: false,
				oidcAccessToken: '',
				Subscribers: [],
				subscriberToEdit: {
					createdUtc: '',
					displayText: '',
					email: '',
					firstName: '',
					lastName: '',
					modifiedUtc: '',
					publishedUtc: '',
					contentItemId: ''
				},
				 columns: [
				        { title: 'First Name', key: 'firstName' },
				        { title: 'Last Name', key: 'lastName' },
				        { title: 'Email', key: 'email' },
				        { title: 'Action', key: 'action', slotName: 'action' },
				      ],
				editing: false,
				addSubsribersData: {
					createdUtc: '',
					displayText: '',
					email: '',
					firstName: '',
					lastName: '',
					modifiedUtc: '',
					publishedUtc: '',
					contentItemId: ''
				}
			}
		},
		methods: {
			closeModal() {
				this.showModal = false;
			},
			closeEditSubscriber() {
				this.editing = false
				this.subscriberToEdit = null
			},
			OpenEditSubscriber(subscriber) {
				this.editing = true
				this.subscriberToEdit = subscriber
			},
			async getSubscribers() {
				// GET request using axios with set headers
				const headers = {
					'Content-Type': 'application/x-www-form-urlencoded',
					// eslint-disable-next-line quote-props
					Authorization: 'Bearer ' + this.oidcAccessToken
				}
				const url =
					urlApiGraphql +
					'?query={subscriber {createdUtc, displayText email firstName lastName modifiedUtc publishedUtc contentItemId }}'
				try {
					const response = await axios.get(url, {
						headers: headers
					})
					this.Subscribers = response.data.data.subscriber
					console.log('data', response.data.data.subscriber)
				} catch (err) {
					console.log('error', err.message)
				}
			},
			async updateSubscriber(subscriber) {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.oidcAccessToken
				}

				const url = urlApiContent

				const body = {
					ContentItemId: subscriber.contentItemId,
					DisplayText: subscriber.firstName + ' ' + subscriber.lastName,
					TitlePart: {
						Title: subscriber.firstName + ' ' + subscriber.lastName
					},
					Subscriber: {
						FirstName: {
							Text: subscriber.firstName
						},
						LastName: {
							Text: subscriber.lastName
						},
						Email: {
							Text: subscriber.email
						}
					},
					ContainedPart: {
						ListContentItemId: '462m1ps5kkzkp2k5da5pfhh2ww',
						Order: 0
					}
				}
				try {
					await axios.post(url, body, {
						headers: headers
					})
					uni.showToast({
						title:'恭喜添加一个新的订阅'
					})
				} catch (err) {
					console.log('error', err.message)
					uni.showToast({
						title:err.message
					})
				}
				this.closeEditSubscriber()
			},
			async deleteSubscriber(id) {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.oidcAccessToken
				}
				const url = urlApiContent + id

				try {
					await axios.delete(url, {
						headers: headers
					})
					await this.getSubscribers()
					//this.toastNotification.success('You successfully deleted subscriber')
					uni.showToast({
						title:'恭喜添加一个新的订阅'
					})
				} catch (err) {
					console.log('error', err.message)
					//this.toastNotification.error(err.message)
					uni.showToast({
						title:err.message
					})
				}
			},
			async addSubscriber(subscriber) {
				console.log('sub', subscriber)
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.oidcAccessToken
				}

				const url = urlApiContent

				const body = {
					ContentType: 'Subscriber',
					Latest: true,
					Published: true,
					Owner: 'sales',
					Author: 'sales',
					DisplayText: subscriber.firstName + ' ' + subscriber.lastName,
					TitlePart: {
						Title: subscriber.firstName + ' ' + subscriber.lastName
					},
					Subscriber: {
						FirstName: {
							Text: subscriber.firstName
						},
						LastName: {
							Text: subscriber.lastName
						},
						Email: {
							Text: subscriber.email
						}
					},
					ContainedPart: {
						ListContentItemId: '462m1ps5kkzkp2k5da5pfhh2ww',
						Order: 0
					}
				}
				try {
					await axios.post(url, body, {
						headers: headers
					})
					await this.getSubscribers()
					//this.toastNotification.success('You successfully add new subscriber')
					
			      uni.showToast({
			      	title:'恭喜添加一个新的订阅'
			      })
				} catch (err) {
					console.log('error', err.message)
					//this.toastNotification.error(err.message)
					uni.showToast({
						title:err.message
					})
				}
			},
		  async loaddata(){
			   const token = await this.$oidc.getAccessToken()
			   this.authUser = await this.$oidc.isLoggedIn()
			   if (token) {
			   	this.oidcAccessToken = token
			   	this.getSubscribers()
			   }
		   }
		},
		async created(){
			await this.loaddata()
		},
		async mounted() {
			await this.loaddata()
		}
		
	}
</script>