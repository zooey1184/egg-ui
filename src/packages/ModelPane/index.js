/**
 * @author: zooey
 * changer: zooey
 * date: 18/07/09
 * desc: 组件-蒙版
 * use: v-model=蒙版是否展示
 */
import ModelPane from './src/modelPane.vue'

ModelPane.install = function (Vue) {
  Vue.component(ModelPane.name, ModelPane)
}

export default ModelPane
