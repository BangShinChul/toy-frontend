/* eslint-disable no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCarousel from 'vue-carousel'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(VueCarousel)
// Vue.use(axios)

let domainCheck = window.location.host
let apiAddr = null
if (domainCheck.indexOf(domainCheck) !== -1) {
  apiAddr = 'http://localhost:9000'
} else {
  apiAddr = 'http://rest.bangshinchul.com:9000'
}
const store = new Vuex.Store({
  state: {
    // 변수
    loginMessage: '',
    apiAddr: apiAddr,
    hostName: domainCheck
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
