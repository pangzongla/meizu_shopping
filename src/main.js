import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/reset.css'
import './assets/font/style.css'
import './assets/css/common.css'

Vue.config.productionTip = false

// eslint-disable-next-line eqeqeq
if (process.env.NODE_ENV == 'development') { // 开发环境
  axios.defaults.baseURL = '/api'
// eslint-disable-next-line eqeqeq
} else if (process.env.NODE_ENV == 'production') { // 生产环境
  axios.defaults.baseURL = 'http://106.53.103.193:3000'
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
