<template>
    <div class="app">
      <coin-rotate></coin-rotate>
      <p>반가워요! 로그인에 성공하셨군요!</p>
      <p v-if="this.$store.state.loginMessage !== ''">{{this.$store.state.loginMessage}}</p>
      <p v-if="this.$store.state.loginMessage === ''">loginMessage가 비어있습니다.</p>
    </div>
</template>

<script>
import CoinRotate from '../components/test/CoinRotate'
export default {
  name: 'Home',
  components: {
    CoinRotate
  }
}
</script>

<style scoped>

</style>
