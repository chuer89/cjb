import { request} from 'utils'
import {api} from 'config';

const {farmInfo: { farmDirectories, detail }} = api;

export default {
  list (params) {
    return request({
      url: farmDirectories,
      data: params,
    });
  },
  detail (params) {
    return request({
      url:  detail,
      data: params,
    });
  },
};
