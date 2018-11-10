import { Model } from 'utils';
import { filters } from './config/conditions';
import { audit } from 'services';
import { auditTableFields } from './config/auditTableFields';

const initialState = {
  ...filters,
  fields: auditTableFields,
  audits: [],
  search: {
    status: '',
  },
  pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
  },
  detailId: '',
  detailDataSource: {},
}

export default Model.extend({
  namespace: 'audit_seller_proxy',
  state: initialState,
  subscriptions: {
    setup({dispatch, history, listen}) {  // eslint-disable-line
      listen('/users/audit_seller_proxy', (e) => {
        dispatch({ type: 'fetchLists' })
      })
      listen('/users/audit_seller_proxy/detail/:id', ({ params = [] }) => {
        const id = params[0];
        dispatch({ type: 'fetchDetailById', payload: { id } })
      })
    }
  },
  effects: {
    *fetchLists ({ payload }, { call, select, put, update }) {
      const { pagination, search } = yield select(_ => _.audit_seller_proxy);
      const { pageSize, current } = pagination;
      const searchParams = {
        ps: pageSize, pn: current,
        ...search,
        ...payload,
      }
      // yield update({ search: searchParams });
      const { datas, pn, tc } = yield call(audit.fetchSellerLists, searchParams);
      yield update({ audits: datas, pagination: { ...pagination, current: pn, total: tc } });
    },
    *fetchDetailById ({ payload: { id } }, { call, update }) {
      console.log(id);
      const detail = yield call(audit.fetSellerDetailsById, { id });
      yield update({ detailDataSource: detail, detailId: id });
    },
    *doAudit ({ payload }, { select, callWithConfirmLoading, put }) {
      const { detailId } = yield select(_ => _.audit_seller_proxy);
      yield callWithConfirmLoading(audit.doAudit, { ...payload, id: detailId })
      yield put('fetchDetailById', { id: detailId });
    }
  },
})