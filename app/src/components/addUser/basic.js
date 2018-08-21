import React from 'react';
import { Form, Icon, Input, Button, Radio } from 'antd';

const FormItem = Form.Item;

class BasicForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('email', {
            rules: [{
              required: true, message: '请输入姓名',
            }],
          })(
            <Input placeholder="请输入姓名" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="用户性别">
          {getFieldDecorator('sex', {
            initialValue: '1',
            rules: [{ required: true, message: '请选择性别' }]
          })(
            <Radio.Group>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="联系方式">
          {getFieldDecorator('phone', {
            rules: [{
              required: true, message: '请输入联系方式',
            }],
          })(
            <Input placeholder="请输入联系方式" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证">
          {getFieldDecorator('dell', {
            rules: [{
              required: true, message: '请输入身份证',
            }],
          })(
            <Input placeholder="请输入身份证" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">下一步</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedBasicForm = Form.create()(BasicForm);

const Basic = () => {
  return (
    <div>
      <div>基本信息</div>
      <WrappedBasicForm />
    </div>
  );
};

export default Basic;
