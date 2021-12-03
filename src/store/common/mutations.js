export default {
  setEnv(state, env) {
    state.env = env
  },
  setOssToken(state, ossToken) {
    state.ossToken = ossToken
  },
  setOssTokenRefreshTime(state, ossTokenRefreshTime) {
    state.ossTokenRefreshTime = ossTokenRefreshTime
  },
  environmentFun(state, environment) {//环境
    state.environment = environment
  },
  updateDirection(state, direction) {//页面左右滑动动画
    state.direction = direction.direction
  },
  sessionFun(state, session) {//身份Token
    state.session = session
  },
  userInformationIdFun(state, userInformationId) {//企业和个人信息
    state.userInformationId = userInformationId
  },
  userInformationFun(state, userInformation) {//授权
    state.userInformation = userInformation
  },
}

