<template>
  <div class="sticky" :style="getPosition" ref='wrap'>
    <div class="sticky-warp" ref='sticky' >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sticky',
  computed: {
    getPosition(){
      let position = this.cssSupport('position', 'sticky') ? 'sticky' : (this.cssSupport('position', '-webkit-sticky') ? '-webkit-sticky' : 'relative');
      return {
        position:  position,
        top: this.top
      }
    }
  },
  props: {
    top: {
      type: String,
      default: '0'
    },
    supportCss: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    // 初始化判断是否支持，不支持使用position定位
    init(){
      if (this.cssSupport('position', 'sticky')) {
        return;
      }
      if(this.supportCss) {
        let el = this.$refs.wrap
        let target = el.parentNode
        let elWarp = this.$refs.sticky
        let t = document.defaultView.getComputedStyle(el).top
        let top = this.getNumberValue(t);
        this.addScrollListen(target, (event)=> {
          let t1 = el.getBoundingClientRect().top
          if (t1 <= top) {
            elWarp.style.position = 'fixed';
          }
          if (t1 >= 0 && elWarp.style.position != 'absolute') {
            elWarp.style.position = 'absolute';
          }
        })
      }
    },
    // 是否支持属性
    cssSupport: function (attr, value) {
      let element = document.createElement('div');
      if (attr in element.style) {
        element.style[attr] = value;
        return element.style[attr] === value;
      } else {
        return false;
      }
    },
    // 转换属性值top px为数字
    getNumberValue(pxValue){
      let value = String(pxValue).replace('px', '')
      return Number(value) ? Number(value) : 0;
    },
    // 监听滚动并切换 position:sticky用方法替换
    addScrollListen(target, cb){
      target.addEventListener('scroll', (event)=> {
        cb && cb(event);
      });
    }
  }
}

</script>

<style scoped lang="less">
.sticky {
  width: 100%;
  height: inherit;
  top: 10px;
  position: relative;
  z-index: 29;
  .sticky-warp {
    width: 100%;
    background: inherit;
    // will-change: change;
    height: inherit;
    top: inherit;
  }
}
</style>

