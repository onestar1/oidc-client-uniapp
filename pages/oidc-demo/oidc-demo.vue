<template>

	<view id="app">
		<!-- Navbar -->
		<nav v-if="hasAccess" id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
			<!-- Container wrapper -->
			<view class="container-fluid">
				<!-- Navbar brand -->
				<a class="navbar-brand" href="#">Orchard Skills</a>

				<!-- Toggle button -->
				<button class="navbar-toggler" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation"></button>

				<!-- Collapsible wrapper -->
				<view class="collapse navbar-collapse" id="navbarSupportedContent">
					<view class="ml-auto">
						<button @click="signOut" v-if="authUser" type="button" class="btn btn-danger">
							Logout
						</button>
						<button @click="signIn" v-else type="button" class="btn btn-primary">
							Login
						</button>
					</view>
				</view>
				<!-- Collapsible wrapper -->
			</view>
			<!-- Container wrapper -->
		</nav>
		<br />
		<!-- Navbar -->


	</view>
</template>

<script>
	export default {
		name: 'App',
		computed: {
			hasAccess: function() {
				return true
			},
			 
		},
		data() {
			return {
				 authUser: false
			}
		},
		methods: {
			signIn() {
				this.$oidc.login()
				this.loginupdated()
			},
			signOut: function() {
				this.$oidc.logout()
				this.loginupdated()
			},
			async loginupdated () {
			
			  this.authUser = await this.$oidc.isLoggedIn()
			   console.log('是否登录',this.authUser)
			}
		},
		async created() {
		    this.loginupdated(); // 组件创建时也检查一次登录状态
		  }
	}
</script>