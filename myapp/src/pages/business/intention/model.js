import { message } from 'antd'
import { getList, setCompleteIntent, setCloseIntent } from './services'
import { Model } from 'utils'
import { base } from 'config'
import { tableFields } from './config/tableFields'
import { filters } from './config/filter'

const { initPage } = base

export default Model.extend({
  namespace: 'businessIntention',
  state: {
    list: [],
    queryCondition: filters,
    fields: tableFields, // 表头

    pagination: {
      current: 1,
      total: 0,
      pageSize: 10,
    },
    searchParams: {}, // 搜索条件
  },
  subscriptions: {
    setup({ dispatch, history, listen }) {
      listen('/business/intention', () => {
        dispatch({
          type: 'getList',
          payload: {
            ps: initPage.size,
            pn: initPage.number,
          },
        })
      })
    },
  },
  effects: {
    // 获取账号list
    *getList({ payload }, { update, select, call }) {
      const { pagination} = yield select(_ => _.businessIntention);
      const { pageSize, current } = pagination;
      const searchParams = {
        ps: pageSize, pn: current,
        ...payload,
      }

      const { datas, pn, tc } = yield call(getList, searchParams)
      yield update({
        list: datas,
        pagination: { ...pagination, current: pn, total: tc },
        searchParams,
      })
    },

    // 关闭订单
    *setCloseIntent({ payload }, { callWithConfirmLoading, put, select }) {
      const { searchParams } = yield select(_ => _.businessIntention);
      yield callWithConfirmLoading(setCloseIntent, payload)
      message.success('已关闭')
      yield put({
        type: 'getList',
        payload: searchParams,
      })
    },

    // 完成订单
    *setCompleteIntent({ payload }, { callWithConfirmLoading, put, select }) {
      const { searchParams } = yield select(_ => _.businessIntention);
      yield callWithConfirmLoading(setCompleteIntent, payload)
      message.success('已完成')
      yield put({
        type: 'getList',
        payload: searchParams,
      })
    },
  },
})
