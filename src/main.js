import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import Components from '@/components'
import FastClick from 'fastclick'
import {onLoad, getConfig,onScanning} from 'yiyun-app-sdk'

import '@/plugins/index'

import Interceptors from '@/request/interceptors'
import directives from '@/extend/directives'

import moment from 'moment'
import utils from '@/utils'
import config from '@/config'
import '@/assets/scss/main.scss'

let vm = {};
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
Vue.use(directives)
Vue.use(Components)

window.document.addEventListener("error", e => {
  if (e.target.tagName.toLowerCase() === 'img') {
      //有avatar代表头像
      if (e.target.getAttribute('avatar')) {
          e.target.src = "https://dl-yiyunappclient.effio.cn/resource/common/avatar.png"
      } else {
          e.target.src = "https://dl-yiyunappclient.effio.cn/resource/common/loadError.png"
      }
  }
}, true)

onLoad(() => {
  let config = getConfig();
  console.log('config',config)
  window.sessionStorage.setItem('Authorization', config.authToken);
  window.sessionStorage.setItem('AUTH', config.userTypes);
  window.sessionStorage.setItem('MemberToken', config.memberToken);
  window.sessionStorage.setItem('OrganizationId', config.organizationId);
  window.sessionStorage.setItem('MemberId', config.memberId);
  window.sessionStorage.setItem('QrCodeParams', JSON.stringify(config.qrCodeParams));
  window.sessionStorage.setItem('Route', JSON.stringify(config.route));
  window.sessionStorage.setItem('ModelStatus', config.device);
  if(process.env.VUE_APP_MODE !== 'staging'){
    vm.a = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
})

if(process.env.VUE_APP_MODE == 'staging'){
  window.sessionStorage.setItem('AUTH', 'AppHead');
  window.sessionStorage.setItem('MemberId', '3gf2aREXRV9');
  window.sessionStorage.setItem('OrganizationId', '3eCv1dMQ9v7');
  vm.a = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
}
export default vm;
