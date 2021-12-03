import {get, post} from '../methods'
import BaseRequest from './BaseRequest.js'

export default class Common extends BaseRequest {
  /**
   * 获取oss上传凭证
   * @param {object} opts
   */
  //OSS授权
  @get('/Common/User/GetOssPolicyToken')
  GetOSSSigned(opts) {
    return this._requestFormat(opts)
  }
  //OSS授权临时
  @get('/Common/User/GetTemOssPolicyToken')
  GetTemOssPolicyToken(opts) {
    return this._requestFormat(opts)
  }
  //授权
  @post('/Auth/AuthorizeSDK')
  postAuthorize(opts){
    return this._requestFormat(opts)
  }
   //用户信息
   @get('/Common/User/GetAppUserInfo')
   GetAppUserInfo(opts){
     return this._requestFormat(opts)
   }
  @get('/Common/User/GetDeptList')//得到当前组织部门
  GetDeptList(opts){
    return this._requestFormat(opts)
  }
  //按部门查成员
  @post('/Common/User/GetMemberInfoByDept')
  GetMemberInfoByDept(opts){
    return this._requestFormat(opts)
  }
     // 查询所有模型列表
  @get('/Common/CommonFactoryModel/GetFactoryModel')
  GetFactoryModel(opts) {
    return this._requestFormat(opts)
  }
  // 查询接口历史查询记录
  @get('/Common/User/GetSearchHistory')
  GetSearchHistory(opts) {
    return this._requestFormat(opts)
  }
  //保存历史查询记录
  @post('/Common/User/SaveSearchHistory')
  SaveSearchHistory(opts){
    return this._requestFormat(opts)
  }

}
