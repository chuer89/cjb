import { request } from 'utils'
import { api } from 'config'

const { admin: { auditSeller, auditSellerImgs, auditSellerDetail, doAudit } } = api

export default {
  fetchSellerLists (data) {
    return request({
      url: auditSeller,
      data,
    })
  },
  fetSellerDetailsById (data) {
    return request({
      url: auditSellerDetail,
      data,
    })
  },
  fetchSellerImgs (data) {
    return request({
      url: auditSellerImgs,
      data,
    })
  },
  doAudit(data) {
    return request({
      url: doAudit,
      data,
    })
  }
}
