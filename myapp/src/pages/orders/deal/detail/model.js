import { Model } from 'utils'
import { getDetailDeal } from './../services'

export default Model.extend({
  namespace: 'detailDealOrders',
  state: {
    detailData: {},
  },
  subscriptions: {
    setup({ dispatch, listen }) {
      listen('/orders/deal/detail/:id', ({ params = [] }) => {
        const orderId = params[0];
        dispatch({ type: 'getDetail', payload: { orderId } })
      })
    },
  },
  effects: {
    // 详情
    *getDetail({ payload }, { update, call }) {
      const detailData = yield call(getDetailDeal, payload)
      yield update({
        detailData,
      })
    }
  },
  reducers: {

  },
})
