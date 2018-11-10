import {Model} from 'utils'
import farmService from "./services";

export default Model.extend({
  namespace: 'farmQualification',
  state: {
    queryParameters:{
      farmName:'',
      farmId:''
    },
    list:[],
    pagination: {
      showTotal: total => `共计 ${total} 条`,
      total: 0,
      ps: 10,
      pageSize: 10,
      pn: 1,
    },
  },
  subscriptions: {
    setup({dispatch, listen}) {
      listen('/farmInfo/farm_qualification', {type: 'getList'})
    }
  },
  effects: {
    * getList({payload, callback}, {call, put, select, callWithMessage, update, callWithSpinning}) {
      const {
        pagination: {ps, pn}, queryParameters: {farmName,farmNo}
      } = yield select(_ => _.farmQualification);
      const data = yield callWithSpinning(farmService.getFarmQualification, {ps,pn,farmName,farmNo})
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
    }
  },
  reducers: {
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
    // 筛选
    farmFilter(state, {payload: item}) {
      return {
        ...state, queryParameters: {...item.queryParameters}
      }
    },
    // 清除
    clearFilter(state) {
      return {
        ...state,
        queryParameters: {
        }
      }
    }
  }
})
