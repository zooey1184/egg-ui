## 插件-NavRouter
--- 
##### <font color='#7370ff'>按需加载</font>
```js
// main.js
import {nav} from 'EggUI'

Vue.use(nav)
```

##### <font color='#7370ff'>使用方式</font>
```js
export default {
  methods: {
    fn() {
      const self = this
      
      this.$nav.push(path) // path 为全局注册的组件 name
      this.$nav.back(-1)
      this.$nav.listen('id', 'event', ()=> { // 监听拦截器 id标识唯一性， event为订阅事件，fn为执行事件
        console.log('haha')
      })
      this.$nav.init(path) // 标识初始化显式的页面
      this.$nav.page // 标识路由字段名默认为page  设置window.navRouterPage_query
    }
  }
}
```