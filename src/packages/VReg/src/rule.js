/* disable eslint */
export function rule () {
  const rule = {
    pwd: {
      rule: /^[\w!@#$%^&*.]{6,16}$/,
      msg: '密码格式不正确'
    },
    phone: {
      rule: /^1[3|4|5|6|7|8|9]\d{9}$/,
      msg: '手机号码不正确'
    },
    bankCard: {
      rule: /^\d{8,28}$/,
      msg: '银行卡号不正确'
    },
    money: {
      rule: /^([1-9]\d*|[0-9]\d*\.\d{1,2}|0)$/,
      msg: '请输入正确的金额'
    },
    userName: {
      rule: /^[0-9a-zA-Z_-]*$/,
      msg: '用户名格式不正确'
    },
    realName: {
      rule: /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$|^\s*[A-Za-z][A-Za-z\s*]*[A-Za-z]\s*$/,
      msg: '请检查您的真实姓名'
    },
    email: {
      rule: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
      msg: 'email格式不正确'
    },
    number: {
      rule: /^[0-9]*$/,
      msg: '请输入有效的数字'
    },
    qq: {
      rule: /^[1-9][0-9]{4,}/g,
      msg: 'QQ号格式不正确'
    },
    id: {
      rule: /\d{17}[\d|x]|\d{15}/g,
      msg: '身份证号格式不正确'
    }
  }
  return rule
}

export function update (el, binding, vNode) {
  let commonRule = rule()
  let map = new Map()
  let modifiers = binding.modifiers// check
  let b_value = binding.value// value
  let r = b_value.rule // 传入的规则
  let test = `${b_value.test}` // 需要测试的值
  let tag = b_value.tag // 唯一的tag
  let b_arg = binding.arg // 分组
  let reg = new RegExp(r)
  let result = null
  let message = null
  // 检查是否有快捷的验证
  if (b_value.type) {
    for (let k of Object.keys(commonRule)) {
      map.set(k, commonRule[k])
      if (k === b_value.type) {
        message = commonRule[k].msg
        let regexp = commonRule[k].rule
        let rr = new RegExp(regexp)
        if (test.match(rr)) {
          result = true
        } else {
          result = false
        }
      }
    }
  }

  // 忽略有check的情况
  if (!modifiers.check) {
    if (!window[b_arg]) {
      window[b_arg] = new Map()
      let option = {
        rule: reg,
        msg: message || b_value.msg,
        test: test
      }
      if (message) {
        option.va = result
        window[b_arg].set(tag, option)
      } else {
        if (test.match(reg)) {
          option.va = result || true
          window[b_arg].set(tag, option)
        } else {
          option.va = result || false
          window[b_arg].set(tag, option)
        }
      }
    } else {
      let option = {
        rule: reg,
        msg: message || b_value.msg,
        test: test
      }
      if (message) {
        option.va = result
        window[b_arg].set(tag, option)
      } else {
        if (test.match(reg)) {
          option.va = result || true
          window[b_arg].set(tag, option)
        } else {
          option.va = result || false
          window[b_arg].set(tag, option)
        }
      }
    }
  }
}

export function check (arg) {
  let m = new Map()
  let map = window[arg] || m
  let result = false
  for (let v of map.values()) {
    if (v.va) {
      result = true
    } else {
      result = false
      return
    }
  }
  return result
}

export function ckitem (arg, i) {
  let m = new Map()
  let map = window[arg] || m
  let result = false
  for (let [k, v] of map.entries()) {
    if (k === i) {
      if (v.va) {
        result = true
      } else {
        result = false
        return result
      }
    }
  }
  return result
}
