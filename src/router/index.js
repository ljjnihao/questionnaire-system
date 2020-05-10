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
import RecoveryProfile from '@/components/RecoveryProfile'
import CheckQuestionnaire from '@/components/CheckQuestionnaire'
import check from '@/components/Checkbox'

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
      // for local test: localhost/#/fillQuestionnaire/5e8c1ad6cfd9ab0216d81664
    },
    {
      path: '/DataAnalysis/:UID/:QID',
      name: 'DataAnalysis',
      component: DataAnalysis
      // for local test: localhost/#/DataAnalysis/5e8c1be865e6f70222803e1b/5e8c1ad6cfd9ab0216d81664
    },
    {
      path: '/issue/:questionnaireID',
      name: 'issue',
      component: Issue
      // for local test: localhost/#/issue/5e8c1ad6cfd9ab0216d81664
    },
    {
      path: '/RecoveryProfile/:UID/:QID',
      name: 'RecoveryProfile',
      component: RecoveryProfile
      // for local test: localhost/#/RecoveryProfile/5e8c1be865e6f70222803e1b/5e8c1ad6cfd9ab0216d81664
    },
    {
      path: '/CheckQuestionnaire/:UID/:QID',
      name: 'CheckQuestionnaire',
      component: CheckQuestionnaire
      // for local test: localhost/#/CheckQuestionnaire/5e8c1be865e6f70222803e1b/5e8c1ad6cfd9ab0216d81664
    },
    {
      path: '/checkbox',
      component: check
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
