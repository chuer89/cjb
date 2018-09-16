// 修改 弹框
import { Modal, Button, Form, Input, message } from 'antd';
import React from 'react';
import styles from './modify.less';
import _ from 'lodash';

const FormItem = Form.Item;

class Modify extends React.Component {
  state = {
  }

  render() {
    let {
      dispatch,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      title,
      visible,
      onCancel,
      inputKey,
      inputLabel,
      initialValue,
      callBack,
    } = this.props;

    let handleOk = () => {
      validateFieldsAndScroll((errors, values) => {
        console.log('ok', errors, values)
        if (errors) {
          return
        }
        console.log(callBack, 'fun', values)
        callBack(values.values);
      })
    };

    return (
      <Modal
        title={title}
        width={600}
        destroyOnClose={true}
        visible={visible}
        cancelText="取消"
        okText="确定"
        onOk={handleOk}
        onCancel={onCancel}>
        <div className={styles.content}>
          <form>
            <FormItem>
              {getFieldDecorator('values', {
                rules: [
                  {
                    required: true, message: inputLabel
                  },
                ],
                initialValue,
              })(<Input size="large" onPressEnter={handleOk} autoComplete="off" placeholder={inputLabel} />)}
            </FormItem>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(Modify);