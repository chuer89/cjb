import React from 'react';
import { Form, Icon, Input, Button, Radio, DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import moment from 'moment';
import 'moment/locale/zh-cn';

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

// 基本信息
class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      // 职业级别
      professionLevel: [{
        value: '普通店员', code: '0'
      }, {
        value: '店长', code: '1'
      }, {
        value: '经理', code: '2'
      }, {
        value: '其他', code: '3'
      }]
    }
  }

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
    let { professionLevel } = this.state;

    let onChange = (date, dateString) => {
      console.log(date, dateString);
    }

    let handleChange = (value) => {
      console.log(value, 'v');
    }
    // 状态筛选
    let renderProfessionLevel = professionLevel.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });

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
        <FormItem {...formItemLayout} label="入职日期">
          {getFieldDecorator('ruDate', {
            rules: [{
              required: true, message: '请选择入职日期',
            }],
            initialValue: moment(new Date, 'YYYY-MM-DD')
          })(
            <DatePicker onChange={onChange} locale={locale} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="职级">
          {getFieldDecorator('level', {
            rules: [{
              required: true, message: '请选择职级',
            }],
          })(
            <Select style={{ width: 120 }} onChange={handleChange}>
              {renderProfessionLevel}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="在职状态">
          {getFieldDecorator('sex', {
            initialValue: '1',
            rules: [{ required: true, message: '请选择在职状态' }]
          })(
            <Radio.Group>
              <Radio value="1">在职</Radio>
              <Radio value="2">离职</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="合同有效期">
          {getFieldDecorator('heDate', {
            rules: [{
              required: true, message: '请选择合同有效期',
            }],
          })(
            <RangePicker onChange={onChange} locale={locale} />
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
