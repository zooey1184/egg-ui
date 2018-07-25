<template>
<div>
  <transition name="fade">
    <div class="model--full" v-if="checked" :style="{background: bg}"></div>
  </transition>
  <transition :name="name">
    <div class="contain--full" v-if="checked">
      <slot></slot>
    </div>
  </transition>
  <input type="checkbox" class="hide" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">
</div>
</template>

<script>
export default {
  name: 'model-pane',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    name: {
      type: String,
      default: 'bounce'
    },
    bg: {
      type: String,
      default: "rgba(0, 0, 0, 0.5)"
    }
  }
}
</script>

<style lang="less">
// @import '~@/common/css/base.less';
// @import '~@/common/css/var.less';
// @import '~@/common/css/transition.less';
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
  box-sizing: border-box;
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

/*淡入淡出*/
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/*bounce*/
.bounce-enter-active, .bounce-leave-active {
  transition: all 0.4s ease;
}
.bounce-enter, .bounce-leave-to {
  transform: scale(1.5);
  opacity: 0;
}
/*slide-toggle*/
.slideB-enter-active, .slideB-leave-active {
  transition: all 0.4s ease;
}
.slideB-enter, .slideB-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slideT-enter-active, .slideT-leave-active {
  transition: all 0.4s ease;
}
.slideT-enter, .slideT-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slideR-enter-active, .slideR-leave-active {
  transition: all 0.4s ease;
}
.slideR-enter, .slideR-leave-to {
  transform: translateX(-120px);
  opacity: 0;
}
/*scale-toggle*/
.scale-enter-active, .scale-leave-active {
  transition: all 0.4s ease;
}
.scale-enter, .scale-leave-to {
  transform: scale(0);
  opacity: 0;
}
/*rotate-toggle*/
.rotate-enter-active, .rotate-leave-active {
  transition: all 0.4s ease;
}
.rotate-enter, .rotate-leave-to {
  transform: rotate(180deg) scale(0.5);
  opacity: 0;
}
@color-t: transparent;
@color-b: #3f76f8;
@color-g: rgb(12, 176, 4);
@color-o: rgb(245, 165, 29);
@color-r: rgb(232, 47, 22);
@color-w: #fff;
@color-b: #333;

@t1: 24px;
@t2: 20px;
@t3: 18px;
@t4: 16px;
@t5: 14px;
@t6: 12px;

@s1: 22px;
@s2: 19px;
@s3: 17px;
@s4: 15px;
@s5: 13px;


.model--full {
  .full;
  background: @color-t;
  z-index: 98
}
.contain--full {
  .flex;
  .full;
  color: @color-w;
  overflow: hidden;
  z-index: 999;
}
</style>

