/**
 * @author: zooey
 * changer: zooey
 * Date: 18/07/10
 * desc: 全局导入导出
 * use: main.js
 * import cycleUI from 'cycleUI'
 * Vue.use(cycleUI)
 * ps: 引进规则：全英文驼峰式，第一个字母大写，导入导出按英文字母排序  注册按组件、插件、指令排序
 */

/**
*说明：
Alert全局弹窗插件
CountDown倒计时组件
ModelPane蒙层组件
Load加载器插件
Toast提示插件
VReg正则校验指令
*/
import Alert from './Alert/index.js'
import CountDown from './CountDown/index.js'
import ModelPane from './ModelPane/index.js'
import Load from './Load/index.js'
import PageWrap from './PageWrap/index.js'
import Tab from './Tab/index'
import Toast from './Toast/index.js'
import VReg from './VReg/index.js'
// import WaveNumber from './WaveNumber/index'

const components = [
  CountDown,
  ModelPane,
  PageWrap,
  Tab
  // WaveNumber
]

/**
 *全局注册组件
 *用于引进
 * @param {*} Vue
 */
const install = function (Vue) {
  if (install.installed) return
  // 组件
  components.map(component => Vue.component(component.name, component))
  // 插件
  Vue.use(Alert)
  Vue.use(Load)
  Vue.use(Toast)
  // 指令
  VReg(Vue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Alert,
  CountDown,
  ModelPane,
  Load,
  PageWrap,
  Tab,
  Toast,
  VReg
  // WaveNumber
}
