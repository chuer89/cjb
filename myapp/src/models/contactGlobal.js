import { Model, ImUtils } from 'utils';
import { Nim } from 'components';
import { message } from 'antd';
import _ from 'lodash';
import {
  app
} from 'services'

const { imExtends } = app;

const initialSetting = {
  globalNim: null,
  mySessionId: null,
  persons: [],
  users: [],
  sessions: [],
  disconnect: true,
  loadFinish: false,
  selectedKey: '',
  searchKey: '',
  sessionList: [],
  reconnect: false,
}

export default Model.extend({
  namespace: 'contactGlobal',
  state: _.cloneDeep(initialSetting),
  subscriptions: {
    // setup({ dispatch, listen }) {
    //   listen('/contact', () => {
    //     dispatch({ type: 'createNim' });
    //   })
    // }
  },
  effects: {
    *createNim ({ payload: callbacks }, { select, call, update, put }) {
      const { globalNim } = yield select(_ => _.contactGlobal);
      const { token, accid, appKey } = yield call(imExtends);
      if (globalNim) return false;
      const nimIns = new Nim({ token, accid, appKey, callbacks })
      yield nimIns.create();
      yield update({
        globalNim: nimIns,
        mySessionId: accid,
        persons: {
          [accid]: true,
        }
      });
    },
    *onmsg ({ payload: msg }, { put }) {
      yield put('contact/mergeCurrentMsgs', { msgs: [msg], target: msg.target });
    },
    *onsessions ({ payload: sessions }, { put }) {
      console.log('onsessions', sessions);
      yield put('updatePersons', sessions);
      yield put('updateSessions', sessions);
    },
    *onupdatesession ({ payload: sessions }, { select, put, update }) {
      const { persons } = yield select(_ => _.contactGlobal);
      const lastAccount = ImUtils.getAllAccount(sessions);
      yield put('updateSessions', sessions);
      if(!persons[lastAccount[0]]) {
        yield update({ persons: { ...persons, [lastAccount[0]]: true } });
        yield put('getUsers');
      };
      yield put('updateSessionList');
    },
    *onconnect ({ payload: data }, { update }) {
      yield update({ disconnect: false })
    },
    *onwillreconnect ({ payload: data }, { update }) {
      yield update({ disconnect: true })
      message.warn('即将重连');
      console.log(data.retryCount);
      console.log(data.duration);
    },
    *ondisconnect ({ payload: data }, { select, put, update }) {
      const { reconnect } = yield select(_ => _.contactGlobal);
      console.log(reconnect);
      if(!reconnect) {
        yield message.warn(data.message);
        yield put('app/logout');
      }
      yield update({ reconnect: false })
    },
    *onsyncdone (payload, { select, put }) {
      console.log('connect');
      yield put('getUsers');
    },
    *getUsers(payload, { select, update, put }) {
      const { globalNim, persons } = yield select(_ => _.contactGlobal);
      const users = yield globalNim.transAccountsToUsers(Object.keys(persons));
      console.log('123');
      yield update({ users, loadFinish: true });
      yield put('updateSessionList');
    },
    *logoutConnect (payload, { select, update, put }) {
      yield put('app/awaitLogout');
    }
  },
  reducers: {
    resetSettings (state) {
      return {
        ...state,
        globalNim: null,
        mySessionId: null,
        persons: [],
        users: [],
        sessions: [],
        disconnect: true,
        loadFinish: false,
        selectedKey: '',
        searchKey: '',
        sessionList: [],
      }
    },
    updatePersons (state, { payload: sessions }) {
      const tempPersons = {};
      sessions.forEach(session => {
        let account = ImUtils.getAllAccount(session);
        account && (tempPersons[account[0]] = true);
      });
      return {
        ...state,
        persons: { ...state.persons, ...tempPersons }
      }
    },
    updateSessions (state, { payload: sessions }) {
      const { globalNim } = state;
      const { nim } = globalNim;
      return {
        ...state,
        sessions: nim.mergeSessions(state.sessions, sessions),
      }
    },
    updateSessionList (state) {
      const { users, sessions } = state;
      const list = sessions.map(session => {
        const { custom, avatar, nick } = ImUtils.getUserAvatar(session.to, users);
        const msg = session.lastMsg;
        let params = {}, pushContent = '';
        try { params = JSON.parse(custom, 10) } catch(e) {}
        const { uid, accType, isAuthAgent } = params;
        if(msg.type !== 'text') {
          const MSG_TYPE = {
            image: '[图片]',
            audio: '[语音]',
            video: '[视频]',
            file: '[文件]',
          };
          pushContent = MSG_TYPE[msg.type] || `${(msg.flow === 'in') ? "收到" : "发送"}一条消息`;
        }
        return {
          id: session.id,
          uid,
          accType,
          isAuthAgent,
          avatar,
          nick: decodeURIComponent(nick),
          msg: decodeURIComponent(msg.text) === 'sendOnCustomerServiceBound' ? '' : decodeURIComponent(msg.text),
          updateTime: session.updateTime,
          pushContent: pushContent,
          unread: session.unread,
        }
      })
      return {
        ...state,
        sessionList: list,
      }
    },
  },
})