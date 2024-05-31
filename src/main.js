// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 设置代理的域名，即服务器请求地址
axios.defaults.baseURL = 'http://192.168.48.76:8081/'
// 设置 post 请求体
axios.defaults.headers.post['Content-Type']='application/json'
// 设置全局 axios 写法
Vue.prototype.$axios = axios
// 设置全局超时时间 5s
axios.defaults.timeout = 5000


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
