export default {
  env: state => state.env,
  ossToken: state => state.ossToken,
  ossTokenRefreshTime: state => state.ossTokenRefreshTime,
  environment: state => state.environment,
  direction: state => state.direction,//页面左右滑动动画
  session: state => state.session,//身份验证Token
  userInformationId: state => state.userInformationId,//企业和个人信息
  userInformation: state => state.userInformation,//授权信息
  systemReturn: state => state.systemReturn,//系统返回数据
}
