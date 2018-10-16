import services from './../services/';
import _ from 'lodash';

export default {

  namespace: 'course',

  state: {
    listData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/course/config') {
          dispatch({
            type: 'getTrainLibraryAllClass',
          });
        }
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 获取资料
    *getTrainLibraryAllClass({ payload }, { call, put }) {
      const temp = yield call(services.getTrainLibraryAllClass, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            listData: data.data,
          }
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
