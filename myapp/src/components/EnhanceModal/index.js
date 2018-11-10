import React, { Component } from 'react'
import { Modal } from 'antd';

export default class EnhanceModal extends Component {
  constructor (props) {
    super(props);
    const { visible } = this.props;
    this.state = {
      visible: Boolean(visible),
    }
  }

  UNSAFE_componentWillReceiveProps ({ visible, confirmLoading }) {
    if (visible === false) {
      return this.setState({ visible });
    }
    if (visible && (visible !== this.props.visible)) {
      return this.setState({ visible: true });
    }
    if (confirmLoading !== undefined && confirmLoading.valueOf() === false && this.props.confirmLoading && this.props.confirmLoading.valueOf()) {
      if (!confirmLoading.hasOwnProperty('done') || confirmLoading.done) {
        this.setState({
          visible: false
        });
      }
    }
  }

  handleCancel = () => {
    if(this.props.onCustomCancel) {
      this.props.onCustomCancel();
      return false;
    }
    if (this.props.onCancel) {
      this.props.onCancel();
    }

    this.setState({
      visible: false
    });
  }

  handleOk = () => {
    const { confirmLoading, form, onOk } = this.props;
    const hideModal = () => {
      // 如果没有设置confirmLoading,则直接关闭窗口
      if (confirmLoading === undefined) {
        this.handleCancel();
      }
    };

    if (onOk && form) {
      const { validateFields } = form;
      validateFields((errors, values) => {
        if(errors) {
          console.log('errors')
        } else {
          onOk(values);
          hideModal();
        }
      });
    } else {
      onOk && onOk();
      hideModal();
    }
  }

  render() {
    let { confirmLoading } = this.props;
    if (confirmLoading !== undefined) {
      confirmLoading = confirmLoading.valueOf();
    }
    const modalProps = { ...this.props, confirmLoading, visible: true, onOk: this.handleOk, onCancel: this.handleCancel };
    return (
      <>{this.state.visible && <Modal {...modalProps} >{this.props.children}</Modal>}</>
    );
  }
}



