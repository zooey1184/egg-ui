<template>
  <div class="cell_list_wrap" :style='styleWrap' :class="classWrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "cell-wrap",
  props: {
    styleWrap: {
      type: Object,
      default: ()=> ({})
    },
    classWrap: [Array, Object]
  }
}
</script>

<style lang="less">
.form_list_wrap {
  padding: 0;
}
</style>