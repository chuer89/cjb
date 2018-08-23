
export default {

  namespace: 'addUser',

  state: {
    activeTabsKey: '1', // 选中面板
    basicDisabled: true, // 基本信息
    experienceDisabled: true, // 工作经验
    portrayalDisabled: true,  // 员工画像
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
