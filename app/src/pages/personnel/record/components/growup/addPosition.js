// 修改 弹框
import { Modal, Form, DatePicker, Input, Select } from 'antd';
import React from 'react';
import moment from 'moment';
import _ from 'lodash';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddPosition extends React.Component {
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
      positionData,
    } = this.props;

    let handleOk = () => {
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }
        let time = moment(values.time).format('YYYY-MM-DD');
        _.extend(values, {
          time,
        });
        callBack(values);
      })
    };

    let styleCss = {
      'width': '500px',
      'paddingTop': '24',
      'margin': '0 auto',
    }

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 17 },
      },
    };

    // 职位
    let renderProfessionLevel = ''
    if (!_.isEmpty(positionData)) {
      // 职位筛选
      renderProfessionLevel = positionData.map((item) => {
        return (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        )
      });
    }

    return (
      <Modal
        title="添加工资变更记录"
        width={800}
        destroyOnClose={true}
        visible={visible}
        cancelText="取消"
        okText="确定"
        onOk={handleOk}
        onCancel={onCancel}>
        <div style={styleCss}>
          <form>
            <FormItem {...formItemLayout} label="变更后职位">
              {getFieldDecorator('pid', {
                rules: [{
                  required: true, message: '请选择变更后职位',
                }],
              })(
                <Select style={{ width: 120 }}>
                  {renderProfessionLevel}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="原因">
              {getFieldDecorator('remark', {
                rules: [{
                  required: true, message: '请输入调整原因',
                }],
              })(
                <TextArea maxLength={120} rows={4} />
              )}
            </FormItem>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(AddPosition);