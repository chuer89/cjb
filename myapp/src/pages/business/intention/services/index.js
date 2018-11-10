import { api } from 'config'
import { request } from 'utils'

const { business: {
  intentList, intentClose, intentComplete, intentAdd
}, publishFarm: {
  farmDetail
} } = api

// 列表
export function getList(params) {
  return request({
    url: intentList,
    method: 'form',
    data: params,
  })
}

// 新增
export function addIntent(params) {
  return request({
    url: intentAdd,
    data: params,
  })
}

// 根据农场编号查询
export function getFarmDetail(params) {
  return request({
    url: farmDetail,
    data: params,
  })
}

// 关闭订单
export function setCloseIntent(params) {
  return request({
    url: intentClose,
    data: params,
  })
}

// 完成订单
export function setCompleteIntent(params) {
  return request({
    url: intentComplete,
    data: params,
  })
}
