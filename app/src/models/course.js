import services from './../services/';
import _ from 'lodash';
import { message } from 'antd';

export default {

  namespace: 'course',

  state: {
    listData: [],
    tagTypeData: [], // 体系

    visibleDesignate: false, // 指派弹框

    checkedList: {}, // 选中列
    seleDeptIndex: '', // 选中指派的部门

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
        let getTag = () => {
          dispatch({
            type: 'getTrainLibraryTagType',
          });
        }

        if (pathname === '/course/config') {
          dispatch({
            type: 'getTrainLibraryAllClass',
          });

          getTag();
        } else if (pathname === '/course/config/add') {
          getTag();
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
      const { classType, tag, className } = yield select(_ => _.course);
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
    *getTrainLibraryTagType({ payload }, { call, put }) {
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

    // 删除课程
    *deleteMoreClass({ payload }, { call, put }) {
      const temp = yield call(services.deleteMoreClass, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        message.success('已删除');
        yield put({
          type: 'getTrainLibraryAllClass',
        });
      } else {
        message.error(data.msg);
      }
    },

    // 关联
    *addTrainStorePositionRef({ payload }, { call, put }) {
      const temp = yield call(services.addTrainStorePositionRef, payload);
      let { data } = temp;
      if (data.msg === 'success') {
        message.success('指派成功');
      } else {
        message.error(data.msg);
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    getTrainLibraryTagType(state) {
      return {...state}
    }
  },

};
