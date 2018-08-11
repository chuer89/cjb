// 档案管理
export default {

  namespace: 'record',

  state: {
    columns: [{
      title: '工号',
      dataIndex: 'no',
      key: 'no',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '合作类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '信息预警',
      dataIndex: 'error',
      key: 'error',
    }, {
      title: '入职时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '操作',
      key: 'handle',
      render: (item) => {
        // console.log(item)
        return (
          <div>
            <span>编辑</span>
          </div>
        )
      }
    }],

    dataSource: [{
      key: '1',
      no: '2323',
      status: 1,
      type: 1,
      error: 1,
      time: '2018-09-11',
      name: '胡彦斌',
      phone: '156****9383'
    }, {
      key: '2',
      name: '胡彦祖',
      phone: '146****1323'
    }]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
