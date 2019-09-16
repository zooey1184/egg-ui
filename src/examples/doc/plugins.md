### 插件抽象类

当一个组件满足插件的使用形式，我们可以通过实例化插件来实现

```js
import {plugin} from 'egg-ui'
import {Toast} from 'egg-ui'

const toast = plugin(Toast, {
  initOptions: {
    position: 'top',
    type: 'none',
    bg: '#323E4F',
    color: '#d43f33',
    isOrigin: false,
    styleContent: {}
  },
  name: 'toast',
  showName: 'showToast',
  fullClassName: 'toast_pane',
  typeString: 'msg'
})

// 使用
this.$toast.show()
this.$toast.hide()
```

initOptions => 初始化配置   一般是组件data内容
name => 引用插件的名字   this.$toast toast就是定义的name
showName => 组件中切换显示隐藏的属性，一般定义在data中
fullClassName => 实现单例的类名（css）
typeString => show方法里面参数一般为对象，如果是字符串是所对应使用的属性

ps: 组件库中大部分的插件都是以这种形式构建