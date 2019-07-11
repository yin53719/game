import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/index'
import login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'home',
      component: home
    },
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
