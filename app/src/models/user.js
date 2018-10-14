import services from './../services/';
import { message } from 'antd';
import common from './../common';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'user',

  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'), // 个人详情
    menus: JSON.parse(localStorage.getItem('menus') || '{}'), // 菜单权限
    myMenus: JSON.parse(localStorage.getItem('myMenus') || '[]'),
    dept: localStorage.getItem('dept') || '', // 部门信息
    errorPath: '/404',

    // 菜单的自定义字段
    menusOwnData: {
      // 人事管理
      'console': {
        icon: 'desktop', path: '/personnel/index'
      },
      'summary': {
        icon: 'pie-chart', path: '/personnel/dashboard',
      },
      'user': {
        icon: 'copy', path: '/personnel/record',
      },

      // 后台管理
      'store-config': {
        icon: 'hdd', path: '/deploy/store'
      },
      'dept-config': {
        icon: 'team', path: '/deploy/section'
      },

      // 培训管理
      'class-config': { // 课程管理
        icon: '&#xe60c;', isFont: true, path: '/course/config'
      }, 
      'class-summary': { // 课程概况
        icon: '&#xe62c;', isFont: true, path: '/course/summary'
      },
    },
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

    *login({ payload }, { call, put, select }) {
      const { menusOwnData, errorPath } = yield select(_ => _.user);
      let userInfo = {};
      const temp = yield call(services.login, payload);
      const { data } = temp;
      if (data.msg === 'success') {
        userInfo = data.data;
        let { userType } = userInfo;

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // 获取菜单
        const menusAjax = yield call(services.menus, {});
        const menusData = menusAjax.data;
        if (menusData.msg === 'success') {

          // 是否有菜单
          if (_.isEmpty(menusData.data)) {
            message.warning('无权限访问系统。');
          } else {
            let pathname = '';
            
            // 企业账号
            if (userType === 0) {
              // 获取是否初始化企业架构
              const initOrgAjax = yield call(services.getOrgInit, {});
              const initOrgData = initOrgAjax.data;
              if (initOrgData.msg === 'success') {
                if (initOrgData.data.store) {
                  pathname = '/initstructure';
                }
              }
            }

            let myMenus = [];
            _.forEach(menusData.data, (item, index) => {
              let children = [];
              if (!_.isEmpty(item.tree)) {
                let defaultItem = item.tree[0];
                let menusNavItem = menusOwnData[defaultItem.code] || {};

                if (index === 0 && !pathname) {
                  pathname = menusNavItem.path;
                }

                _.forEach(item.tree, (tItem) => {
                  let menusItem = menusOwnData[tItem.code] || {};
                  children.push({
                    key: tItem.code,
                    name: tItem.name,
                    icon: menusItem.icon,
                    path: menusItem.path || errorPath,
                    isFont: menusItem.isFont || false,
                  });
                });

                myMenus.push({
                  key: item.code,
                  name: item.name,
                  path: menusNavItem.path || errorPath,
                  children,
                });
              }
            });

            yield put({
              type: 'save',
              payload: {
                menus: menusData.data,
                myMenus,
                userInfo,
                dept: '',
              }
            });

            localStorage.setItem('menus', JSON.stringify(menusData.data));
            localStorage.setItem('myMenus', JSON.stringify(myMenus));

            yield put(routerRedux.push({
              pathname,
            }));
          }
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
