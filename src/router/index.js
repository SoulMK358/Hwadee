import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      schoolName: 'UserIndex',
      component: ()=>import('@/components/UserIndex')
    },
    {
      path: '/UserLogin',
      schoolName: 'UserLogin',
      component: ()=>import('@/components/UserLogin')
    },
    {
      path: '/AdminHomePage',
      schoolName: 'AdminHomePage',
      component: ()=>import('@/components/HomePage/AdminHomePage')
    },
    {
      path: '/SchoolHomePage',
      schoolName: 'SchoolHomePage',
      component: ()=>import('@/components/HomePage/SchoolHomePage')
    },
    {
      path: '/StuHomePage',
      schoolName: 'StuHomePage',
      component: ()=>import('@/components/HomePage/StuHomePage')
    },
    {
      path: '/StuHomePage/SelfMsg',
      schoolName: 'StuSelfMsg',
      component: ()=>import('@/components/StuMainPanel/SelfMsg')
    },

  ]
})
