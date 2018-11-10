import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowDetailsInfo, Picture } from 'components'
import _ from 'lodash'

class DealDetail extends Component {
  render() {
    const {
      dispatch,
      detailUsersAccount: {
        detailData,
      }
    } = this.props

    const detailAttr = {
      detailsInfo: [{
        'title': '用户信息',
        'item': [
          {
            'label': '用户ID',
            'content': detailData.id,
          },
          {
            'label': '用户类型',
            'content': detailData.accountTypeDesc
          },
          {
            label: '手机号码', content: `+${detailData.mobileRegion} ${detailData.mobile}`
          },
          {
            label: '姓名', content: detailData.realName
          },
          {
            label: '注册时间', content: new Date(detailData.createTime).format('yyyy-MM-dd hh:mm')
          },
          {
            label: '任职公司', content: detailData.companyName,
          },
          {
            label: '业务注册代码', content: detailData.abnCode,
          },
          {
            label: '语言', content: detailData.language === 'zh' ? '中文' : '英文'
          }
        ]
      }]
    }

    let renderPicture = ''
    if (_.isArray(detailData.resourceList)) {
      let pictureAttr = {
        dataSource: detailData.resourceList,
        enums: {
          '2': '驾照',
          '3': '职业资格证',
          '4': '公司相关证明',
        },
        options: {
          row: { gutter: 50 },
          col: { span: 8 }
        }
      }
      renderPicture = (
        <Picture {...pictureAttr} />
      )
    }

    const contentStyle = {
      marginTop: 20, padding: "24px 16px", background: "#F9F9FA"
    }

    return (
      <div style={contentStyle}>
        <ShowDetailsInfo {...detailAttr} />
        {renderPicture}
      </div>
    )
  }
}

export default connect(({ loading, detailUsersAccount }) => ({
  loading,
  detailUsersAccount,
}))(DealDetail)