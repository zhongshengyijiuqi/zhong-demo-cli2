import Scroll from './Scroll.vue'
import Head from './Head.vue'
export default {
  install(Vue) {
    Vue.component(Scroll.name, Scroll)
    Vue.component(Head.name, Head)
  },
}
