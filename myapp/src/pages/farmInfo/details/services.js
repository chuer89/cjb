import {request} from 'utils'
import {api} from 'config';
const {
  farmInfo: {
    farmDetail,
    ownerDetail,
    audit,
    confirmUpdate
  }
} = api
const fetch = {
  //获取售卖农场详细信息
  getfarmDetail (data = {}) {
    return request({
      url: farmDetail,
      method: 'form',
      data,
    })
  },
  // 获取非售卖农场详细信息
  getFarmOwnerDetail(data={}){
    return request({
      url: ownerDetail,
      method: 'form',
      data,
    })
  },
  // 审核发布的农场
  auditFarm(data={}){
    return request({
      url: audit,
      method: 'form',
      data,
    })
  },
  // 确认修改
  confirmUpdate(data={}){
    return request({
      url: confirmUpdate,
      method: 'form',
      data,
    })
  }
}
export default fetch;
