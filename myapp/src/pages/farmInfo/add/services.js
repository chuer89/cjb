import {request} from 'utils'
import {api} from 'config';

const {
  farmInfo: {
    getFarm,
    addFarm
  }
} = api

const fetch = {
  // 获取农场主
  getFarmers(data = {}) {
    return request({
      url: getFarm,
      method: 'form',
      data,
    })
  },
  // 保存农场
  saveFarm(data = {}) {
    return request({
      url: addFarm,
      method: 'form',
      data,
    })
  }
}
export default fetch;
