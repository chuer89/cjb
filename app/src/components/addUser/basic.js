import React from 'react';
import { Form, Button, DatePicker, Select, Input, InputNumber } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import style from './add.less';
import common from './../../common';
import { invitationChannelMap, contractTypeMap, rankTypeMap } from './config';

// const { TextArea } = Input;

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

// 基本信息
class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      isRecommendChannel: false, // 是否内推

      // 应聘渠道
      invitationChannel: invitationChannelMap,

      // 合同类型
      contractType: contractTypeMap,

      //职级
      rankType: rankTypeMap,

      tagTwoDepartment: '',
    }
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

  handleSubmit = (e) => {
    e.preventDefault();
    let { form, handerNext } = this.props;
    form.validateFields((err, values) => {
      let contractStarttime = '';
      let contractEndtime = '';
      let joinTime = '';
      if (!err) {
        joinTime = moment(values.joinTime).format('YYYY-MM-DD');
        contractStarttime = moment(values.contractDate[0]).format('YYYY-MM-DD');
        contractEndtime = moment(values.contractDate[1]).format('YYYY-MM-DD');

        let twoDepartment = values.twoDepartmentSele;
        if (twoDepartment === '-1') {
          twoDepartment = values.twoDepartmentOwn;
        }

        delete values.twoDepartmentSele;
        delete values.twoDepartmentOwn;
        delete values.contractDate;

        _.extend(values, {
          joinTime,
          contractStarttime,
          contractEndtime,
          twoDepartment,
        });

        console.log('Received values of form: ', values);
        handerNext(values);
      }
    });
  }

  render() {
    let { userDetails, form, positionData, twoDepartmentData } = this.props;
    const { getFieldDecorator } = form;
    let { invitationChannel, rankType, tagTwoDepartment,
      isRecommendChannel, contractType } = this.state;
    let self = this;

    userDetails = userDetails || {};
    let { joinTime, contractStarttime, contractEndtime } = userDetails;
    let joinTimeInit = moment(joinTime || new Date()) || '';
    let contractDateInit = [moment(contractStarttime), moment(contractEndtime)];

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    let onChange = (date, dateString) => {
      console.log(date, dateString);
    }

    let handleChange = (value) => {
      console.log(value, 'v');
    }
    // 岗位筛选
    let renderProfessionLevel = positionData.map((item) => {
      return (
        <Option value={item.id} key={item.id}>{item.name}</Option>
      )
    });
    // 职位
    let renderPosition = ''
    if (!_.isEmpty(positionData)) {
      renderPosition = (
        <FormItem {...formItemLayout} label="岗位">
          {getFieldDecorator('position', {
            initialValue: userDetails.position || '',
          })(
            <Select style={{ width: 120 }}>
              {renderProfessionLevel}
            </Select>
          )}
        </FormItem>
      )
    }

    // 二级部门
    let handleTwoDepartmentChange = (value) => {
      self.save({
        tagTwoDepartment: _.toString(value),
      });
    }
    let renderTwoDepartment = '';
    if (!_.isEmpty(twoDepartmentData)) {
      let rendertwoDepartmentSele = twoDepartmentData.map((item, index) => {
        let code = index;
        let name = item;
        if (item.code === '-1') {
          name = item.name;
          code = item.code;
        }

        return (
          <Option key={code}>{name}</Option>
        )
      })
      renderTwoDepartment = (
        <FormItem {...formItemLayout} label="二级部门">
          {getFieldDecorator('twoDepartmentSele', {
            initialValue: userDetails.twoDepartment || '',
          })(
            <Select style={{ width: 120 }} onChange={handleTwoDepartmentChange}>
              {rendertwoDepartmentSele}
            </Select>
          )}
        </FormItem>
      )
      
    }
    // 自定义二级部门
    let renderTwoDepartmentOwn = '';
    if (tagTwoDepartment === '-1') {
      renderTwoDepartmentOwn = (
        <FormItem {...formItemLayout} label="自定义二级部门">
          {getFieldDecorator('twoDepartmentOwn', {
            initialValue: userDetails.referrer,
          })(
            <Input placeholder="请输入自定义二级部门" autoComplete="off" maxLength="32" />
          )}
        </FormItem>
      )
    }

    // 合同类型
    let renderContractType = contractType.map((item) => {
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

    // 招聘渠道
    let renderInvitationChannel = invitationChannel.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });
    let handleChangeChannel = (value) => {
      let channel = false;
      if (_.toString(value) === '1') {
        channel = true;
      }

      self.setState({
        isRecommendChannel: channel,
      });
    }
    // 推荐人
    let renderRecommendChannel = '';
    if (isRecommendChannel) {
      renderRecommendChannel = (
        <div>
          <FormItem {...formItemLayout} label="推荐人">
            {getFieldDecorator('referrer', {
              initialValue: userDetails.referrer,
            })(
              <Input placeholder="请输入推荐人" autoComplete="off" maxLength="32" />
            )}
          </FormItem>
        </div>
      )
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="入职日期">
          {getFieldDecorator('joinTime', {
            rules: [{
              required: true, message: '请选择入职日期',
            }],
            initialValue: joinTimeInit
          })(
            <DatePicker onChange={onChange} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="职级">
          {getFieldDecorator('type', {
            rules: [{
              required: true, message: '请选择职级',
            }],
            initialValue: '' + (userDetails.type || '')
          })(
            <Select style={{ width: 120 }}>
              {renderRankType}
            </Select>
          )}
        </FormItem>
        {renderPosition}
        {renderTwoDepartment}{renderTwoDepartmentOwn}
        <FormItem {...formItemLayout} label="合同类型">
          {getFieldDecorator('contractType', {
            rules: [{
              required: true, message: '请选择合同类型',
            }],
            initialValue: '' + (userDetails.contractType || '')
          })(
            <Select style={{ width: 120 }}>
              {renderContractType}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="合同有效期">
          {getFieldDecorator('contractDate', {
            rules: [{
              required: true, message: '请选择合同有效期',
            }],
            initialValue: contractDateInit
          })(
            <RangePicker onChange={onChange} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="当前薪水">
          {getFieldDecorator('salary', {
            rules: [{
              required: true, message: '请输入当前薪水',
            }],
            initialValue: userDetails.salary
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="应聘渠道">
          {getFieldDecorator('applyChannel', {
            initialValue: '' + (userDetails.applyChannel || '')
          })(
            <Select style={{ width: 120 }} onChange={handleChangeChannel}>
              {renderInvitationChannel}
            </Select>
          )}
        </FormItem>
        {renderRecommendChannel}
        <FormItem {...formItemLayout} label="特长">
          {getFieldDecorator('specialty', {
            initialValue: userDetails.specialty
          })(
            <Input placeholder="请输入特长" autoComplete="off" maxLength="64" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="紧急联系人姓名">
          {getFieldDecorator('emergencyContact', {
            initialValue: userDetails.emergencyContact,
          })(
            <Input placeholder="请输入紧急联系人姓名" autoComplete="off" maxLength="32" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="紧急联系人联系方式">
          {getFieldDecorator('emergencyContactPhone', {
            initialValue: userDetails.emergencyContactPhone,
            rules: [{
              pattern: common.reg.phone, message: '请输入正确的手机号',
            }],
          })(
            <Input placeholder="请输入紧急联系人联系方式" autoComplete="off" maxLength="11" />
          )}
        </FormItem>
        <FormItem>
          <div className={style.submitBtnBox}>
            <Button block type="primary" htmlType="submit" size="large">下一步</Button>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const WrappedBasicForm = Form.create()(BasicForm);

const Basic = ({ handerNext, userDetails, positionData, twoDepartmentData }) => {

  let opt = {
    handerNext,
    userDetails,
    positionData,
    twoDepartmentData,
  };

  return (
    <div>
      <div className={style.titleBox}>上传基本信息</div>
      <WrappedBasicForm {...opt} />
    </div>
  );
};

export default Basic;
