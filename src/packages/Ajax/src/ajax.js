/* global ActiveXObject */
import {
  formate,
  loadFn,
  toastFn,
  ajaxLog,
  setHeader,
  setHook
} from './tools'
const aload = loadFn
const atoast = toastFn

function ajaxPlug(options) {
  const request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  class AjaxPlugin {
    constructor(options) {
      this.type = (options.type || 'POST').toUpperCase()
      this.dataType = options.dataType || 'json'
      this.url = options.url
      this.async = options.async || true
      this.data = options.data || {}
      this.toast = options.toast || 'false'
      this.load = options.load || 'false'
      this.requestDataType = options.requestDataType || 'json'
      this.success = options.success || null
      this.successCB = options.successCB || null // 成功的统一回调
      this.error = options.error || options.initError || null // initError 优先级低于error 是在initOptions设置，为默认错误处理
      this.header = options.header || null
      this.sessionStorage = options.sessionStorage || null // 数组结构 用来提供header额外的，主要是在init的时候设置，避免多次设置
      this.localStorage = options.localStorage || null // 同上
      if (options.hooks && typeof options.hooks === 'object') {
        this.hooks = options.hooks
      }
    }
    sendReq() {
      let type = this.type
      let url = this.url
      let data = this.data
      let async = this.async
      let session = this.sessionStorage
      let localStorage = this.localStorage
      if (this.hooks && this.hooks.beforeSend) { // 发送前钩子
        setHook(request, this.hooks).beforeSend()
      }
      let sheader = () => {
        if (this.header) {
          if (session) {
            let obj = {}
            for (let i = 0; i < session.length; i++) {
              obj[session[i]] = sessionStorage.getItem(session[i]) || ''
            }
            Object.assign(this.header, obj)
          }
          if (localStorage) {
            let obj = {}
            for (let i = 0; i < localStorage.length; i++) {
              obj[localStorage[i]] = window.localStorage.getItem(localStorage[i]) || ''
            }
            Object.assign(this.header, obj)
          }
          setHeader(request, this.header)
        }
      }
      if (type === 'GET') {
        data = formate(data, 'GET')
        let href = (data === '') ? url : url + '?' + encodeURI(data)
        request.open(type, href, async)
        sheader()
        request.send()
      } else if (type === 'POST') {
        data = this.requestDataType === 'json' ? JSON.stringify(data) : data
        request.open(type, url, async)
        if (this.requestDataType === 'json') {
          request.setRequestHeader('Content-type', 'application/json')
        }
        sheader()
        request.send(data)
      }
      if (this.load === 'true') {
        aload().show()
      }
    }
    onReady(success, error) {
      if (request.readyState === 4) {
        if (this.load === 'true') {
          aload().hide()
        }
        if (request.status === 200) {
          if (request.responseText) {
            let rjson = request.responseText
            try {
              rjson = (typeof (rjson) === 'string') ? JSON.parse(rjson) : rjson
            } catch (error) {
              rjson = {
                code: -1,
                msg: `${this.url}无法解析responseText`,
                success: 'error'
              }
            }
            if (!rjson.success && this.toast === 'true') {
              let msg = rjson.msg
              atoast(msg)
            }
            if (rjson.success && rjson.success === 'error') {
              // console.error(rjson)
              error(rjson)
              return false
            }
            success(rjson)
            if (this.successCB) {
              this.successCB(rjson, request)
            }
          } else {
            if (error) {
              error(request.status)
            }
          }
        } else {
          if (request.status === 302) {
            try {
              window.location.href = request.location
            } catch (error) {
              console.log('request', request)
            }
          } else {
            if (this.error) {
              this.error(request)
            } else {
              ajaxLog(request, this.url)
            }
          }
        }
      }
    }
    ajax() {
      this.sendReq()
      request.onreadystatechange = () => {
        if (this.success && (typeof this.success === 'function')) {
          return this.onReady(this.success, this.error)
        } else {
          return new Promise((resolve, reject) => {
            this.onReady(resolve, reject)
          })
        }
      }
    }
  }
  return new AjaxPlugin(options)
}
export default ajaxPlug
