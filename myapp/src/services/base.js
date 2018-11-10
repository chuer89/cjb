import { request } from 'utils'
import { api } from 'config'

const { base: {
  getAllAreaList,
} } = api

 // 获取所有 国家、城市
export function getCityList (data) {
  return request({
    url: getAllAreaList,
    data,
  })
}