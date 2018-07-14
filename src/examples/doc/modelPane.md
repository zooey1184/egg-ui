## 组件-ModelPane
--- 
##### <font color='#7370ff'>使用方式</font>
```js
import {ModelPane} from 'cycleUI'
export default {
  components: {
    ModelPane
  },
}
```

```html
<model-pane v-model='show'>
  <div>
    hello
  </div>
</model-pane>
```

content|type|desc|默认值
--- |:--:|:--:|:--:|
v-model|input|是否显示蒙版|false
name|props|动画效果|fade
div标签|slot|内容占位|-