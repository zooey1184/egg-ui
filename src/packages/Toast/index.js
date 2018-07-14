/**
 * @author: zooey
 * changer: zooey
 * date: 18/07/09
 * desc: 插件-提示
 * use: this.$toast.show(obj | string)    this.$toast.hide()
 */
import Alert from './src/toast.vue'
var Toast = {}
Toast.install = function (Vue, options) {
  if (document.getElementsByClassName('toast_pane').length) {
    return
  }
  let ToastTpl = Vue.extend(Alert)
  let $vm = new ToastTpl()
  window.vm = $vm
  let tpl = $vm.$mount().$el
  document.body.appendChild(tpl)
  const opt = {
    position: 'top',
    type: 'none',
    bg: 'rgba(250,100,100,.9)',
    color: '#fff',
    isOrigin: false
  }
  Vue.prototype.$toast = {
    show: function (options) {
      if (document.getElementsByClassName('toast_pane').length) {
        return
      }
      if (typeof (options) === 'string') {
        Object.assign($vm, opt)
        $vm.msg = options
        $vm.showToast = true
        setTimeout(() => {
          $vm.showToast = false
        }, 2500)
      } else if (typeof (options) === 'object') {
        const optobj = {
          position: 'middle',
          type: 'none',
          bg: 'rgba(0,0,0,0.6)',
          color: '#fff',
          isOrigin: false
        }
        Object.assign($vm, optobj)
        Object.assign($vm, options)
        $vm.showToast = true
        if (options.duration) {
          setTimeout(() => {
            $vm.showToast = false
          }, options.duration)
        } else {
          setTimeout(() => {
            $vm.showToast = false
          }, 2500)
        }
      }
    },
    hide: function () {
      $vm.showToast = false
    }
  }
}
export default Toast
