import services from './../services/';
import _ from 'lodash';

export default {

  namespace: 'editUser',

  state: {
    userParam: {}, // 修改员工参数

    activeTabsKey: '1', // 选中面板
    basicDisabled: true, // 基本信息
    experienceDisabled: true, // 工作经验
    portrayalDisabled: true,  // 员工画像

    positionData: [], // 岗位

    uid: '', // 操作当前的uid

    userWork: [], // 工作经验
    userDetails: {}, // 用户详情资料

    portrayalImg: {}, // 员工画像资料

    salaryRecord: [], // 工作调整记录
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        let _pathname = pathname.split('/');
        let pathnameLen = _pathname.length;
        let uid = _pathname[pathnameLen - 1];

        if (_.toNumber(uid)) {
          dispatch({
            type: 'save',
            payload: {
              uid,
            }
          });
  
          // 用户详情
          if (uid) {
            dispatch({
              type: 'getUserById',
            });
  
            // dispatch({
            //   type: 'getUserPortrayalByUid'
            // });
          }
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 获取用户详情
    *getUserById({ payload }, { call, put, select }) {
      const { uid } = yield select(_ => _.editUser);
      let param = {};
      _.extend(param, payload, {
        id: uid,
      });
      let temp = yield call(services.getUserById, param);
      let { data } = temp;
      if (data.msg === 'success') {
        let userDetails = data.data || {};
        yield put({
          type: 'save',
          payload: {
            userDetails,
          }
        });

        const { storeId } = userDetails;
        if (storeId) {
          yield put({
            type: 'getPosition',
            payload: {
              sid: storeId
            }
          });
        }
      }
    },

    // 获取当前门店职位
    *getPosition({ payload }, { call, put }) {
      let temp = yield call(services.getPosition, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        let positionData = data.data;
        positionData.push({
          name: '其他', id: ''
        });

        yield put({
          type: 'save',
          payload: {
            positionData,
          }
        });
      }
    },

    // 获取工作经验
    *getUserWorkByUid({ payload }, { call, put, select }) {
      const { uid } = yield select(_ => _.editUser);
      let param = {};
      _.extend(param, payload, {
        uid,
      });
      let temp = yield call(services.getUserWorkByUid, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            userWork: data.data,
          }
        })
      }
    },

    // 员工画像获取
    *getUserPortrayalByUid({ payload }, { call, put, select }) {
      const { uid } = yield select(_ => _.editUser);
      let param = {};
      _.extend(param, payload, {
        uid,
      });
      let temp = yield call(services.getUserPortrayalByUid, param);
      let { data } = temp;
      let { userPortrayal, files } = data.data;
      if (data.msg === 'success') {
        let filesObj = {};
        _.forEach(files, (item) => {
          filesObj[item.id] = item;
        });
        let { idcardFront, idcardReverse, healthCertificateFront,
          healthCertificateReverse, contract } = userPortrayal || {};

        let _contract = JSON.parse(contract || '[]');
        let contractData = [];
        _.forEach(_contract, (item) => {
          contractData.push(filesObj[item]);
        });
        
        yield put({
          type: 'save',
          payload: {
            portrayalImg: {
              idcardFront: filesObj[idcardFront],
              idcardReverse: filesObj[idcardReverse],
              healthCertificateFront: filesObj[healthCertificateFront],
              healthCertificateReverse: filesObj[healthCertificateReverse],
              contract: contractData,
            }
          }
        })
      }
    },

    // 工作记录
    *getUserSalaryRecordByUid({ payload }, { call, put, select }) {
      const { uid } = yield select(_ => _.editUser);
      let param = {};
      _.extend(param, payload, {
        uid,
      });
      let temp = yield call(services.getUserSalaryRecordByUid, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            salaryRecord: data.data,
          }
        })
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
