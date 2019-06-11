<template>
  <transition-group name='fade' tag='div' class="page__wrap">
    <div class="pageWrap_wrap page_success" v-show="state=='success'" :class='classWrap' :style='styleWrap' :key="0">
      <section class="pageWrap_copntain" ref='pageWrap_contain'>
        <slot></slot>
      </section>
      <div class="pageWrap_footer" v-if="footer>0" :style="{height: footer+'px'}" :key='3'>
        <slot name='footer'></slot>
      </div>
    </div>
    <div class="pageWrap_wrap" v-show="state=='loading'" :style="{background: '#fff'}" :key="1">
      <slot name='loading'>
        <loading-page></loading-page>
      </slot>
    </div>
    <div class="pageWrap_wrap" v-if="state=='error'" :style="{background: '#fff'}" :key="2">
      <slot name='fail'>
        <fail-page :tip="tip"></fail-page>
      </slot>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'page',
  components: {
    LoadingPage: () => import('../../../components/loadPage.vue'),
    FailPage: () => import('../../../components/failPage.vue')
  },
  props:{
    footer: {
      type: Number,
      default: 60
    },
    classWrap: {
      type: [Array, Object],
      default: ()=> ([])
    },
    styleWrap: Object,
    state: {
      type: String,
      default: 'success'
    },
    tip: {
      type: String,
      default: "一定是哪里出错了，才让我们错过"
    }
  }
}
</script>

<style scoped lang="less">
.full_pages {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-width: 540px;
  left: 50%;
  transform: translateX(-50%);
}
.page__wrap {
  .full_pages;
  &>div {
    .full_pages;
  }
}
.page_success {
  background: #fff
}
.pageWrap_wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  background: #f5f5f5;
  .pageWrap_copntain {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling : touch;
  }
  .pageWrap_footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 60px;
    z-index: 1;
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
