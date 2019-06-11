export default {
  methods: {
    getSheetF () {
      this.$sheet.show({
        animate: 'slideC',
        list: [
          { text: '拍照', value: 'photo' },
          { text: '快照', value: 'quick' }
        ],
        selectFn: (i) => {
          console.log(i)
          this.$sheet.hide()
        }
      })
    }
  }
}
