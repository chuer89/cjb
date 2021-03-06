// 修改 弹框
import { Modal, Form, Input } from 'antd';
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
      },
      title,
      visible,
      onCancel,
      inputLabel,
      initialValue,
      callBack,
    } = this.props;

    let handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }
        callBack(values.values);
      })
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