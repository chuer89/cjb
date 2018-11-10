import { message } from 'antd'
import { getDealList, setCloseDeal, setCompleteDeal } from './services'
import { Model } from 'utils'
import { base } from 'config'
import { tableFields } from './config/tableFields'
import { filters } from './config/filter'

const { initPage } = base

export default Model.extend({
  namespace: 'ordersDeal',
  state: {
    list: [],

    queryCondition: filters,

    fields: tableFields, // 表头
    pagination: {
      current: 1,
      total: 0,
      pageSize: 10,
    },
    searchParams: {},
  },
  subscriptions: {
    setup({ dispatch, history, listen }) {
      listen('/orders/deal', () => {
        dispatch({
          type: 'getDealList',
          payload: {
            ps: initPage.size,
            pn: initPage.number,
          },
        })
      })
    },
  },

  effects: {
    // 获取列表list
    *getDealList({ payload }, { update, select, call }) {
      const { pagination } = yield select(_ => _.ordersDeal);
      const { pageSize, current } = pagination;
      const searchParams = {
        ps: pageSize, pn: current,
        ...payload,
      }

      const { datas, pn, tc } = yield call(getDealList, searchParams)
      yield update({
        list: datas,
        pagination: { ...pagination, current: pn, total: tc },
        searchParams,
      })
    },

    // 关闭订单
    *setCloseDeal({ payload }, { callWithConfirmLoading, put, select }) {
      const { searchParams } = yield select(_ => _.ordersDeal);
      yield callWithConfirmLoading(setCloseDeal, payload)
      message.success('已关闭')
      yield put({
        type: 'getDealList',
        payload: searchParams,
      })
    },

    // 完成订单
    *setCompleteDeal({ payload }, { callWithConfirmLoading, put, select }) {
      const { searchParams } = yield select(_ => _.ordersDeal);
      yield callWithConfirmLoading(setCompleteDeal, payload)
      message.success('已完成')
      yield put({
        type: 'getDealList',
        payload: searchParams,
      })
    },
  },
})
