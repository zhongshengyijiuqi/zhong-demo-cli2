import {get, post} from '../methods'
import BaseRequest from './BaseRequest.js'

export default class Common extends BaseRequest {
  /**
   * 获取oss上传凭证
   * @param {object} opts
   */
  @get('/Core/Operate/GetSigned/Operate/GetSigned')
  getOssToken(opts) {
    return this._requestFormat(opts)
  }
  //授权
  @post('/Auth/AuthorizeSDK')
  postAuthorize(opts){
    return this._requestFormat(opts)
  }
  //用户信息
  @get('/User/GetAppUserInfo')
  getUserInformation(opts){
    return this._requestFormat(opts)
  }
}
