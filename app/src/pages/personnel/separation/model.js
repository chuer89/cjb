import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'separationRate',

  state: {
    chartDepartureReason: [],
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

    *chartDepartureReason({ payload }, { call, put }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartDepartureReason, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartDepartureReason: data.data
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
