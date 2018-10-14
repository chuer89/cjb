
export default {

  namespace: 'app',

  state: {
    pathname: '/', // 路由
    moduleName: '', // 模块类型
    defaultImg: require('../assets/img_default.png'), // 默认图片
    defaultHead: require('../assets/head.png'), // 默认头像
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        let moduleName = '';
        if (pathname.indexOf('/deploy/') >= 0) { // 后台配置
          moduleName = 'service-config';
        } else if (pathname.indexOf('/personnel/') >= 0) { // 人事管理
          moduleName = 'user-console';
        } else if (pathname.indexOf('/course/') >= 0) { // 培训资料
          moduleName = 'train';
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
