import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Filter, EditModal, Popover } from 'components'
import { Table, Modal, Divider } from 'antd'
import { TableUtils } from 'utils'
import Link from 'umi/link'

const { getColumns } = TableUtils

const initEditModalProps = {
  visible: false,
  onCancel: () => { },
  dispatchContent: () => { },
  placeholder: '请输入冻结原因，最多500字',
  effectsType: 'userAccount/frozen',
}

class UserAccount extends Component {
  state = {
    editModalProps: initEditModalProps,
    queryPayload: {},
    pagination: {},
  }

  onQuery(payload) {
    this.props.dispatch({
      type: 'userAccount/getAccountList',
      payload: payload,
    })
  }

  render() {
    const { userAccount: {
      queryCondition, list, fields, pagination
    }, dispatch, loading } = this.props

    const firee = ({ userId, realName }) => {
      Modal.confirm({
        iconType: 'no',
        content: `确定要解冻“${realName || ''}”账号?`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          dispatch({
            type: 'userAccount/unFrozenUser',
            payload: {
              userId: userId,
            },
          })
        },
      })
    }

    const filterProps = {
      queryCondition,
      onSearch: (payload) => {
        this.onQuery({ ...payload, pn: 1 })
      },
      onReset: () => {
        this.onQuery({ pn: 1 })
      },
    }

    const extraColumns = [{
      title: '状态',
      key: 'statusDesc',
      render: (text, record) => {
        return (
          record.statusDesc === '正常' ? '正常' :
            <Popover reason={record.reason} actioner={record.creatorId} text='已冻结' />
        )
      },
    }, {
      width: 120,
      fixed: 'right',
      title: '操作',
      dataIndex: 'action',
      key: 'table-action',
      render: (text, record) => <div>
        {record.statusDesc === '正常' ? <a href="javascript:;" onClick={() => {
          this.setState({
            editModalProps: {
              ...initEditModalProps,
              visible: true,
              title: record.realName ? `确定冻结"${record.accountTypeDesc}-${record.realName}"账号吗?` : `确定冻结该${record.accountTypeDesc}账号吗?`,
              dispatchContent: (value) => {
                dispatch({
                  type: 'userAccount/frozenUser',
                  payload: {
                    userId: record.userId,
                    reason: value,
                  },
                  callback: () => {
                    this.setState({
                      editModalProps: initEditModalProps,
                    })
                  },
                })
              },
              onCancel: () => {
                this.setState({
                  editModalProps: initEditModalProps,
                })
              },
            },
          })
        }}>冻结</a>
          : <a href="javascript:;" onClick={() => {
            firee(record)
          }}>解冻</a>}
        <Divider type="vertical" />
        <Link to={'/users/account/detail/' + record.userId}>详情</Link>
      </div>,
    }]

    // 表格参数
    const tableProps = {
      rowKey: 'userId',
      scroll: { x: 1000 },
      columns: getColumns(fields).extend(extraColumns).values(),
      loading: loading.effects['userAccount/getAccountList'],
      dataSource: list,
      pagination: {
        ...pagination,
        showTotal: tc => `总共 ${tc} 条`,
        onChange: index => this.onQuery({ pn: index }),
      }
    }

    return (
      <div>
        <Filter {...filterProps} />
        <Table {...tableProps} />
        <EditModal {...this.state.editModalProps} loading={loading} />
      </div>
    )
  }
}

UserAccount.propTypes = {
  internalAccount: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ userAccount, loading }) => ({ userAccount, loading }))(UserAccount)
