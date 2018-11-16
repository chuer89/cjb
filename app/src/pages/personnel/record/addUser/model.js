import services from '@services/';
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
    positionData: [], // 当前门店岗位
    twoDepartmentData: [], // 二级部门
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        // dispatch({
        //   type: 'getTwoDepartmentBySid',
        //   payload: {
        //     sid: 51,
        //   }
        // });
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 获取当前岗位
    *getPosition({ payload }, { call, put }) {
      let temp = yield call(services.getPosition, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        let positionData = data.data;
        positionData.push({
          name: '其他', id: ''
        });
        yield put({
          type: 'save',
          payload: {
            positionData,
          }
        });
      }
    },

    // 获取二级部门
    *getTwoDepartmentBySid({ payload }, { call, put }) {
      let temp = yield call(services.getTwoDepartmentBySid, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        let twoDepartmentData = data.data;
        twoDepartmentData.push({
          name: '自定义', code: '-1'
        });
        yield put({
          type: 'save',
          payload: {
            twoDepartmentData,
          }
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
