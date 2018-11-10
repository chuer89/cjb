import React from 'react'
import {Row, Col, Table} from 'antd'
import {TableUtils} from 'utils'

const {getColumns} = TableUtils;
const defaultColumns = [{
  title: '操作类型',
  dataIndex: 'operatorType',
  key: 'operatorType',
},{
  title: '操作员',
  dataIndex: 'operatorName',
  key: 'operatorName',
},{
  title: '操作时间',
  type: 'datetime',
  dataIndex: 'operatorTime',
  key: 'operatorTime'
},{
  title: '备注',
  dataIndex: 'remark',
  key: 'remark'
}];

export default ({columns=defaultColumns,data=[]})=>{
  if(!data) {
    return '';
  }
  return (
    <Row style={{marginBottom: 10, marginTop: 10}}>
      <Col><h2 style={{fontWeight: 700}}>操作日志</h2></Col>
      <Col><Table
        columns={getColumns(columns).values()}
        dataSource={data}
        loading={false}
        pagination={false}
      />
      </Col>
    </Row>
  );
}
