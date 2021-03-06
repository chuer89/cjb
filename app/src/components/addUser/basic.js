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

      //岗位
      rankType: rankTypeMap,

      // 在职状态
      statusMapList: statusMap,

      tagTwoDepartment: '',

      // 附加信息
      additionInfoList: [{
        label: '银行卡号', placeholder: '请输入银行卡号', key: 'bankCard'
      }, {
        label: '开户银行', placeholder: '请输入开户银行', key: 'bank',
      }, {
        label: '籍贯', placeholder: '请输入籍贯', key: 'nativePlace',
      }, {
        label: '学校', placeholder: '请输入学校', key: 'school',
      }, {
        label: '专业', placeholder: '请输入专业', key: 'major',
      }, {
        label: '特长', placeholder: '请输入特长', key: 'specialty', maxLength: 64
      }, {
        label: '紧急联系人姓名', placeholder: '请输入紧急联系人姓名', key: 'emergencyContact'
      }, {
        label: '紧急联系人联系方式', placeholder: '请输入紧急联系人联系方式', key: 'emergencyContactPhone', maxLength: 11
      }, {
        label: '与紧急联系人关系', placeholder: '请输入与紧急联系人关系', key: 'emergencyContactRelation',
      }, {
        label: '现居地址', placeholder: '请输入现居地址', key: 'location',
      }, {
        label: '合同主体', placeholder: '请输入合同主体', key: 'contractSubject',
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

  handerFarmSave(e, cb) {
    e.preventDefault();
    let { form } = this.props;
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
        _.isFunction(cb) && cb(values);
      }
    });
  }

  onSave = (e) => {
    let { handerSave } = this.props;
    this.handerFarmSave(e, (values) => {
      handerSave(values);
    });
  }

  handleSubmit = (e, isFast) => {
    let { handerNext, handerFastEntry } = this.props;
    this.handerFarmSave(e, (values) => {
      if (isFast) {
        handerFastEntry(values)
      } else {
        handerNext(values);
      }
    });
  }

  render() {
    let { userDetails, form, positionData, twoDepartmentData, handerFastEntry, userMaster } = this.props;
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

    let isRequired = (key) => {
      return _.indexOf(userMaster, key) >= 0;
    }

    let onChange = (date, dateString) => {
      console.log(date, dateString);
    }

    let handleChange = (value) => {
      console.log(value, 'v');
    }

    let renderfastEntry = '';
    if (_.isFunction(handerFastEntry)) {
      renderfastEntry = (
        <Button size="large" onClick={(e) => {self.handleSubmit(e, true)}}>快速入职</Button>
      )
    }

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
          {getFieldDecorator('position', {
            initialValue: userDetails.position || '',
            rules: [{
              required: isRequired('position'), message: '请选择岗位',
            }],
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
            rules: [{
              required: isRequired('twoDepartment'), message: '请选择二级部门',
            }],
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
    // 推荐人 & 推荐人门店
    let renderRecommendChannel = '';
    if (isRecommendChannel || userDetails.applyChannel === 1) {
      renderRecommendChannel = (
        <div>
          <FormItem {...formItemLayout} label="推荐人">
            {getFieldDecorator('referrer', {
              initialValue: userDetails.referrer,
              rules: [{
                required: isRequired('referrer'), message: '请填写推荐人',
              }],
            })(
              <Input placeholder="请输入推荐人" autoComplete="off" maxLength="32" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="推荐人门店">
            {getFieldDecorator('referrerStore', {
              initialValue: userDetails.referrer,
              rules: [{
                required: isRequired('referrerStore'), message: '请填写推荐人门店',
              }],
            })(
              <Input placeholder="请输入推荐人门店" autoComplete="off" maxLength="32" />
            )}
          </FormItem>
        </div>
      )
    }

    // 附属信息
    let renderAddition = additionInfoList.map((item, index) => {
      let maxLength = item.maxLength || '32';
      return (
        <FormItem {...formItemLayout} label={item.label} key={index}>
          {getFieldDecorator(item.key, {
            initialValue: userDetails[item.key],
            rules: [{
              required: isRequired(item.key), message: '请填写' + item.label,
            }],
          })(
            <Input placeholder={item.placeholder} autoComplete="off" maxLength={maxLength} />
          )}
        </FormItem>
      )
    })

    let renderSave = (
      <Button type="primary" htmlType="submit" size="large" className={style.nextBtn}>下一步</Button>
    );
    if (!_.isEmpty(userDetails)) {
      renderSave = (
        <div>
          <Button type="primary" onClick={this.onSave} size="large" className={style.saveBtn}>保存</Button>
          <Button htmlType="submit">下一步</Button>
        </div>
      )
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="入职日期">
          {getFieldDecorator('joinTime', {
            rules: [{
              required: isRequired('joinTime'), message: '请选择入职日期',
            }],
            initialValue: joinTimeInit
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="健康证到期时间">
          {getFieldDecorator('healthCertificateTime', {
            initialValue: healthCertificateTimeInit,
            rules: [{
              required: isRequired('joinTime'), message: '请选择健康证到期时间',
            }],
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="职级">
          {getFieldDecorator('type', {
            rules: [{
              required: isRequired('type'), message: '请选择职级',
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
              required: isRequired('contractType'), message: '请选择合同类型',
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
              required: isRequired('contractDate'), message: '请选择合同有效期',
            }],
            initialValue: contractDateInit
          })(
            <RangePicker onChange={onChange} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="当前薪水">
          {getFieldDecorator('salary', {
            rules: [{
              required: isRequired('salary'), message: '请输入当前薪水',
            }],
            initialValue: userDetails.salary
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        {renderAddition}
        <FormItem {...formItemLayout} label="意外险过期日期">
          {getFieldDecorator('insuranceTime', {
            initialValue: insuranceTimeInit,
            rules: [{
              required: isRequired('insuranceTime'), message: '请填写意外险过期日期',
            }],
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="应聘渠道">
          {getFieldDecorator('applyChannel', {
            initialValue: '' + (userDetails.applyChannel || ''),
            rules: [{
              required: isRequired('applyChannel'), message: '请选择应聘渠道',
            }],
          })(
            <Select style={{ width: 120 }} onChange={handleChangeChannel}>
              {renderInvitationChannel}
            </Select>
          )}
        </FormItem>
        {renderRecommendChannel}
        <FormItem>
          <div className={style.submitNextBtnBox}>
            {renderSave}{renderfastEntry}
          </div>
        </FormItem>
      </Form>
    );
  }
}

const WrappedBasicForm = Form.create()(BasicForm);

const Basic = ({ handerNext, userDetails, positionData, twoDepartmentData, handerFastEntry, userMaster }) => {

  let opt = {
    handerNext,
    userDetails,
    positionData,
    twoDepartmentData,
    handerFastEntry,
    userMaster,
  };

  return (
    <div>
      <div className={style.titleBox}>上传基本信息</div>
      <WrappedBasicForm {...opt} />
    </div>
  );
};

export default Form.create()(BasicForm);
