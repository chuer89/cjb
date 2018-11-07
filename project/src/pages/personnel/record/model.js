// 档案管理
import services from '@services/';
import _ from 'lodash';

export default {

  namespace: 'record',

  state: {
    dataBody: {}, // 内容
    pageSize: 20, // 
    firstPage: 1,

    // 状态筛选 1试用 2在职 3离职 4待离职
    statusData: [{
      value: '全部', code: ''
    }, {
      value: '试用', code: '1'
    }, {
      value: '在职', code: '2'
    }, {
      value: '离职', code: '3'
    }, {
      value: '待离职', code: '4'
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
      page: 1,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        dispatch({
          type: 'getUserList',
          payload: {
            page: 1,
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
      const { pageSize, searchParam } = yield select(_ => _.record);
      let param = {};
      
      _.extend(param, searchParam, payload, {
        length: pageSize,
      });

      let start = pageSize * ( param.page - 1 ) || 0;
      param.start = start;

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
