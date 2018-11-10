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

class OrdersDeal extends Component {
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
      type: 'ordersDeal/getDealList',
      payload,
    })
  }

  render() {
    const {
      ordersDeal: {
        queryCondition, list, fields, pagination
      },
      dispatch,
      loading,
      confirmLoading
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

    const extraColumns = [{
      width: 150,
      fixed: 'right',
      key: 'operator',
      name: '操作',
      //扩展字段的render支持自定义渲染
      render: (value, record) => {
        const { orderStatus, id } = record
        const toDetail = `/orders/deal/detail/${id}`

        let renderDetails = (
          <Link to={toDetail}>详情</Link>
        )
        let renderOperate = (
          <div>{renderDetails}</div>
        )
        if (orderStatus === 10) {
          renderOperate = (
            <div>
              <a href="javascript:;" onClick={() => { handerOpenComplete(record) }}>完成</a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={() => { handerOpenClose(record) }}>关闭</a>
              <Divider type="vertical" />
              {renderDetails}
            </div>
          )
        }

        return (
          <div>{renderOperate}</div>
        )
      }
    }]
    const columns = getColumns(fields).extend(extraColumns).values()
    const tableProps = {
      rowKey: 'id',
      scroll: { x: 1500 },
      columns,
      loading: loading.effects['ordersDeal/getDealList'],
      dataSource: list,
      pagination: {
        ...pagination,
        showTotal: tc => `总共 ${tc} 条`,
        onChange: index => this.onQuery({ pn: index }),
      }
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
          type: 'ordersDeal/setCloseDeal',
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
          type: 'ordersDeal/setCompleteDeal',
          payload,
        })
      }
    }

    return (
      <div>
        <Link to="/orders/deal/create">
          <Button className="btn-diy-size" style={btnStyle} type="primary">创建</Button>
        </Link>
        <Filter {...filterProps} />
        <Table {...tableProps} />
        <div>
          <CloseOrder modalProps={closeModalProps} />
          <CompleteOrder modalProps={completeModalProps} />
        </div>
      </div>
    )
  }
}

OrdersDeal.propTypes = {
  internalAccount: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ ordersDeal, loading }) => ({ ordersDeal, loading }))(OrdersDeal)
