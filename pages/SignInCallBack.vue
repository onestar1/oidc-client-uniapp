<template>
  <view>
	  登录成功返回页面
  </view>
</template>

<script>
// import { useToast } from 'vue-toastification'
export default {
  data () {
    return {
      //toastNotification: useToast()
    }
  },
  created () {
    this.$oidc.completeLogin()
      .then((redirectPath) => {
          console.log('登录成功',redirectPath)
		  uni.redirectTo({
		  	url:"/"
		  })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
