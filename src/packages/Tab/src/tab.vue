<template lang="html">
  <div class="c--tab" ref='tab'>
    <!-- tab_bar区域 -->
    <div class="tab--bar" :style='{height: `${barH}px`}'>
      <!-- 返回按钮 -->
      <!-- <div class="bar_back" v-if="backStatus" @click.stop="page_back(1)"><span class="icon"></span></div> -->
      <ul :style='{width: barWidth}'>
        <li v-for="(item, index) in tabList" :class="{'active': activeIndex == index}" :style="{width: 1/tabLength*100 + '%', fontSize: `${size}px`}" @click.prevent="exchange(index)" :key="index">
          {{item}}
        </li>
        <div class="line" :style="{left: lineWidth(activeIndex)}"></div>
      </ul>
    </div>
    <!-- 内容区域 -->
    <div class="tab--view">
      <ul class="tab_content" :style="tabW | moveTab(activeIndex, tabLength)">
        <li v-for="(item, index) in tabList" class="tab_item" :style='{width:tabW+"%",left:index*tabW+"%"}' :key="index">
          <slot :name="(`tab_${index}`)"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import {clientRect} from '@/common/js/index'

export default {
  name: 'tab',
  data: () => ({
    tabLength: 2,
    activeIndex: 0,
    tabW: 1,
    barWidth: ''
  }),
  props: {
    tabList: {
      type: Array,
      default: function() {
        return []
      }
    },
    active: {
      type: [Number, String],
      default: 0
    },
    backStatus: {
      type: Boolean,
      default: true
    },
    barH: {
      type: [Number, String],
      default: 44
    },
    size: {
      type: [Number, String],
      default: 14
    }
  },
  filters: {
    moveTab(w, p, len) {
      var _t = -w * (p) + "%";
      return 'width:' + 100 * len + '%;-webkit-transform:translate(' + _t + ',0);transform:translate(' + _t + ',0);';
    }
  },
  computed: {
    // barWidth: function() {
    //   let w = `${this.clientRect().w-40}px`
    //   let r = this.$refs.tab.getBoundingClientRect()
    //     console.log(r);
      
    //   if(this.tabList.length>4) {
    //     w = 80*(this.tabList.length)>this.clientRect().w-40 ?` ${80*(this.tabList.length)}px` : w
    //   }
    //   return w
    // }
  },
  methods: {
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
    exchange(index) {
      this.activeIndex = index;
      this.$emit('change', index)
    },
    lineWidth(tab) {
      return (50 / this.tabLength + tab * 100 / this.tabLength) + '%';
    }
  },
  created() {
    this.tabLength = this.tabList.length;
    this.tabW = 100 / this.tabLength;
    this.activeIndex = this.active;
  },
  mounted() {
    let r = this.$refs.tab.getBoundingClientRect()
    // let w = `${this.clientRect().w-40}px`
    let w = `${r.width-40}px`
    
    
    if(this.tabList.length>4) {
      // w = 80*(this.tabList.length)>this.clientRect().w-40 ?` ${80*(this.tabList.length)}px` : w
      w = 80*(this.tabList.length)>r.width-40 ?` ${80*(this.tabList.length)}px` : w
    }
    this.barWidth = w
  }
}
</script>

<style lang="less">
.c--tab {
  position: relative;
  width: 100%;
  height: 100%;
  ::-webkit-scrollbar {
    width: 0px;
    height: 1px;
  }
  ::-webkit-scrollbar-thumb{
    background-color: #999;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:vertical:hover{
    background-color: #666;
  }
  ::-webkit-scrollbar-thumb:vertical:active{
    background-color: #333;
  }
  ::-webkit-scrollbar-button{
    display: none;
  }
  ::-webkit-scrollbar-track{
    background-color: #f1f1f1;
  }
}
.tab--bar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background: #fff;
  overflow-x: auto;
  color: #303030;
  width: 100%;
  height: 44px;
  box-shadow: 0 2px 4px #ddd;
  &::-webkit-scrollbar {
    display:none
  };
  ul {
    margin: 0 20px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow-x: scroll;
    position: relative;
    list-style: none;
    li {
      height: 100%;
      float: left;
      line-height: 44px;
      min-width: 80px;
      text-align: center;
      font-size: 14px;
    }
    .active {
      color: #4678e7!important;
    }
    .line {
      position: absolute;
      bottom: 4px;
      width: 14px;
      height: 3px;
      line-height: 4px;
      background-color: #4678e7;
      margin-left: -7px;
      transition: left 0.4s;
    }
  }
}
.tab--view {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 9;
  padding-top: 44px;
  .tab_content {
    position: relative;
    height: 100%;
    z-index: 2;
    transition: transform 0.4s;
    .tab_item {
      position: absolute;
      top: 0;
      height: 100%;
      display: block;
    }
  }
}
</style>
