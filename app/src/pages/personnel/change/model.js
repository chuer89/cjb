import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'personnelChange',

  state: {
    searchParam: {
      page: 1,
    },
    dataBody: {}, // 内容
    pageSize: 20, // 
    firstPage: 1,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/personnel/operate') {
          // dispatch({
          //   type: 'getList',
          //   payload: {
          //     page: 1,
          //   }
          // })
        }
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *getList({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      const { pageSize, searchParam } = yield select(_ => _.operatingRecord);

      let param = {};

      _.extend(param, searchParam, payload, {
        length: pageSize,
        dept,
      });

      let start = pageSize * (param.page - 1) || 0;
      param.start = start;

      const temp = yield call(services.getUserOperationLogList, param);

      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            dataBody: data.data,
          }
        })
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
