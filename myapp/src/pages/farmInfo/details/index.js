import React, {Component} from 'react'
import {connect} from 'dva'
import {Row, Col, Button, Modal, Icon, Form, Input, message, Spin} from 'antd'
import {ShowDetailsInfo, OperationLog, EnhanceModal} from 'components'

const FormItem = Form.Item;
const {TextArea} = Input;
const BtnProps = {
  style: {
    paddingRight: '13px',
    float: 'right',
  },
}

class FarmDetail extends Component {
  state = {
    showPassModel: false,
    showNoPassModel: false,
    showConfirmModel: false
  }

  constructor(props) {
    super(props);
    this.actions = this.props.actions;
  }

  handleConfirm = () => this.setState({
    showConfirmModel: Symbol('')
  });
  auditPass = () => this.setState({
    showPassModel: Symbol('')
  });
  auditNoPass = () => this.setState({
    showNoPassModel: Symbol('')
  });
  handlePassModelOk = () => this.actions.passOk();
  handleNoPassModelOk = (value) => this.actions.noPassOk(value);

  render() {
    const {form, confirmLoading, loading, farmDetails: {query: {confirmStatus, isSale, auditStatus}, dataList, farmLogList}} = this.props;
    const {getFieldDecorator} = form;
    const {showConfirmModel, showPassModel, showNoPassModel} = this.state;
    const passModleConfig = {
      title: <><Icon type="info-circle" style={{paddingRight: 10, color: '#ecc068'}} theme="outlined"/>审核通过</>,
      visible: showPassModel,
      confirmLoading,
      onOk: () => this.handlePassModelOk(),
    }
    const noPassModleConfig = {
      title: <><Icon type="warning" theme="outlined" style={{paddingRight: 10, color: 'red'}}/>审核失败</>,
      visible: showNoPassModel,
      confirmLoading,
      form,
      onOk: (values) => this.handleNoPassModelOk(values)
    }
    const confirmConfig = {
      title: <><Icon type="warning" theme="outlined" style={{paddingRight: 10, color: 'red'}}/>确认修改</>,
      visible: showConfirmModel,
      confirmLoading,
      onOk: () => this.actions.handleConfirm()
    }
    return (<>
      {(confirmStatus && String(isSale) === '1') ? <Row gutter={24} type="flex" justify="end">
        <Col><Button type="primary" onClick={this.handleConfirm}>确认修改</Button></Col>
      </Row> : null}
      {(auditStatus && String(isSale) === '1') ? <Row gutter={24} type="flex" justify="end">
        <Col {...BtnProps}><Button type="primary" onClick={this.auditPass}>审核通过</Button></Col>
        <Col {...BtnProps}><Button type="danger" onClick={this.auditNoPass}>审核失败</Button></Col>
      </Row> : null}
      <div style={{marginTop: 20, padding: "24px 16px", background: "#F9F9FA"}}>
        <Spin spinning={loading.effects['farmDetails/farmDetail']}>
          <ShowDetailsInfo {...dataList}/>
          <OperationLog {...{data: farmLogList}}/>
        </Spin>
      </div>
      <EnhanceModal {...passModleConfig}>
        <p>确定审核通过吗？</p>
      </EnhanceModal>
      <EnhanceModal {...confirmConfig}>
        <p>请确认修改的信息是否已翻译，点击确定完成数据更新</p>
      </EnhanceModal>
      <EnhanceModal {...noPassModleConfig}>
        <Form>
          <FormItem label="备注">
            {getFieldDecorator('failReason', {
              rules: [{required: true, message: '请输入审核不通过得原因'}, {
                max: 300,
                message: '最多300字',
              }],
            })(
              <TextArea rows={4} placeholder="请输入审核不通过得原因(300字以内)"/>
            )}
          </FormItem>
        </Form>
      </EnhanceModal>
    </>)
  };
}

const mapStateToProps = ({farmDetails, loading}) => ({farmDetails, loading})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      noPassOk(query) {
        dispatch({
          type: 'farmDetails/noPassModelOk',
          payload: query,
        });
      },
      passOk() {
        dispatch({
          type: 'farmDetails/passModelOk'
        });
      },
      handleConfirm() {
        dispatch({
          type: 'farmDetails/confirmUpdate'
        });
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(FarmDetail))
