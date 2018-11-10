import { request} from 'utils'
import {api} from 'config';
const {publishFarm: { list, detail, translate,myReceive } }= api;

export default {
  list (params) {
    return request({
      url: list,
      data: params,
    });
  },
  detail (params) {
    console.log(params);
    return request({
      url: `${detail}`,
      method: 'get',
      data: params,
    });
  },
  receive (params) {
    return request({
      url: `${translate}/${params.id}`,
      method: 'get',
    });
  },
  myReceive () {
    return request({
      url: myReceive,
      method: 'post',
    });
  },
};
