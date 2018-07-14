import Vue from 'vue'
import App from './App.vue'
import cUI from '../packages/index.js'
Vue.use(cUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
