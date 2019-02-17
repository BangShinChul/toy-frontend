<template>
    <div class="app">
      <left-side-bar></left-side-bar>
      <div class="home-content-section">
        가입을 축하드립니다 <span>{{this.$cookie.get('userId')}}</span>님! 여기는 홈페이지입니다.<br>
        이 페이지는 블로그로 만들 예정입니다.<br>
        곧 게시판 기능과 Todo 기능을 제공하겠습니다.<br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      </div>
    </div>
</template>

<script>
import CoinRotate from '../components/test/CoinRotate'
import LeftSideBar from '../components/common/LeftSideBar'
export default {
  name: 'Home',
  components: {
    LeftSideBar,
    CoinRotate
  },
  created () {
    this.$on('LogoutSuccess', function () {
      this.$cookie.delete('userId') // 로그인한 계정의 쿠키 삭제
      window.location.href = '/'
    })
  }
}
</script>

<style scoped lang="scss">
body {
  margin: 0px;
}
.home-content-section {

}
</style>
