import { Model } from 'utils'
import { base } from 'config'
import { getInternalAccount, resetPassword, apiFrozenIn, apiUnfrozenIn, apiIds } from './services/'
import { filters } from './config/filter'
import { tableFields } from './config/tableFields'

const { initPage } = base

export default Model.extend({
  namespace: 'internalAccount',

  state: {
    list: [],
    queryCondition: filters,

    fields: tableFields, // 表头
    pagination: {
      current: 1,
      total: 0,
      pageSize: 10,
    }
  },

  subscriptions: {
    setup({ dispatch, listen }) {  // eslint-disable-line
      listen('/users/internal', () => {
        // 查询账号类型， 账号状态
        dispatch({ type: 'getIds'})
        dispatch({
          type: 'getInternalAccount', payload: {
            ps: initPage.pageSize,
            pn: initPage.number,
          }
        })
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 获取账号list
    * getInternalAccount({ payload }, { select, update, call }) {
      const { pagination } = yield select(_ => _.internalAccount);
      const { pageSize, current } = pagination;
      const searchParams = {
        ps: pageSize, pn: current,
        ...payload,
      }

      const { datas, pn, tc } = yield call(getInternalAccount, searchParams);
      yield update({
        list: datas,
        pagination: { ...pagination, current: pn, total: tc }
      });
    },

    // 重置密码
    * resetPassword({ payload }, { callWithMessage }) {
      yield callWithMessage(resetPassword, payload, {
        successMsg: '重置密码成功，请至邮箱查看！'
      })
    },

    // 冻结账号
    * frozen({ payload, callback }, { call, update, select, callWithMessage }) {
      yield callWithMessage(apiFrozenIn, payload, {
        successMsg: '冻结成功'
      })

      // 关闭弹窗
      yield call(callback)
      // 更新表格
      const { accountId, reason } = payload
      const { list } = yield select(_ => _.internalAccount)
      const { user: { realName } } = yield select(_ => _.app)
      list.forEach((item) => {
        if (item.accountId === accountId) {
          item.creatorId = realName
          item.statusDesc = '已冻结'
          item.reason = reason
        }
      })
      yield update({
        list,
      })
    },

    // 解冻
    * unfrozen({ payload }, { update, select, callWithMessage }) {
      yield callWithMessage(apiUnfrozenIn, payload, {
        successMsg: '解冻成功',
      })

      const { accountId } = payload
      const { list } = yield select(_ => _.internalAccount)
      list.forEach((item) => {
        if (item.accountId === accountId) {
          item.statusDesc = '正常'
          item.key = Date.parse(new Date())
        }
      })
      yield update({
        list,
      })
    },
    * getIds (active, {call, select,update}) {
      const data = yield call(apiIds)

      // 转换成select所需要的格式
      const accountType = data.map(_ => ({label: _.roleName, value: _.roleId}))
      // 更新queryCondition
      const {queryCondition} = yield select(_ => _.internalAccount)
      queryCondition.forEach(_=> {
        if(_.label === '账户类型'){
          _.selectCondition = accountType
        }
      })
      yield update({
        queryCondition,
      })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
});
