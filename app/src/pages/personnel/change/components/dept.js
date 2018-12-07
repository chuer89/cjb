import { Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';

export default ({
  dataBody: {
    records,
    total,
  },
  pagination,
  onChange,
}) => {
  const columns = [{
    title: '员工姓名', dataIndex: 'userName'
  }, {
    title: '操作人', dataIndex: 'verifierName'
  // }, {
  //   title: '创建时间', dataIndex: 'createTime', render: (time) => {
  //     return (
  //       <span>{moment(time).format('YYYY-MM-DD')}</span>
  //     )
  //   }
  }, {
    title: '生效时间', dataIndex: 'eventTime', render: (time) => {
      return (
        <span>{moment(time).format('YYYY-MM-DD')}</span>
      )
    }
  }, {
    title: '调整前部门', dataIndex: 'beforeName',
  }, {
    title: '调整后部门', dataIndex: 'afterName',
  }];

  const tableOpt = {
    dataSource: records || [],
    rowKey: 'id',
    columns,
    pagination,
    onChange,
    locale: {
      emptyText: '暂无数据'
    }
  }
  return (
    <div><Table {...tableOpt} /></div>
  )
}