## 插件-Ajax
--- 
##### <font color='#7370ff'>按需加载</font>
```js
// main.js
import {Ajax} from 'EggUI'

Vue.use(Ajax)
```

##### <font color='#7370ff'>使用方式</font>
```js
export default {
  methods: {
    fn() {
      const self = this
      this.$ajax({                
        url: url,
        data: data, // object
        type: 'post', // post get
        success: (r)=> {},
        error: (e)=> {}
      })
    }
  }
}
```