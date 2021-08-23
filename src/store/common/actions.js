import axios from 'axios'
import {commonRequest} from '@/request/api'
import Vue from 'vue'
let popup = Vue.prototype
async function setOssToken({commit}) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.getOssToken({type: 1})
      resolve(res.data)
      commit('setOssTokenRefreshTime', new Date())
      commit('setOssToken', res.data.Data)
    } catch (error) {
      reject(error)
    }
  })
}

const pureAxios = axios.create()
const ossExpirationTime = 240000
async function uploadOss({state, dispatch}, {file}) {
  return new Promise(async (resolve, reject) => {
    let oss = state.ossToken
    if (!state.ossToken || !state.ossTokenRefreshTime || new Date() - state.ossTokenRefreshTime > ossExpirationTime) {
      try {
        let res = await dispatch('setOssToken')
        oss = res.Data
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
    let filename = Date.now() + '.' + fileType
    let data = new FormData()
  
    data.append('key', oss.bucketNameFile + '$' + '{filename}')
    data.append('bucket', oss.bucketName)
    data.append('x-oss-meta-tag', 'dummy_etag_xxx')
    data.append('OSSAccessKeyId', oss.accessKeyId)
    data.append('policy', oss.encPolicy)
    data.append('Signature', oss.signature)
    data.append('file', blob, filename)
    data.append('success_action_status', '200')
    try {
      await pureAxios.post(oss.requestUri, data, {
        headers: {
          'Content-Type': 'multipart/form-data'          
        }
      });
    } catch (error) {
      reject(error)
    }
    resolve(filename)
  })
}
async function postAuthorize({commit},obj) { //授权
  return new Promise(async (resolve, reject) => {
    try {
     
      let res = await commonRequest.postAuthorize(obj)
      commit('sessionFun', res.token_type + " " + res.access_token)
      commit('userInformationFun',res.profile)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function getUserInformation({rootState,commit},obj) {//用户信息
  return new Promise(async (resolve, reject) => {
    try {
      
      await popup.$utils.awaitToken(rootState.common)
      let res = await commonRequest.getUserInformation(obj)
        commit('userInformationIdFun', res)
        resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function getDeptList({rootState,commit},obj) {//得到当前组织部门
  return new Promise(async (resolve, reject) => {
    try {
      await popup.$utils.awaitToken(rootState.common)
      let res = await commonRequest.getDeptList(obj)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function postMemberInfoByDept({rootState,commit},obj) {//按部门查成员
  return new Promise(async (resolve, reject) => {
    try {
      await popup.$utils.awaitToken(rootState.common)
      let res = await commonRequest.postMemberInfoByDept(obj)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
export {
  setOssToken,
  uploadOss,
  postAuthorize,
  getUserInformation,
  getDeptList,
  postMemberInfoByDept
}
