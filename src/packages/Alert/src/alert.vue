<template>
  <div>
    <transition name="fade">
      <div class="alert--full" v-if='showToast' :style='{background: bg}'></div>
    </transition>
    <transition :name="animate">
      <div class='alert__content' v-show='showToast' :style='{transitionDelay: "20ms"}'>
        <div class='content'>
          <h4 class="content__title">{{title}}</h4>
          <p class='content__desc'>{{msg}}</p>
          <div class='btn__group' v-if='btnFn'>
            <p v-for='(item, index) in btn' :class='{ lastBtn: showBtnLine(index)}' @click='actionFn(item, index)' :key='index'>{{item}}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'alert',
  data: ()=> ({
    animate: 'fade',
    showToast: false,
    title: '提示',
    msg: '提示',
    color: '#fff',
    bg: 'rgba(0, 0, 0, 0.3)',
    w_icon: '//r.51gjj.com/act/release/img/wraning.png',
    e_icon: '//r.51gjj.com/act/release/img/error.png',
    s_icon: '//r.51gjj.com/act/release/img/success.png',
    l_icon: '//r.51gjj.com/act/release/img/loading_img.gif',
    img_icon: '',
    showIcon: false,
    type: "",
    btn: [],
    showBtn: false,
    toJSON: '',
    touchindex: 99
  }),
  computed: {
    btnFn: function(){
      let b = this.btn
      if(b.length>0) {
        this.showBtn = true
      }else {
        this.showBtn = false
      }
      return this.showBtn
    },
  },
  methods: {
    actionFn(item, index) {
      if(item.match(/(cancle|取消|关闭|放弃|no)/g)) {
        this.cancleFn()
      }else {
        if(item.match(/(confirm|确定|提交|确认|yes)/g)) {
          this.confirmFn()
          return
        }else if(index===0 && this.btn.length>1) {
          this.cancleFn()
          return
        }else{
          this.confirmFn()
          return
        }
      }
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        navigator.vibrate(30);
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
    cancleFn() {
      console.log('this is from vue');
    },
    confirmFn() {
      console.log('this is from confirmFn');
    },
    touchEntFn(d) {
      this.touchindex = d
    }
  }
}
</script>

<style scoped lang='less'>
@import '../../../common/css/base.less';
@import '../../../common/css/var.less';
@import '../../../common/css/transition.less';
* {
  margin: 0;
  padding: 0;
}
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hide {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  z-index: -1;
}

.alert--full {
  .full;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.3);
}
.alert__content {
  overflow: hidden;
  z-index: 9999;
  .full;
  .content {
    position: absolute;
    width: 64%;
    left: 18%;
    top: 34%;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(240, 245, 243, 1);
    .content__title {
      font-size: 14px;
      color: #333;
      font-family: "微软雅黑";
      width: 100%;
      text-align: center;
      padding: 10px 0;
      padding-top: 20px;
      line-height: 18px;
      margin: 10px 0;
      padding: 0;
    }
    .content__desc {
      line-height: 18px;
      font-size: 12px;
      padding: 0 10px;
      margin-bottom: 10px;
      color: #666;
      min-height: 30px;
      text-align: center;
    }
    .btn__group {
      display: flex;
      position: relative;
      width: 100%;
      height: 40px;
      font-size: 14px;
      align-items: center;
      &:before {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 1px;
        background: #ddd;
        content: "";
        transform: scaleY(0.5);
        transform-origin: 0 0;
      }
      p {
        display: inline-block;
        flex-grow: 1;
        flex-shrink: 0;
        font-size: 15px;
        text-align: center;
        color: rgb(43, 112, 245);
        height: 100%;
        .flex;
        position: relative;
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
    }
  }
}
</style>
