// 修改 弹框
import { Modal, Form, Input, Radio } from 'antd';
import React from 'react';
import styles from './modify.less';
// import _ from 'lodash';

const FormItem = Form.Item;

class Modify extends React.Component {
  state = {
  }

  render() {
    let {
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        validateFields,
      },
      title,
      visible,
      onCancel,
      inputLabel,
      initialValue: {
        hr,
        name,
      },
      callBack,
    } = this.props;

    let handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }
        callBack(values);
      })
    };

    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    return (
      <Modal
        title={title}
        width={600}
        destroyOnClose={true}
        visible={visible}
        onOk={handleOk}
        okText="确定"
        cancelText="取消"
        centered={true}
        onCancel={onCancel}>
        <div className={styles.content}>
          <form>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: inputLabel
                  },
                ],
                initialValue: name,
              })(<Input size="large" onPressEnter={handleOk} autoComplete="off" placeholder={inputLabel} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="是否是人力资源">
              {getFieldDecorator('hr', {
                rules: [{
                  required: true, message: '请选择是否是否是人力资源'
                }],
                initialValue: hr ? '1' : '0',
              })(
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(Modify);