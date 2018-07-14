/**
 * @author: zooey
 * changer: zooey
 * Date: 18/07/09
 * desc: 插件-弹窗
 * use: this.$alert.show({obj}) || this.$alert.show('string') && this.$alert.hide()
 */
import Alert from './src/alert.vue'
var alert = {}
alert.install = function (Vue, options) {
  if (document.getElementsByClassName('alert--full').length) {
    return
  }
  let AlertTpl = Vue.extend(Alert)
  let $valert = new AlertTpl()
  window.valert = $valert
  let tpl = $valert.$mount().$el
  document.body.appendChild(tpl)
  Vue.prototype.$alert = {
    show: (options) => {
      try {
        if (document.getElementsByClassName('alert--full').length) {
          return
        }
        Object.assign($valert, options)
        if (!options.title) {
          $valert.title = '提示'
        }
        if (!options.btn) {
          $valert.btn = ['取消', '确定']
        }
        if (!options.animate) {
          $valert.animate = 'fade'
        }
        $valert.showToast = true
      } catch (e) {
        console.log(e)
      }
    },
    hide: function () {
      $valert.showToast = false
    }
  }
}
export default alert
