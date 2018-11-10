import service from './services'
import {Model} from 'utils'
import _ from 'lodash'
import moment from 'moment';
import router from "umi/router";
import {message} from 'antd'
import {detailsSchema} from './detailSchema';
import {ownerDetailsSchema} from './ownerDetailSchema'

const initState = {
  query: {},
  dataList: {},
  farmLogList: []
}

function formattedFarmeImg(res) {
  const imgListItem = {
    'title': '农场图片',
    'item': []
  }
  res['imgList'].map(v => {
    imgListItem['item'].push({
      'content': v.typeDesc,
      'imgUrl': [v.imgUrl]
    });
  });
  return imgListItem;
}

function convertData(schema, res) {
  schema.detailsInfo.map((_item, index) => {
    Object.keys(res).map((key) => {
      // 处理农场主信息，将农场主信息拿出来
      if (key === 'farmer') {
        Object.keys(res['farmer']).map(fk => {
          const fkValue = res['farmer'][fk];
          // 格式化农场主生日
          if (fk === 'birthday') {
            res[`farmer_${fk}`] = fkValue ? moment(new Date(parseInt(fkValue, 10))).format('YYYY-MM-DD') : '';
          } else {
            res[`farmer_${fk}`] = fkValue;
          }
        });
      }
      _item['item'].map((value, _index) => {
        if (value['key'] === key) {
          value['content'] = res[key];
        }
      });
    });
  });
}

function schemaData(isSale, res) {
  let schema = {}
// 1，售卖，卖家中介，2，不售卖，农场主自己
  const isSaleType = {
    '1': (res) => {
      const imgListItem = formattedFarmeImg(res);
      schema = _.cloneDeep(detailsSchema);
      schema['detailsInfo'].splice(3, 0, imgListItem);
    },
    '2': () => {
      schema = _.cloneDeep(ownerDetailsSchema);
      schema['detailsInfo']
    }
  }
  isSaleType[isSale](res);
  convertData(schema, res)
  return schema;
}

export default Model.extend({
  namespace: 'farmDetails',
  state: {..._.cloneDeep(initState)},
  subscriptions: {
    setup({dispatch, listen}) {
      listen('/farmInfo/details', (e) => {
        dispatch({type: 'farmDetail', payload: e.query});
        dispatch({type: 'restState'});
      })
    }
  },
  effects: {
    // 获取售卖农场农场详细信息
    * farmDetail({payload, callback}, {call, put, select, callWithMessage, update, callWithSpinning}) {
      const {id, isSale} = payload;
      const res = yield callWithSpinning(String(isSale) === '1' ? service.getfarmDetail : service.getFarmOwnerDetail, {farmId: id})
      if (res) {
        const dataList = schemaData(isSale, res);
        const farmLogList = res.farmLogList.map((item, index) => {
          item.key = index;
          return item;
        })
        yield update({dataList, farmLogList, query: payload})
      }
    },
    // 审核不通过
    * noPassModelOk({payload, callback}, {call, put, select, callWithMessage, update, callWithConfirmLoading}) {
      const {query: {id}} = yield select(_ => _.farmDetails);
      const {failReason} = payload;
      yield callWithConfirmLoading(service.auditFarm, {farmId: id, auditStatus: 30, failReason})
      message.success('更新成功');
      router.push('/farmInfo');
    },
    // 审核通过
    * passModelOk({payload, callback}, {call, put, select, callWithMessage, callWithConfirmLoading}) {
      const {query: {id}} = yield select(_ => _.farmDetails);
      yield callWithConfirmLoading(service.auditFarm, {farmId: id, auditStatus: 20})
      message.success('审核成功');
      router.push('/farmInfo');
    },
    //确认修改
    * confirmUpdate({payload, callback}, {call, put, select, callWithMessage, update, callWithSpinning}) {
      const {query: {id}} = yield select(_ => _.farmDetails);
      yield callWithSpinning(service.confirmUpdate, {farmId: id})
      message.success('确认修改成功');
      router.push('/farmInfo');
    }
  },
  reducers: {
    restState(state, action) {
      return {
        ...state,
        ...initState
      }
    }
  }
})
