import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode:"history",
  routes: [
    {
      path: '/h',
      name: 'HelloWorld',
      component: ()=>import('@/components/HelloWorld')
    },
    {
      path: '/',
      name: 'login',
      component: ()=>import('@/components/login')
    }
  ]
})
