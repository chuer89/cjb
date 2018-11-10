import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Filter } from 'components'
import { Table, Divider, Button } from 'antd'
import { TableUtils } from 'utils'
import Link from 'umi/link'
import CloseOrder from './components/close'
import CompleteOrder from './components/complete'

const { getColumns } = TableUtils

const btnStyle = {
  marginBottom: '24px',
}

class BusinessIntention extends Component {
  state = {
    visibleClose: false, // 关闭弹框
    visibleComplete: false, // 完成弹框
    orderItem: {}, // 操作的订单
  }

  save(payload) {
    this.setState(payload);
  }

  onQuery(payload) {
    this.props.dispatch({
      type: 'businessIntention/getList',
      payload,
    })
  }

  render() {
    const {
      businessIntention: {
        queryCondition,
        list,
        fields,
        pagination
      },
      dispatch,
      loading,
      confirmLoading,
    } = this.props
    const { visibleClose, orderItem, visibleComplete } = this.state
    const self = this

    const filterProps = {
      queryCondition,
      onSearch: (payload) => {
        this.onQuery({ ...payload, pn: 1 })
      },
      onReset: () => {
        this.onQuery({ pn: 1 })
      },
    }

    // 打开关闭订单弹框
    let handerOpenClose = (orderItem) => {
      self.save({
        visibleClose: true,
        orderItem,
      })
    }
    // 打开完成弹框
    let handerOpenComplete = (orderItem) => {
      self.save({
        visibleComplete: true,
        orderItem,
      })
    }

    // 关闭参数
    const closeModalProps = {
      visible: visibleClose,
      confirmLoading,
      handerclose() {
        self.save({
          visibleClose: false,
        })
      },
      orderItem,
      handerSubmit(values) {
        const { id } = orderItem;
        let payload = {
          ...values,
          orderId: id,
        }
        dispatch({
          type: 'businessIntention/setCloseIntent',
          payload,
        })
      }
    }
    // 订单完成
    const completeModalProps = {
      visible: visibleComplete,
      confirmLoading,
      handerclose() {
        self.save({
          visibleComplete: false,
        })
      },
      orderItem,
      handerSubmit(values) {
        const { id } = orderItem;
        let payload = {
          ...values,
          orderId: id,
        }
        dispatch({
          type: 'businessIntention/setCompleteIntent',
          payload,
        })
      }
    }

    const extraColumns = [{
      width: 150,
      fixed: 'right',
      key: 'operator',
      name: '操作',
      //扩展字段的render支持自定义渲染
      render: (value, record) => {
        const { status } = record

        let renderOperate = ''
        if (status === 10) {
          renderOperate = (
            <div>
              <a href="javascript:;" onClick={() => { handerOpenComplete(record) }}>完成</a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={() => { handerOpenClose(record) }}>关闭</a>
            </div>
          )
        }

        return (
          <div>{renderOperate}</div>
        )
      }
    }]

    const tableProps = {
      rowKey: 'id',
      columns: getColumns(fields).extend(extraColumns).values(),
      loading: loading.effects['businessIntention/getList'],
      dataSource: list,
      pagination: {
        ...pagination,
        showTotal: tc => `总共 ${tc} 条`,
        onChange: index => this.onQuery({ pn: index }),
      }
    }

    return (
      <div>
        <Link to="/business/intention/create">
          <Button className="btn-diy-size" style={btnStyle} type="primary">创建</Button>
        </Link>
        <Filter {...filterProps} />
        <Table scroll={{ x: 1200 }} {...tableProps} />
        <div>
          <CloseOrder modalProps={closeModalProps} />
          <CompleteOrder modalProps={completeModalProps} />
        </div>
      </div>
    )
  }
}

BusinessIntention.propTypes = {
  internalAccount: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ businessIntention, loading }) => ({ businessIntention, loading }))(BusinessIntention)
