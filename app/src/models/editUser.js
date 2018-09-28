import services from './../services/';
import _ from 'lodash';

export default {

  namespace: 'editUser',

  state: {
    userParam: {}, // 添加员工参数

    activeTabsKey: '1', // 选中面板
    basicDisabled: true, // 基本信息
    experienceDisabled: true, // 工作经验
    portrayalDisabled: true,  // 员工画像

    uid: '', // 操作当前的uid
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        let _pathname = pathname.split('/');
        let pathnameLen = _pathname.length;
        let uid = _pathname[pathnameLen - 1];

        dispatch({
          type: 'save',
          payload: {
            uid,
          }
        })
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 添加员工
    *addUser({ payload }, { call, put }) {
      let temp = yield call(services.addUser, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            uid: data.data.id,
          }
        })
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
