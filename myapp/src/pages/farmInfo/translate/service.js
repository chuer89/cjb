import {api} from 'config';
import {request} from 'utils'

const {publishFarm: {translate, save}} = api;

export default {
  translate(params) {
    return request({
      url: translate,
      data: params
    });
  },

  save(params) {
    return request({
      url: save,
      data: params
    });
  },
};
