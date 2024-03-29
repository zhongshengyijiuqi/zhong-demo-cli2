import axios from 'axios'
import { commonRequest } from '@/request/api'
import Vue from 'vue'
let popup = Vue.prototype
async function setOssToken({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetOSSSigned()
      resolve(res)
      commit('setOssTokenRefreshTime', new Date())
      commit('setOssToken', res.Data)
    } catch (error) {
      reject(error)
    }
  })
}
async function setTempFileSigned({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetTemOssPolicyToken()
      resolve(res)
      commit('setOssTokenRefreshTime', new Date())
      commit('setOssToken', res.Data)
    } catch (error) {
      reject(error)
    }
  })
}

const pureAxios = axios.create()
const ossExpirationTime = 240000
var fileNum = 0
async function uploadOss({ state, dispatch }, { file, fileName = fileNum++, type }) {
  return new Promise(async (resolve, reject) => {
    let oss = state.ossToken
    if (!state.ossToken || !state.ossTokenRefreshTime || new Date() - state.ossTokenRefreshTime > ossExpirationTime) {
      try {
        let res
        if (type) {
          res = await dispatch('setTempFileSigned')
        } else {
          res = await dispatch('setOssToken')
        }
        oss = res.data
      } catch (error) {
        reject(error)
      }
    }
    let fileType
    let blob
    if (typeof (file) !== 'object') {
      let bytes = window.atob(file.split(',')[1])

      let array = []
      for (let i = 0; i < bytes.length; i++) {
        array.push(bytes.charCodeAt(i))
      }
      let base64Type = file.slice(file.indexOf(':') + 1, file.indexOf(';'))

      fileType = base64Type.slice(base64Type.indexOf('/') + 1)

      blob = new Blob([new Uint8Array(array)], {
        type: base64Type
      })
    } else {
      blob = file
      let temp = file.name.split('.')
      fileType = temp[temp.length - 1]
    }

    let filename = `${fileName + '_'}${popup.$moment(Date.now()).format('YYYY-MM-DD_HH:mm:ss')}.${fileType}`
    // let filename = Date.now() + '.' + fileType
    let data = new FormData()
    data.append("key", oss.dir + "${filename}");
    data.append("callback", oss.callback);
    data.append("OSSAccessKeyId", oss.accessid);
    data.append("policy", oss.policy);
    data.append("signature", oss.signature);
    data.append("file", blob, filename);
    data.append("success_action_status", "200");
    try {
      let res = await pureAxios.post(oss.host, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      resolve(res)
    } catch (error) {
      popup.$notify({ type: 'danger', message: '上传文件失败' });
      reject(error)
    }
    resolve(`${oss.url}${filename}`)
  })
}
async function postAuthorize({ commit }, obj) { //授权
  return new Promise(async (resolve, reject) => {
    try {

      let res = await commonRequest.postAuthorize(obj)
      commit('sessionFun', res.token_type + " " + res.access_token)
      commit('userInformationFun', res.profile)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function GetAppUserInfo({ rootState, commit }, obj) {//用户信息
  return new Promise(async (resolve, reject) => {
    try {
      await popup.$utils.awaitToken(rootState.common)
      let res = await commonRequest.GetAppUserInfo(obj)
      document.title = res.appName
      let link = document.querySelector("link[rel*='icon']") || document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = res.appLogo;  //icon图标
      document.getElementsByTagName("head")[0].appendChild(link);
      commit('userInformationIdFun', res)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function GetDeptList({ rootState, commit }, obj) {//得到当前组织部门
  return new Promise(async (resolve, reject) => {
    try {
      await popup.$utils.awaitToken(rootState.common)
      let res = await commonRequest.GetDeptList(obj)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function GetMemberInfoByDept({ rootState, commit }, obj) {//按部门查成员
  return new Promise(async (resolve, reject) => {
    try {
      await popup.$utils.awaitToken(rootState.common)
      let res = await commonRequest.GetMemberInfoByDept(obj)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function GetFactoryModel({ rootState, commit }, obj) {//企业模型
  return new Promise(async (resolve, reject) => {
    try {
      await popup.$utils.awaitToken(rootState.common)
      let res = await commonRequest.GetFactoryModel(obj)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function GetSearchHistory({ rootState, commit }, obj) {//查询接口历史查询记录
  return new Promise(async (resolve, reject) => {
    try {
      await popup.$utils.awaitToken(rootState.common)
      let res = await commonRequest.GetSearchHistory(obj)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

async function SaveSearchHistory({ rootState, commit }, obj) { //保存历史查询记录
  return new Promise(async (resolve, reject) => {
    try {
      await popup.$utils.awaitToken(rootState.common)
      let res = await commonRequest.SaveSearchHistory(obj)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
export {
  setOssToken,
  setTempFileSigned,
  uploadOss,
  postAuthorize,
  GetAppUserInfo,
  GetDeptList,
  GetMemberInfoByDept,
  GetFactoryModel,
  GetSearchHistory,
  SaveSearchHistory,
}
