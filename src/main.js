import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import Components from '@/components'
import { onLoad, getConfig } from 'yiyun-app-sdk'

import '@/plugins/index'

import Interceptors from '@/request/interceptors'
import directives from '@/extend/directives'

import moment from 'moment'
import utils from '@/utils'
import '@/assets/scss/main.scss'
import VConsole from "vconsole";
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

window.addEventListener("unhandledrejection", function (e) {
  e.preventDefault()
  console.error('unhandledrejection：', e);
  return true;
});

Object.assign(Vue.prototype, {
  $utils: utils,
  $moment: moment,
  $axios: axios
})


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
  // if (process.env.VUE_APP_MODE === 'staging') {
  //   new VConsole();
  // }
  // new VConsole();
  let config = getConfig();
  console.log('config', config)
  window.sessionStorage.setItem('Authorization', config.authToken);
  window.sessionStorage.setItem('AUTH', config.userTypes);
  window.sessionStorage.setItem('MemberToken', config.memberToken);
  window.sessionStorage.setItem('OrganizationId', config.organizationId);
  window.sessionStorage.setItem('MemberId', config.memberId);
  window.sessionStorage.setItem('QrCodeParams', JSON.stringify(config.qrCodeParams));
  window.sessionStorage.setItem('Route', JSON.stringify(config.route));
  window.sessionStorage.setItem('ModelStatus', config.device);
  vm.a = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
})

if (process.env.VUE_APP_MODE == 'staging') {
  window.sessionStorage.setItem('AUTH', 'AppHead');
  window.sessionStorage.setItem('MemberId', '3gf2aREXRV9');
  window.sessionStorage.setItem('OrganizationId', '3eCv1dMQ9v7');
  new VConsole();
  vm.a = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
}
export default vm;
