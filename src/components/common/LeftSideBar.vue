<template>
  <div class="left-side-bar-app">
    <button class="menu-toggle-btn" v-on:click="toggleMenu()">
      <font-awesome-icon icon="bars" v-if="isMenuHide"/>
      <font-awesome-icon icon="times" v-if="!isMenuHide"/>
      <!---->
      <!--<i class="far fa-bars" v-if="isMenuHide"></i>-->
      <!--<i class="far fa-times" v-if="!isMenuHide"></i>-->
    </button>

    <ul id="menu-bar-wrapper" v-bind:class="{hide: isMenuHide, active: !isMenuHide}">
      <li v-on:click="GoTo(0)">Home</li>
      <li v-on:click="GoTo(1)">게시판</li>
      <li v-on:click="GoTo(2)">TODO</li>
      <li v-on:click="GoTo(3)">사진 감별(Tensorflow)</li>
      <li v-on:click="GoTo(4)">마이페이지</li>
      <li v-on:click="Logout">로그아웃</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LeftSideBar',
  data: function () {
    return {
      isMenuHide: true,
      apiAddr: this.$store.state.apiAddr,
      myId: this.$store.state.myId
    }
  },
  created () {
    if (this.myId == null) {
      this.myId = this.$cookie.get('userId')
    }
  },
  methods: {
    GoTo: function (index) {
      alert(index)
    },
    toggleMenu: function () {
      this.isMenuHide = !this.isMenuHide
    },
    Logout: function () {
      this.myId = this.$cookie.get('userId')
      console.log('logout : ' + this.myId)
      axios.post(this.apiAddr + '/account/doLogout', {userId: this.myId}).then(res => {
        console.log('response param data : ')
        console.log(res)

        if (res.status !== 200) {
          this.validation_code = 'has_error'
        }

        if (res.data === '0000') {
          // 로그인 세션이 정상적으로 삭제되었을때
          this.$store.state.myId = this.idVal
          this.$parent.$emit('LogoutSuccess')
        } else if (res.data === '0001') {
          // 로그인되어있지 않거나 로그인 세션이 정상적으로 삭제되지 않았을 때
          alert('로그아웃에 문제가 발생했습니다.')
        }
      })
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
    background-color: #fff;
    font-size: 25px;
    /*padding: 10px 25px;*/
    /*border-radius: 14px;*/
    border: none;
    cursor: pointer;

    &:hover {
      /*background-color: black;*/
      /*color: #fff;*/
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
      transition-timing-function: ease-in-out;
      transform:translate(0,0)
    }
    &.hide {
      transition-timing-function: ease-out;
      transform:translate(-300px,0)
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
