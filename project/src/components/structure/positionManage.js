// 岗位 弹框
import { Modal, Button } from 'antd';
import React from 'react';
// import _ from 'lodash';

class PositionManage extends React.Component {
  state = {
  }

  render() {
    let {
      visible,
      onCancel,
    } = this.props;

    return (
      <Modal
        title="岗位管理"
        width={600}
        destroyOnClose={true}
        visible={visible}
        centered={true}
        footer={null}
        onCancel={onCancel}>
        <div>
          <Button type="primary">添加门店</Button>
        </div>
      </Modal>
    )
  }
}

export default PositionManage;