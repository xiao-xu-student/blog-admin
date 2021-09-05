import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "./router";
import store from "./store";

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import './assets/css/global.css'


Vue.config.productionTip = false
Vue.use(mavonEditor)

Vue.prototype.$bus=new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
