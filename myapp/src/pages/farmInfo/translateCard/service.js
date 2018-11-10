import {api} from 'config';
import {request} from 'utils'
const {base: {getNation, getCity}} = api

export default {
  getNation (params) {
    return request({
      url: getNation,
      method: 'form',
      data: params,
    });
  },

  getCity (params) {
    return request({
      url: getCity,
      method: 'form',
      data: params,
    });
  },
};
