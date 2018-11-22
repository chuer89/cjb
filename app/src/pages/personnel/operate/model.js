import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'operatingRecord',

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
        // dispatch({
        //   type: 'getTwoDepartmentBySid',
        //   payload: {
        //     sid: 51,
        //   }
        // });
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
