// 配置门店
import { Modal, Form, Input } from 'antd';
import React from 'react';

const FormItem = Form.Item;

class ConfigStore extends React.Component {
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
      title,
      initialValue,
    } = this.props;

    let handleOk = () => {
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }
        callBack(values);
      })
    };

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    return (
      <Modal
        title={title}
        width={600}
        centered={true}
        visible={visible}
        cancelText="取消"
        okText="确定"
        onOk={handleOk}
        onCancel={onCancel}>
        <div>
          <form>
            <FormItem {...formItemLayout} label="门店名称">
              {getFieldDecorator('values', {
                initialValue: initialValue.sname,
                rules: [{
                  required: true, message: "请输入门店名称"
                }],
              })(<Input onPressEnter={handleOk} autoComplete="off" placeholder={"请输入门店名称"} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="详细地址">
              {getFieldDecorator('referrer', {
                initialValue: initialValue.saddress,
                rules: [{
                  required: true, message: "请输入详细地址"
                }],
              })(
                <Input onPressEnter={handleOk} placeholder="请输入详细地址" autoComplete="off" maxLength="128" />
              )}
            </FormItem>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(ConfigStore);