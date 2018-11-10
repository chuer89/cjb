import React from "react";
import Putaway from './Putaway'
import OutOfStock from './OutOfStock'
import router from 'umi/router';

const viewDetail = (query) => router.push({
  pathname: '/farmInfo/details',
  query,
});
const translate = (query) => router.push({
  pathname: '/farmInfo/translate',
  query,
});
const audit = (query) => router.push({
  pathname: '/farmInfo/details',
  query,
});
const confirmEdit = (query) => router.push({
  pathname: '/farmInfo/details',
  query,
});
export const operatorType = {
  'translateStatus': {
    '10': (index, record) => {
      const {id} = record;
      return <a href="javascript:;" onClick={() => translate({id})} style={{paddingLeft: 10}} key={`translate_${index}`}>翻译</a>
    }
  },
  'saleStatus': {
    '20': (index, record) => <Putaway {...{key: index, index, record}}/>,// 上架
    '10': (index, record) => <OutOfStock {...{key: index, index, record}}/>// 下架
  },
  'auditStatus': {
    '10': (index, record) => {
      const {id,auditStatus,isSale} = record;
      return <a href="javascript:;" onClick={() => audit({id,auditStatus,isSale})} style={{paddingLeft: 10}}
                key={`audit_${index}`}>审核</a>
    }
  },
  'confirmStatus': {
    '1': (index, record) => {
      const {id, confirmStatus,isSale} = record;
      return <a href="javascript:;" onClick={() => confirmEdit({id,confirmStatus,isSale})} style={{paddingLeft: 10}}
                key={`audit_${index}`}>确认修改</a>
    }
  }
}

