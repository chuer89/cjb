import { Model } from 'utils'
import { message } from 'antd'
import _ from 'lodash'
import {
  getCityList,
} from 'services/base'

export default Model.extend({
  namespace: 'base',
  state: {
    cityList: JSON.parse(localStorage.getItem('cityList') || '[]'), // 国家列表
  },
  subscriptions: {
    setup({ dispatch, listen }) {
      dispatch({
        type: 'getCityList'
      })
    },
  },
  effects: {
    // 获取国家
    *getCityList({ payload }, { update, call, select }) {
      const { cityList } = yield select(_ => _.base)

      if (!_.isEmpty(cityList)) {
        return false
      }

      const content = yield call(getCityList, payload)
      
      localStorage.setItem('cityList', JSON.stringify(content));
      yield update({
        cityList: content,
      })
    }
  },
  reducers: {

  },
})
