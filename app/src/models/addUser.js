import services from './../services/';

export default {

  namespace: 'addUser',

  state: {
    addUserParam: {}, // 添加员工参数
    activeTabsKey: '1', // 选中面板
    basicDisabled: true, // 基本信息
    experienceDisabled: true, // 工作经验
    portrayalDisabled: true,  // 员工画像
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        // dispatch({
        //   type: 'getPosition',
        //   payload: {}
        // })
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *getPosition({ payload }, { call, put }) {
      let temp = yield call(services.getPosition, payload);
    },

    // 添加员工
    *addUser({ payload }, { call, put }) {
      let temp = yield call(services.addUser, payload);
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
