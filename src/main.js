// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import md5 from 'md5'
import {message} from './plugins/resetmessage.js'

Object.defineProperty(Vue.prototype, '$axios', { value: axios })
Object.defineProperty(Vue.prototype, '$md5', { value: md5 })

Vue.use(ElementUI)
Vue.use(VCharts)
Vue.prototype.$message = message
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
