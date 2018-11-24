import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'userStaffing',

  state: {
    list: [],
    
    // 搜索条件
    searchParam: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/deploy/user_staffing') {
          dispatch({
            type: 'getList'
          })
        }
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 获取列表
    *getList({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      const { searchParam } = yield select(_ => _.userStaffing);

      let param = {};
      _.extend(param, searchParam, payload, {
        dept,
      });

      const temp = yield call(services.getUserStaffing, param);

      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            list: data.data,
          }
        })
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
