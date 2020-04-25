import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Create from '@/components/Create'
import FillQuestionnaire from '@/components/FillQuestionnaire'
import DataAnalysis from '@/components/DataAnalysis'
import Issue from '@/components/Issue'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '/fillQuestionnaire/:questionnaireID',
      name: 'fillQuestionnaire',
      component: FillQuestionnaire
    },
    {
      path: '/DataAnalysis',
      name: 'DataAnalysis',
      component: DataAnalysis
    },
    {
      path: '/issue',
      name: 'issue',
      component: Issue
    },
    // ! keep it at last
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('user-token')
  // console.log(token)
  if (to.path === '/' || to.path === '/register' || to.path === '/login') {
    //* when route to index, check whether token exists, if so, route to create
    if (token !== '' && token !== null) {
      const uid = localStorage.getItem('user-id')
      next(`/create/${uid}`)
    } else {
      next()
    }
  } else {
    // don't need to authenticate if filling questionnaire
    if (/fillQuestionnaire*/g.test(to.path)) {
      next()
    } else {
      /* when route to other pages, check token
        safely route if exists
        otherwise， route to index
      */
      if (token !== '' && token != null) {
        next()
      } else {
        next('/login')
      }
    }
  }
})

export default router
