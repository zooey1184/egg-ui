## 组件-CountDown
--- 
##### <font color='#7370ff'>使用方式</font>
```js
import {CountDown} from 'EggUI'
export default {
  components: {
    CountDown
  },
}
```

```html
<count-down :time='time' :state='state' @change='change'>
  <p>验证码</p>
</count-down>
```

content|type|desc|def
--- |:--:|:--:|:--:|
time|props|倒计时|默认60s
state|props|是否开启倒计时|默认false
change|event|点击事件|--
p标签|slot|占位|默认获取验证码
