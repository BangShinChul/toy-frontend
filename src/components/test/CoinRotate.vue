<template>
  <div class="hello">
    <ul class="coin">
      <li>
        <div class="flip" v-bind:style="{transform: 'rotateY('+rotateData+'deg)'}">
          <div class="front">
            <div class="txt-box">
              <p>영상제출</p>
              <p>필수 캠페인</p>
            </div>
          </div>
          <div class="back">
            <div class="txt-box">
              <p>동영상으로<br>자유롭게</p>
              <b>당신의 경험을<br>표현해주세요!</b>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <button v-on:click="updateRotateData()">button</button>
  </div>
</template>

<script>
export default {
  name: 'CoinRotate',
  data () {
    return {
      rotateData: 360
    }
  },
  mounted () {
    setInterval(this.updateRotateData, 2500)
  },
  methods: {
    updateRotateData: function () {
      this.rotateData = this.rotateData + 180
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin:0;
    padding:0;
  }
  li{
    list-style:none;
  }
  p {
    font-size: 12px;
    color: #fff;
  }
  b {
    font-size: 10px;
    line-height: 0px;
    color: #fff;
  }

  .coin{
    width:100px;
    height:100px;
    margin:50px auto;
    perspective:500px;
  }
  .coin li{
    width:100px;
    height:100px;
  }
  /*
  .coin li:hover .flip{
    transform:rotateY(180deg);
  }
  */
  .flip{
    position:relative;
    transition: all 2.5s ease;
    transform-style:preserve-3d;
  }
  .txt-box{
    width:100px;
    height:100px;
    text-align:center;
    vertical-align:middle;
  }
  .txt-box > p {
    padding-top:20px
  }
  .front{
    background-color:#000;
    opacity: 0.6;
    border:1px soild #000;
    border-radius:50%;
    position:absolute;
    top:0;
    left:0;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .back{
    background-color:#000;
    opacity: 0.6;
    border:1px soild #000;
    border-radius:50%;
    position:absolute;
    top:0;
    left:0;
    transform: rotateY(180deg);
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
  }
</style>
