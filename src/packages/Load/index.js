/**
 * @author: zooey
 * changer: zooey
 * date: 18/07/09
 * desc: 插件-加载器
 * use: this.$load.show(obj | null | string)    this.$load.hide()
 */
import Loading from './src/load.vue'

var LoadPlugin = {}
LoadPlugin.install = function (Vue, options) {
  if (document.querySelector('.load')) {
    return
  }
  let Vload = Vue.extend(Loading)
  let loadVm = new Vload()
  window.vload = loadVm
  let tpl = loadVm.$mount().$el
  document.body.appendChild(tpl)

  Vue.prototype.$load = {
    show: function (options = '') {
      if (typeof (options) === 'string') {
        loadVm.title = options
        loadVm.showLoading = true
      } else if (typeof (options) === 'object') {
        Object.assign(loadVm, options)

        loadVm.showLoading = true
      }
    },
    hide: function () {
      loadVm.showLoading = false
    }
  }
}

export default LoadPlugin
