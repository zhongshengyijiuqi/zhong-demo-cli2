import store from '../store'
export default {
  install(Vue, axios) {
    let _this = Vue.prototype

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.common.withCredentials = true
    axios.defaults.timeout = 60000
    axios.interceptors.request.use((config) => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    axios.interceptors.response.use(async (res) => {
      if (res.data.code) {
        if (res.data.code == 100) {
          return res.data
        } else {
          _this.$notify({message:res.data.msg,duration: 3000});
          return res.data
        }
      } else {
        if (res.data.code == undefined) {
          return res.data
        }
      }
    }, (error) => {
      if (error.code === "ECONNABORTED" && error.message.includes('timeout')) {
        _this.$notify({message: '网络请求超时,请检查网络',duration: 3000});
      }
      if (error.response) {
        const status_error = error.response.status
        switch (status_error) {
          case 400:
            _this.$notify({message: '请求参数有误',duration: 3000});
            break;
          case 401:
            _this.$notify({message: '账号未授权',duration: 3000});
            break;
          case 403:
            _this.$notify({message: '账号无权限',duration: 3000});
            break
          case 404:
            _this.$notify({message: '请求地址有误',duration: 3000,});
            break
          case 500:
            _this.$notify({message: '服务器出错',duration: 3000});
            break
          default:
            _this.$notify({message: '网络错误',duration: 3000});
            break
        }
      }
      return Promise.reject(error)
    })
  },
}
