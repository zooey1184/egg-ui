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
@import '~@/common/css/base.less';
@import '~@/common/css/var.less';
@import '~@/common/css/transition.less';
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

