import {request} from 'utils'
import {api} from 'config';

const {
  farmInfo: {
    farmInformation
  }
} = api

const fetch = {
  // 农场列表
  getFarmQualification(data = {}) {
    return request({
      url: farmInformation,
      method: 'form',
      data,
    })
  }
}
export default fetch;
