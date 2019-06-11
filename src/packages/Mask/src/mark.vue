<template>
  <div>
    <transition name="fade">
      <div class="mark--full" v-if='showToast' :style='{background: bg}'></div>
    </transition>
    <transition :name="animate">
      <div class='alert__content' @click.stop='closeFnM($event, "alert__content")' v-show='showToast' :style='{transitionDelay: "20ms"}'>
        <div class='content' :style='styleContent'>
          <component v-if='tpl' :is='tpl' :callback='callback'></component>
          <div v-else class="mark_content_main">
            <h4 class="content__title" v-if='title'>{{title}}</h4>
            <img class="icon_close" v-if='showClose' @click='closeFn' src="./close.png" alt="">
            <div class='content__desc' v-html='msg' v-if='msg'></div>
          </div>
          
          <div class='btn__group' v-if='btn.length>0'>
            <p 
              v-for='(item, index) in btn' 
              :style='{color: item.color ? item.color : "#2b70f5"}' 
              :class='{ lastBtn: showBtnLine(index)}' 
              @click='actionFn(item.type)' 
              :key='item.type'>
              {{item.text}}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'mark-pane',
  data: ()=> ({
    animate: 'fade',
    showToast: false,
    title: '',
    msg: '',
    showClose: false,
    bg: 'rgba(0, 0, 0, 0.5)',
    tpl: null,
    btn: [],
    toJSON: '',
    styleContent: {top: '35%'},
    callback: null
  }),
  methods: {
    actionFn(item) {
      if(item && item=='cancle') {
        this.cancleFn(item)
      }else {
        this.confirmFn(item)
      }
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        navigator.vibrate(25);
      }
    },
    showBtnLine(index) {
      let l = this.btn.length
      let b = true
      if(index+1>=l) {
        b = false
      }
      return b
    },
    closeFnM(e, c) {
      if(e.target.classList.contains(c)) {
        this.closeFn()
      }
    },
    cancleFn() {
      console.log('this is from cancle vue');
      this.$emit('cancle')
    },
    confirmFn() {
      console.log('this is from confirmFn');
      this.$emit('confirm')
    },
    closeFn() {
      this.showToast = false
    }
  }
}
</script>

<style scoped lang='less'>
@import '../../../common/css/transition.less';
@import '../../../common/css/flex.less';
* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑", "Microsoft YaHei", "PingFang SC", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
}
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.mark--full {
  .full;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.5);
}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currentlynot supported by any browser */
}
.lastBtn {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: #ddd;
    transform: scaleX(0.5);
    transform-origin: 0 0;
    content: ""
  }
}
.alert__content {
  z-index: 9999;
  .full;
  .content {
    width: 90%;
    max-width: 450px;
    overflow: hidden;
    display: block;
    margin: 0 auto;
    background: rgb(255, 251, 251);
    position: relative;
    border-radius: 10px;
    text-align: center;
    .mark_content_main {
      padding: 20px;
    }
    .content__title {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      line-height: 18px;
    }
    .content__desc {
      color: #999;
      margin-top: 15px;
    }
    .icon_close {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 20px;
    }
    .btn__group {
      position: relative;
      .noSelect;
      .flex;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        background: #eee;
        left: 0;
      }
      p {
        display: inline-block;
        vertical-align: middle;
        .f_s0;
        .f_g1;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        &:active {
          background: #fff0f0
        }
      }
    }
  }
}
</style>
