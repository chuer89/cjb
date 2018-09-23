import services from './../services/';
// import { message } from 'antd';

export default {

  namespace: 'structure',

  state: {
    storeStructure: [], // 门店组织结构
    sectionStructure: [], // 部门组织架构
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/deploy/section') { // 部门架构
          dispatch({
            type: 'getUserOrganizations',
          });

          dispatch({
            type: 'getEnterpriseOrgInfoList',
            payload: {
              parent_id: -1,
              length: 20,
              start: 1,
            }
          })
        } else if (pathname === '/deploy/store' || pathname === '/initstructure') { // 门店架构
          dispatch({
            type: 'getOrganizations',
          });
        }
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
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

    *getEnterpriseOrgInfoList({ payload }, { call, put }) {
      const temp = yield call(services.getEnterpriseOrgInfoList, payload);
    },

    // 获取目前行政部门架构
    *getUserOrganizations({ payload }, { call, put }) {
      const temp = yield call(services.getUserOrganizations, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            sectionStructure: data.data,
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
