import Vue from 'vue'
import App from './App'
import Oidc from '@/services/authService.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$oidc = new Oidc()

const app = new Vue({
	...App
})
app.$mount()
