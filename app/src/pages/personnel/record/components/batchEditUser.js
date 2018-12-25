// 批量修改
import { Modal, Form, message, Radio, Select, DatePicker, Row, Col } from 'antd';
import React from 'react';
import DeptSele from '@components/seleDept/';
import { educationMap, rankTypeMap, contractTypeMap, statusMap } from '@components/addUser/config'
import _ from 'lodash';
import common from '@common';

const FormItem = Form.Item;
const Option = Select.Option;

class BatchEditUser extends React.Component {
  state = {
    // 学历
    education: educationMap,

    //岗位
    rankType: rankTypeMap,

    // 合同类型
    contractType: contractTypeMap,

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
      structure,
      userType,
      positionData,
    } = this.props;
    const { education, rankType, contractType, statusMapList } = this.state;

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

          const { guishu, insuranceTime } = values;

          let storeId = ''; // 门店
          let orgId = ''; // 组织
          let lastId = '';

          if (insuranceTime) {
            values.insuranceTime = common.format(insuranceTime);
          }

          if (!_.isEmpty(guishu)) {
            lastId = _.last(_.last(guishu).split('.'));

            if (guishu[0] === '2') {
              orgId = lastId;
            } else {
              storeId = lastId;
            }

            _.assign(values, {
              orgId,
              storeId,
            })
          }

          delete values.guishu;

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
    // 岗位
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

    // 岗位
    let renderPosition = ''
    if (!_.isEmpty(positionData)) {
      // 岗位筛选
      let renderProfessionLevel = positionData.map((item) => {
        return (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        )
      });
      renderPosition = (
        <FormItem {...formItemLayout} label="岗位">
          {getFieldDecorator('position')(
            <Select style={{ width: 120 }}>
              {renderProfessionLevel}
            </Select>
          )}
        </FormItem>
      )
    }

    // 在职状态
    let renderSeleStatus = statusMapList.map((item) => {
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
            <FormItem {...formItemLayout} label="所在部门">
              {getFieldDecorator('guishu')(
                <DeptSele {...deptOpt} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="意外险过期日期">
              {getFieldDecorator('insuranceTime')(
                <DatePicker />
              )}
            </FormItem>

            <Row>
              <Col offset={4} span={10}>
                <FormItem {...formItemLayout} label="性别">
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
                {renderPosition}
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="合同类型">
                  {getFieldDecorator('contractType')(
                    <Select style={{ width: 120 }}>
                      {renderContractType}
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


              </Col>
            </Row>
          </form>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(BatchEditUser);