import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'separationRate',

  state: {
    chartDepartureReason: [], // 原因
    chartDepartureAge: [], // 年龄
    chartDepartureEducation: [], // 学历
    chartDepartureWork: [], // 工作年限
    chartDepartureTime: [], // 时间纬度
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/personnel/separation') {
          dispatch({
            type: 'chartDepartureReason',
          });

          dispatch({
            type: 'chartDepartureAge',
          });

          dispatch({
            type: 'chartDepartureEducation',
          });

          dispatch({
            type: 'chartDepartureWork',
          });

          dispatch({
            type: 'chartDepartureTime',
          });
        }
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 离职 - 原因
    *chartDepartureReason({ payload }, { call, put, select }) {
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

    // 离职 - 年龄分析
    *chartDepartureAge({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartDepartureAge, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartDepartureAge: data.data
          }
        });
      }
    },

    // 离职 - 学历分析
    *chartDepartureEducation({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartDepartureEducation, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartDepartureEducation: data.data
          }
        });
      }
    },

    // 离职 - 工作年限分析
    *chartDepartureWork({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartDepartureWork, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartDepartureWork: data.data
          }
        });
      }
    },

    // 离职 - 按时间纬度分析
    *chartDepartureTime({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartDepartureTime, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartDepartureTime: data.data
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
