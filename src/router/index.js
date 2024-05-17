import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'UserIndex',
      component: ()=>import('@/components/UserIndex')
    },
    {
      path: '/UserLogin',
      name: 'UserLogin',
      component: ()=>import('@/components/UserLogin')
    },
    {
      path: '/AdminHomePage',
      name: 'AdminHomePage',
      component: ()=>import('@/components/HomePage/AdminHomePage')
    },
    {
      path: '/SchoolHomePage',
      name: 'SchoolHomePage',
      component: ()=>import('@/components/HomePage/SchoolHomePage')
    },
    {
      path: '/StuHomePage',
      name: 'StuHomePage',
      component: ()=>import('@/components/HomePage/StuHomePage')
    },
    {
      path: '/StuHomePage/SelfMsg',
      name: 'StuSelfMsg',
      component: ()=>import('@/components/StuMainPanel/SelfMsg')
    },

  ]
})
