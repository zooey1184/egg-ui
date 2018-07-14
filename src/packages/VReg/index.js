
import {
  update
} from './src/rule.js'

export default (Vue) => {
  Vue.directive('reg', {
    bind: function (el, binding, vNode) {
      update(el, binding, vNode)
    },
    update: function (el, binding, vNode) {
      let m = binding.modifiers
      let arg = binding.arg
      let value = binding.value
      update(el, binding, vNode)
      if (window[arg]) {
        if (m.check) {
          if (!!value.check && (value.check === true || value.check === 'true')) {
            let obj = window[arg]
            for (let v of obj.values()) {
              if (v.va === false || v.va === 'false') {
                if (window.vm.$toast.show) {
                  window.vm.$toast.show(v.msg || '请检查提交信息')
                } else {
                  try {
                    window.vm.$toast(v.msg || '请检查提交信息')
                  } catch (error) {
                    console.log(error)
                    console.log(v.msg)
                  }
                }
                return false
              }
            }
          }
        }
      }
    },
    unbind: function (el, binding, vNode) {
      let m = binding.arg
      window[m] = null
    }
  })
}
