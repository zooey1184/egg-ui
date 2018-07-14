## 插件-VReg
--- 
##### <font color='#7370ff'>按需加载</font>
```js
// main.js
import {VReg} from 'cycleUI'

VReg(Vue)
```

##### <font color='#7370ff'>使用方式</font>
```html
<div v-reg:basic="{rule: 'c', msg: 'error3', tag: 'c', test: c}"></div>
<input  v-model="a" v-reg:basic="{rule: 'a', msg: 'error1', tag: 'a', test: a}">
<button  v-reg:basic.check="{check: switch}" @click="ck">click me</button>
```
```js
import {check} from 'cycleUI/packages/VReg/src/rule.js'
export default {
  methods: {
    ck() {
      this.switch = true
      if(check('basic')) {
        console.log('ok');
      }else {
        setTimeout(()=> {
          this.switch = false
        }, 50)
      }
    }
  }
}
// basic   分组若同一个页面里面有多个组别需要分别校验
// rule    规则
// msg     提示信息
// tag     分组下的子项 可以认为是该组下的唯一识别
// test    需校验的字段
// check   表示这个是触发校验的开关的识别
// switch  true / false  实时监听的开关
```
##### <font color='#7370ff'>注意事项</font>
check方法需要引用正确
switch注意关闭，因为一旦开启就意味着实时监听检验，也会实时匹配报错（不正确时）

