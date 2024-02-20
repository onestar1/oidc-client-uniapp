<template>
  <div>注销</div>
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
    this.$oidc.completeLogout()
      .then(() => {
        uni.redirectTo({
        	url:"/"
        })
      })
      .catch((err) => {
        // this.toastNotification.error(err.message)
		uni.showToast({
			title:err.message
		})
      })
  }
}
</script>
