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
import filledCheck from '@/components/filledCheck'
import preview from '@/components/preview'
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
      component: Create,
      children: [
        {
          path: '/one',
          component: () => import('./../components/question/one.vue')
        },
        {
          path: '/two',
          component: () => import('./../components/question/two.vue')
        },
        {
          path: '/three',
          component: () => import('./../components/question/three.vue')
        },
        {
          path: '/four',
          component: () => import('./../components/question/four.vue')
        },
        {
          path: '/five',
          component: () => import('./../components/question/five.vue')
        },
        {
          path: '/six',
          component: () => import('./../components/question/six.vue')
        },
        {
          path: '/seven',
          component: () => import('./../components/question/seven.vue')
        },
        {
          path: '/eight',
          component: () => import('./../components/question/eight.vue')
        },
        {
          path: '/nine',
          component: () => import('./../components/question/nine.vue')
        },
        {
          path: '/ten',
          component: () => import('./../components/question/ten.vue')
        },
        {
          path: '/eleven',
          component: () => import('./../components/question/eleven.vue')
        },
        {
          path: '/twelve',
          component: () => import('./../components/question/twelve.vue')
        },
        {
          path: '/thirteen',
          component: () => import('./../components/question/thirteen.vue')
        }
      ]
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
      path: '/filledCheck/:questionnaireID/:answerUID',
      name: 'filledCheck',
      component: filledCheck
      // for local test: localhost/#/filledCheck/5e8c1ad6cfd9ab0216d81664/5e8c1be865e6f70222803e1b
    },
    {
      path: '/preview/:questionnaireID',
      name: 'preview',
      component: preview
      // for local test: localhost/#/preview/5e8c1ad6cfd9ab0216d81664
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
