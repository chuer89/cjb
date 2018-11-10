import { request } from 'utils'
import { api } from 'config'
const { contact: {
  userSubDetail, userPublishFarm, userViewsDetail,
  farmDetail,
  remarkUserList, remarkUserUpdate, remarkUserAdd,
  remarkFarmList, remarkFarmUpdate, remarkFarmAdd,
} } = api;

export default {
  fetchUserInfo (data) {
    return request({
      url: userViewsDetail,
      data,
    })
  },
  fetchPublishFarms (data) {
    return request({
      url: userPublishFarm,
      data,
    })
  },
  fetchSubscribes (data) {
    return request({
      url: userSubDetail,
      data,
    })
  },
  fetchFarmDetail (data) {
    return request({
      url: farmDetail,
      data,
    })
  },
  remarkUserList (data) {
    return request({
      url: remarkUserList,
      data,
    })
  },
  remarkUserUpdate (data) {
    return request({
      url: remarkUserUpdate,
      data,
    })
  },
  remarkUserAdd (data) {
    return request({
      url: remarkUserAdd,
      data,
    })
  },
  remarkFarmList (data) {
    return request({
      url: remarkFarmList,
      data,
    })
  },
  remarkFarmUpdate (data) {
    return request({
      url: remarkFarmUpdate,
      data,
    })
  },
  remarkFarmAdd (data) {
    return request({
      url: remarkFarmAdd,
      data,
    })
  },
}