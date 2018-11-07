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
  }
}
</script>

<style scoped lang="scss">

</style>
