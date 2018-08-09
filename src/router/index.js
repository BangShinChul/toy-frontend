import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Home from '@/pages/Home'
import ApiTest from '@/pages/ApiTest'

Vue.use(Router)

export default new Router({
  mode: 'history', // vue Router에 mode:'history'를 추가하면 url상의 /#/이 없어진다.
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ApiTest',
      name: 'ApiTest',
      component: ApiTest
    }
  ]
})
