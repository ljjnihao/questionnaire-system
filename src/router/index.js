import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Create from '@/components/Create'
import FillQuestionnaire from '@/components/FillQuestionnaire'
import Issue from '@/components/Issue'
import NotFound from '@/components/NotFound'
import RecoveryProfile from '@/components/RecoveryProfile'
import CheckQuestionnaire from '@/components/CheckQuestionnaire'
import filledCheck from '@/components/filledCheck'
import preview from '@/components/preview'
import ShareQuestionnaire from '@/components/Share'
import information from '@/components/information'
import myQuestionnaire from '@/components/myQuestionnaire'
import CreateQuestion from '@/components/CreateQuestion'
import Statistic from '@/components/Statistic'
import Relative from '@/components/Relative'
import CreateQn from '@/components/CreateQn'
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
      path: '/CreateQuestion/:UID/:questionnaireID',
      name: 'CreateQuestion',
      component: CreateQuestion,
      children: [
        {
          path: '/CreateQuestion/:UID/:questionnaireID/one'
          // component: () => import('.././components/one.vue')
        },
        {
          path: '/CreateQuestion/:UID/:questionnaireID/three',
          component: () => import('./../components/question/three.vue')
        },
        {
          path: '/CreateQuestion/:UID/:questionnaireID/four',
          component: () => import('./../components/question/four.vue')
        },
        {
          path: '/CreateQuestion/:UID/:questionnaireID/five',
          component: () => import('./../components/question/five.vue')
        },
        {
          path: '/CreateQuestion/:UID/:questionnaireID/six',
          component: () => import('./../components/question/six.vue')
        },
        {
          path: '/CreateQuestion/:UID/:questionnaireID/thirteen',
          component: () => import('./../components/question/thirteen.vue')
        }
      ]
      // for local test: localhost/#/CreateQuestion/5e8c1be865e6f70222803e1b/5edd0a20414cea000b52f78a/one
    },
    {
      path: '/cqn/:QID/:UID',
      name: 'CreateQuestionnaire',
      component: CreateQn
      // for local test: localhost/#/cqn/5edd0a20414cea000b52f78a/5e8c1be865e6f70222803e1b
      // for local test: localhost:8081/#/cqn/5e8c1ad6cfd9ab0216d81664/5e8c1be865e6f70222803e1b
    },
    {
      path: '/fillQuestionnaire/:questionnaireID',
      name: 'fillQuestionnaire',
      component: FillQuestionnaire
      // for local test: localhost/#/fillQuestionnaire/5e8c1ad6cfd9ab0216d81664 (valid)
      // for local test: localhost/#/fillQuestionnaire/5ed7724ba003600009a54eeb (invalid)
      // for local test: localhost/#/fillQuestionnaire/5edd0a20414cea000b52f78a (expired)
    },
    {
      path: '/stat/:UID/:QID',
      name: 'statistic',
      component: Statistic
      // for local test: localhost/#/statistic/5e8c1be865e6f70222803e1b/5e8c1ad6cfd9ab0216d81664
    },
    {
      path: '/relative/:UID/:QID',
      name: 'relative',
      component: Relative
      // for local test: localhost/#/relative/5e8c1be865e6f70222803e1b/5e8c1ad6cfd9ab0216d81664
    },
    {
      path: '/issue/:questionnaireID/:UID',
      name: 'issue',
      component: Issue
      // for local test: localhost/#/issue/5e8c1ad6cfd9ab0216d81664/5e8c1be865e6f70222803e1b
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
    {
      path: '/ShareQuestionnaire/:UID/:QID',
      name: 'ShareQuestionnaire',
      component: ShareQuestionnaire
    // for local test: localhost/#/ShareQuestionnaire/5e8c1be865e6f70222803e1b/5e8c1ad6cfd9ab0216d81664
    },
    {
      path: '/information/:UID',
      name: 'information',
      component: information
    },
    // for local test: localhost/#/information/5eb7a93fc0a07c000b4488e9
    {
      path: '/myQuestionnaire/:UID',
      name: 'myQuestionnaire',
      component: myQuestionnaire
    },
    // for local test: localhost/#/myQuestionnaire/5e8c1be865e6f70222803e1b
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
