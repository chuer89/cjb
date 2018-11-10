import React, { Component } from 'react';
import { connect } from 'dva';
import { pageFields, imagesType } from '../config/auditDetailFields';
import { Row, Col, Button, Modal, Form, Input } from 'antd';
import styles from '../styles.less';
import { OperationLog, Picture, EnhanceModal } from 'components';

const FormItem = Form.Item;
const Textarea = Input.TextArea;

const defaultColConfig = {
  xs: 12,
  sm: 12,
  md: 6,
  xl: 6,
  xxl: 6,
  style: {
    marginBottom: 32,
  }
}
const rowConfig = {
  gutter: {
    xs: 12,
    sm: 12,
    md: 24,
    xl: 24,
    xxl: 24,
  }
}


class AuditDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  handleModal = () => {
    this.setState({
      visible: Symbol(),
    })
  }

  // modal confirm
  handleAuditConfirm = () => {
    const { confirmLoading, actions } = this.props;
    Modal.confirm({
      title: '审核通过',
      content: '确认审核通过吗',
      okText: '确认',
      cancelText: '取消',
      confirmLoading,
      onOk() {
        actions.doAudit({ type: '1' })
      }
    })
  }

  render () {
    const { detailDataSource = {}, confirmLoading, form, actions } = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = form;

    // render user details
    function renderUserFields(data) {
      return Object.keys(data).length && pageFields.map((fields, index) => {
        return <Row key={index} {...rowConfig}>
          {fields.map(({ title, key, render }) => {
            const colProps = {
              ...defaultColConfig,
              key,
            }
            return <Col {...colProps}><div className="text-break">{title}:{render ? render(data) : (data[key] || '')}</div></Col>
          })}
        </Row>
      })
    }

    const renderUser = renderUserFields(detailDataSource);

    const pictureProps = {
      enums: imagesType,
      dataSource: detailDataSource.resourceList,
      options: {
        row: { gutter: 50 },
        col: { span: 8 }
      }
    }

    const modalProps = {
      visible,
      title: '审核驳回',
      confirmLoading,
      form,
      onOk: (values) => {
        actions.doAudit({ type: '2', ...values })
      }
    }

    const { logs = [] } = detailDataSource;

    const logsProps = {
      data: logs,
      columns: [{
        title: '操作类型',
        dataIndex: 'operateTypeDesc',
        key: 'operateTypeDesc',
      },{
        title: '操作员',
        dataIndex: 'creatorName',
        key: 'creatorName',
      },{
        title: '操作时间',
        type: 'datetime',
        dataIndex: 'createTime',
        key: 'createTime'
      },{
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
      }]
    }

    return <div style={{ position: 'relative' }}>
      <h1>基础详情页</h1>
      <div>
        <h2>用户信息</h2>
        <div>{renderUser}</div>
        <Picture {...pictureProps} />
      </div>
      {logs.length ? <OperationLog {...logsProps} /> : ''}
      {detailDataSource.status === 1 && <div className={styles['operation-groups']}>
        <Button type="primary" onClick={this.handleAuditConfirm}>审核通过</Button>
        <Button onClick={this.handleModal}>审核驳回</Button>
      </div>}
      <EnhanceModal { ...modalProps }>
        <FormItem
          label={"备注"}
          labelCol={{sm: { span: 5 }}}
          wrapperCol={{
            sm: { span: 16 },
          }}
          hasFeedback={false}
        >
          {getFieldDecorator('reason', {
            rules: [
              { required: true, message: '必填' },
              { max: 100, message: '最大不能超过100字符数' }
            ],
          })(<Textarea rows={4} />)}
        </FormItem>
      </EnhanceModal>
    </div>;
  }

}

function mapStateToProps({ audit_seller_proxy }) {
  return { ...audit_seller_proxy }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      doAudit(data) {
        dispatch({ type: 'audit_seller_proxy/doAudit', payload: data })
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AuditDetail));
