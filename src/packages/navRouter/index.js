/**
 * @author: zooey
 * changer: zooey
 * Date: 18/11/01
 * desc: 插件-路由-route 优化之前的版本
 * use: this.$nav.push(name) || this.$nav.back(n) || this.$nav.init()
 * log:
 * 20190114 添加事件监听模式
 * 20190126 添加$nav.page （返回设置的page字段）
 */

import Nav from './src/navRouter.vue'

// 获取连接参数
export function getUrlData (search) {
  let s = search || window.location.search
  // 为了兼容ie
  let a1 = s.match(/\?/g) ? s.split('?') : []
  let obj = {}
  if (a1.length > 0) {
    a1 = a1[1].match('=') ? a1[1].split('&') : []
    for (let i = 0; i < a1.length; i++) {
      obj[a1[i].split('=')[0]] = a1[i].split('=')[1]
    }
  }
  return obj
}
// 事件监听模式
function listenModel () {
  class Center {
    constructor () {
      this.client = []
    }
    listen (k, f) {
      if (!this.client[k]) {
        this.client[k] = []
      }
      this.client[k].push(f)
    }
    publish () {
      let key = Array.prototype.shift.call(arguments)
      let fs = this.client[key]
      if (!fs || fs.length < 1) return false
      for (let i = 0; i < fs.length; i++) {
        fs[i].apply(this, arguments)
      }
    }
  }
  return new Center()
}
// 注册事件列表
let listWrap = {}

// 事件调度中心
let listenCenter = (name, ret) => {
  let t = listenModel()
  if (JSON.stringify(listWrap) !== '{}') {
    for (let i in listWrap) {
      t.listen(listWrap[i].name, listWrap[i].fn)
    }
  }
  return t.publish(name, ret)
}

/**
 * nav 注册路由插件
 */
var nav = {}
nav.install = function (Vue, options) {
  let NavTpl = Vue.extend(Nav)
  let $vNav = new NavTpl()
  const PAGE = window.navRouterPage_query || 'page' // 使用连接参数page作为history的参数
  window.vNav = $vNav
  let tpl = $vNav.$mount().$el
  document.body.appendChild(tpl)
  // 后退行为
  window.onpopstate = function (event) {
    try {
      let s = document.location.search
      let o = getUrlData(s)
      if (o[PAGE]) {
        $vNav.get_page = o[PAGE]
      } else {
        $vNav.get_page = 'p' // 这里的目的是为了能让最后一个动画顺利结束
        setTimeout(() => {
          $vNav.get_page = ''
        }, 500)
      }
      let queryParams = o[PAGE] ? o[PAGE] : '_INDEX'
      $vNav.action = 'backward'
      setTimeout(() => {
        listenCenter('back', queryParams)
      }, 20)
    } catch (e) {
      console.log(e)
    }
  }
  // 替换链接某个参数=>params;为某个值=>query
  function replaceUrl (params, query) {
    let h = window.location.search
    let _params = new RegExp(params, 'g')
    let val = getUrlData()[params]
    let url = h
    if (h.match(_params)) {
      url = url.replace(`${params}=${val}`, `${params}=${query}`)
    } else {
      if (query) {
        url = h.match(/\?/g) ? `${h}&${params}=${query}` : `${h}?${params}=${query}`
      } else {
        url = h.match(/\?/g) ? `${h}` : h
      }
    }
    return url
  }
  Vue.prototype.$nav = {
    push: (options) => {
      let p = getUrlData()
      $vNav.action = 'forward'
      if (typeof (options) === 'string') {
        let path = options.replace(/&.*/g, '')
        if (path !== p[PAGE]) {
          $vNav.get_page = 'p'
          setTimeout(() => {
            $vNav.get_page = path
          }, 20)
          let url = replaceUrl(PAGE, options)
          history.pushState({}, document.title, url)
        }
      } else if (typeof (options) === 'object') {
        if (options.path !== p[PAGE]) {
          $vNav.get_page = 'p'
          setTimeout(() => {
            $vNav.get_page = options
          }, 20)
          let t = null
          if (options.query && JSON.stringify(options.query) !== '{}') {
            let querys = options.query
            for (let i in querys) {
              t += `&${i}=${querys[i]}`
            }
          }
          let url = replaceUrl(PAGE, `${options.path}${t}`)
          history.pushState({}, document.title, url)
        }
      }
    },
    back: (n=-1) => {
      window.history.go(n)
    },
    init: (page = 'home') => {
      $vNav.action = 'forward'
      $vNav.get_page = page
      let url = replaceUrl(PAGE, page)
      history.pushState({}, document.title, url)
    },
    listen (pageId, name, fn) {
      $vNav.emit = pageId
      listWrap[pageId] = {
        name: name,
        fn: fn
      }
    },
    page: PAGE
  }
}
export default nav
