import { request } from 'utils'
import { api } from 'config'

const { user:{
  login, logout, permissions, imExtends,
} } = api

export default {
  login (data) {
    return request({
      url: login,
      method: 'form',
      data,
    })
  },
  logout (params) {
    return request({
      url: logout,
      method: 'form',
      data: params,
    })
  },
  permissions () {
    return request({
      url: permissions,
      method: 'form',
    })
  },
  imExtends (data) {
    return request({
      url: imExtends,
      data,
    })
  }
}
