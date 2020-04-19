import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Create from '@/components/Create'

Vue.use(Router)
// Router.beforeEach((to, from, next) => {
//   const token = sessionStorage.getItem('token')
//   if (to.path === '/') {
//     next()
//   } else {
//     if (token !== 'null' && token != null) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/create/:UID',
      name: 'create',
      component: Create
    }
  ]
})
