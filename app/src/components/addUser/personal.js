import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Radio } from 'antd';

const FormItem = Form.Item;

// 个人信息
class PersonalForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  render() {
    let { handerNext, form } = this.props;
    const { getFieldDecorator } = form;

    let handleSubmit = (e) => {
      console.log(1)
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
      handerNext();
    }

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    return (
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
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

const WrappedPersonalForm = Form.create()(PersonalForm);

const Personal = ({ dispatch }) => {
  let handerNext = () => {
    dispatch({
      type: 'addUser/save',
      payload: {
        basicDisabled: false,
        activeTabsKey: '2'
      }
    })
  };

  let opt = {
    handerNext,
  };

  return (
    <div>
      <div>个人信息</div>
      <WrappedPersonalForm {...opt}/>
    </div>
  );
};

export default connect((({ addUser }) => ({
  addUser,
})))(Personal);
