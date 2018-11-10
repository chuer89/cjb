/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import router from 'umi/router'
import {
  parse,
} from 'qs'
import * as config from 'config'
import app from 'services/app'
// import * as menusService from 'services/menus'
import queryString from 'query-string'
import * as _localStorage from '../utils/_localStorage'
import { treeToArray } from 'utils'
const {
  Menus, base,
} = config

const { prefix } = base;

export default {
  namespace: 'app',
  state: {
    user: {},
    isLogin: false, // 是否登陆
    permissions: { // 用户权限
      visit: [],
    },
    menu: Menus,
    initMenu: Menus,
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem( `${prefix}siderFold` ) === 'true',
    darkTheme: true,
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse( window.localStorage.getItem( `${prefix}navOpenKeys` ) ) || [],
    locationPathname: '',
    locationQuery: {},
    is404: false,
  },
  subscriptions: {
    setupHistory ( {
      dispatch,
      history,
    } ) {
      // 监听路由变化，保存历史访问页面，用来在登陆后回到之前的打开的页面
      history.listen( ( location ) => {
        const pathname = location.pathname
        const query = location.query
        // 多个页面同时打开，其中一个页面退出操作。
        if(pathname !== '/login') {
          // todo 打开登陆校验
          dispatch({
            type: 'queryLogin',
          })
        }

        // 403 判断
        dispatch({
          type: 'checkIs404',
        })

        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: pathname,
            locationQuery: query,
          },
        })
      })

    },

    // 页面首次载入时调用
    setup ( {
      dispatch,
    } ) {
      let tid
      window.onresize = () => {
        clearTimeout( tid )
        tid = setTimeout( () => {
          dispatch( {
            type: 'changeNavbar',
          } )
        }, 300 )
      }
    },

  },
  effects: {
    // 查询用户权限，
    * queryPermissions ( {
      payload,
    }, {
      call,
      put,
      select,
    } ) {
      const content = yield call(app.permissions, payload)
      // 权限查询成功
        // const {
        //   list,
        // } = yield call( menusService.query )
        const {
          realName,
          roles,
        } = content
        // 匹配菜单
        let {initMenu, permissions,locationPathname} = yield select( _=> _.app )

        let formatRoles = treeToArray(roles)

        // 有权访问的地方
        const visit = formatRoles.map(item => item.id)

        // 匹配菜单的roleId 返回新的菜单
        let menu = initMenu.filter(item => visit.includes(item.roleId) )
        permissions.visit = menu.map(item => item.id)

        yield put( {
          type: 'updateState',
          payload: {
            user: {realName},
            permissions,
            menu,
          },
        } )
        if ( location.pathname === '/login' || !locationPathname || locationPathname === '/') {
          router.push( {
            pathname: '/users/internal',
          } )
        }
    },
    // 查询登陆状态
    * queryLogin ( active, {put,select} ) {
      // 读取当地的localstorage的登陆信息
      const {
        locationPathname,
        permissions: {
          visit,
        },
      } = yield select( _ => _.app )
      const isLogin = _localStorage.get( 'admin_isLogin' )
      yield put( {
        type: 'updateState',
        payload: {
          isLogin: isLogin || false,
        },
      } )
      // 如果没有登陆 去登陆页面
      if ( !isLogin ) {
        if(locationPathname && locationPathname !== '/login') {
          _localStorage.set({ 'admin_locationPathname': JSON.stringify(locationPathname) })
        }
        router.push( {
          pathname: '/login',
          // search: queryString.stringify( {
          //   from: locationPathname,
          // } ),
        } )
      } else if(!visit.length){ // 没有权限去查询菜单权限，登陆用户信息等
        yield put( {
          type: 'queryPermissions',
        } )
      }
    },
    // 退出登陆
    * logout ( active, { select, call,put } ) {
      const tk = _localStorage.get( 'token' )
      yield call(app.logout, parse({ tk }) )
      _localStorage.set({'admin_isLogin':''})
      const {
        locationPathname,
      } = yield select( _ => _.app )
      _localStorage.set({ 'admin_locationPathname': JSON.stringify(locationPathname) })
      window.location.reload();
      // yield put({ type: 'contactGlobal/logoutConnect' })
    },

    // 等待IM退出完成退出
    * awaitLogout (active, { call,put }) {
      const tk = _localStorage.get( 'token' )
      yield call(app.logout, parse({ tk }) )
      yield put({ type: 'contact/resetState' })
      _localStorage.set({'admin_isLogin':''})
      // window.location.reload();
      yield put( {
        type: 'updateState',
        payload: {
          user: {},
          isLogin: false,
          permissions: {
            visit: [],
          },
          menu: [],
        },
      } )
      yield put( {
        type: 'queryLogin',
      } )
    },

    * changeNavbar ( action, {
      put,
      select,
    } ) {
      const {
        app,
      } = yield( select( _ => _ ) )
      const isNavbar = document.body.clientWidth < 769
      if ( isNavbar !== app.isNavbar ) {
        yield put( {
          type: 'handleNavbar',
          payload: isNavbar,
        } )
      }
    },
    * checkIs404 (active, {select, put}) {
      const { initMenu, locationPathname } = yield select(_ => _.app)
      // 当前路由的pathname
      const pathname = locationPathname
      // 判断initMenu 中是否有pathname

      const is404 = !initMenu.some((item) => {
        return item.route === pathname
      })

      yield put({
        type: 'updateState',
        payload: {
          is404,
        },
      })
    },

  },
  reducers: {
    updateState ( state, {
      payload,
    } ) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider ( state ) {
      window.localStorage.setItem( `${prefix}siderFold`, !state.siderFold )
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchMenuPopver ( state ) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar ( state, {
      payload,
    } ) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys ( state, {
      payload: navOpenKeys,
    } ) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
