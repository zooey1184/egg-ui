<template>
  <transition :name="transitionFn" mode="out-in">
    <div class="toast_pane common_font typeStyle"
      v-if="showToast"
      :class="{
        topStyle: (position=='top'),
        middleStyle: (position=='middle'),
        bottomStyle: (position=='bottom'),
        headerTop: (position=='top' && isOrigin)
      }"
      :style="{color: color, background: bg}">
      <img v-if="type=='success'" class="icon_style" src="../img/success.png" alt="">
      <img v-if="type=='error'" class="icon_style" src="../img/error.png" alt="">
      <img v-if="type=='loading'" class="icon_style" src="../img/loading_img.gif" alt="">
      <img v-if="type=='wraning'" class="icon_style" src="../img/wraning.png" alt="">
      {{msg}}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  data: ()=> ({
    position: 'top',
    animate: 'slideMiddle',
    showToast: false,
    msg: '',
    color: '#fff',
    bg: 'rgba(0, 0, 0, 0.6)',
    type: "",
    toJSON: '',
    isOrigin: false
  }),
  props: {

  },
  computed: {
    transitionFn: function() {
      let position = this.position
      let type = this.type
      let ani = 'slideMiddle'
      if(position=='top'){
        ani = 'slidetop'
      }else if(position=='middle') {
        ani = 'slideMiddle'
      }else if(position=='bottom') {
        ani = 'slideBottom'
      }else {
        ani = 'slideMiddle'
      }
      return ani
    }
  },
}
</script>

<style scoped>
/*@import url("../animation/common.css");*/
.common_font {
  font-size: 14px;
  font-weight: 400;
  z-index: 9999999;
  font-family: "微软雅黑";
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.icon_style {
  width: 24px;
  max-height: 26px;
  margin-right:10px;
}
.topStyle {
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	padding: 12px 0;
	background: rgba(250, 100, 100, .9);
	color: #fff;
	font-size: 14px;
	text-align: center;
	z-index: 1000000;
}
.middleStyle {
  position: absolute;
  min-width: 30%;
  max-width: 70%;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 3px;
  text-align: center;
  padding: 15px;
  display: flex;
}
.bottomStyle {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  min-height: 30px;
  padding: 10px;
  box-sizing: border-box
}
.typeStyle {
  display: flex;
  align-items: center;
  justify-content: center;
}
.headerTop {
  padding-top: 30px;
}
.slideMiddle-enter-active, .slideMiddle-leave-active {
  transition: all 0.2s linear;
}
.slideMiddle-enter, .slideMiddle-leave-to {
  opacity: 0;
  /* top: 52%; */
}
.slideBottom-enter-active, .slideBottom-leave-active {
  transition: all 0.3s linear;
}
.slideBottom-enter, .slideBottom-leave-to {
  transform: translateY(15px);
  opacity: 0;
}
.slidetop-enter-active, .slidetop-leave-active {
  transition: all .3s linear;
}
.slidetop-enter, .slidetop-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}
</style>
