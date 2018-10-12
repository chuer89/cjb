import services from './../services/';
import { message } from 'antd';
import common from './../common';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'user',

  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'), // 个人详情
    menus: JSON.parse(localStorage.getItem('menus') || '{}'), // 菜单权限
    dept: localStorage.getItem('dept') || '', // 部门信息
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
			history.listen(({ pathname }) => {
        if (pathname === '/login') {
          common.clearLocalStorage();
        }
      });
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *register({ payload }, { call, put }) {
      let temp = yield call(services.register, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        message.success('注册成功，请登录');
        yield put(routerRedux.push({
          pathname: '/login'
        }));
      } else {
        message.error(data.msg);
      }
    },

    *login({ payload }, { call, put }) {
      let userInfo = {};
      const temp = yield call(services.login, payload);
      const { data } = temp;
      if (data.msg === 'success') {
        userInfo = data.data;

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // 获取是否初始化企业架构
        const initOrgAjax = yield call(services.getOrgInit, {});
        const initOrgData = initOrgAjax.data;
        let pathname = '/personnel/index';
        if (initOrgData.msg === 'success') {
          if (initOrgData.data.store) {
            pathname = '/initstructure';
          }
        }

        // 获取菜单
        const menusAjax = yield call(services.menus, payload);
        const menusData = menusAjax.data;
        if (menusData.msg === 'success') {
          localStorage.setItem('menus', JSON.stringify(menusData.data));
          yield put({
            type: 'save',
            payload: {
              menus: menusData.data,
              userInfo,
              dept: '',
            }
          });

          yield put(routerRedux.push({
            pathname,
          }));
        }
      } else {
        message.error(data.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
