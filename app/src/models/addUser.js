import services from './../services/';
import _ from 'lodash';

export default {

  namespace: 'addUser',

  state: {
    addUserParam: {}, // 添加员工参数
    activeTabsKey: '0', // 选中面板
    personalDisabled: true, // 个人信息
    basicDisabled: true, // 基本信息
    experienceDisabled: true, // 工作经验
    portrayalDisabled: true,  // 员工画像

    storeStructure: [], // 门店架构
    userOrganizations: [], // 行政部门组织架构
    departmentType: '1', // 部门类型 1门店 2行政

    uid: '', // 操作当前的uid
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        // 获取门店
        dispatch({
          type: 'getOrganizations',
        });
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

    // 获取目前行政部门架构
    *getUserOrganizations({ payload }, { call, put, select }) {
      const { userOrganizations } = yield select(_ => _.addUser);
      if (_.isEmpty(userOrganizations)) {
        const temp = yield call(services.getUserOrganizations, payload);
        let { data } = temp;
        if (data.msg === 'success') {
          yield put({
            type: 'save',
            payload: {
              userOrganizations: data.data,
            }
          })
        }
      }
    },

    // 获取门店
    *getOrganizations({ payload }, { call, put }) {
      const temp = yield call(services.getOrganizations, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            storeStructure: data.data,
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
