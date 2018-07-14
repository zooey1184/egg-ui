## 插件-Alert
--- 
##### <font color='#7370ff'>按需加载</font>
```js
// main.js
import {Alert} from 'EggUI'

Vue.use(Alert)
```

##### <font color='#7370ff'>使用方式</font>
```js
export default {
  methods: {
    fn() {
      const self = this
      this.$alert.show({                // 显示alert
        title: 'title',                 // 提示标题
        msg: 'alert',                   // 提示信息
        btn: ['cancle', 'confirm'],     // 按钮 数组 最多两个
        cancleFn() {
          self.$alert.hide()            // 取消按钮回调   隐藏alert
        },
        confirmFn() {
          self.$alert.hide()            // 确认按钮回调
        }
      })
    }
  }
}
```