import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'work',

  state: {
    workUserinfo: {},
    workusercare: [],
    todoList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/personnel/workbench') {
          dispatch({
            type: 'workUserinfo',
          });

          dispatch({
            type: 'workusercare',
          });

          dispatch({
            type: 'todoList'
          })
        }
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 工作记录
    *workUserinfo({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.workUserinfo, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            workUserinfo: data.data,
          }
        })
      }
    },

    // 员工关怀
    *workusercare({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.workusercare, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            workusercare: data.data,
          }
        });
      }
    },

    // 代办事项
    *todoList({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      let param = {};
      _.extend(param, payload, {
        dept,
      });
      let temp = yield call(services.todoList, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            todoList: data.data,
          }
        });
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
