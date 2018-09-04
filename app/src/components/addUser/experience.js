import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Radio, DatePicker, Icon, Row, Col } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import _ from 'lodash';

// 工作经验
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

let uuid = 10;
class DynamicFieldSet extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      disabledAdd: false, // 是否禁止添加
      maxKeysLen: 3, // 至多工作条数
    };
  }

  remove = (k) => {
    const { form } = this.props;
    const { maxKeysLen } = this.state;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });

    const keysLen = keys.length;
    if (keysLen <= maxKeysLen) {
      this.setState({
        disabledAdd: false,
      });
    }
  }

  add = () => {
    const { maxKeysLen } = this.state;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');

    const keysLen = keys.length;
    if (keysLen >= maxKeysLen) {
      return false;
    }

    const nextKeys = keys.concat(uuid);
    uuid++;

    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });

    if (keysLen >= maxKeysLen - 1) {
      this.setState({
        disabledAdd: true,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { form, handerNext } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      handerNext();
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { disabledAdd } = this.state;
    const formItemLayout = {
      // labelCol: {
      //   sm: { span: 4 },
      // },
      wrapperCol: {
        sm: { span: 22 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        sm: { span: 20 },
      },
    };
    const delIconStyle = {
      'fontSize': '20px',
      'paddingTop': '4px',
    }
    getFieldDecorator('keys', { initialValue: ['1'] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div key={index}>
          <Row>
            <Col span={7}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('date_' + k, {
                  
                })(
                  <RangePicker locale={locale} />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('name_' + k, {
                  
                })(
                  <Input placeholder="请输入公司名称" autoComplete="off" maxLength="32" />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('ren_' + k, {
                  
                })(
                  <Input placeholder="请输入证明人" autoComplete="off" maxLength="32" />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('phone_' + k, {
                  
                })(
                  <Input placeholder="请输入联系方式" autoComplete="off" maxLength="11" />
                )}
              </FormItem>
            </Col>
            <Col span={1}>
              <div style={delIconStyle}>
              {keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(k)}
                />
              ) : null}
              </div>
            </Col>
          </Row>
        </div>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col span={7}>工作时间</Col>
          <Col span={5}>公司名称</Col>
          <Col span={5}>证明人</Col>
          <Col span={5}>证明人联系方式</Col>
        </Row>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" disabled={disabledAdd} onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加工作经验
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">下一步</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

const Personal = ({ dispatch }) => {
  let handerNext = () => {
    dispatch({
      type: 'addUser/save',
      payload: {
        experienceDisabled: false,
        portrayalDisabled: false,
        activeTabsKey: '4'
      }
    })
  };

  let opt = {
    handerNext,
  };

  return (
    <div>
      <div>工作经历</div>
      <WrappedDynamicFieldSet {...opt} />
    </div>
  );
};

export default connect((({ addUser }) => ({
  addUser,
})))(Personal);
