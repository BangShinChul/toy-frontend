<template>
  <div class="login-form">
    <svg id="ryan" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,150 C0,65 120,65 120,150" fill="#e0a243" stroke="#000" stroke-width="2.5"/>
      <g id="ears" class="ears">
        <path d="M46,40 L46,30 C46,16 26,16 26,30 L26,40" fill="#e0a243" stroke="#000" stroke-width="2.5"
              stroke-linecap="round" transform="rotate(-10,38,24)"/>
        <path d="M74,40 L74,30 C74,16 94,16 94,30 L94,40" fill="#e0a243" stroke="#000" stroke-width="2.5"
              stroke-linecap="round" transform="rotate(10,82,24)"/>
      </g>
      <circle cx="60" cy="60" r="40" fill="#e0a243" stroke="#000" stroke-width="2.5"/>
      <g id="eyes" class="eyes">
        <!-- left eye and eyebrow-->
        <line x1="37" x2="50" y1="46" y2="46" stroke="#000" stroke-width="3" stroke-linecap="round"/>
        <circle cx="44" cy="55" r="3" fill="#000"/>
        <!-- right eye and eyebrow -->
        <line x1="70" x2="83" y1="46" y2="46" stroke="#000" stroke-width="3" stroke-linecap="round"/>
        <circle cx="76" cy="55" r="3" fill="#000"/>
      </g>
      <g id="muzzle" class="muzzle">
        <path d="M60,66 C58.5,61 49,63 49,69 C49,75 58,77 60,71 M60,66 C61.5,61 71,63 71,69 C71,75 62,77 60,71"
              fill="#fff"/>
        <path d="M60,66 C58.5,61 49,63 49,69 C49,75 58,77 60,71 M60,66 C61.5,61 71,63 71,69 C71,75 62,77 60,71"
              fill="#fff" stroke="#000" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
        <polygon points="59,63.5,60,63.4,61,63.5,60,65" fill="#000" stroke="#000" stroke-width="5"
                 stroke-linejoin="round"/>
      </g>
      <path d="M40,105 C10,140 110,140 80,105 L80,105 L70,111 L60,105 L50,111 L40,105" fill="#fff"/>
    </svg>
    <p class="validation-msg" v-if="validation_code !== null" v-text="validation_msg[validation_code]"></p>
    <input id="email" type="text" placeholder="email@domain.com" v-model="emailVal" required>
    <input id="password" type="password" placeholder="Password" v-model="pwdVal" required>
    <div class="btn-section">
      <button v-on:click="doLogin">Login</button>
      <button v-on:click="getAccount">Sign up</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions,no-sequences,eqeqeq,key-spacing,no-trailing-spaces,no-unused-vars */

import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      ryan: null,
      face: null,
      ears: null,
      eyes: null,
      muzzle: null,
      email: null,
      password: null,
      fauxInput: null,
      span: null,
      timer: null,

      emailVal: null, // input email 값
      pwdVal: null, // input password 값

      imsi_email: 'bsc0227@naver.com',
      imsi_pwd: '1234',

      validation_msg: {
        'email_empty': '이메일을 입력해주세요.',
        'password_empty': '비밀번호를 입력해주세요.',
        'both_empty': '계정 정보를 입력해주세요.',
        'email_wrong': '정확한 이메일을 입력해주세요.',
        'password_wrong': '정확한 비밀번호를 입력해주세요.',
        'not_find_account': '해당 계정이 존재하지 않습니다.',
        'has_error': '에러가 발생했습니다. 잠시후에 다시 시도해주세요.'
      },

      validation_code: null
    }
  },
  created () {
  },
  mounted () {
    this.ryan = window.document.getElementById('ryan'),
    // this.face = window.document.getElementsByClassName('ears, eyes, muzzle'),
    this.ears = window.document.getElementById('ears'),
    this.ears = window.document.getElementById('ears'),
    this.eyes = window.document.getElementById('eyes'),
    this.muzzle = window.document.getElementById('muzzle'),
    this.email = window.document.getElementById('email'),
    this.password = window.document.getElementById('password'),
    this.fauxInput = window.document.createElement('div'),
    this.span = window.document.createElement('span'),
    this.fauxInput.appendChild(this.span)
    this.email.addEventListener('focus', this.focus, false)
    this.email.addEventListener('keyup', this.look, false)
    this.email.addEventListener('click', this.look, false)
    this.email.addEventListener('blur', this.reset, false)
    this.password.addEventListener('focus', this.lookAway, false)
    this.password.addEventListener('blur', this.reset, false)
  },
  methods: {
    rotate3d: function (x, y, z, rad) {
      // console.log('rotate3d is working')
      const value = `rotate3d(${x}, ${y}, ${z}, ${rad}rad)`
      // for (let i = 0; i < this.face.length; i++) {
      //   this.face[i].style.transform = value;
      // }
      this.ears.style.transform = value
      this.eyes.style.transform = value
      this.muzzle.style.transform = value
    },
    focus: function (event) {
      // console.log('focus is working')
      if (event) {
        event.target.classList.add('focused')
        this.copyStyles(event.target)
        event.target.type === 'password' ? this.lookAway(event) : this.look(event)
      }
    },
    reset: function (event) {
      // console.log('reset is working')
      if (event) {
        event.target.classList.remove('focused')
        this.ryan.classList.remove('playing')
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.ryan.classList.remove('look-away', 'down', 'up')
          this.rotate3d(0, 0, 0, 0)
        }, 1)
      }
    },
    copyStyles: function (el) {
      const props = window.getComputedStyle(el, null)
      if (this.fauxInput.parentNode === window.document.body) {
        window.document.body.removeChild(this.fauxInput)
      }
      this.fauxInput.style.visibility = 'hidden'
      this.fauxInput.style.position = 'absolute'
      this.fauxInput.style.top = Math.min(el.offsetHeight * -2, -999) + 'px'
      for (let i = 0; i < props.length; i++) {
        if (['visibility', 'display', 'opacity', 'position', 'top', 'left', 'right', 'bottom'].indexOf(props[i]) !== -1) {
          continue
        }
        this.fauxInput.style[props[i]] = props.getPropertyValue(props[i])
      }
      window.document.body.appendChild(this.fauxInput)
    },
    look: function (event) {
      // console.log('look is working')
      if (event) {
        const el = event.target
        const text = el.value.substr(0, el.selectionStart)
        this.span.innerText = text || '.'
        const ryanRect = this.ryan.getBoundingClientRect()
        const inputRect = el.getBoundingClientRect()
        const caretRect = this.span.getBoundingClientRect()
        const caretPos = caretRect.left + Math.min(caretRect.width, inputRect.width) * !!text
        const distCaret = ryanRect.left + ryanRect.width / 2 - inputRect.left - caretPos
        const distInput = ryanRect.top + ryanRect.height / 2 - inputRect.top
        const y = Math.atan2(-distCaret, Math.abs(distInput) * 3)
        const x = Math.atan2(distInput, Math.abs(distInput) * 3 / Math.cos(y))
        const angle = Math.max(Math.abs(x), Math.abs(y))
        // console.log('x/angle : ' + x / angle + " y.angle : " + y / angle + " y/angle/2 : " + y / angle / 2 + " angle : " + angle);
        this.rotate3d(x / angle, y / angle, y / angle / 2, angle)
      }
    },
    lookAway: function (event) {
      // console.log('lookAway is working')
      if (event) {
        const el = event.target
        const ryanRect = this.ryan.getBoundingClientRect()
        const inputRect = el.getBoundingClientRect()
        const distInput = ryanRect.top + ryanRect.height / 2 - inputRect.top
        this.ryan.classList.add('look-away', distInput < 0 ? 'up' : 'down')
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.ryan.classList.add('playing')
        }, 300)
      }
    },
    doLogin: function () {
      let result = this.validation()
      if (result) {
        let postData = {
          userId : this.emailVal,
          userPassword : this.pwdVal
        }

        axios.post('http://localhost:9000/account/doLogin', postData).then(res => {
          console.log('response param data : ')
          console.log(res)

          if (res.status !== 200) {
            this.validation_code = 'has_error'
          }

          if (res.data === '0000') {
            // 회원정보 있을 떄
            this.$parent.$emit('LoginSuccess', true)
          } else if (res.data === '0001') {
            // 회원정보 없을 떄
            this.validation_code = 'not_find_account'
          }
        })
      }
    },
    getAccount: function () {
      window.location.href = '../SignUp'
      // router.go('/SignUp');
      // window.document.href='../SignUp';
    },
    validation () {
      // email을 입력하지 않았을 경우 : email_empty
      // password를 입력하지 않았을 경우 : password_empty
      // email & password를 입력하지 않았을 경우 : both_empty
      // email이 틀렸을 경우 : email_wrong
      // password가 틀렸을 경우 : password_wrong

      let returnVal = true
      if (this.emailVal === null && this.pwdVal !== null) {
        this.validation_code = 'email_empty'
        returnVal = false
      } else if (this.emailVal !== null && this.pwdVal === null) {
        this.validation_code = 'password_empty'
        returnVal = false
      } else if (this.emailVal === null && this.pwdVal === null) {
        this.validation_code = 'both_empty'
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

  .login-form {
    width: 320px;
    padding: 60px 25px 80px;
    margin: 50px auto;
    background: #f8d348;
    display: flex;
    flex-direction: column;
  }

  .btn-section > button{
    margin-top: 50px;
    padding: 10px 40px;
    border: none;
    background-color: white;
  }
  .btn-section > button:hover{
    background-color: #e0a243;
    border-color: #e0a243;
    color: #fff;
  }

  svg {
    width: 70%;
    border-radius: 50%;
    background: #fff;
    margin-bottom: 40px;
    align-self: center;
    transform-style: preserve-3d;
  }

  input {
    font-size: 16px;
    border: 0;
    border-radius: 5px;
    outline: 0;
    padding: 10px 15px;
    margin-top: 15px;
  }

  .validation-msg {
    border: 1px solid #e0a243;
    background-color: #e0a243;
    color: #fff;
    padding: 10px 30px;
    margin: 0 auto 25px auto;
    border-radius: 5px;
    text-align: center;
  }

  @keyframes lookaway-up {
    from {
      transform: rotate3d(.2, 0, -.01, 20deg);
    }
    to {
      transform: rotate3d(.2, -.05, -.01, 20deg);
    }
  }

  @keyframes lookaway-down {
    0% {
      transform: rotate3d(-.2, 0, -.01, 20deg);
    }
    100% {
      transform: rotate3d(-.2, -.05, .01, 20deg);
    }
  }

  .ears {
    transform-origin: 50% 50% 5px;
  }

  .eyes {
    transform-origin: 50% 50% -40px;
  }

  .muzzle {
    transform-origin: 50% 50% -44px;
  }

  .ears, .eyes, .muzzle {
    transition: transform .5s;
  }

  .focused {
    transition: transform .1s;
  }

  .look-away .ears,
  .look-away .eyes,
  .look-away .muzzle {
    transition-duration: .3s;
    animation: 3s infinite alternate;
  }

  .look-away.up .ears,
  .look-away.up .eyes,
  .look-away.up .muzzle {
    transform: rotate3d(.2, 0, 0, 20deg) !important;
  }

  .look-away.down .ears,
  .look-away.down .eyes,
  .look-away.down .muzzle {
    transform: rotate3d(-.2, 0, 0, 20deg) !important;
  }

  .look-away.playing.up .ears,
  .look-away.playing.up .eyes,
  .look-away.playing.up .muzzle {
    animation-name: lookaway-up;
  }

  .look-away.playing.down .ears,
  .look-away.playing.down .eyes,
  .look-away.playing.down .muzzle {
    animation-name: lookaway-down;
  }
</style>
