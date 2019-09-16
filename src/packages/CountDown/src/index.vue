<template>
  <div class="count--content">
    <div v-if="!state"  @click="tabGetCode">
      <slot>
        <p class="countDown">获取验证码</p>
      </slot>
    </div>
    <div class="countDown--font" v-else>
      <count-time :time='time'></count-time>
    </div>
  </div>
</template>

<script>
import countTime from './down.vue'

export default {
  name: 'count-down',
  components: {
    countTime
  },
  props: {
    time: {
      type: Number,
      default: 60
    },
    state: {
      type: [Boolean],
      default: false
    }
  },
  methods: {
    tabGetCode() {
      this.$emit('change')
    }
  }
}
</script>

<style lang='less'>
.count--content {
  .countDown {
    &:active {
      color: #4288d8;
    }
  }
}
.countDown--font {
  font-size: 15px;
}
</style>
