import services from './../services/';
// import { message } from 'antd';

export default {

  namespace: 'structure',

  state: {
    storeStructure: [], // 门店组织结构
    sectionStructure: [], // 部门组织架构
    positionStructure: [], // 职位
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        // if (pathname === '/deploy/section') { // 部门架构
        //   dispatch({
        //     type: 'getUserOrganizations',
        //   });
        // } else if (pathname === '/deploy/store' || pathname === '/initstructure') { // 门店架构
        //   dispatch({
        //     type: 'getOrganizations',
        //   });
        // }

        dispatch({
          type: 'getUserOrganizations',
        });

        dispatch({
          type: 'getOrganizations',
        });

        if (pathname === '/deploy/position') {
          dispatch({
            type: 'getPosition',
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
    },

    // 获取门店职位
    *getPosition({ payload }, { call, put }) {
      let temp = yield call(services.getPosition, payload);

      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            positionStructure: data.data,
          }
        })
      }
    },

    // 添加门店
    *addPosition({ payload }, { call, put }) {
      let temp = yield call(services.addPosition, payload);
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
