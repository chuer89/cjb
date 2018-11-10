import { api } from 'config'
import { request } from 'utils'

const { orders: {
  dealList, addDeal, closeDeal, completeDeal, detailDeal
}, publishFarm: {
  farmDetail
}, account: {
  getUserDetailByMobile
} } = api

// 列表
export function getDealList (params) {
  return request({
    url: dealList,
    data: params,
  })
}

// 新增
export function addOrderDeal (params) {
  return request({
    url: addDeal,
    data: params,
  })
}

// 根据农场编号查询
export function getFarmDetail (params) {
  return request({
    url: farmDetail,
    data: params,
  })
}

// 根据手机号查询农场名称
export function getUserInfo (params) {
  return request({
    url: getUserDetailByMobile,
    data: params,
  })
}

// 关闭订单
export function setCloseDeal (params) {
  return request({
    url: closeDeal,
    data: params,
  })
}

// 完成订单
export function setCompleteDeal (params) {
  return request({
    url: completeDeal,
    data: params,
  })
}

// 订单详情
export function getDetailDeal (params) {
  return request({
    url: detailDeal,
    data: params,
  })
}
