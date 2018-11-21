// 岗位 弹框
import { Modal, Form, Select } from 'antd';
import React from 'react';
import { statusMap } from '@components/addUser/config'
import _ from 'lodash';

const FormItem = Form.Item;
const Option = Select.Option;

class JobStatusUser extends React.Component {
  state = {
    // 在职状态
    statusMapList: statusMap,
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
    const { statusMapList } = this.state;

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

    // 在职状态
    let renderSeleStatus = statusMapList.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });

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
              {getFieldDecorator('status')(
                <Select style={{ width: 120 }}>
                  {renderSeleStatus}
                </Select>
              )}
            </FormItem>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(JobStatusUser);