// import { getAllAccount } from './utils';
// import { IM } from 'utils/config';
// import { message } from 'antd';

// const { limit } = IM;
const limit = 20;

class Nim {
  constructor(config, dispatch) {
    this.config = config; // 账号相关配置
    this.dispatch = dispatch; // app dispatch
    this.sessions = [];
    // 所有用户对象
    // 用户完整信息对象
    this.users = [];
    // this.create();
    // this.getLocalMsgs = this.getLocalMsgs.bind(this);
    // this.logout = this.logout.bind(this);
    // this.checkUserInfo = this.checkUserInfo.bind(this);
  }

  create() {
    const { token, accid, appKey, callbacks } = this.config;
    this.person = {
      [accid]: true,
    };
    this.callbacks = callbacks;
    return this.nim = window.SDK.NIM.getInstance({
      // db: false,
      debug: false,
      autoMarkRead: false,
      appKey,
      account: accid,
      token,
      syncSessionUnread: true,
      onusers: (users) => {
        console.log(users);
      },
      onUpdateUser: (users) => {
        console.log('onUpdateUser==========', users);
      },
      onroamingmsgs: this.onRoamingMsgs,
      onofflinemsgs: this.onOfflineMsgs,
      ...callbacks,
    })
  }

  onRoamingMsgs(obj) {
    console.log('收到漫游消息', obj);
  }
  onOfflineMsgs(obj) {
    console.log('收到离线消息', obj);
  }

  // 把im账号id转换成用户信息
  transAccountsToUsers(accounts) {
    var that = this;
    return new Promise((resolve, reject) => {
      var arr1 = accounts.slice(0, 150);
      var arr2 = accounts.slice(150);
      var datas = [];
      var getInfo = () => {
        if (!accounts || accounts.length <= 0) {
          console.warn('getUsers 方法参数 accounts 不能为空：', accounts);
          return;
        }
        that.nim.getUsers({
          accounts: arr1,
          sync: true,
          done(err, data) {
            if (err) {
              return reject(err);
            } else {
              datas = datas.concat(data);
              if (arr2.length > 0) {
                arr1 = arr2.slice(0, 150);
                arr2 = arr2.slice(150);
                getInfo();
              } else {
                return resolve(datas);
              }
            }
          },
        });
      };
      getInfo();
    });
  }

  getLocalMsgs(sessionId, endTime = 0) {
    return new Promise((resolve) => {
      this.nim.getHistoryMsgs({
        to: sessionId,
        scene: 'p2p',
        limit,
        endTime,
        asc: true,
        done: (err, data) => {
          console.log(data);
          // console.log(this.nim.mergeMsgs([], data.msgs));
          return resolve(this.nim.mergeMsgs([], data.msgs));
        },
      });
    });
  }

  sendMsgs({ scene = 'p2p', type, to, data = {} }) {
    return new Promise((resolve) => {
      this.nim[`send${type}`]({
        scene,
        to,
        isHistoryable: true,
        isSyncable: true,
        isRoamingable: true,
        isOfflinable: true,
        ...data,
        done: (err, msg) => {
          resolve(msg);
        },
      });
    });
  }

  sendCustomMsgs({ scene = 'p2p', to, data = {} }) {
    return new Promise((resolve) => {
      this.nim.sendCustomMsg({
        scene,
        to,
        isHistoryable: true,
        isSyncable: true,
        isRoamingable: true,
        isOfflinable: true,
        ...data,
        done: (err, msg) => {
          resolve(msg);
        },
      });
    });
  }

  sendFileMsgs({ scene = 'p2p', type, to, data = {}, fileInput, currentKey }) {
    const { onUpdatePendingMsg } = this.config;
    return new Promise((resolve) => {
      this.nim.sendFile({
        scene,
        to,
        type,
        isHistoryable: true,
        isSyncable: true,
        isRoamingable: true,
        isOfflinable: true,
        fileInput,
        ...data,
        uploadprogress: (data) => {
          onUpdatePendingMsg({ progress: data.percentageText, currentKey, sessionId: to });
        },
        done: (err, msg) => {
          resolve(msg);
        },
      });
    });
  }

  resendMsg(msg) {
    const { onMergeMsgs } = this.callbacks;
    return new Promise(() => {
      this.nim.resendMsg({
        msg,
        done: (err, msg) => {
          console.log(err, msg);
          onMergeMsgs({ msgs: [msg]});
        },
      });
    });
  }

  getAvatar(url) {
    const re = /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
    if (re.test(url)) {
      url = this.nim.viewImageSync({
        url,
      });
      return url + "?imageView&thumbnail=80x80&quality=85";
    } else {
      return url || '';
    }
  }

  disconnect () {
    this.nim.disconnect();
  }

  reconnect() {
    this.nim.connect()
  }

  setCurrSession(sessionId) {
    console.log(sessionId);
    this.nim.setCurrSession(sessionId);
  }
}

export default Nim;
