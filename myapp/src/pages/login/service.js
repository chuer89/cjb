import { request } from 'utils'
import {api} from 'config';

const { user:{
  login
} } = api
export default {
  login (data) {
    return request({
      url: login,
      method: 'form',
      data,
    })
  }
}
