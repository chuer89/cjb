import farmService from '../services'
import {routerRedux} from 'dva/router'
import {Model} from 'utils'
import {Message} from 'antd'
import _ from 'lodash';
import {filterConfig} from './../filterConfig';

const initState = {
  ...filterConfig,
  queryParameters: {
    auditStatus: "",
    farmId: "",
    farmName: "",
    farmers: "",
    isSales: "",
    modifyStatus: "",
    sellStatus: "",
    sellerAgencyName: "",
    time: "",
    translateStatus: "",
    typeDesc: ""
  },
  outOfStockShow: false,
  filterShow: true,
  pagination: {
    showTotal: total => `共计 ${total} 条`,
    total: 0,
    ps: 10,
    pageSize: 10,
    pn: 1,
  },
}
export default Model.extend({
  namespace: 'farm',
  state: {
    ..._.cloneDeep(initState),
  },

  subscriptions: {
    setup({dispatch, listen}) {
      listen('/farmInfo', {type: 'farmList'})
    }
  },
  effects: {
    // 获取农场列表
    * farmList(action, {call, put, select, callWithMessage, update, callWithSpinning}) {
      const {
        pagination: {ps, pn}, queryParameters: {
          auditStatus, endDate,
          farmId,
          farmName,
          farmers,
          isSales,
          modifyStatus,
          sellStatus,
          sellerAgencyName,
          startDate,
          translateStatus,
          typeDesc
        }
      } = yield select(_ => _.farm);
      const data = yield callWithSpinning(farmService.getfarmList, {
        auditStatus,
        endDate,
        farmId,
        farmName,
        farmers,
        isSales,
        modifyStatus,
        sellStatus,
        sellerAgencyName,
        startDate,
        translateStatus,
        typeDesc,
        ps,
        pn
      });
      if (data) {
        const {datas, tc} = data;
        const list = datas.map((item, index) => {
          item.key = index;
          return item
        });
        yield update({
          list,
          pagination: {
            ps,
            pn,
            total: tc,
          },
        })
      }
    },
    // 上架农场
    * putaway({payload, callback}, {call, put, select, callWithConfirmLoading}) {
      const {id} = payload.record;
      yield callWithConfirmLoading(farmService.putaway, {farmId: id})
      Message.success('上架成功')
      callback && callback()
      // 更新数据
      const {list} = yield select(_ => _.farm)
      list.forEach((item) => {
        if (item.id === id) {
          item.saleStatusDesc="出售中"
          item.saleStatus = 10
          item.key = Date.parse(new Date())
        }
      })
      yield put({
        type: 'updateState',
        payload: {list}
      })

    },
    // 下架农场
    * farmOff({payload, callback}, {call, put, select, callWithConfirmLoading}) {
      yield callWithConfirmLoading(farmService.off, payload['record'])
      const {farmId} = payload['record']
      Message.success('下架成功')
      callback && callback();
      // 更新数据
      const {list} = yield select(_ => _.farm)
      list.forEach((item) => {
        if (item.id === farmId) {
          item.saleStatusDesc = '已下架'
          item.saleStatus = 20
          item.key = Date.parse(new Date())
        }
      })
      yield put({
        type: 'updateState',
        payload: {list},
      })
    },
    * redirectDetail({payload}, {put}) {
      yield put(routerRedux.push('/detail/' + payload.id, {
        id: payload.id,
      }))
    },
  },

  reducers: {
    delete(state, {payload: id}) {
      return state.filter(item => item.id !== id)
    },
    // 筛选
    farmFilter(state, {payload: item}) {
      return {
        ...state, queryParameters: {...item.queryParameters}
      }
    },
    // 更新页面控件
    updatePagination(state, {payload}) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload,
        },
      }
    },
    // 清除
    clearFilter(state) {
      return {
        ...state,
        queryParameters: {
          auditStatus: "",
          farmId: "",
          farmName: "",
          farmers: "",
          isSales: "",
          modifyStatus: "",
          sellStatus: "",
          sellerAgencyName: "",
          time: "",
          translateStatus: "",
          typeDesc: ""
        }
      }
    },
    taggleFilterShow(state, {payload}) {
      return {
        ...state,
        filterShow: !state.filterShow,
        animationConfig: {
          ...state.animationConfig,
          ...payload,
        },
      }
    },
    resetState(state) {
      return {
        ...state,
        ..._.cloneDeep(initState),
      }
    }
    ,
  }
  ,
})
