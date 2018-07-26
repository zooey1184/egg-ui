<template>
<div class="page__wrap">
  <transition-group name='fade' tag='div'>
    <div class="pageWrap_wrap" v-show="(state=='success' || state=='normal')" :style="{background: bgWrap}" :key="0">
      <section class="pageWrap_copntain" ref='pageWrap_contain'>
        <slot></slot>
      </section>
      <div class="pageWrap_footer" v-if="showFooter" :style="{height: `${footer_H}px`}">
        <slot name='footer'></slot>
      </div>
    </div>


    <div class="pageWrap_wrap" v-show="(state=='loading')" :style="{background: bgLoad}" :key="1">
      <slot name='loading'>
        <loading-page :stroke='stroke'></loading-page>
      </slot>
    </div>
    <div class="pageWrap_wrap" v-show="(state=='fail' || state=='error')" :style="{background: '#fff'}" :key="2">
      <slot name='fail'>
        <fail-page :tip="tip"></fail-page>
      </slot>
    </div>
  </transition-group>
</div>
</template>

<script>
// import {clientRect} from '@/common/js/index'

export default {
  name: 'page-wrap',
  components: {
    LoadingPage: () => import('../../../components/loadPage.vue'),
    FailPage: () => import('../../../components/failPage.vue')
  },
  props:{
    showFooter: {
      type: Boolean,
      default: false
    },
    footer_H: {
      type: Number,
      default: 60
    },
    scrollTo: [Number],
    scrollAnimate: {
      type: Boolean,
      default: false
    },
    scrollEvent: {          // 是否实时注册监听scroll事件   新增 默认无
      type: Boolean,
      default: false
    },
    bgWrap: {
      type: String,
      default: '#f5f5f5'
    },
    bgLoad: {
      type: String,
      default: '#fff'
    },
    stroke: {
      type: String,
      default: '#409eff'
    },
    state: {
      type: String,
      default: 'success'
    },
    title: {
      type: [String, Number],
      default: ""
    },
    tip: {
      type: String,
      default: "一定是哪里出错了，才让我们错过"
    }
  },
  watch: {
    scrollTo: function(n, o) {
      let self = this
      let sc = this.$refs.pageWrap_contain
      if(this.scrollAnimate){
        try {
          frame()
        } catch (e) {
          sc.scrollTop = n
        } finally {
          return
        }
      }else {
        sc.scrollTop = n
      }
      function frame() {
        let o = sc.scrollTop
        let t = n
        let c = t-o
        let step = c/10
        if(sc.scrollTop != n){
          window.requestAnimationFrame(frame)
          if(Math.abs(step)<1) {
            sc.scrollTop = n
            return
          }else {
            sc.scrollTop += step
          }
        }else {
          return
        }
      }
    }
  },
  methods: {
    // 防抖
    clientRect () {
      let posi = {
        w: 375,
        h: 603
      }
      if (window.innerWidth === undefined) {
        posi.w = document.documentElement.clientWidth
        posi.h = document.documentElement.clientHeight
      } else {
        posi.w = window.innerWidth
        posi.h = window.innerHeight
      }
      return posi
    },
    debounceFn(fn, wait) {
      let t = null
      return function() {
        if(t!==null) {
          clearTimeout(t)
        }
        t = setTimeout(fn, wait)
      }
    },
    scrollFn() {
      let self = this
      let sc = this.$refs.pageWrap_contain
      if(this.scrollEvent) {
        sc.onscroll = ()=> {
          self.$emit('scroll', sc.scrollTop)
        }
      }else {
        try {
          sc.addEventListener('scroll', this.debounceFn(function() {
            self.$emit('scroll', sc.scrollTop)
          }, 500));
        } catch (e) {
          console.log(e);
        }
      }
      if(!!self.scrollTo && self.scrollTo!=0) {
        if(this.scrollAnimate){
          try {
            frame()
          } catch (e) {
            sc.scrollTop = self.scrollTo
            return
          } finally {
            return
          }
        }else {
          sc.scrollTop = self.scrollTo
        }
      }
      function frame() {
        let o = sc.scrollTop
        let t = self.scrollTo
        let c = t-o
        let step = c/10
        if(sc.scrollTop != self.scrollTo){
          window.requestAnimationFrame(frame)
          if(Math.abs(step)<1) {
            sc.scrollTop = self.scrollTo
            return
          }else {
            sc.scrollTop += step
          }
        }else {
          return
        }
      }
    },
  },
  created() {
    let obj = {
      top: 0,
      left: 0,
      width: this.clientRect().w,
      height: this.clientRect().h
    }
    window.localStorage.setItem('pageRect', JSON.stringify(obj))
  },
  mounted() {
    setTimeout(()=> {
      this.scrollFn()
    }, 100)
  }
}
</script>

<style scoped lang="less">
.page__wrap {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.pageWrap_wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  background: #f5f5f5;
  .pageWrap_header_fixed {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    .pagewrap_header_nav {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      padding: 0 10px;
      justify-content: space-between;
      box-sizing: border-box;
    }
  }
  .pageWrap_copntain {
    position: relative;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling : touch;
  }
  .pageWrap_footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    background: rgba(255,255,255,0);
    z-index: 59;
  }
  .pageWrap_slot_self {
    position: absolute;
    top: 0;
    z-index: 10;
    width: 100%;
    left: 0;
    height: 100%;
    background: rgba(255,255,255,0);
  }
}
.fade-enter-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
