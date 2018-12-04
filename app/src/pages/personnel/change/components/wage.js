import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';

export default ({ dataSource }) => {
  const columns = [{
    title: '生效时间', dataIndex: 'time', render: (time) => {
      return (
        <span>{moment(time).format('YYYY-MM-DD')}</span>
      )
    }
  }, {
    title: '调整前', dataIndex: 'salaryBefore',
  }, {
    title: '调整后', dataIndex: 'salaryAfter',
  }, {
    title: '调整幅度', dataIndex: 'rate', render: (value) => {
      return (
        <span>{value}%</span>
      )
    }
  }, {
    title: '原因', dataIndex: 'reason', render: (reason) => {
      return (
        <p className={style.seasonBox} title={reason}>{reason}</p>
      )
    }
  }];
  
  const tableOpt = {
    dataSource,
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