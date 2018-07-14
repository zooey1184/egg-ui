<template>
  <div class="count--content">
    <div v-if="showTime"  @click="tabGetCode">
      <slot>
        <p class="countDown">获取验证码</p>
      </slot>
    </div>
    <div class="countDown--font" v-else>
      {{t}}s
    </div>
  </div>
</template>

<script>
export default {
  name: 'count-down',
  data: ()=> ({
    showTime: true,
    t: null
  }),
  props: {
    time: {
      type: [String, Number],
      default: 60
    },
    state: {
      type: [Boolean],
      default: false
    }
  },
  watch: {
    state: function(n, o) {
      if(n) {
        console.log('可以了,注意state在倒计时后要及时切false');
        this.t = this.time
        this.showTime = false
        let timer = setInterval(()=> {
          if(this.t>0) {
            this.t--
          }else {
            clearInterval(timer)
            this.t = this.time
            this.showTime = true
          }
        }, 1000)
      }else {
        console.log('state=>false 非倒计时状态');
      }
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
