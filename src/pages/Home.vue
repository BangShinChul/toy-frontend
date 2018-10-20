<template>
    <div class="app">
      <left-side-bar></left-side-bar>
      <div>
        contents
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
