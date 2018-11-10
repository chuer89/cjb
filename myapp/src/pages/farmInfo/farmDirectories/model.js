import {Model} from 'utils'
import fetch from './service';

export default Model.extend({
  namespace: 'farmDirectories',
  state: {
    list: [],
    listEffect: 'farmDirectories/getList',
    mapFarmType: [],
    detailData: {},
    pagination: {
      showTotal: total => `共计 ${total} 条`,
      total: 0,
      ps: 12,
      pageSize: 12,
      pn: 1,
    },
  },
  subscriptions: {
    setup: ({history, dispatch}) => {
      history.listen(({pathname}) => {
        if (pathname === '/farmInfo/farmDirectories') {
          dispatch({
            type: 'getList',
            payload: {
              ps: 12,
              pn: 1
            },
          });
        }
      });
    },
  },
  effects: {
    // 获取列表
    * getList({payload}, {call, put, select, callWithSpinning}) {
      const {pagination} = yield select((_) => _.farmDirectories);
      const {pn, ps} = pagination;
      const res = yield callWithSpinning(fetch.list, {...{pn, ps, ...payload}});
      if (!res) {
        return;
      }
      const {datas, tc} = res;
      datas.map((item, index) => item.key = index);
      yield put({
        type: 'updateState',
        payload: {
          list: datas,
          pagination: {
            ...pagination,
            total: tc,
          },
        },
      });
    },
    // 获取原始数据
    * getDetail({payload}, {call, put, callWithSpinning}) {
      const {id} = payload;
      const detail = yield callWithSpinning(fetch.detail, {id});
      if (!detail) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          detailData: detail,
        },
      });
    },
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
    }
  },
});
