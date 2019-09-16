/**
 *
 * 格式化参数，自动排序提交form表单
 * @export
 * @param {*} params 传参对象 get会拼接 post会处理对象
 * @param {string} [type='POST']
 * @returns
 */
export function formate(params, type = 'POST') {
  let d = null
  if (type === 'POST') {
    let form = new FormData()
    let arr = []
    for (let a of Object.keys(params)) {
      arr.push(a)
    }
    let arrSort = arr.sort()
    for (let b of arrSort) {
      let val = params[b]
      form.append(b, val)
    }
    d = form
  } else {
    let arr = []
    let str = ''
    for (let a of Object.keys(params)) {
      arr.push(a)
    }
    let arrSort = arr.sort()
    for (let b of arrSort) {
      let val = params[b]
      str += `${b}=${val}&`
    }
    let l = str.length - 1
    let ss = str.substr(0, l)
    d = ss
  }
  return d
}

export function loadFn() {
  let load = null
  let show = () => {
    console.log('loading')
  }
  let hide = () => {
    console.log('hide')
  }
  show = (window.insertLoad && window.insertLoad.show) ? window.insertLoad.show : show
  hide = (window.insertLoad && window.insertLoad.hide) ? window.insertLoad.hide : hide
  let obj = {
    show: show,
    hide: hide
  }
  load = (window.vload && window.vload.$load) ? window.vload.$load : obj
  return load
}

export function toastFn(msg) {
  let toast = (msg) => {
    console.log(msg)
  }
  toast = (window.vtoast && window.vtoast.$toast) ? window.vtoast.$toast.show : (window.insertToast ? window.insertToast : toast)
  return toast(msg)
}

/**
 * @export
 * @param {*} request
 * @param {*} h header object设置头的对象
 */
export function setHeader(request, h) {
  for (let i in h) {
    request.setRequestHeader(i, h[i])
  }
}

export function setHook(request, hooks) {
  return {
    beforeSend: () => {
      const state = 'beforeSend'
      // 添加属性
      let props = hooks[state].props || null
      if (props && props instanceof Array) { // 属性 键值对 数组
        props.forEach(item => {
          request[item.key] = item.value
        });
      }
      // 执行方法
      let method = hooks[state].method || null
      if (method && typeof method === 'function') {
        method(...arguments)
      }
    }
  }
}

export function errorMsg(status) {
  let obj = {
    403: '资源禁止访问，你可能未登录',
    404: '接口/资源不正确，请确认',
    413: '请求实体过大',
    302: '重定向，请确认是否需要后端控制重定向',
    500: '内部服务器错误',
    501: '服务器不支持请求中要求的功能',
    502: '远端服务器错误响应',
    503: '服务器由于在维护或已经超载而无法响应',
    504: '网关超时',
    505: '不支持的 HTTP 版本',
    1000: '未知错误'
  }
  let s = typeof status === 'number' ? status : 1000
  let msg = obj[s] || 'status error or others error'
  return msg
}

export function ajaxLog(request, url) {
  if (window._Log) {
    try {
      window._Log.Crash(request.responseText, {
        mark: url
      })
    } catch (e) {
      console.log(e)
    } finally {
      console.log('try _log')
    }
  } else {
    let er = {
      code: -1,
      msg: {
        detail: errorMsg(request.status),
        url: url,
        status: request.status || 1000
      },
      success: 'error'
    }
    console.error(er)
  }
}
