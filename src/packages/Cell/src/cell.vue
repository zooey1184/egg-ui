<template>
  <div class="c-cellItem" :class='underLineC' ref='cell' :style='wrapContent' v-if='showCell'>
    <div :class="itemWrapClass" class="f_flex">
      <div class="left" ref='left' :style='letfContent'>
        <p v-if='title'>{{title}}</p>
        <slot v-else name='left'></slot>
      </div>
      <div class="middle f_g1" :style="{width: `${mid}px`}">
        <slot></slot>
      </div>
      <div class="right" v-if='showRight' ref='right' :style='rightContent'>
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
  data: ()=> ({
    mid: 180
  }),
  computed: {
    wrapContent: function() {
      let attr = this.getAttr()
      let wrapStyle = attr.wrapStyle || {}
      let h = this.height || attr.height
      let obj = {}
      if(h>0) {
        obj.height = `${h}px`
      }
      Object.assign(obj, wrapStyle)
      return obj
    },
    underLineC: function() {
      let attr = this.getAttr()
      let underline = this.underLine || attr.underline || "underlineF"
      let obj = {
        [underline]: this.showUnderline
      }
      return obj
    },
    lineAnimate: function() {
      let attr = this.getAttr()
      let a = false
      if(this.lineAni) {
        a = true
      }else if(attr.lineAni) {
        a = true
      }
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
    itemWrapClass: function() {
      if(this.itemClass instanceof Array) {
        if(this.lineAnimate) {
          this.itemClass.unshift("line_slide")
          return this.itemClass
        }else {
          return this.itemClass
        }
      } else {
        if(this.lineAnimate) {
          this.itemClass.line_slide = true
          return this.itemClass
        } else {
          return this.itemClass
        }
      }
    }
  },
  props: {
    width: {
      type: Number,
      default: 0,
    },
    showCell: {
      type: Boolean,
      default: true
    },
    offset: {
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
    showUnderline: {
      type: Boolean,
      default: true,
    },
    underLine: String,
    leftStyle: {
      type: Object,
      default: ()=> ({})
    },
    rightStyle: {
      type: Object,
      default: ()=> ({})
    },
    lineAni: {
      type: Boolean,
      default: false,
    },
    showRight: {
      type: Boolean,
      default: true,
    },
    itemClass: {
      type: [Array, Object],
      default: ()=> ({})
    }
  },
  methods: {
    getW(r) {
      let w = this.$refs[r]
      return w.getBoundingClientRect()
    }
  },
  mounted() {
    let l = this.getW('left').width
    
    let r = 0
    if(this.showRight) {
      r = this.getW('right').width
    }
    let w = this.getW('cell').width
    let attr = this.getAttr()
    let offset = this.offset || attr.offset || 0
    let mid = w - r - l - 12 - offset
    this.mid = mid
  },
}
</script>

<style lang="less">
@import url('../assets/index.less');
@import url('../../../common/css/flex.less');
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
  .left, .middle, .right {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .middle {
    position: relative;
    height: inherit;
    box-sizing: border-box;
    margin-left: 5px;
    input {
      height: inherit;
      width: 100%;
      border: none;
      outline: none;
      font-size: 15px;
      background: transparent;
    }
  }
  .right {
    position: absolute;
    right: 0;
    height: 100%;
    width: 10px;
    .arrow {
      width: 8px;
      position: absolute;
      right: 0;
      .v-center;
    }
  }
}

</style>
