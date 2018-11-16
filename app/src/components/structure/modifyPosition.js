// 岗位 弹框
import { Modal, Form, Input, Radio } from 'antd';
import React from 'react';
// import _ from 'lodash';

const { TextArea } = Input;
const FormItem = Form.Item;

class PositionManage extends React.Component {
  state = {
  }

  render() {
    let {
      visible,
      onCancel,
      callBack,
      title,
      data: {
        name,
        description,
        admin,
      },
      form: {
        getFieldDecorator,
        validateFields,
      },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    let handerSubmit = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          callBack(values);
        }
      });
    }

    return (
      <Modal
        title={title}
        width={600}
        destroyOnClose={true}
        visible={visible}
        centered={true}
        onOk={handerSubmit}
        onCancel={onCancel}>
        <div>
          <form>
            <FormItem {...formItemLayout} label="岗位名称">
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入岗位名称'
                }],
                initialValue: name,
              })(
                <Input placeholder="请输入岗位名称" autoComplete="off" maxLength="32" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="门店管理权限">
              {getFieldDecorator('admin', {
                rules: [{
                  required: true, message: '请选择是否拥有门店管理权限'
                }],
                initialValue: admin ? '1' : '0',
              })(
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="岗位描述">
              {getFieldDecorator('description', {
                initialValue: description,
              })(
                <TextArea rows={3} placeholder="请输入岗位描述" maxLength="300" />
              )}
            </FormItem>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(PositionManage);