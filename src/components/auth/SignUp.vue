<template>
  <div class="signup-form">
    <p v-if="validation_code !== null" v-text="validation_msg[validation_code]"></p>
    <input id="id" type="text" placeholder="ID" v-model="idVal" required><br>
    <input id="password" type="password" placeholder="Password" v-model="pwdVal" required> <br>
    <input id="email" type="text" placeholder="email@domain.com" v-model="emailVal" required> <br>
    <input id="name" type="text" placeholder="NAME" v-model="nameVal" required><br>
    <div class="btn-section">
      <button v-on:click="getAccount">Create Account</button>
      <button v-on:click="goToBack">Go Back</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUp',
  data () {
    return {
      idVal: null,
      pwdVal: null, // input password 값
      emailVal: null, // input email 값
      nameVal: null,
      validation_msg: {
        'input_empty': '아래의 입력란을 정확하게 입력해주세요.',
        'duplicate_account': '해당 계정은 이미 존재합니다.',
        'perfect_account': '해당 정보로 가입하실 수 있습니다!',
        'has_error': '에러가 발생했습니다. 잠시후에 다시 시도해주세요.'
      },
      validation_code: null,
      apiAddr: this.$store.state.apiAddr
    }
  },
  mounted () {
    console.log(this.$store.state.apiAddr)
  },
  methods: {
    getAccount: function () {
      this.accountCheck()
    },
    accountCheck: function () {
      let result = this.validation()
      if (result) {
        let postData = {
          userId: this.idVal,
          userPassword: this.pwdVal,
          userEmail: this.emailVal,
          userName: this.nameVal
        }

        axios.post(this.apiAddr + '/account/signUp', postData).then(res => {
          console.log('response param data : ')
          console.log(res)

          if (res.status !== 200) {
            this.validation_code = 'has_error'
          }

          if (res.data === '0000') {
            // 회원정보 있을 떄
            this.validation_code = 'duplicate_account'
          } else if (res.data) {
            // 가입완료
            alert('가입완료!')
            this.goToBack()
          }
        })
      }
    },
    goToBack: function () {
      window.location.href = '../'
    },
    validation () {
      let returnVal = true
      if (this.idVal === null || this.emailVAl === null || this.pwdVal === null || this.nameVal === null) {
        this.validation_code = 'input_empty'
        returnVal = false
      }
      console.log('returnVal : ' + returnVal)
      return returnVal
    }
  }
}
</script>

<style scoped>
  body {
    background: #3d516b;
  }

  form {
    width: 320px;
    padding: 60px 25px 80px;
    margin: 50px auto;
    background: #f8d348;
    display: flex;
    flex-direction: column;
  }
  input {
    font-size: 16px;
    border: 0;
    border-radius: 5px;
    outline: 0;
    padding: 10px 15px;
    margin-top: 15px;
    border: 1px solid #ddd;
  }
  button {
    margin-top: 50px;
    padding: 10px 40px;
    border: none;
    border: 1px solid #ddd;
    background-color: #ddd;
  }

  button:hover {
    background-color: black;
    color: #fff;
  }
</style>
