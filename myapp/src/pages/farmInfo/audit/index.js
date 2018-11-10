import React from 'react'
import {Row, Col, Button} from 'antd'
import {ShowDetailsInfo,OperationLog} from 'components'

const BtnProps = {
  style: {
    paddingRight: '13px',
    float: 'right',
  },
}
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
          'label': '是否销售',
          'content': '未销售'
        },
        {
          'label': '农场面积',
          'content': '1025亩'
        },
        {
          'label': '农场单价',
          'content': '250元/亩'
        },
        {
          'label': '农场总价',
          'content': '2000元'
        },
        {
          'label': '农场地址',
          'content': '昆士兰'
        },
        {
          'label': '农场详细地址',
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
    },
    {
      'title': '农场图片',
      'item': [{
        'label': 'Panorama',
        'content': '昆士兰',
        'imgUrl':['//www.baidu.com/img/bd_logo1.png?qua=high']
      }]
    }
  ]
}
export default ({}) => {
  const handlerAuditPass = () => {

  }
  const handlerAuditNoPass = () => {

  }
  return (<div>
    <Row gutter={24} type="flex" justify="end">
      <Col {...BtnProps}>
        <Button className="btn-diy-size" type="primary" onClick={handlerAuditPass}>
          审核通过
        </Button>
      </Col>
      <Col {...BtnProps}>
        <Button className="btn-diy-size" onClick={handlerAuditNoPass}>
          审核失败
        </Button>
      </Col>
    </Row>
    <div style={{marginTop: 20,padding: "24px 16px",background: "#F9F9FA"}}>
      <ShowDetailsInfo {...a}/>
      <OperationLog/>
    </div>
  </div>);
}
