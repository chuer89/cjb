// 修改 弹框
import { Modal, Form, DatePicker, Input, InputNumber } from 'antd';
import React from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import _ from 'lodash';

const FormItem = Form.Item;
const { TextArea } = Input;

class AddSalary extends React.Component {
  state = {
  }

  render() {
    let {
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      visible,
      onCancel,
      callBack,
    } = this.props;

    let handleOk = () => {
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }
        let time = moment(values.time).format('YYYY-MM-DD');
        _.extend(values, {
          time,
        });
        callBack(values);
      })
    };

    let styleCss = {
      'width': '500px',
      'paddingTop': '24',
      'margin': '0 auto',
    }

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 17 },
      },
    };

    return (
      <Modal
        title="添加工资变更记录"
        width={800}
        destroyOnClose={true}
        visible={visible}
        cancelText="取消"
        okText="确定"
        onOk={handleOk}
        onCancel={onCancel}>
        <div style={styleCss}>
          <form>
            <FormItem {...formItemLayout} label="调整时间">
              {getFieldDecorator('time', {
                rules: [{
                  required: true, message: '请选择调整时间',
                }],
                initialValue: moment(new Date())
              })(
                <DatePicker locale={locale} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="调整前薪资">
              {getFieldDecorator('salaryBefore', {
                rules: [{
                  required: true, message: '请输入调整前薪资',
                }],
              })(
                <InputNumber formatter={value => `${value}元`} min={0} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="调整后薪资">
              {getFieldDecorator('salaryAfter', {
                rules: [{
                  required: true, message: '请输入调整后薪资',
                }],
              })(
                <InputNumber formatter={value => `${value}元`} min={0} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="原因">
              {getFieldDecorator('reason', {
                rules: [{
                  required: true, message: '请输入调整原因',
                }],
              })(
                <TextArea maxLength={120} rows={4} />
              )}
            </FormItem>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(AddSalary);