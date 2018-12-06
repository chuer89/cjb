import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';

export default ({ dataBody: {
  records,
  total,
} }) => {
  const columns = [{
    title: '生效时间', dataIndex: 'eventTime', render: (time) => {
      return (
        <span>{moment(time).format('YYYY-MM-DD')}</span>
      )
    }
  }, {
    title: '调整前', dataIndex: 'beforeName',
  }, {
    title: '调整后', dataIndex: 'afterName',
  }];

  const tableOpt = {
    dataSource: records || [],
    rowKey: 'id',
    columns,
    pagination: false,
    locale: {
      emptyText: '暂无数据'
    }
  }
  return (
    <div><Table {...tableOpt} /></div>
  )
}