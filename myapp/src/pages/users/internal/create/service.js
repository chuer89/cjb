import { api } from 'config'
import { request } from 'utils'

const { account: {
  rolesSelectData, createAccount
} } = api

export function getTreeSelectData (params) {
  return request({
    url: rolesSelectData,
    method: 'form',
    data: params,
  })
}


export function getCreateAccount (params) {
  return request({
    url: createAccount,
    method: 'form',
    data: params,
  })
}
