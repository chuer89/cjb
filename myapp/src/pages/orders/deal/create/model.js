import { Model } from 'utils'
import { message } from 'antd'
import { addOrderDeal, getFarmDetail, getUserInfo } from './../services'
import router from 'umi/router'

export default Model.extend({
  namespace: 'createOrdersMeal',
  state: {
    farmName: '',
    farmId: '',
    buyerId: '',
    realName: '',
  },
  subscriptions: {
    setup({ dispatch, listen }) {

    },
  },
  effects: {
    // 添加
    *addOrderDeal({ payload }, { callWithMessage }) {
      yield callWithMessage(addOrderDeal, payload, {
        successMsg: '交易订单新增成功'
      })

      // 返回列表页
      router.push('/orders/deal')
    },

    // 查询农场名称和id
    *getFarmDetail({ payload }, { update, call }) {
      const content = yield call(getFarmDetail, payload) || {}
      const { farmName, id } = content || {}
      if (!id) {
        message.error('请输入正确的农场编号')
      }
      yield update({
        farmName,
        farmId: id,
      })
    },

    // 查询手机号查名称
    *getUserInfo({ payload }, { update, call }) {
      const content = yield call(getUserInfo, payload)
      const { realName, id } = content || {}
      if (!id) {
        message.error('请输入正确的用户手机号')
      }
      yield update({
        buyerId: id,
        realName,
      })
    }
  },
  reducers: {

  },
})
