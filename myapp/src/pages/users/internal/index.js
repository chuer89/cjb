import React, { Component } from 'react'
import { connect } from 'dva'
import { Filter, EditModal } from 'components'
import { Table, Divider, Modal, Button } from 'antd'
import Link from 'umi/link'
import { TableUtils } from 'utils'

const { getColumns } = TableUtils

const btnStyle = {
  marginBottom: '24px',
}

const initEditModalProps = {
  visible: false,
  onCancel: () => { },
  dispatchContent: () => { },
  placeholder: '请输入冻结原因，最多500字',
  effectsType: 'internalAccount/frozen',
}

class InternalAccount extends Component {
  state = {
    editModalProps: initEditModalProps,
    queryPayload: {},
    pagination: {},
  }

  onQuery(payload) {
    this.props.dispatch({
      type: 'internalAccount/getInternalAccount',
      payload: payload,
    })
  }

  render() {
    const { internalAccount: {
      queryCondition, list, fields, pagination
    }, loading, dispatch } = this.props

    // 搜索条件参数
    const filterProps = {
      queryCondition,
      onSearch: (payload) => {
        this.onQuery({ ...payload, pn: 1 })
      },
      onReset: () => {
        this.onQuery({ pn: 1 })
      },
    }

    // 操作列
    const extraColumns = [{
      width: 150,
      fixed: 'right',
      key: 'operator',
      name: '操作',
      //扩展字段的render支持自定义渲染
      render: (value, record) => {
        return (
          <div>
            {record.statusDesc === '正常' ? <a href="javascript:eval();" onClick={() => {
              this.setState({
                editModalProps: {
                  ...initEditModalProps,
                  visible: true,
                  title: `确定冻结"${record.account}"账号吗?`,
                  dispatchContent: (value) => {
                    dispatch({
                      type: 'internalAccount/frozen',
                      payload: {
                        accountId: record.accountId,
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
                unfrozen(record)
              }}>解冻</a>}
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => {
              resetPassword(record)
            }}>重置密码</a>
          </div>
        );
      }
    }]

    // 表格参数
    const tableProps = {
      rowKey: 'accountId',
      scroll: { x: 1000 },
      columns: getColumns(fields).extend(extraColumns).values(),
      loading: loading.effects['internalAccount/getInternalAccount'],
      dataSource: list,
      pagination: {
        ...pagination,
        showTotal: tc => `总共 ${tc} 条`,
        onChange: index => this.onQuery({ pn: index }),
      }
    }

    const resetPassword = ({ account, accountId }) => {
      Modal.confirm({
        iconType: 'no',
        // title: 'Confirm',
        width: '520px',
        style: {
          padding: '0',
        },
        content: `确定要重置“${account}”账号的密码`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          dispatch({
            type: 'internalAccount/resetPassword',
            payload: {
              accountId,
            },
          })
        },
      })
    }

    // 解冻
    const unfrozen = ({ account, accountId }) => {
      Modal.confirm({
        iconType: 'no',
        width: '520px',
        style: {
          padding: '0',
        },
        content: `确定要解冻“${account}”账号？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          dispatch({
            type: 'internalAccount/unfrozen',
            payload: {
              accountId,
            },
          })
        },
      })
    }

    return (
      <div>
        <Link to="/users/internal/create">
          <Button className="btn-diy-size" style={btnStyle} type="primary">创建</Button>
        </Link>
        <Filter {...filterProps} />

        <Table {...tableProps} />
        <EditModal {...this.state.editModalProps} loading={loading} />
      </div>
    )
  }
}

export default connect(({ internalAccount, loading }) => ({ internalAccount, loading }))(InternalAccount)