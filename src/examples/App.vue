<template>
  <div id="app">
    <page :state='pageState'>
      <div class="l-app--wrap">
      <tab :tabList='["插件", "指令", "组件", "tab_4", "tab_5"]' v-if='pageState=="success"'>
        <div slot='tab_0' style="height: 95%">
          <plugin></plugin>
        </div>

        <div slot='tab_1'>
          <tpl></tpl>
        </div>
        <div slot='tab_2'>
          <button class='btn' @click='play'>开始动画</button>
          <wave-number ref='number' :startVal='100' :endVal='356'></wave-number>
        </div>
        <div slot='tab_3'>
          <button class="btn" @click='errorFn'>显式错误页面</button>
          <button class="btn" @click='loadFn'>显式加载页面</button>
        </div>
        <div slot='tab_4'>
          <div>
            <button class="btn" @click='goNext'>gonext</button>
          </div>
        </div>
      </tab>
    </div>
    </page>
  </div>
</template>

<script>
import {check} from '../packages/VReg/src/rule'
import plugin from './views/plugin.vue'
import tpl from './views/tpl.vue'

export default {
  name: 'app',
  data: ()=> ({
    model: false,
    state: false,
    check: false,
    inp: 'ssss',
    pageState: 'loading',
    autoplay: false
  }),
  components: {
    plugin,
    tpl
  },
  methods: {
    errorFn() {
      this.pageState = 'error'
      setTimeout(()=> {
        this.pageState = 'success'
      }, 2000)
    },
    loadFn() {
      this.pageState = 'loading'
      setTimeout(()=> {
        this.pageState = 'success'
      }, 2000)
    },
    play() {
      this.$refs.number.start()
    },
    goNext() {
      this.$nav.push("pageTwo")
    }
  },
  mounted() {
    setTimeout(()=> {
      this.pageState = 'success'
    }, 50)
  }
}
</script>

<style lang="less">
#app {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0
}
* {
  margin: 0;
  padding: 0
}
.l-app--wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}
.btn {
  width: 120px;
  height: 35px;
  border-radius: 5px;
  color: #fff;
  background: #22d2c3;
  outline: none;
  border: none;
  margin: 10px 0;
  margin-right: 10px;
}
</style>

