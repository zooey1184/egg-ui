/**
 * @author: superMao
 * changer: zooey
 * date: 18/07/12
 * desc: 组件-动画数字
 * use: startVal = 》开始数字 endVal = 》结束数字 duration = 》持续时间 separator=》千分位分隔符...
 */
import WaveNumber from './src/waveNumber.vue'

WaveNumber.install = function (Vue) {
  Vue.component(WaveNumber.name, WaveNumber)
}

export default WaveNumber
