// 编制修改 弹框
import { Modal, Form, InputNumber } from 'antd';
import React from 'react';

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
        num,
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
            <FormItem {...formItemLayout} label="人数">
              {getFieldDecorator('num', {
                rules: [{
                  required: true, message: '请输人数'
                }],
                initialValue: num,
              })(
                <InputNumber min={1} max={10000} />
              )}
            </FormItem>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(PositionManage);