import {get, post} from '../methods'
import BaseRequest from './BaseRequest.js'

export default class Common extends BaseRequest {
  /**
   * 获取oss上传凭证
   * @param {object} opts
   */
  @get('/Common/User/GetOssPolicyToken')
  getOssToken(opts) {
    return this._requestFormat(opts)
  }
  //授权
  @post('/Auth/AuthorizeSDK')
  postAuthorize(opts){
    return this._requestFormat(opts)
  }
  //用户信息
  @get('/Common/User/GetAppUserInfo')
  getUserInformation(opts){
    return this._requestFormat(opts)
  }
  @get('/Common/User/GetDeptList')//得到当前组织部门
  getDeptList(opts){
    return this._requestFormat(opts)
  }
   //按部门查成员
   @post('/Common/User/GetMemberInfoByDept')
   postMemberInfoByDept(opts){
     return this._requestFormat(opts)
   }

}
