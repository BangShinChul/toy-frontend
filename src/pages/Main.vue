<template>
  <div class="app">
    <hello-carousel></hello-carousel>
    <login></login>
  </div>
</template>

<script>
/* eslint-disable vue/no-shared-component-data */

import Login from '../components/auth/Login'
import HelloCarousel from '../components/slider/HelloCarousel'

export default {
  name: 'Main',
  components: {Login, HelloCarousel},
  comments: {
    Login
  },
  data: function () {
    return {
      isLogin: false,
      drawer: true
    }
  },
  created () {
    this.$on('LoginSuccess', function (data) {
      this.isLogin = data
      window.location.href = '/home'
    })
  },
  mounted () {
    console.log('api address : ' + this.$store.state.apiAddr)
    this.loginCheck() // 현재 로그인상태인지 체크
  },
  methods: {
    loginCheck: function () {
      this.isLogin = this.$cookie.get('userId') // 로그인한 계정의 쿠키 데이터가 있는지 가져옴
      if (this.isLogin) {
        console.log('로그인된 상태입니다.\nuserId cookie : ' + this.isLogin)
        window.location.href = '/home'
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
