<template>
  <div id="app">
    <page-wrap :state='pageState'>
      <div class="l-app--wrap">
      <tab :tabList='["hello", "world1", "world2","world3","world4"]' v-if='pageState=="success"'>
        <div slot='tab_0'>
          <button class="btn" @click='toastFn(1)'>顶部toast</button>
          <button class="btn" @click='toastFn(2)'>中间toast</button>
          <button class="btn" @click='toastFn(3)'>底部toast</button>
          <div>
            <button class="btn" @click='alertFn'>alert</button>
          </div>
          <div>
            <button class="btn" @click='loadFn'>load</button>
          </div>
          <count-down :state='state' @change='change'></count-down>
          <input type="text" v-model='inp' v-reg:a="{rule: '1', test: inp, msg: '有错', tag: 'inp'}">
          <model-pane v-model='model'>
            <div @click='model=false'>
              hello
            </div>
          </model-pane>
          <button @click='abk' v-reg:a.check="{check: check}">ss</button>
        </div>
        <div slot='tab_1'>
          <button @click='errorFn'>错误页面</button>
        </div>
        <div slot='tab_2'>
          <button @click='play'>sss</button>
          <wave-number ref='number' :startVal='100' :endVal='356'></wave-number>
        </div>
        <div slot='tab_3'>
          hello
        </div>
        <div slot='tab_4'>
          hello
        </div>
        <div slot='tab_5'>
          hello
        </div>

      </tab>
    </div>
    </page-wrap>
  </div>
</template>

<script>
import {check} from '../packages/VReg/src/rule'

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
  methods: {
    toastFn(val) {
      if(val==1) {
        this.$toast.show('toast')
      }else if(val==2) {
        this.$toast.show({
          msg: 'toast2',
          position: 'middle',
          type: 'error'
        })
      }else if(val==3) {
        this.$toast.show({
          msg: 'toast3',
          position: 'bottom',
          type: 'loading'
        })
      }
    },
    alertFn() {
      const self = this
      this.$alert.show({
        btn: ['confirm'],
        confirmFn: ()=> {
          self.$alert.hide()
        }
      })
    },
    errorFn() {
      this.pageState = 'error'
      setTimeout(()=> {
        this.pageState = 'success'
      }, 2000)
    },
    loadFn() {
      this.$load.show()
      setTimeout(()=> {
        this.$load.hide()
      }, 2000)
    },
    abk() {
      this.check = true 
      if(check('a')) {
        console.log('dasda')
      }else {
        setTimeout(()=> {
          this.check = false
        }, 50)
      }
    },
    change() {

    },
    play() {
      this.$refs.number.start()
    }
  },
  mounted() {
    setTimeout(()=> {
      this.pageState = 'success'
    }, 1000)
  }
}
</script>

<style lang="less">
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
  margin: 15px;
}
</style>

