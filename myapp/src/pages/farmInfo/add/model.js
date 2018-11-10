import service from './services'
import {Model} from 'utils'
import _ from "lodash";
import router from "umi/router";
import {message} from 'antd'

const initState = {
  farmers: [],
  farmersInputValue: undefined
}
export default Model.extend({
  namespace: 'addFarm',
  state: {..._.cloneDeep(initState)},
  subscriptions: {
    setup({dispatch, listen}) {
    }
  },
  effects: {
    * getFarmer({payload, callback}, {call, put, select, callWithMessage, update, callWithSpinning}) {
      const {mobileOrUserId} = payload;
      const res = yield callWithSpinning(service.getFarmers, {mobileOrUserId})
      if (res) {
        let data = [];
        res.map((item, index) => {
          data.push({
            label: `${item.id} ${item.mobileRegion}+${item.mobile} ${item.authStateDesc}`,
            value: item.id,
          });
        })
        yield update({farmers: data})
      }else{
        message.info('没有查找到农场主！');
      }
    },
    * saveFarm({payload, callback}, {call, put, select, callWithMessage, update, callWithSpinning}) {
      yield callWithSpinning(service.saveFarm, payload);
      message.success('保存成功');
      router.push('/farmInfo');
    }
  },
  reducers: {
    updateFarms(state, action) {
      return {
        ...state,
        farmersInputValue: action.payload,
      };
    },
  }
})
