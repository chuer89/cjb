import { Model } from 'utils'
import { message } from 'antd'
import { addIntent, getFarmDetail } from './../services'
import router from 'umi/router'

export default Model.extend({
  namespace: 'createBusinessIntent',
  state: {
    farmName: '',
    farmId: '',
    buyerId: '',
    address: '',
    totalArea: 0,
  },
  subscriptions: {
    setup({ dispatch, listen }) {

    },
  },
  effects: {
    // 添加
    *addIntent({ payload }, { callWithMessage }) {
      yield callWithMessage(addIntent, payload, {
        successMsg: '意向订单新增成功'
      })

      // 返回列表页
      router.push('/business/intention')
    },

    // 查询农场名称和id
    *getFarmDetail({ payload }, { update, call }) {
      const content = yield call(getFarmDetail, payload) || {}
      const { farmName, id, address, totalArea } = content || {}
      if (!id) {
        message.error('请输入正确的农场编号')
      }
      yield update({
        farmName,
        address,
        totalArea,
        farmId: id,
      })
    },
  },
  reducers: {

  },
})
