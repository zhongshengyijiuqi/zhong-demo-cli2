import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'
import VueCookie from 'vue-cookie'
import Components from '@/components'
import moment from 'moment'
import FastClick from 'fastclick'
import {onLoad, getConfig,onScanning} from 'yiyun-app-sdk'

import '@/plugins/index'

import Interceptors from '@/request/interceptors'
import filters from '@/extend/filters'
import directives from '@/extend/directives'
import mixins from '@/extend/mixins'
import utils from '@/utils'
import config from '@/config'
// import project from 'yiyun-project1'
// console.log(project)
import '@/assets/scss/main.scss'
// Vue.use(project)

import 'video.js/dist/video-js.css'
Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
  console.error(`Error：`, err)
  console.info(`Error-vm：`, vm)
  console.info(`Error-Info：`, info)  
}
Vue.config.warnHandler = function (msg, vm, trace) {
  console.warn(`Warn：`, msg)
  console.info(`Warn-vm：`, vm)
  console.info(`Warn-Trace：`, trace)  
}

window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.error('unhandledrejection：', e);
  return true;
});

Object.assign(Vue.prototype, {
  $utils: utils, 
  $config: config, 
  $moment: moment,
  $axios: axios
})
// FastClick.prototype.focus = function(targetElement) {
//   var length;
//   // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
//   if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
//       length = targetElement.value.length;
//       targetElement.focus();//加入这一句话就OK了
//       targetElement.setSelectionRange(length, length);
//   } else {
//       targetElement.focus();
//   }
// };
// FastClick.attach(document.body)
Vue.use(Interceptors, axios)
Vue.use(VueLocalStorage, {
  name: 'ls'
})
Vue.use(VueCookie)
Vue.use(directives)
Vue.use(mixins)
Vue.use(filters)
Vue.use(Components)
// onLoad(() => {
//   let config = getConfig();
//   console.log(config)
//   window.sessionStorage.setItem('Authorization', config.authToken);
//   window.sessionStorage.setItem('AUTH', config.userTypes);
//   window.sessionStorage.setItem('MemberToken', config.memberToken);
//   window.sessionStorage.setItem('OrganizationId', config.organizationId);
//   window.sessionStorage.setItem('MemberId', config.memberId);
//   // window.sessionStorage.setItem('QrCodeParams', JSON.stringify(config.qrCodeParams));
//   window.sessionStorage.setItem('Route', JSON.stringify(config.route));

// })
// onScanning((res)=>{
//   console.log('res',res)
//   console.log(231)
// });
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
