import { api } from 'config'
import { request } from 'utils'

const { account: {
  userlist, frozenUser, unfrozenUser, userDetail,
} } = api

export function apiUserList (params) {
  return request({
    url: userlist,
    method: 'form',
    data: params,
  })
}

export function apiFrozenUser (params) {
  return request({
    url: frozenUser,
    method: 'form',
    data: params,
  })
}

export function apiUnfrozenUser (params) {
  return request({
    url: unfrozenUser,
    method: 'form',
    data: params,
  })
}

// 获取用户详情
export function getUsersDetail(params) {
  return request({
    url: userDetail,
    method: 'form',
    data: params,
  })
}
