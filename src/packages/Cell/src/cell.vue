<template>
  <div class="c-cellItem" :class='{underlineF: showLine=="part", underlineFull: showLine=="full"}' ref='cell' :style='wrapContent'>
    <div :class="{line_slide: lineAnimate}">
      <div class="cell_left" :style='letfContent'>
        <p v-if='title'>{{title}}</p>
        <slot v-else name='left'></slot>
      </div>
      <div class="cell_middle" v-if='showContent'>
        <slot></slot>
      </div>
      <div class="cell_right" :style='rightContent'>
        <slot name='right'>
          <img class="arrow" src="../assets/arrow.png" alt="">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '@/common/mixins/list_tpl.js'

export default {
  name: 'cell',
  mixins: [mixins],
  computed: {
    wrapContent: function() {
      let attr = this.getAttr()
      let h = this.height || attr.height
      let obj = {}
      if(h>0) {
        obj.height = `${h}px`
      }
      return obj
    },
    lineAnimate: function() {
      let attr = this.getAttr()
      let a = this.lineAni || attr.lineAni
      return a
    },
    letfContent: function() {
      let attr = this.getAttr()
      let w = this.width || attr.width
      let h = this.height || attr.height
      
      let obj = {}
      if(h>0) {
        obj.lineHeight = `${h}px`
      }
      if(w>0) {
        obj.width = `${w}px`
      }
      Object.assign(obj, this.leftStyle)
      return obj
    },
    rightContent: function() {
      let obj = this.rightStyle
      return obj
    },
    showLine: function() {
      let attr = this.getAttr()
      let a = this.fullLine || attr.fullLine
      let b = this.underLine || attr.underLine
      if(a) {
        return 'full'
      }
      if(b) {
        return 'part'
      }
    }
  },
  props: {
    width: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 0,
    },
    underLine: {
      type: Boolean,
      default: true,
    },
    leftStyle: {
      type: Object,
      default: ()=> ({})
    },
    rightStyle: {
      type: Object,
      default: ()=> ({})
    },
    lineAni: {
      type: Boolean
    },
    fullLine: Boolean,
    showContent: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
@import url('../assets/index.less');
.o-vertical-center {
  position: relative;
  .v-center;
}
.c-cellItem {
  font-size: 16px;
  line-height: 40px;
  position: relative;
  width: 100%;
  height: 48px;
  
  &>div {
    height: 100%;
  }
  .line_slide {
    .underline_slide
  }
  .cell_left, .cell_middle, .cell_right {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .cell_middle {
    position: relative;
    height: inherit;
    min-width: 180px;
    box-sizing: border-box;
    margin-left: 5px;
    input {
      height: inherit;
      width: 100%;
      border: none;
      outline: none;
      font-size: 15px;
      background: transparent
    }
  }
  .cell_right {
    position: absolute;
    right: 0;
    height: 100%;
    .arrow {
      width: 8px;
      position: absolute;
      right: 0;
      .v-center;
    }
  }
}
</style>
