// 档案管理
import services from '@services/';
import _ from 'lodash';
import { message } from 'antd';

export default {

  namespace: 'record',

  state: {
    dataBody: {}, // 内容
    pageSize: 20, // 
    firstPage: 1,

    defaultActiveStatusKey: '', // 被选中的tab

    loadingList: true, // 加载列表

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

    selectedRowUserId: '', // 选中的列
    visibleBatch: false,
    visibleJobStatus: false,

    workUserinfo: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        let defaultStatus = _.get(history, 'location.query.status');
        let status = defaultStatus || '';
        // let status = _.get(history, 'location.query.status');
        // let type = _.get(history, 'location.query.type');
        if (pathname === '/personnel/record') {
          dispatch({
            type: 'save',
            payload: {
              searchParam: {
                page: 1,
                status,
              },
              defaultActiveStatusKey: status,
            }
          })

          dispatch({
            type: 'getUserList',
            payload: {
              page: 1,
              status,
            }
          })

          dispatch({ type: 'fetchWorkUserinfo' })

          dispatch({
            type: 'save',
            payload: {
              selectedRowUserId: '', // 选中的列
              visibleBatch: false,
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

    // 获取职位状态数量
    *fetchWorkUserinfo({ payload }, { call, put }) {
      let temp = yield call(services.workUserinfo, payload);
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

    // 获取列表
    *getUserList({ payload }, { call, put, select }) {
      const { dept } = yield select(_ => _.user);
      const { pageSize, searchParam } = yield select(_ => _.record);

      yield put({
        type: 'save',
        payload: {
          loadingList: true,
        }
      })
      
      let param = {};
      // let status = searchParam.status || [];

      _.extend(param, searchParam, payload, {
        length: pageSize,
        dept,
        // status: status.join(',')
      });

      let start = pageSize * (param.page - 1) || 0;
      param.start = start;

      const temp = yield call(services.getUserList, param);

      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            dataBody: data.data,
            loadingList: false,
          }
        })
      } else {
        yield put({
          type: 'save',
          payload: {
            loadingList: true,
          }
        })
      }
    },

    // 批量修改
    *updateAll({ payload, successBack }, { call, put }) {
      const temp = yield call(services.updateAll, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        message.success('修改成功');

        yield put({
          type: 'save',
          payload: {
            visibleBatch: false,
            visibleJobStatus: false,
          }
        });

        yield put({
          type: 'getUserList',
        })
        
        _.isFunction(successBack) && successBack();
      } else {
        message.error(data.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
