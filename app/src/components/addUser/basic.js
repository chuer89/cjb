import React from 'react';
import { Form, Button, DatePicker, Select, Input, InputNumber } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import style from './add.less';
import common from '@common';
import { invitationChannelMap, contractTypeMap, rankTypeMap, statusMap } from './config';

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

      // 在职状态
      statusMapList: statusMap,

      tagTwoDepartment: '',

      // 附加信息
      additionInfoList: [{
        label: '银行', placeholder: '请输入银行卡号', key: 'bank',
      }, {
        label: '籍贯', placeholder: '请输入籍贯', key: 'nativePlace',
      }, {
        label: '学校', placeholder: '请输入学校', key: 'school',
      }, {
        label: '专业', placeholder: '请输入专业', key: 'major',
      }, {
        label: '与紧急联系人关系', placeholder: '请输入与紧急联系人关系', key: 'emergencyContactRelation',
      }, {
        label: '现居地址', placeholder: '请输入现居地址', key: 'location',
      }, {
        label: '合同主体', placeholder: '请输入合同主体', key: 'contractSubject',
      }, {
        label: '推荐人门店', placeholder: '请输入推荐人门店', key: 'referrerStore',
      }, {
        label: '备注', placeholder: '请输入备注', key: 'remark',
      }]
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

  handleSubmit = (e, isFast) => {
    e.preventDefault();
    let { form, handerNext, handerFastEntry } = this.props;
    form.validateFields((err, values) => {
      let contractStarttime = '';
      let contractEndtime = '';
      let joinTime = '';
      let healthCertificateTime = '';
      let insuranceTime = '';

      if (!err) {
        joinTime = common.format(values.joinTime);
        insuranceTime = common.format(values.insuranceTime);
        healthCertificateTime = common.format(values.healthCertificateTime);
        contractStarttime = common.format(values.contractDate[0]);
        contractEndtime = common.format(values.contractDate[1]);

        let twoDepartment = values.twoDepartmentSele;
        if (twoDepartment === '-1') {
          twoDepartment = values.twoDepartmentOwn;
        }

        delete values.twoDepartmentSele;
        delete values.twoDepartmentOwn;
        delete values.contractDate;

        _.extend(values, {
          joinTime,
          insuranceTime,
          healthCertificateTime,
          contractStarttime,
          contractEndtime,
          twoDepartment,
        });

        console.log('Received values of form: ', values);
        if (isFast) {
          handerFastEntry(values)
        } else {
          handerNext(values);
        }
      }
    });
  }

  render() {
    let { userDetails, form, positionData, twoDepartmentData, handerFastEntry } = this.props;
    const { getFieldDecorator } = form;
    let { invitationChannel, rankType, tagTwoDepartment,
      isRecommendChannel, contractType, additionInfoList, statusMapList } = this.state;
    let self = this;

    userDetails = userDetails || {};
    let { joinTime, contractStarttime, contractEndtime, healthCertificateTime, insuranceTime } = userDetails;
    let joinTimeInit = moment(joinTime || new Date()) || null;
    let insuranceTimeInit = insuranceTime ? moment(insuranceTime) : null;
    let healthCertificateTimeInit = healthCertificateTime ? moment(healthCertificateTime) : null;
    let contractDateInit = contractStarttime ? [moment(contractStarttime), moment(contractEndtime)] : [];

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

    let renderfastEntry = '';
    if (_.isFunction(handerFastEntry)) {
      renderfastEntry = (
        <Button size="large" onClick={(e) => {self.handleSubmit(e, true)}}>立即入职</Button>
      )
    }

    // 职位
    let renderPosition = ''
    if (!_.isEmpty(positionData)) {
      // 职位筛选
      let renderProfessionLevel = positionData.map((item) => {
        return (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        )
      });
      renderPosition = (
        <FormItem {...formItemLayout} label="职位">
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
        let code = item;
        let name = item;
        if (item.code === '-1') {
          name = item.name;
          code = item.code;
        }

        return (
          <Option value={code} key={code}>{name}</Option>
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
          {getFieldDecorator('twoDepartmentOwn')(
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

    // 附属信息
    let renderAddition = additionInfoList.map((item, index) => {
      return (
        <FormItem {...formItemLayout} label={item.label} key={index}>
          {getFieldDecorator(item.key, {
            initialValue: userDetails[item.key],
          })(
            <Input placeholder={item.placeholder} autoComplete="off" maxLength="32" />
          )}
        </FormItem>
      )
    })

    // 在职状态
    let renderStatus = '';
    if (!_.isEmpty(userDetails)) {
      let renderSeleStatus = statusMapList.map((item) => {
        return (
          <Option value={item.code} key={item.code}>{item.value}</Option>
        )
      });
      renderStatus = (
        <FormItem {...formItemLayout} label="在职状态">
          {getFieldDecorator('status', {
            initialValue: '' + (userDetails.status || '')
          })(
            <Select style={{ width: 120 }}>
              {renderSeleStatus}
            </Select>
          )}
        </FormItem>
      )
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="入职日期">
          {getFieldDecorator('joinTime', {
            // rules: [{
            //   required: true, message: '请选择入职日期',
            // }],
            initialValue: joinTimeInit
          })(
            <DatePicker />
          )}
        </FormItem>
        {renderStatus}
        <FormItem {...formItemLayout} label="健康证到期时间">
          {getFieldDecorator('healthCertificateTime', {
            initialValue: healthCertificateTimeInit
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="职级">
          {getFieldDecorator('type', {
            // rules: [{
            //   required: true, message: '请选择职级',
            // }],
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
            // rules: [{
            //   required: true, message: '请选择合同类型',
            // }],
            initialValue: '' + (userDetails.contractType || '')
          })(
            <Select style={{ width: 120 }}>
              {renderContractType}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="合同有效期">
          {getFieldDecorator('contractDate', {
            // rules: [{
            //   required: true, message: '请选择合同有效期',
            // }],
            initialValue: contractDateInit
          })(
            <RangePicker onChange={onChange} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="当前薪水">
          {getFieldDecorator('salary', {
            // rules: [{
            //   required: true, message: '请输入当前薪水',
            // }],
            initialValue: userDetails.salary
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        {renderAddition}
        <FormItem {...formItemLayout} label="保险过期日期">
          {getFieldDecorator('insuranceTime', {
            initialValue: insuranceTimeInit
          })(
            <DatePicker />
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
          <div className={style.submitNextBtnBox}>
            <Button type="primary" htmlType="submit" size="large" className={style.nextBtn}>下一步</Button>
            {renderfastEntry}
          </div>
        </FormItem>
      </Form>
    );
  }
}

const WrappedBasicForm = Form.create()(BasicForm);

const Basic = ({ handerNext, userDetails, positionData, twoDepartmentData, handerFastEntry }) => {

  let opt = {
    handerNext,
    userDetails,
    positionData,
    twoDepartmentData,
    handerFastEntry,
  };

  return (
    <div>
      <div className={style.titleBox}>上传基本信息</div>
      <WrappedBasicForm {...opt} />
    </div>
  );
};

export default Basic;
