import services from './../services/';
import { message } from 'antd';

export default {

  namespace: 'structure',

  state: {
    storeStructure: [], // 门店组织结构
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        dispatch({
          type: 'getOrganizations',
        });
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *getOrganizations({ payload }, { call, put }) {
      const temp = yield call(services.getOrganizations, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            storeStructure: data.data,
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
