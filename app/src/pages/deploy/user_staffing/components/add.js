// 岗位 弹框
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import React from 'react';
import DeptSele from '@components/seleDept/';
// import _ from 'lodash';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class PositionManage extends React.Component {
  state = {
  }

  render() {
    let {
      visible,
      onCancel,
      callBack,
      title,
      structure,
      userType,
      form: {
        getFieldDecorator,
        validateFields,
      },
    } = this.props;
    const { positionStructure } = structure;

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
          const { guishu } = values;

          let sid = ''; // 门店
          let oid = ''; // 组织
          let lastId = '';

          if (_.isArray(guishu)) {
            lastId = _.last(_.last(guishu).split('.'));

            if (guishu[0] === '2') {
              oid = lastId;
            } else {
              sid = lastId;
            }

            _.assign(values, {
              oid,
              sid,
            })
          }

          delete values.guishu;
          
          callBack(values);
        }
      });
    }

    // 岗位筛选
    let renderPosition = '';
    if (!_.isEmpty(positionStructure)) {
      renderPosition = positionStructure.map((item) => {
        return (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        )
      });
    }

    let deptOpt = {
      structure,
      userType,
      onChange() {

      },
      getPopupContainerId: 'js_sele_designate_department',
      cascaderConfig: {
        changeOnSelect: false,
      }
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
          <div id="js_sele_designate_department"></div>
          <form>
            <FormItem {...formItemLayout} label="部门">
              {getFieldDecorator('guishu', {
                rules: [{
                  required: true, message: '请选择岗位'
                }],
              })(
                <DeptSele {...deptOpt} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="岗位">
              {getFieldDecorator('pid', {
                rules: [{
                  required: true, message: '请选择岗位'
                }],
              })(
                <Select placeholder="请选择岗位">
                  {renderPosition}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="人数">
              {getFieldDecorator('num', {
                rules: [{
                  required: true, message: '请输人数'
                }],
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