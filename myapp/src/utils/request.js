/* global window */
import axios from 'axios'
import cloneDeep from 'lodash.clonedeep'
import qs from 'qs'
import * as _localStorage from './_localStorage'
import router from 'umi/router'
import queryString from 'query-string'

// 设置post header
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const errorCode = ['10010019', '10010020', '10000019']

const fetch = (options) => {
  let {
    method = 'form',
    data = {},
    url,
  } = options

  const LoginInfo = {
    '_tk_': _localStorage.get('token'),
    '_deviceId_': _localStorage.get('deviceId'),
  }

  const cloneData = qs.stringify(cloneDeep({...data, ...LoginInfo}))

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
    return axios({
      url,
      data: {...data, ...LoginInfo},
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    case 'form':
      return axios({
        url,
    		data: cloneData,
    		method: 'post',
    		headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    default:
      return axios(options)
  }
}

export default function request (options) {

  return fetch(options).then((response) => {
    const data = response.data
    const pathname = window.location.pathname
    if(data.status === 'ERROR') {
      if(errorCode.includes(data.errorCode)) {
        // 如果是登陆信息错误
        if(pathname !== '/login') {
          _localStorage.set({ 'admin_locationPathname': JSON.stringify(pathname) })
          router.push({
            pathname: '/login',
            // search: queryString.stringify({
            //   from: pathname,
            // }),
          })
        }
      }
      return Promise.reject({
        success: false,
        message: data.errorMsg,
      })
    }

    return Promise.resolve(data.content);
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText || '服务器异常，稍后重试！'
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    /* eslint-disable */
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
