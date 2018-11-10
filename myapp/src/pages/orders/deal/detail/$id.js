import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowDetailsInfo } from 'components'

class DealDetail extends Component {
  state = {
    mobileRegion: '86',
  }

  save = (payload) => {
    this.setState(payload)
  }

  render() {
    const {
      dispatch,
      detailDealOrders: {
        detailData,
      }
    } = this.props

    const detailAttr = {
      detailsInfo: [{
        'title': '用户信息',
        'item': [
          {
            'label': '用户姓名',
            'content': detailData.buyerName,
          },
          {
            'label': '用户性别',
            'content': detailData.sexDesc,
          },
          {
            label: '手机号码', content: `+${detailData.buyerMobileRegion} ${detailData.buyerMobile}`
          }
        ]
      }, {
        'title': '农场信息',
        'item': [
          {
            'label': '农场名称',
            'content': detailData.farmName
          },
          {
            'label': '农场地址',
            'content': detailData.address,
          },
          {
            label: '农场面积', content: `${detailData.area}${detailData.areaCodeDesc}`
          }
        ]
      }, {
        'title': '交易订单信息',
        'item': [
          {
            'label': '订单编号',
            'content': detailData.orderNo,
          },
          {
            'label': '状态',
            'content': detailData.orderStatusDesc,
          },
          {
            label: '订单金额', content: detailData.price,
          },
          {
            label: '实付金额', content: detailData.paidPrice || '--'
          },
          {
            label: '订单生存日期', content: detailData.createTime && new Date(detailData.createTime).format('yyyy-MM-dd hh:mm')
          }
        ]
      }, {
        'title': '服务（商品）信息',
        'item': [
          {
            'label': '服务（商品类型）',
            'content': detailData.serviceTypeDesc,
          },
          {
            'label': '商品有效期',
            'content': detailData.serviceValidity,
          },
          {
            label: '商品开通时间', content: detailData.serviceStartTime && new Date(detailData.serviceStartTime).format('yyyy-MM-dd hh:mm'),
          }
        ]
      }]
    }

    const contentStyle = {
      marginTop: 20, padding: "24px 16px", background: "#F9F9FA"
    }

    return (
      <div style={contentStyle}>
        <ShowDetailsInfo {...detailAttr} />
      </div>
    )
  }
}

export default connect(({ loading, detailDealOrders }) => ({
  loading,
  detailDealOrders,
}))(DealDetail)