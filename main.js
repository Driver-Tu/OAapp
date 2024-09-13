import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import 'element-plus/dist/index.css' //引入element-plus 样式
import ElementPlus from 'element-plus' //完整引入

export function createApp() {
  const app = createSSRApp(App)
.use(ElementPlus)
  return {
    app
  }
}
// #endif