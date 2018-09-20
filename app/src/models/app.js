
export default {

  namespace: 'app',

  state: {
    pathname: '/', // 路由
    moduleName: '', // 模块类型
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        let moduleName = '';
        if (pathname.indexOf('/deploy/') >= 0) { // 后台配置
          moduleName = '3';
        } else if (pathname.indexOf('/personnel/') >= 0) { // 人事管理
          moduleName = '1';
        } else if (pathname.indexOf('/cultivate/') >= 0) { // 培训资料
          moduleName = '2';
        }

        dispatch({
          type: 'save',
          payload: {
            pathname,
            moduleName,
          }
        });
      })
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
