import { routerRedux } from 'dva/router'
import { app } from 'services'
// import * as _localStorage from '../../utils/_localStorage'
import { localStorage } from 'utils';
export default {
  namespace: 'login',
  state: {},
  effects: {
    login:[
      function*({
        payload,
      }, { put, call, select}) {
        const data = yield call(app.login, payload)
        console.log(data);
        // const { locationQuery} = yield select(_ => _.app)
        // 设置localstorage 保存登陆信息
        localStorage.set({
          ...data,
          admin_isLogin: true,
        })

        const from = JSON.parse(localStorage.get('admin_locationPathname'));
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/users/internal/'))
        }
      },
      'takeLatest',
    ],
  },

}
