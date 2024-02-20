<!--
 * @Description: 弹窗组件
 * @Version: 1.0.0
 * @Autor: hch
 * @Date: 2020-08-15 23:07:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-01 23:32:42
-->
<template>
	<view v-if="showModal">
		<view class="masking" v-if="maskFlag" :style="{'background-color': bgColor}"></view>
		<view class="model-wraper">
			<view class="model-content">
				<view class="modal-title" v-if="modalTitle !== ''">
					{{modalTitle}}
				</view>
				<icon class="close-btn" @click="handleCancel" type="clear" size="20"/>
				<view class="modal-body">
					<slot></slot>
				</view>
				<view v-if="btnShow">
					<view class="btn cancel" :style="{'color': cancelTextColor}" @click="handleCancel">{{cancelText}}</view>
					<view class="btn confirm" :style="{'color': confirmTextColor}" @click="handleConfirm">{{confirmText}}</view>
				</view>
				<view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'HchDialog',
		props: {
			// 是否显示底部按钮
			btnShow: {
				type: Boolean,
				default: false
			},
			// 是否显示弹窗
			showModal: {
				type: Boolean,
				default: false
			},
			// 是否显示蒙层
			maskFlag: {
				type: Boolean,
				default: true
			},
			// 蒙层背景色
			bgColor: {
				type: String,
				default: 'rgba(7, 7, 7, 0.7)'
			},
			// 模态框标题
			modalTitle: {
				type: String,
				default: ''
			},
			// 取消按钮文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确定按钮文字
			confirmText: {
				type: String,
				default: '确定'
			},
			// 取消按钮文字颜色
			cancelTextColor: {
				type: String,
				default: '#666'
			},
			// 确定按钮文字颜色
			confirmTextColor: {
				type: String,
				default: '#5999FF'
			}
		},
		data() {
			return {
			}
		},
		methods: {
			handleCancel() {
				this.$emit('cancel')
			},
			handleConfirm() {
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.masking {
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.model-wraper {
		width: 600rpx;
		background-color: #fff;
		border-radius: 16rpx;
		position: absolute;
		z-index: 1000;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.model-content{
			position: relative;
			.modal-title {
				height: 90rpx;
				line-height: 90rpx;
				width: 100%;
				text-align: center;
				font-size: 32rpx;
				color: #666;
			}
			.close-btn{
				position: absolute;
				top: 14px;
				right: 14px;
			}
			.modal-body {
				padding: 60rpx 30rpx 80rpx 30rpx;
			}
			.btn {
				width: 300rpx;
				height: 90rpx;
				text-align: center;
				line-height: 90rpx;
				font-size: 32rpx;
				float: left;
				border-top: 1rpx solid #ddd;
			}
			.btn.cancel {
				width: 299rpx;
				border-right: 1rpx solid #dcdcdc;
			}
		}
	}
</style>
