/**
 * @author: zooey
 * date: 18/11/05
 * desc: 组件-吸顶
 * use: 同正常标签 要求：同属于滚动区的包层里面 不能独立到外层
 */
import Sticky from './src/sticky.vue'

Sticky.install = function (Vue) {
  Vue.component(Sticky.name, Sticky)
}

export default Sticky
