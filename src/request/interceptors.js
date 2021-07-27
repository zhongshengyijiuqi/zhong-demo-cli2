export default {
  install(Vue, axios) {
    let _this = Vue.prototype

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.common.withCredentials = true

    axios.interceptors.request.use((config) => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    axios.interceptors.response.use((res) => {

      return res
    }, (error) => {
      if (!error.response) {
        _this.$toast('网络错误！')
        return Promise.reject(error)
      }
      let status = error.response.status
      switch(status) {
        case 401:
          _this.$toast('登陆超时,请重新登录！')
        break
        case 403:
          _this.$toast('没有权限！')
        break
        default:
          _this.$toast('网络错误！')
        break
      }
      return Promise.reject(error)
    })
  },
}
