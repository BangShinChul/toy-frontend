<template>
    <div class="test-api-box">
      <p v-text="result"></p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'test',
  data: function () {
    return {
      result: null,
      apiAddr: this.$store.state.apiAddr
    }
  },
  mounted () {
    this.testApi()
  },
  methods: {
    testApi: function () {
      axios.get(this.apiAddr + '/main/').then(res => {
        this.result = res
      })
    }
  }
}
</script>

<style scoped>

</style>
