import {Model} from 'utils'
import fetch from './service';
import router from "umi/router";
import {message} from 'antd';


export default Model.extend({
  namespace: 'translate',
  state: {
    id: '', // 农场Id
    translateData: null, // 翻译数据
    baseData: {}, // 原始数据
  },
  subscriptions: {
    setup: ({dispatch, listen}) => {
      listen('/farmInfo/translate', (e) => {
        const {id} = e.query;
        dispatch({
          type: 'clearData'
        });
        // 更新id
        dispatch({
          type: 'updateState',
          payload: {id},
        });
        // 请求翻译数据
        dispatch({
          type: 'queryTranslateData',
          payload: {id},
        });
      });
    },
  },
  effects: {
    // 查询翻译数据
    * queryTranslateData({payload}, {call, put, callWithSpinning}) {
      const translateData = yield callWithSpinning(fetch.translate, payload);
      yield put({
        type: 'updateState',
        payload: {
          translateData,
        },
      });
    },

    * save({payload, onOk, onError}, {call, callWithSpinning}) {
      yield callWithSpinning(fetch.save, payload);
      onOk && onOk();
      message.success('发布成功');
      router.push('/farmInfo');
    },
    * clearData(active, {put}) {
      yield put({
        type: 'updateState',
        payload: {
          id: '', // 农场Id
          translateData: null, // 翻译数据
          baseData: {}, // 原始数据
        },
      });
    },
  },
  reducers: {},
});
