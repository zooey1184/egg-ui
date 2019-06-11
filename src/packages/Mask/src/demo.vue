<script>
export default {
  methods: {
    markFn() {
      this.$mask.show({
        title: '提示',
        msg: '在移动网络环境下会影响视频和音频质量，并产生手机流量。',
        btn: [
          {text: '取消', color: '#333', type: 'cancle'}, 
          {text: '确定', color: '#2323dd', type: 'confirm'}
        ],
        cancleFn: ()=> {
          console.log('cancle')
          this.$mask.hide()
        },
        confirmFn: ()=> {
          console.log('confirm')
          this.$mask.hide()
        }
      })
    }
  }
}
</script>