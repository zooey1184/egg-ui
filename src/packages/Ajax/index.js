import ajax from './src/ajax'

const ajaxPlugin = {}
ajaxPlugin.install = function (Vue, options = {}) {
  Vue.prototype.$ajax = (options = {}) => {
    if (Object.prototype.toString.call(options) === '[object Object]') {
      if (ajaxPlugin.initOptions && typeof ajaxPlugin.initOptions === 'object') {
        Object.assign(options, ajaxPlugin.initOptions)
      }
      let a = ajax(options)
      a.ajax()
    } else {
      console.log('options传参有误')
    }
  }
}
export default ajaxPlugin
