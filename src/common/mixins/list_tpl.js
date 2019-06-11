// 创建里外层的组件
export default {
  methods: {
    // 获取父组件属性
    getAttr () {
      let attr = this.$parent.$attrs
      return attr
    },
    // 获取节点长度组价内部只能包含子组件，多余元素会被计算导致不准确
    getNode () {
      let node = this.$parent.$children.length
      return node
    },
    // 获取节点 优先判断设置的index属性，否则以uid的计算差作为节点位置
    getIndex () {
      let node = this.$parent.$children.length
      let frist = 0
      let current = this._uid
      if (node > 0) {
        if (this.$attrs.index) {
          current = this.$attrs.index
        } else {
          let uid = this.$parent.$children[0]._uid
          frist = uid
        }
      }
      let index = current - frist
      return index
    }
  }
}
