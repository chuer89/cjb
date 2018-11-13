// 职位 弹框
import { Modal, Form, Input, Radio, Select } from 'antd';
import React from 'react';
import DeptSele from '../../../../components/seleDept/';
import { educationMap, rankTypeMap, contractTypeMap } from '@components/addUser/config'
// import _ from 'lodash';

const FormItem = Form.Item;
const Option = Select.Option;

class BatchEditUser extends React.Component {
  state = {
    // 学历
    education: educationMap,

    //职级
    rankType: rankTypeMap,

    // 合同类型
    contractType: contractTypeMap,
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
      structure,
      userType,
    } = this.props;
    const { education, rankType, contractType } = this.state;

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

    // 学历
    let renderEducation = education.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });
    // 职级
    let renderRankType = rankType.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });
    // 合同类型
    let renderContractType = contractType.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });

    return (
      <Modal
        title="批量修改资料"
        width={800}
        destroyOnClose={true}
        visible={visible}
        centered={true}
        onOk={handerSubmit}
        onCancel={onCancel}>
        <div>
        <div id="js_sele_designate_department"></div>
          <form>
            <FormItem {...formItemLayout} label="员工归属">
              {getFieldDecorator('name')(
                <DeptSele {...deptOpt} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户性别">
              {getFieldDecorator('gender')(
                <Radio.Group>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="学历">
              {getFieldDecorator('education')(
                <Select style={{ width: 120 }}>
                  {renderEducation}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="职级">
              {getFieldDecorator('type')(
                <Select style={{ width: 120 }}>
                  {renderRankType}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="合同类型">
              {getFieldDecorator('contractType')(
                <Select style={{ width: 120 }}>
                  {renderContractType}
                </Select>
              )}
            </FormItem>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(BatchEditUser);