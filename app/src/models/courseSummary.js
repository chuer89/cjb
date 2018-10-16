import services from './../services/';
import _ from 'lodash';

export default {

  namespace: 'courseSummary',

  state: {
    listData: [],
    tagTypeData: [], // 体系

    classTypeData: [{ // 类型
      name: '全部', code: '0'
    }, {
      name: 'PPT', code: '1'
    }, {
      name: '视频', code: '2'
    }],

    classType: '0', // 课程类型
    tag: '', // 课程体系
    className: '', // 课程名称
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/course/summary') {
          dispatch({
            type: 'getTrainLibraryAllClass',
          });

          dispatch({
            type: 'getTrainLibraryTagType',
          });
        }
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 获取资料
    *getTrainLibraryAllClass({ payload }, { call, put, select }) {
      const { classType, tag, className } = yield select(_ => _.courseSummary);
      let param = {};
      _.extend(param, payload, {
        classType, 
        tag, 
        className,
      });
      const temp = yield call(services.getTrainLibraryAllClass, param);
      let { data } = temp;
      if (data.msg === 'success') {
        yield put({
          type: 'save',
          payload: {
            listData: data.data,
          }
        });
      }
    },

    // 课程分类
    *getTrainLibraryTagType({ payload }, { call, put, select }) {
      const temp = yield call(services.getTrainLibraryTagType, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        let list = data.data;
        let tags = [];
        if (_.isArray(list)) {
          tags = [{
            name: '全部', code: ''
          }];
          _.forEach(list, (item, index) => {
            tags.push({
              name: item,
              code: index + 1,
            });
          });
        }
        yield put({
          type: 'save',
          payload: {
            tagTypeData: tags,
          }
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
