// 岗位 弹框
import { Modal, Form, Select, DatePicker, Input } from 'antd';
import React from 'react';
import { statusMap, resignationTypeMap } from '@components/addUser/config'
import _ from 'lodash';
import common from '@common';

const FormItem = Form.Item;
const Option = Select.Option;

class JobStatusUser extends React.Component {
  state = {
    // 在职状态
    statusMapList: statusMap,

    isSeleLeave: false,
  }

  render() {
    let {
      visible,
      onCancel,
      callBack,
      form: {
        getFieldDecorator,
        validateFields,
      },
    } = this.props;
    const { statusMapList, isSeleLeave } = this.state;
    const self = this;

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
          values.resignationTime = common.format(values.resignationTime);
          callBack(values);
        }
      });
    }

    // 在职状态
    let renderSeleStatus = statusMapList.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });

    let renderReason = '';
    if (isSeleLeave) {
      renderReason = (
        <div>
          <FormItem {...formItemLayout} label="离职原因">
            {getFieldDecorator('resignationType')(
              <Select style={{ width: 180 }}>
                {
                  resignationTypeMap.map((item) => {
                    return (
                      <Option value={item.code} key={item.code}>{item.value}</Option>
                    )
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="离职时间">
            {getFieldDecorator('resignationTime')(
              <DatePicker />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="原因备注">
            {getFieldDecorator('resignationReason')(
              <Input placeholder="请输入备注" autoComplete="off" maxLength="32" />
            )}
          </FormItem>
        </div>
      )
    }

    let handerChange = (values) => {
      let seleLeave = false;
      if (values === '3') {
        seleLeave = true;
      }
      self.setState({
        isSeleLeave: seleLeave,
      })
    }

    return (
      <Modal
        title="修改在职状态"
        width={600}
        destroyOnClose={true}
        visible={visible}
        centered={true}
        onOk={handerSubmit}
        onCancel={onCancel}>
        <div>
          <form>
            <FormItem {...formItemLayout} label="在职状态">
              {getFieldDecorator('status', {
                rules: [{
                  required: true, message: '请选择在职状态',
                }],
              })(
                <Select style={{ width: 180 }} placeholder="请选择在职状态" onChange={handerChange}>
                  {renderSeleStatus}
                </Select>
              )}
            </FormItem>
            {renderReason}
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(JobStatusUser);