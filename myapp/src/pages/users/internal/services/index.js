import { api } from 'config'
import { request } from 'utils'

const { account: {
  internalAccountList, resetPwd, frozenIn, unfrozenIn, accountList, ids
} } = api

export function getInternalAccount (params) {
  return request({
    url: internalAccountList,
    method: 'form',
    data: params,
  })
}

export function resetPassword (params) {
  return request({
    url: resetPwd,
    method: 'form',
    data: params,
  })
}

export function apiFrozenIn (params) {
  return request({
    url: frozenIn,
    method: 'form',
    data: params,
  })
}


export function apiUnfrozenIn (params) {
  return request({
    url: unfrozenIn,
    method: 'form',
    data: params,
  })
}

export function apiAccountList (params) {
  return request({
    url: accountList,
    method: 'form',
    data: params,
  })
}

export function apiIds () {
  return request({
    url: ids,
    method: 'form',
  })
}
