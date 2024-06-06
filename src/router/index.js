import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode:"history",
  routes: [
    {
      //引导界面
      path: '/',
      name: 'UserIndex',
      component: ()=>import('@/components/UserIndex')
    },
    {
      //登录界面
      path: '/UserLogin',
      name: 'UserLogin',
      component: ()=>import('@/components/UserLogin')
    },
    {
      //学生主页
      path: '/StudentHomePage',
      name: 'StudentHomePage',
      component: ()=>import('@/components/HomePage/StudentHomePage')
    },
    {
      //院校主页
      path: '/SchoolHomePage',
      name: 'SchoolHomePage',
      component: ()=>import('@/components/HomePage/SchoolHomePage')
    },
    {
      //管理员主页
      path: '/AdminHomePage',
      name: 'AdminHomePage',
      component: ()=>import('@/components/HomePage/AdminHomePage')
    },
  ]
})
