<template>
    <div class="app">
      <left-side-bar></left-side-bar>
      <div>
        가입을 축하드립니다! 메인페이지입니다.<br>
        이 페이지는 블로그로 만들 예정입니다.<br>
        곧 게시판 기능과 Todo 기능을 제공하겠습니다.
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
  }
}
</script>

<style scoped>

</style>
