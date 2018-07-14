## 插件-Load
--- 
##### <font color='#7370ff'>按需加载</font>
```js
// main.js
import {Load} from 'cycleUI'

Vue.use(Load)
```

##### <font color='#7370ff'>使用方式</font>
```js
export default {
  methods: {
    fn() {
      const self = this
      this.$load.show({                // 显示alert
        title: '加载中'
      })
    }
  }
}
```
content|type|desc|默认值
--- |:--:|:--:|:--:|
title|data|提示语|-
stroke|data|loading颜色|#fff
color|data|提示语颜色|#fff
bg|data|中间load的背景色|rgba(0,0,0,0.3)
bgWrap|data|全屏背景色|rgba(0,0,0,0)
