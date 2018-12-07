import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'personnelChange',

  state: {
    pageSize: 10, // 
    firstPage: 1,

    // 岗位记录
    positionSearch: {
      start: 0,
    },
    postionBody: {},

    // 部门记录
    deptSearch: {
      start: 0,
    },
    deptBody: {},

    // 职级
    userTypeSearch: {
      start: 0,
    },
    userTypeBody: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/personnel/change') {
          dispatch({
            type: 'save',
            payload: {
              postionBody: {},
              deptBody: {},
            }
          })

          dispatch({
            type: 'getPostion',
          })
        }
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *getList({ payload }, { call, put, select }) {
      const { pageSize, searchParam } = yield select(_ => _.operatingRecord);

      let param = {};

      _.extend(param, searchParam, payload, {
        length: pageSize,
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
    },

    // 获取岗位调整记录
    *getPostion({ payload }, { call, put, select }) {
      const { pageSize, positionSearch } = yield select(_ => _.personnelChange);

      let param = {};

      _.extend(param, positionSearch, payload, {
        length: pageSize,
      });

      let start = pageSize * (param.page - 1) || 0;
      param.start = start;

      const temp = yield call(services.getPositionChangeList, param);

      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            postionBody: data.data,
            positionSearch: param,
          }
        })
      }
    },

    // 获取变更部门
    *getDept({ payload }, { call, put, select }) {
      const { pageSize, deptSearch } = yield select(_ => _.personnelChange);

      let param = {};

      _.extend(param, deptSearch, payload, {
        length: pageSize,
      });

      let start = pageSize * (param.page - 1) || 0;
      param.start = start;

      const temp = yield call(services.getDeptChangeList, param);

      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            deptBody: data.data,
            deptSearch: param,
          }
        })
      }
    },

    // 获取变更职级
    *getUserType({ payload }, { call, put, select }) {
      const { pageSize, userTypeSearch } = yield select(_ => _.personnelChange);

      let param = {};

      _.extend(param, userTypeSearch, payload, {
        length: pageSize,
      });

      let start = pageSize * (param.page - 1) || 0;
      param.start = start;

      const temp = yield call(services.getUserTypeChangeList, param);

      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            userTypeBody: data.data,
            userTypeSearch: param,
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
