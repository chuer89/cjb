import { Message } from 'antd'
import { apiUserList, apiFrozenUser, apiUnfrozenUser } from './services'
import { Model } from 'utils'
import { base } from 'config'
import { filters } from './config/filter'
import { tableFields } from './config/tableFields'

const { initPage } = base

export default Model.extend({
  namespace: 'userAccount',
  state: {
    list: [],
    listTotal: 0,

    queryCondition: filters,

    fields: tableFields, // 表头
    pagination: {
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },
  subscriptions: {
    setup({ dispatch, history, listen }) {
      listen('/users/account', () => {
        dispatch({
          type: 'getAccountList',
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
    *getAccountList({ payload }, { update, call, select }) {
      const { pagination } = yield select(_ => _.userAccount)
      const { pageSize, current } = pagination
      const searchParams = {
        ps: pageSize, pn: current,
        ...payload,
      }

      const { datas, pn, tc } = yield call(apiUserList, searchParams)
      yield update({
        list: datas,
        pagination: { ...pagination, current: pn, total: tc }
      })
    },

    // 冻结账号
    *frozenUser({ payload, callback }, { call, select, callWithMessage, update }) {
      yield callWithMessage(apiFrozenUser, payload, {
        successMsg: '冻结成功',
      })

      yield call(callback)

      // 更新表格
      const { userId, reason } = payload
      const { list } = yield select(_ => _.userAccount)
      const { user: { realName } } = yield select(_ => _.app)
      list.forEach((item) => {
        if (item.userId === userId) {
          item.creatorId = realName
          item.statusDesc = '已冻结'
          item.reason = reason
        }
      })

      yield update({
        list,
      })
    },

    // 解冻账号
    *unFrozenUser({ payload }, { update, select, callWithMessage }) {
      yield callWithMessage(apiUnfrozenUser, payload, {
        successMsg: '解冻成功'
      })

      const { userId } = payload
      const { list } = yield select(_ => _.userAccount)
      list.forEach((item) => {
        if (item.userId === userId) {
          item.statusDesc = '正常'
          item.key = Date.parse(new Date())
        }
      })

      yield update({
        list,
      })
    },
  },
})
