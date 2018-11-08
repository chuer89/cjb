import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'dashboard',

  state: {
    chartAge: {},
    chartEducation: {},
    chartGender: {},
    chartApplyChannel: {},
    chartResignation: {},
    chartJobType: {},
    chartOnJobProportion: {},
    chartUserTurnover: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/personnel/dashboard') {
          dispatch({
            type: 'chartAge'
          });

          dispatch({
            type: 'chartEducation'
          });

          dispatch({
            type: 'chartGender'
          });

          dispatch({
            type: 'chartApplyChannel'
          });

          dispatch({
            type: 'chartResignation'
          });

          dispatch({
            type: 'chartJobType',
          });

          dispatch({
            type: 'chartOnJobProportion',
          });

          dispatch({
            type: 'chartUserTurnover',
          });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 获取年龄分布
    *chartAge({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartAge, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartAge: data.data
          }
        });
      }
    },

    // 学历分布
    *chartEducation({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartEducation, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartEducation: data.data
          }
        });
      }
    },

    // 性别分布
    *chartGender({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartGender, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartGender: data.data
          }
        });
      }
    },

    // 招聘渠道
    *chartApplyChannel({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartApplyChannel, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartApplyChannel: data.data
          }
        });
      }
    },

    // 离职率
    *chartResignation({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartResignation, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartResignation: data.data
          }
        });
      }
    },

    // 兼职全职分布
    *chartJobType({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartJobType, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartJobType: data.data
          }
        });
      }
    },

    // 满编率
    *chartOnJobProportion({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartOnJobProportion, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartOnJobProportion: data.data
          }
        });
      }
    },

    // 员工流动
    *chartUserTurnover({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.chartUserTurnover, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            chartUserTurnover: data.data
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
