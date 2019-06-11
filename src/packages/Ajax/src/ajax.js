/* global ActiveXObject */
import { formate, loadFn, toastFn, ajaxLog, setHeader } from './tools'
const aload = loadFn
const atoast = toastFn

function ajaxPlug (options) {
  const request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  class AjaxPlugin {
    constructor (options) {
      this.type = (options.type || 'POST').toUpperCase()
      this.dataType = options.dataType || 'json'
      this.url = options.url
      this.async = options.async || true
      this.data = options.data || {}
      this.toast = options.toast || 'false'
      this.load = options.load || 'false'
      this.requestDataType = options.requestDataType || 'string'
      this.success = options.success || null
      this.error = options.error || null
      this.header = options.header || null
    }
    sendReq () {
      let type = this.type
      let url = this.url
      let data = this.data
      let async = this.async
      if (type === 'GET') {
        data = formate(data, 'GET')
        let href = (data === '') ? url : url + '?' + encodeURI(data)
        request.open(type, href, async)
        request.send()
      } else if (type === 'POST') {
        data = this.requestDataType === 'string' ? JSON.stringify(data) : data
        request.open(type, url, async)
        request.setRequestHeader('Content-type', 'application/json')
        if (this.header) {
          setHeader(request, this.header)
        }
        request.send(data)
      }
      if (this.load === 'true') {
        aload().show()
      }
    }
    onReady (success, error) {
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
              console.error(rjson)
              return false
            }
            success(rjson)
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
    ajax () {
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
