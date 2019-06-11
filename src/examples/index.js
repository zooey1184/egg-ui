import Vue from 'vue'
import App from './App.vue'
import eggUi from '../packages/index.js'
import pageTwo from './views/pageTwo.vue'
Vue.component('pageTwo', pageTwo)
Vue.use(eggUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
