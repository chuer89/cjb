import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'work',

  state: {
    workUserinfo: {},
    workusercare: [],
    todoList: [],

    dataBody: {}, // 内容
    pageSize: 5, // 
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

          dispatch({
            type: 'getRemindIncomplete',
            payload: {
              page: 1,
            }
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
    },


    // 员工信息待完善
    *getRemindIncomplete({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      const { pageSize } = yield select(_ => _.work);

      let param = {};

      _.extend(param, payload, {
        length: pageSize,
        dept,
      });

      let start = pageSize * (param.page - 1) || 0;
      param.start = start;

      const temp = yield call(services.remindIncomplete, param);

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
