/**
 * @author: zooey
 * changer: zooey
 * date: 18/07/09
 * desc: 组件-获取验证码
 * use: props: state=>切换倒计时|获取验证码    time=>倒计时时间    @change=>点击事件
 */
import countDown from './src/countDown.vue'

countDown.install = function (Vue) {
  Vue.component(countDown.name, countDown)
}

export default countDown
