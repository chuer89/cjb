import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'separationRate',

  state: {
    
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
