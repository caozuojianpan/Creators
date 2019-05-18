// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import mui from './lib/js/mui.js'
import "./lib/css/mui.css"
import "./lib/js/muiLoading"
import "./lib/css/muiLoading.css"
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import md5 from 'js-md5'
import './lib/js/rem'

Vue.prototype.mui= mui;
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
Vue.directive("img-error",function (el,binding) {
    el.onerror=function () {
        el.src=binding.value
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
