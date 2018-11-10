import moment from 'moment';
import { AUDIT_STATUS } from './enums';
import _ from 'lodash';

export const pageFields = [
  [{
    key: 'userId',
    title: '用户ID',
  },
  {
    key: 'accountTypeDesc',
    title: '用户类型',
  },
  {
    key: 'mobile',
    title: '手机号',
    render (record) {
      return '+' + record.mobileRegion + record.mobile
    }
  },
  {
    key: 'realName',
    title: '姓名',
  }],
  [{
    key: 'email',
    title: '邮箱',
  },
  {
    key: 'companyName',
    title: '任职公司',
  },
  {
    key: 'companyPosition',
    title: '职位',
  }],
  [{
    key: 'language',
    title: '语言',
    render: ({ language }) => language === 'zh' ? '中文' : '英文',
  },{
    key: 'abnCode',
    title: '业务注册代码',
  },
  {
    key: 'createTime',
    title: '注册时间',
    render: ({ createTime }) => moment(new Date(parseInt(createTime, 10))).format('YYYY-MM-DD HH:mm:ss')
  }]
  // [{
  //   key: 'status',
  //   title: '状态',
  //   render: ({ status }) => {
  //     return _.filter(AUDIT_STATUS, { value: status + '' })[0].label
  //   },
  // },{
  //   key: 'reason',
  //   title: '审核未通过原因',
  // }]
];

export const imagesType = {
  10: '签证',
  30: '职业资格证',
  40: '公司相关证明',
  20: '驾照',
};
