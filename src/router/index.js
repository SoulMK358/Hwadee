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
      //管理员主页
      path: '/AdminHomePage',
      name: 'AdminHomePage',
      component: ()=>import('@/components/HomePage/AdminHomePage')
    },
    {
      //学校主页
      path: '/SchoolHomePage',
      name: 'SchoolHomePage',
      component: ()=>import('@/components/HomePage/SchoolHomePage')
    },
    {
      //个人主页
      path: '/StuHomePage',
      name: 'StuHomePage',
      component: ()=>import('@/components/HomePage/StuHomePage')
    },
    {
      //个人信息
      path: '/StuHomePage/SelfMsg',
      name: 'StuSelfMsg',
      component: ()=>import('@/components/StuMainPanel/SelfMsg')
    },
    {
      //个人报考
      path: '/StuHomePage/SelfEnroll',
      name: 'selfEnroll',
      component: ()=>import('@/components/StuMainPanel/SelfEnroll')
    },

  ]
})
