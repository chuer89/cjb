// 档案管理
import services from './../services/';
import _ from 'lodash';

export default {

  namespace: 'record',

  state: {
    dataBody: {}, // 内容
    indentSize: 20, // 

    // 状态筛选
    statusData: [{
      value: '全部', code: '-1'
    }, {
      value: '离职', code: '1'
    }, {
      value: '在职', code: '2'
    }, {
      value: '待离职', code: '3'
    }],

    // 合同类型
    contractType: [{
      value: '全部', code: '-1'
    }, {
      value: '固定期限', code: '1'
    }, {
      value: '无固定期限', code: '2'
    }, {
      value: '试用', code: '3'
    }],

    searchParam: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        dispatch({
          type: 'getUserList',
          payload: {
            start: 1,
          }
        })
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 获取列表
    *getUserList({ payload }, { call, put, select }) {
      const { indentSize, searchParam } = yield select(_ => _.record);
      _.extend(payload, searchParam, {
        length: indentSize,
      });
      const temp = yield call(services.getUserList, payload);
      
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
