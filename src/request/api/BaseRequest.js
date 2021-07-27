export default class BaseRequest {
  constructor(axios) {
    this.$axios = axios
  }
  /**
   * 数据格式化
   * @param {object} opts
   */
  _requestFormat(opts) {
    const method = opts.method
    const url = opts.url
    const params = method === 'post' ? opts.params : {params: opts.params}
    return new Promise(async (resolve, reject) => {
      try {
        let res = await this.$axios[method](url, params)
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
}
