/* eslint-disable no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCarousel from 'vue-carousel'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faBars, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex)
Vue.use(VueCarousel)
Vue.use(VueCookie)
// Vue.use(axios)

document.addEventListener('DOMContentLoaded', function () {
  let domainCheck = window.location.host
  let apiAddr = null

  if (domainCheck.indexOf('localhost') !== -1) {
    apiAddr = 'http://localhost:9000'
  } else {
    apiAddr = 'http://rest.bangshinchul.com:9000'
  }

  const store = new Vuex.Store({
    state: {
      // 변수
      loginMessage: '',
      myId: '',
      apiAddr: apiAddr
    },
    mutations: { // 메서드
    }
  })

  Vue.config.productionTip = true

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
