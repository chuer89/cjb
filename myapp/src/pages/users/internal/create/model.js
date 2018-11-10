// import { parse } from 'qs'
import { getTreeSelectData, getCreateAccount } from './service'
// import * as weatherService from './services/weather'
import router from 'umi/router'
import { Modal } from 'antd'
import { Model } from 'utils'

export default Model.extend({
  namespace: 'createAccount',
  state: {
    clickSumbit: false,
    modalShow: false,
    authorityIsOk: false,
    treeData: [],
    // successShow: false,
  },
  subscriptions: {
    setup({ dispatch, listen }) {
      listen('/users/internal/create', () => {
        dispatch({ type: 'getTreeSelectData' })
      })
    },
  },
  effects: {
    // 获取树形选择条件
    * getTreeSelectData({ payload }, { call, put, update }) {
      const { roles } = yield call(getTreeSelectData, payload)

      const formData = (arr) => {
        return arr.map(({ nodeName, parentId, id, children }) => ({
          title: nodeName,
          pkey: parentId || 'all',
          key: id,
          children: children ? formData(children) : '',
        }))
      }
      const children = formData(roles)

      yield update({
        treeData: [{
          title: '全部',
          key: 'all',
          children,
        }] || [],
      })
    },
    // 获取选择条件
    * onSubmit({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: payload,
      })
    },
    // 树形选择是否通过验证
    * setAuthority({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: payload,
      })
    },

    // 创建账号
    * createAccount({ payload }, { call, put }) {
      yield call(getCreateAccount, payload)

      yield put({
        type: 'setModalHide',
      })

      Modal.success({
        iconType: 'no',
        content: <div style={{ textAlign: 'center' }}>
          <i style={{ color: "#009E00", fontSize: '48px' }} className="iconfont icon-ic_shcg"></i>
          <p>
            创建账号成功
          </p>
        </div>,
        okText: '确定',
      })

      router.push('/users/internal')

    },

  },
  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    initState(state) {
      const init = {
        clickSumbit: false,
        modalShow: false,
        authorityIsOk: false,
      }
      return { ...state, ...init }
    },
    // 显示确认弹窗
    setModalShow(state) {
      return { ...state, modalShow: true }
    },
    // 隐藏弹窗
    setModalHide(state) {
      return { ...state, modalShow: false }
    },
  },
})
