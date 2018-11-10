import { Model, ImUtils } from 'utils';
import _ from 'lodash';
import { contact } from 'services';

const initialState = {
  uid: '',
  sessionId: '',
  currentMsgs: [],
  scrollDesc: '',
  inInfo: {},
  outInfo: {},
  scrollTop: 9999,
  custom: {},
  userCustom: {},
  farmId: '',
  farmDetail: '',
  userInfo: {},
  subscribes: [],
  publishFarmList: [],
  remarkFarmList: [],
  remarkUserList: [],
  publishFarmSelect: 0,
  activeTabKey: 'user',
}

export default Model.extend({
  namespace: 'contact',
  state: _.cloneDeep(initialState),
  subscriptions: {
  },
  effects: {
    *getCurrentMsgs (payload, { select, put, update }) {
      const { sessionId } = yield select(_ => _.contact);
      const { globalNim } = yield select(_ => _.contactGlobal);
      yield put('getInitialRender');
      yield update({ currentMsgs: [] });
      if(!sessionId) { return false };
      yield put('getContactUserInfo');
      globalNim.setCurrSession(`p2p-${sessionId}`);
      const currentMsgs = yield globalNim.getLocalMsgs(sessionId);
      console.log(sessionId, currentMsgs);
      const msgsLength = currentMsgs.length;
      const scrollDesc = msgsLength === 20 ? '上拉加载更多' : '';
      yield put('mergeCurrentMsgs', { msgs: currentMsgs });
      yield update({ scrollDesc, scrollTop: 9999 });
    },
    *getMoreMsgs ({ payload: { scrollTop } }, { select, update, put }) {
      const { globalNim } = yield select(_ => _.contactGlobal);
      const { sessionId, currentMsgs } = yield select(_ => _.contact);
      const endTime = currentMsgs[0].time;
      const msgs = yield globalNim.getLocalMsgs(sessionId, endTime);
      let tempScrollDesc = msgs.length === 20 ? '上拉加载更多' : '';
      yield put('mergeCurrentMsgs', { msgs });
      yield update({ scrollDesc: tempScrollDesc, scrollTop })
    },
    *sendMsg ({ payload: { type = 'text', data = {} } }, { select, put, update }) {
      const { globalNim } = yield select(_ => _.contactGlobal);
      const { sessionId, currentMsgs } = yield select(_ => _.contact);
      const currentKey = new Date().getTime(); // 每条消息唯一key
      const { fileInput } = data;
      const file = {};
      if (fileInput) {
        const value = fileInput.value; // 文件
        // file.url = value;
        file.ext = value.substring(value.lastIndexOf('.') + 1, value.length);  // 文件扩展名
        file.size = fileInput.files[0].size;
        file.name = value.substring(value.lastIndexOf('/') + 1);
        file.progress = 0;
        type = /png|jpg|bmp|jpeg|gif/i.test(file.ext) ? 'image' : 'file'; // 判断文件类型
      }
      yield update({ currentMsgs: [ ...currentMsgs, {
        currentKey,
        flow: 'out',
        type: type.toLowerCase(),
        ...data,
        file,
      }] });
      let msg = [];
      if (fileInput) {
        msg = yield globalNim.sendFileMsgs({ type, to: sessionId, data, fileInput, currentKey });
      } else if (type === 'custom') {
        msg = yield globalNim.sendCustomMsgs({ type, to: sessionId, data, currentKey });
      } else {
        msg = yield globalNim.sendMsgs({ type, to: sessionId, data });
      }
      // 消息发成成功操作
      yield put({ type: 'updatePendingMsg', payload: { currentKey, msg } });
    },
    // 从IM获取聊天用户信息资料
    *getContactUserInfo (payload, { select, update }) {
      const { users, mySessionId } = yield select(_ => _.contactGlobal);
      const { sessionId } = yield select(_ => _.contact);
      const inInfo = ImUtils.getUserAvatar(sessionId, users);
      const outInfo = ImUtils.getUserAvatar(mySessionId, users);
      let userCustom = {};
      try {
        userCustom = JSON.parse(inInfo.custom, 10) || {}
      } catch (e) {}
      yield update({ inInfo, outInfo, userCustom });
    },
    // 合并处理用户聊天记录
    *mergeCurrentMsgs ({ payload: { msgs, target } }, { select, put }) {
      console.log(msgs);
      let targetUid = '';
      const { globalNim } = yield select(_ => _.contactGlobal);
      const { uid } = yield select(_ => _.contact);
      if(target) {
        targetUid = target.split('@')[0];
        if(parseInt(uid, 10) ===  parseInt(targetUid, 10)) {
          yield put('updateCurrentMsg', { globalNim, msgs });
        } else {
          return false;
        }
      } else {
        yield put('updateCurrentMsg', { globalNim, msgs });
      }

      // 取接收用户发送的最后一条数据的custom
      const { currentMsgs } = yield select(_ => _.contact);
      const filterMsgs = _.filter(currentMsgs, o => o.flow === 'in' && o.custom);
      const filterMsgsLength = filterMsgs.length;
      if(filterMsgsLength) {
        yield put('transformCustom', { custom: filterMsgs[filterMsgsLength - 1].custom });
      }
    },
    // 检测消息中自定义字段
    *transformCustom({ payload: { custom = '' }}, { select, put, update }) {
      console.log(custom)
      let { farmId } = yield select(_ => _.contact);
      if(custom) {
        try {
          custom = JSON.parse(custom, 10);
        } catch(e) {
          console.log(e);
        }
      }

      const tempFarmId = (custom || {}).farmId  || '';
      yield update({ custom, farmId: tempFarmId });
      if(tempFarmId && tempFarmId !== farmId) {
        farmId = tempFarmId;
        yield put('getDynamicRender');
      }
      if(!tempFarmId) {
        yield update({ farmDetail: '', remarkFarmList: [] });
      }
    },
    *getInitialRender(payload, { put }) {
      yield put('getUserInfo')
      yield put('getRemarkUserList')
    },
    *getDynamicRender(payload, { put }) {
      yield put('getFarmDetail')
      yield put('getRemarkFarmList')
    },
    *getUserInfo(payload, { select, call, update }) {
      const { uid } = yield select(_=>_.contact);
      const data = yield call(contact.fetchUserInfo, { sellerAgencyId: uid });
      yield update({ userInfo: data });
    },
    *getPublishFarms(payload, { select, call, update }) {
      const { uid } = yield select(_=>_.contact);
      const { datas } = yield call(contact.fetchPublishFarms, { sellerAgencyId: uid });
      yield update({ publishFarmList: datas });
    },
    *getSubscribes(payload, { select, call, update }) {
      const { uid } = yield select(_=>_.contact);
      const data = yield call(contact.fetchSubscribes, { buyerId: uid });
      yield update({ subscribes: data });
    },
    *getFarmDetail(payload, { select, call, update }) {
      const { farmId, uid } = yield select(_ => _.contact);
      const data = yield call(contact.fetchFarmDetail, { farmId, userId: uid });
      yield update({ farmDetail: data })
    },
    *getRemarkUserList(payload, { select, call, update }) {
      const { uid } = yield select(_ => _.contact);
      const data = yield call(contact.remarkUserList, { userId: uid });
      yield update({ remarkUserList: data ? [data] : [] })
    },
    *getRemarkFarmList(payload, { select, call, update }) {
      const { farmId, uid } = yield select(_ => _.contact);
      const data = yield call(contact.remarkFarmList, { farmId, buyerId: uid });
      yield update({ remarkFarmList: data })
    },
    *updateRemarkUser({ payload: params }, { callWithConfirmLoading, put }) {
      yield callWithConfirmLoading(contact.remarkUserUpdate, params);
      yield put('getRemarkUserList');
    },
    *addRemarkUser({ payload: params }, { callWithConfirmLoading, select, put }) {
      const { uid } = yield select(_ => _.contact);
      yield callWithConfirmLoading(contact.remarkUserAdd, { userId: uid, ...params});
      yield put('getRemarkUserList');
    },
    *updateRemarkFarm({ payload: params }, { callWithConfirmLoading, put, select }) {
      yield callWithConfirmLoading(contact.remarkFarmUpdate, { ...params });
      yield put('getRemarkFarmList');
    },
    *addRemarkFarm({ payload: params }, { callWithConfirmLoading, put, select }) {
      const { farmId } = yield select(_ => _.contact);
      yield callWithConfirmLoading(contact.remarkFarmAdd, { orderId: farmId, ...params });
      yield put('getRemarkFarmList');
    }
  },
  reducers: {
    resetState () {
      return _.cloneDeep(initialState);
    },
    updatePendingMsg (state, { payload: { currentKey, msg, progress } }) {
      const { currentMsgs } = state;
      const msgIndex = _.findIndex(currentMsgs, { currentKey });
      if (msg) {
        currentMsgs[msgIndex] = msg;
      }
      if (progress) {
        currentMsgs[msgIndex].file.progress = progress;
      }
      return {
        ...state,
        currentMsgs,
      }
    },
    updateCurrentMsg (state, { payload: { globalNim, msgs } }) {
      const { nim } = globalNim;
      return {
        ...state,
        currentMsgs: nim.mergeMsgs(state.currentMsgs, msgs),
      }
    }
  }
})