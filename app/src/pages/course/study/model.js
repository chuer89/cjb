// 档案管理
import services from '@services/';
import _ from 'lodash';
import { message } from 'antd';

export default {

  namespace: 'courseStudy',

  state: {
    searchParam: {},
    dataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/course/study') {
          dispatch({
            type: 'getList'
          })
        }
      })
    },
  },

  effects: {
    // 获取列表
    *getList({ payload }, { call, put, select }) {
      const { pageSize, searchParam } = yield select(_ => _.courseStudy);
      let param = {};

      _.extend(param, searchParam, payload, {
        // length: pageSize,
      });

      // let start = pageSize * (param.page - 1) || 0;
      // param.start = start;

      const temp = yield call(services.getClassByPosition, param);

      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            dataSource: data.data,
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
