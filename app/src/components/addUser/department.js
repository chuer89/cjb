import React from 'react';
import { connect } from 'dva';
import { Form, Button, Radio } from 'antd';
import _ from 'lodash';
import style from './add.less';

const FormItem = Form.Item;

// 部门
class DepartmentForm extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { form, handerNext } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        handerNext(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

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
        <FormItem {...formItemLayout} label="员工归属">
          {getFieldDecorator('guishu', {
            initialValue: '1',
          })(
            <Radio.Group>
              <Radio value="1">门店</Radio>
              <Radio value="2">企业直管</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">下一步</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDepartmentForm = Form.create()(DepartmentForm);

const Department = ({ dispatch, addUser }) => {
  let { addUserParam } = addUser;

  let handerNext = (values) => {
    _.extend(addUserParam, values);
    dispatch({
      type: 'addUser/save',
      payload: {
        personalDisabled: false,
        activeTabsKey: '1',
        addUserParam,
      }
    })
  };

  let opt = {
    handerNext,
  };

  return (
    <div>
      <div className={style.titleBox}>填写归属部门</div>
      <WrappedDepartmentForm {...opt} />
    </div>
  );
};

export default connect((({ addUser }) => ({
  addUser,
})))(Department);
