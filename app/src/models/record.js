// 档案管理
import services from './../services/';
import _ from 'lodash';

export default {

  namespace: 'record',

  state: {
    dataBody: {}, // 内容
    indentSize: 20, // 

    columns: [{
      title: '工号',
      dataIndex: 'no',
    }, {
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '合作类型',
      dataIndex: 'contractType',
    }, {
      title: '信息预警',
      dataIndex: 'warning',
    }, {
      title: '入职时间',
      dataIndex: 'joinTime',
      render: (item) => {
        console.log(item, 'time')
        return (
          <div>1</div>
        )
      }
    }, {
      title: '联系方式',
      dataIndex: 'phone',
    }, {
      title: '操作',
      key: 'handle',
      align: 'center',
      render: () => {},
    }],
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
      const { indentSize } = yield select(_ => _.record);
      _.extend(payload, {
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
