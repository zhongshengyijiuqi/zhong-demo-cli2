import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import localstoragePlugin from './plugin/local-storage.js'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
  modules: {
    common,
  },
  plugins: [localstoragePlugin],
  strict: debug,
})

export default store
