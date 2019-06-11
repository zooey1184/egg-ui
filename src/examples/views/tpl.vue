<template>
  <div>
    <cell-wrap :height='48' :width='100' style='padding: 0 10px'>
      <cell title='手机号' v-reg:a="{rule: /1\d{10}/, msg: '手机号不正确', tag: 'phone', test: phone}">
        <input type="text" v-model='phone' placeholder="请输入手机号">
      </cell>
      <cell title='验证码'>
        <input type="text" v-model='code' placeholder="请输入验证码">
      </cell>
    </cell-wrap>
    <button class="btn" v-reg:a.check="{check: check}" @click="ck">提交</button>
  </div>
</template>

<script>
import {check} from '../../packages/VReg/src/rule'

export default {
  data: ()=> ({
    phone: '',
    code: '',
    check: false
  }),
  methods: {
    ck() {
      this.check = true 
      if(check('a')) {
        
        this.$toast.show('ok')
      }else {
        setTimeout(()=> {
          this.check = false
        }, 50)
      }
    },
  }
}
</script>

