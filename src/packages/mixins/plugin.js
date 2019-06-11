/**
 * @author: zooey
 * Date: 19/01/25
 * desc: 插件
 * use: 作为插件抽象类
 */
const plugin = (tpl, initOptions) => {
  class Plugin {
    constructor (tpl, initOptions) {
      this.tpl = tpl
      this.initOpt = initOptions
    }
    install (Vue, options) {
      let pName = this.initOpt.name
      let fullClassName = this.initOpt.fullClassName
      let initOptions = this.initOpt.initOptions ? this.initOpt.initOptions : {} // 默认项防止被覆盖
      let showName = this.initOpt.showName
      let typeString = this.initOpt.typeString ? this.initOpt.typeString : 'msg'
      if (document.getElementsByClassName(fullClassName).length) {
        return
      }
      let PluginTpl = Vue.extend(this.tpl)
      let $vplugin = new PluginTpl()
      window[`v${pName}`] = $vplugin
      let tpl = $vplugin.$mount().$el
      document.body.appendChild(tpl)

      Vue.prototype[`$${pName}`] = {
        show: (options, callback) => {
          try {
            if (document.getElementsByClassName(fullClassName).length) {
              return
            }
            Object.assign($vplugin, initOptions)
            if (typeof (options) === 'string') {
              $vplugin[typeString] = options
            } else {
              Object.assign($vplugin, options)
            }
            if (options && !options.animate) {
              $vplugin.animate = 'fade'
            }
            $vplugin[showName] = true
          } catch (e) {
            console.log(e || `${pName}出错了`)
          }
          if (typeof callback === 'function') {
            callback($vplugin)
          }
        },
        hide: () => {
          $vplugin[showName] = false
        }
      }
    }
  }
  return new Plugin(tpl, initOptions)
}
export default plugin
