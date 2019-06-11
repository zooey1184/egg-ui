/**
 * @author: zooey
 * changer: zooey
 * Date: 18/07/10
 * desc: 全局导入导出
 * use: main.js
 * import EggUI from 'EggUI'
 * Vue.use(EggUI)
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
import ActionSheet from './ActionSheet'
import Ajax from './Ajax'
import cell from './Cell'
import CountDown from './CountDown'
import formPost from './FormPost'
import ModelPane from './ModelPane'
import Load from './Load'
import Mask from './Mask'
import Page from './PageWrap'
import nav from './navRouter'
import Tab from './Tab/index'
import Toast from './Toast'
import VReg from './VReg/index.js'
import WaveNumber from './WaveNumber/index'
import plugin from './mixins/plugin'

const components = [
  CountDown,
  ModelPane,
  Page,
  Tab,
  WaveNumber,
  cell.cell,
  cell.cellWrap
]

const sheet = plugin(ActionSheet, {
  name: 'sheet',
  showName: 'showToast',
  fullClassName: 'actionSheet--full',
  initOptions: {
    animate: 'slideC'
  }
})
const mask = plugin(Mask, {
  initOptions: {
    styleContent: {
      top: '35%'
    }
  },
  name: 'mask',
  showName: 'showToast',
  fullClassName: 'mark--full'
})
const form = plugin(formPost, {
  initOptions: {
    action: '',
    params: []
  },
  name: 'form',
  showName: 'showForm',
  fullClassName: 'formPost--full'
})
const load = plugin(Load, {
  initOptions: {},
  name: 'load',
  showName: 'showLoading',
  fullClassName: 'load',
  typeString: 'title'
})
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

const plugins = [
  load,
  Ajax,
  form,
  sheet,
  toast,
  nav,
  mask
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
  plugins.map(item=> Vue.use(item))

  // 指令
  VReg(Vue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  CountDown,
  ModelPane,
  Page,
  Tab,
  WaveNumber,
  cell: cell.cell,
  cellWrap: cell.cellWrap,
  Load,
  Ajax,
  form,
  sheet,
  toast,
  nav,
  mask,
  VReg,
  WaveNumber
}
