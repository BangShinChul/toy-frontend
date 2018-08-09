// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCarousel from 'vue-carousel'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueCarousel)

// vuex 사용할 시 주석 풀고 사용할 것
const store = new Vuex.Store({
  state: {
    // 변수
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
