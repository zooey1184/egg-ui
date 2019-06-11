<template>
  <div style="padding: 20px; overflow: auto; height: 97%">
    <p>这里展示的是插件</p>
    <h3>toast</h3>
    <button class="btn" @click='showToast("top")'>toast-top</button>
    <button class="btn" @click='showToast("middle")'>toast-middle</button>
    <button class="btn" @click='showToast("bottom")'>toast-bottom</button>

    <h3>mask</h3>
    <button class="btn" @click='showAlert'>$mask</button>
    <p>废除原版的alert，改用mask</p>
    <p>原理上，mask适用所有弹窗情况</p>

    <h3>actionSheet</h3>
    <button class="btn" @click='showSheet'>$sheet</button>

    <h3>formPost表单提交</h3>
    <button class="btn" @click='showPost'>$form</button>

    <h3>load</h3>
    <button class="btn" @click='showLoad'>$load</button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast(position) {
      this.$toast.show({
        msg: 'toast',
        position: position
      })
    },
    showAlert() {
      this.$mask.show({
        btn: [{text: '确定', type: 'confirm'}],
        msg: 'hello',
        confirmFn: ()=> {
          this.$mask.hide()
        }
      })
    },
    showSheet() {
      this.$sheet.show({
        animate: 'slideC',
        list: [
          { text: '拍照', value: 'photo' },
          { text: '快照', value: 'quick' }
        ],
        selectFn: (i) => {
          console.log(i)
          this.$toast.show(`选择${i.text}`)
          this.$sheet.hide()
        }
      })
    },
    showPost() {
      this.$form.show({
        action: 'https://baidu.com',
        type: 'GET',
        params: {
          name: 'zooey',
          age: '18'
        }
      }, e=> {
        e.submitFn() // 需要显式调用方法，否则不会提交
      })
    },
    showLoad() {
      this.$load.show()
      setTimeout(()=> {
        this.$load.hide()
      }, 2000)
    }
  }
}
</script>


<style lang="less">
h3 {
  margin-top: 30px;
}
</style>


