## 插件-Toast
--- 
##### <font color='#7370ff'>按需加载</font>
```js
// main.js
import {Toast} from 'EggUI'

Vue.use(Toast)
```

##### <font color='#7370ff'>使用方式</font>
```js
export default {
  methods: {
    fn() {
      const self = this
      this.$toast.show({                // 显示alert
        msg: 'alert',                   // 提示信息
        position: 'middle',
        type: 'success',
        duration: 3000,
        bg: '#fff'
      })
    }
  }
}
```