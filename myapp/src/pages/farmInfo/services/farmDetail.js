import { request, config } from 'utils'

const { api } = config
const { farm: {detail} } = api

export function apifarmDetail (data) {
  return request({
    url: detail,
    method: 'form',
    data,
  })
}
