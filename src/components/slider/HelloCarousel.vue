<template>
  <div class="hello-carousel">
    <carousel per-page="1" pagination-enabled="false" loop="true">
      <slide>
        <h1 class="title">
          환영합니다!
        </h1>
        <h2 class="subtitle">
          저의 사이트에 오신것을 환영합니다.
        </h2>
      </slide>

      <slide>
        <h1 class="title">
          반가워요!
        </h1>
        <h2 class="subtitle">
          저의 블로그를 이용하시려면 로그인해주세요.
        </h2>
      </slide>

    </carousel>
  </div>
</template>

<script>
export default {
  name: 'HelloCarousel'
}
</script>

<style scoped>

</style>
