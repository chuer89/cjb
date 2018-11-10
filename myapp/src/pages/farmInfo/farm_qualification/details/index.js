import React from 'react'
import {Row,Col,Table,Collapse } from 'antd'
import {ShowDetailsInfo} from 'components'
const Panel = Collapse.Panel;
export default ()=>{
  const columns=[{
    title: '账号',
    dataIndex: 'user',
    key: 'user',
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  },{
    title: '时间',
    dataIndex: 'operatorTime',
    key: 'operatorTime'
  }];
  const data=[{
    'user':'89898',
    'operatorTime':'2017-10-01 12:00',
    'action':'这里展示审核失败填写的原因'
  },{
    'user':'898998',
    'operatorTime':'2017-10-01 12:000',
    'action':'这里展f示审核失败填写的原因'
  }]
  const a = {
    detailsInfo: [
      {
        'title': '农场信息',
        'item': [
          {
            'label': '农场名称',
            'content': '成都蔚然花海'
          },
          {
            'label': '农场ID',
            'content': '18989'
          },
          {
            'label': '农场地址',
            'content': '澳大利亚维多利亚澳大利亚维多利亚澳大利亚维多利亚澳大利亚维多利亚澳大利亚维多利亚澳大利亚维多利亚',
            'ColConfig': {
              xs: 24,
              sm: 24,
              md: 24,
              xl: 24,
              xxl: 24
            },
          }
        ]
      }]
  }
  const relatedData=[
    {
      'title':'产权文件',
      'uploadItem':[{
        'label':'原始文件2',
        'file':'上传文件'
      }]
    },{
      'title':'产权副本',
      'uploadItem':[{
        'label':'原始文件1',
        'file':'上传文件'
      }]
    }
  ]
  return (<div>
    <h1 style={{fontWeight: 700}}>翻译</h1>
    <Row style={{marginBottom: 10, marginTop: 10}}>
      <Col><h2 style={{fontWeight: 700}}>相关资料</h2></Col>
      <Col>
        <Collapse bordered={false} defaultActiveKey={['1']}>
          {relatedData.map((item,index)=>
            <Panel header={item.title} key={index+1}>
              <Row key={index+1}>
                {item.uploadItem&&item.uploadItem.map((_item,i)=><Col key={i}>
                  <label>{_item.label}:</label>
                  <span>{_item.file}</span>
                </Col>)}
              </Row>
            </Panel>
          )}
        </Collapse>
      </Col>
    </Row>
    <ShowDetailsInfo {...a}/>
    <Table
      columns={columns}
      dataSource={data}
      loading={false}
      pagination={false}
    />
  </div>)
}
