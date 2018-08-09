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
      result: null
    }
  },
  mounted () {
    this.testApi()
  },
  methods: {
    testApi: function () {
      axios.get('http://rest.bangshinchul.com:9000/').then(res => {
        this.result = res
      })
    }
  }
}
</script>

<style scoped>

</style>
