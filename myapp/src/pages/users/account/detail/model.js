import { Model } from 'utils'
import { message } from 'antd'
import { getUsersDetail } from './../services'

export default Model.extend({
  namespace: 'detailUsersAccount',
  state: {
    detailData: {},
  },
  subscriptions: {
    setup({ dispatch, listen }) {
      listen('/users/account/detail/:id', ({ params = [] }) => {
        const userId = params[0];
        dispatch({ type: 'getDetail', payload: { userId } })
      })
    },
  },
  effects: {
    // 详情
    *getDetail({ payload }, { update, call }) {
      const detailData = yield call(getUsersDetail, payload)
      yield update({
        detailData,
      })
    }
  },
  reducers: {

  },
})
