import { Modal, Radio, message } from 'antd';
import React from 'react';
import style from './company.less';

const RadioGroup = Radio.Group;

// 选择用户角色身份
class Company extends React.Component {

  state = {
    value: ''
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  save(payload) {
    if (this._isMounted) {
      this.setState(payload);
    }
  }

  render() {
    let { handleOk, onCancel, visible, companyData } = this.props;
    let { value } = this.state;

    let onChange = (e) => {
      this.save({
        value: e.target.value
      });
    }
    let onOk = () => {
      let eid = '';
      let userType = '';
      let arr = [];

      if (!value) {
        message.error('请选择身份角色');
      } else {
        arr = value.split('_');
        eid = arr[0];
        userType = arr[1];

        handleOk({
          eid,
          userType,
        });
      }
    }

    return (
      <Modal
        title="选择用户身份"
        width={600}
        destroyOnClose={true}
        visible={visible}
        cancelText="取消"
        okText="进入系统"
        onOk={onOk}
        onCancel={onCancel}>
        <div className={style.content}>
          <RadioGroup onChange={onChange}>
            {
              companyData.map((item, index) => {
                return (
                  <Radio key={index} value={item.eid + '_' + item.userType}>{item.name}</Radio>
                )
              })
            }
          </RadioGroup>
        </div>
      </Modal>
    )
  }
};

export default Company;
