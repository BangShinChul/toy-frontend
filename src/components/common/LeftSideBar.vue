<template>
  <div class="left-side-bar-app">
    <button class="menu-toggle-btn" v-on:click="toggleMenu()">
      메뉴
    </button>
    <ul id="menu-bar-wrapper" v-bind:class="{hide: isMenuHide, active: !isMenuHide}">
      <li v-on:click="GoTo(0)">Home</li>
      <li v-on:click="GoTo(1)">게시판</li>
      <li v-on:click="GoTo(2)">TODO</li>
      <li v-on:click="GoTo(3)">사진 감별(Tensorflow)</li>
      <li v-on:click="GoTo(4)">마이페이지</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftSideBar',
  data: function () {
    return {
      isMenuHide: true
    }
  },
  methods: {
    GoTo: function (index) {
      alert(index)
    },
    toggleMenu: function () {
      this.isMenuHide = !this.isMenuHide
    }
  }
}
</script>

<style scoped lang="scss">
.left-side-bar-app {
  .menu-toggle-btn {
    position: fixed;
    left: 0;
    top: 0;
    margin: 9px;
    padding: 10px 25px;
    border-radius: 14px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: black;
      color: #fff;
    }
  }
  ul {
    border: 1px solid;
    float: left;
    width: 200px;
    background-color: #fff;
    /*height: 400px;*/
    position: fixed;
    top: 50px;
    list-style: none;
    padding: 0px;
    text-align: left;

    transition: all 1.5s;
    &.active {
      transition-timing-function: ease-out;
      transform:translate(0,0)
    }
    &.hide {
      transition-timing-function: ease-out;
      transform:translate(-220px,0)
    }

    li {
      border: 1px solid gray;
      cursor: pointer;
      padding: 10px 0px;
      &:hover {
        background-color: gray;
        color: white;
      }
    }
  }
  background-color: lightblue;
}
</style>
