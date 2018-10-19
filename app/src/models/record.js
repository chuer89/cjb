// 档案管理
import services from './../services/';
import _ from 'lodash';

export default {

  namespace: 'record',

  state: {
    dataBody: {}, // 内容
    indentSize: 5, // 

    // 状态筛选
    statusData: [{
      value: '全部', code: ''
    }, {
      value: '离职', code: '1'
    }, {
      value: '在职', code: '2'
    }, {
      value: '待离职', code: '3'
    }],

    // 合同类型
    contractType: [{
      value: '全部', code: ''
    }, {
      value: '固定期限', code: '1'
    }, {
      value: '无固定期限', code: '2'
    }, {
      value: '试用', code: '3'
    }],

    // 信息预警
    warningData: [{
      value: '全部', code: ''
    }, {
      value: '身份证', code: '1'
    }, {
      value: '健康证', code: '2'
    }, {
      value: '劳动合同', code: '3'
    }],

    // 搜索条件
    searchParam: {
      start: 1,
    },
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
      let param = {};
      _.extend(param, searchParam, payload, {
        length: indentSize,
      });
      const temp = yield call(services.getUserList, param);
      
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
