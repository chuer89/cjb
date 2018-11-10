import {Model} from 'utils'
import fetch from './service';
import router from 'umi/router';


export default Model.extend({
  namespace: 'noPublishfarm',
  state: {
    queryParams: {
      areaMin: '',
      areaMax: '',
      priceMin: '',
      priceMax: '',
      queryStr:'',
    },
    list: [],
    listEffect: 'noPublishfarm/getList',
    detailData: null,
  },
  subscriptions: {
    setup: ({history, dispatch}) => {
      history.listen(({pathname}) => {
        if(pathname === '/farmInfo/farmList') {
          dispatch({
            type: 'getList',
            payload: {
              ps: 12,
              pn: 1,
            },
          });
        }
      });
    },
  },
  effects: {
    // 获取农场列表
    *getList ({payload}, {call, put, select}) {
      const {pagination, queryParams} = yield select((_) => _.noPublishfarm);
      const res = yield call(fetch.list, {...payload, ...queryParams});
      const {datas, tc} = res;
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
    *getDetail ({payload}, {call, put}) {
      try {
        const detail = yield call(fetch.detail, payload);
        yield put({
          type: 'updateState',
          payload: {
            detailData: detail,
          },
        });
      } catch (e) {
        yield put({
          type: 'updateState',
          payload: {
            detailData: {},
          },
        });
      }
    },
    // 认领农场
    *receive ({payload}, {call}) {
      yield call(fetch.receive, payload);
      router.push( {
        pathname: `/editFarm/reptileEdit/${payload.id}`,
      });
    },
    *myReceive (active, {call, put, select}) {
      const {pagination} = yield select((_) => _.noPublishfarm);

      const data = yield call(fetch.myReceive);
      yield put({
        type: 'updateState',
        payload: {
          list: data,
          pagination: {
            ...pagination,
            total: data.length,
          },
        },
      });
    },
  },
  reducers: {
    updateParams (state, {payload} ) {
      return {
        ...state,
        queryParams: payload,
      };
    },
  },
});
