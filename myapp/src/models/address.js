import {Model} from 'utils'
import fetch from '../services/address';

export default Model.extend({
  namespace: 'address',
  state: {
    enData: [],
    zhData: [],
  },
  effects: {
    *getNation ({payload, callback}, {call, put}) {
      const lang = payload.lang;
      const data = yield call (fetch.getNation, {_language_: lang});
      if(lang === 'zh') {
        yield put({
          type: 'updateState',
          payload: {
              zhData: data.map(item => ({...item, isLeaf: false, label: 'nation'})),
          },

        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
              enData: data.map(item => ({...item, isLeaf: false, label: 'nation'})),
          },

        });
      }
      callback&&callback();
    },
    *getProvince ({payload, callback}, {call, put, select}) {
      const {id, lang} = payload;
      const res = yield call (fetch.getCity, {pid:id, _language_: lang});

      if(lang === 'zh') {
        const {zhData} = yield select(_ => _.address);

        zhData.map(item => {
          if(item.id === id) {
            item.children = res.map(_ => ({..._, isLeaf: false, label:'province'}));
          }
          return item;
        });
        yield put({
          type: 'updateState',
          payload: {
              zhData,
          },
        });
      }else {
        const {enData} = yield select(_ => _.address);
        enData.map(item => {
          if(item.id === id) {
            item.children = res.map(_ => ({..._, isLeaf: false, label:'province'}));
          }
          return item;
        });
        yield put({
          type: 'updateState',
          payload: {
              enData,
          },
        });
      }

      callback&&callback();
    },
    *getCity ({payload, callback}, {call, put, select}) {
      const {id, lang} = payload;
      const res = yield call (fetch.getCity, {pid:id, _language_: lang});

      if(lang === 'zh') {
        const {zhData} = yield select(_ => _.address);
        zhData.map(item => {
          item.children && item.children.map(index => {
            if(index.id === id) {
              index.children = res.map(_ => ({..._, isLeaf: true, label:'city'}));
            }
            return index;
          });
          return item;
        });

        yield put({
          type: 'updateState',
          payload: {
              zhData,
          },
        });

      } else {
        const {enData} = yield select(_ => _.address);

        enData.map(item => {
          item.children && item.children.map(index => {
            if(index.id === id) {
              index.children = res.map(_ => ({..._, isLeaf: true, label:'city'}));
            }
            return index;
          });
          return item;
        });
        yield put({
          type: 'updateState',
          payload: {enData},
        });
      }
      callback&&callback();
    },
  },
});
