<template>
  <div class="left-side-bar-app">
    <ul>
      <li>Home</li>
      <li>menu 1</li>
      <li>menu 2</li>
      <li>menu 3</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftSideBar'
}
</script>

<style scoped lang="scss">
body {
  ul {
    list-style: none;
    padding: 0px;
    text-align: left;
    li {
      padding: 10px 0px;
    }
  }
  background-color: lightblue;
}
</style>
