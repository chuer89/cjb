import React from 'react';
import { Form, Input, Button, Radio, DatePicker, Select } from 'antd';
import _ from 'lodash';
import style from './add.less';
import common from './../../common';
import moment from 'moment';
import { educationMap } from './config';

const FormItem = Form.Item;
const Option = Select.Option;

// 个人信息
class PersonalForm extends React.Component {
  state = {
    // 学历
    education: educationMap
  }

  render() {
    let { handerNext, form, userDetails, handerFastEntry } = this.props;
    const { getFieldDecorator } = form;
    const { education } = this.state;

    userDetails = userDetails || {};
    let { idcardTime } = userDetails;
    let idcardTimeInit = idcardTime ? moment(idcardTime) : null;

    let handleSubmit = (e, fast) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values.idcardTime = common.format(values.idcardTime);
          if (fast) {
            handerFastEntry(values);
          } else {
            handerNext(values);
          }
        }
      });
    }
    let renderfastEntry = '';
    if (_.isFunction(handerFastEntry)) {
      renderfastEntry = (
        <Button size="large" onClick={(e) => { handleSubmit(e, true) }}>快速入职</Button>
      )
    }

    // 学历
    let renderEducation = education.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    return (
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入姓名',
            }],
            initialValue: userDetails.name,
          })(
            <Input placeholder="请输入姓名" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="用户性别">
          {getFieldDecorator('gender', {
            initialValue: '' + (userDetails.gender || '1'),
          })(
            <Radio.Group>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="联系方式">
          {getFieldDecorator('phone', {
            initialValue: userDetails.phone,
            rules: [{
              required: true, message: '请输入联系方式',
              pattern: common.reg.phone, message: '请输入正确的手机号',
            }],
          })(
            <Input placeholder="请输入联系方式" autoComplete="off" maxLength="11"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证">
          {getFieldDecorator('idcard', {
            rules: [{
              // required: true, message: '请输入身份证',
              pattern: common.reg.idcard, message: '请输入正确的身份证号',
            }],
            initialValue: userDetails.idcard,
          })(
            <Input placeholder="请输入身份证" autoComplete="off" maxLength="18"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证到期日期">
          {getFieldDecorator('idcardTime', {
            // rules: [{
            //   required: true, message: '请选择身份证到期日期',
            // }],
            initialValue: idcardTimeInit,
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证地址">
          {getFieldDecorator('idcardAddr', {
            // rules: [{
            //   required: true, message: '请输入身份证地址',
            // }],
            initialValue: userDetails.idcardAddr,
          })(
            <Input placeholder="请输入身份证地址" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="银行卡号">
          {getFieldDecorator('bankCard', {
            // rules: [{
            //   required: true, message: '请输入银行卡号',
            //   pattern: common.reg.bankCard, message: '请输入正确的银行卡号',
            // }],
            initialValue: userDetails.bankCard
          })(
            <Input placeholder="请输入银行卡号" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="学历">
          {getFieldDecorator('education', {
            initialValue: '' + (userDetails.education || ''),
          })(
            <Select style={{ width: 120 }}>
              {renderEducation}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="婚姻状态">
          {getFieldDecorator('marry', {
            initialValue: '' + (userDetails.marry || '0')
          })(
            <Radio.Group>
              <Radio value="0">未婚</Radio>
              <Radio value="1">已婚</Radio>
              <Radio value="2">离异</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="生育状态">
          {getFieldDecorator('bear', {
            initialValue: ''+ (userDetails.bear || '0'),
          })(
            <Radio.Group>
              <Radio value="0">未育</Radio>
              <Radio value="1">已育</Radio>
            </Radio.Group>
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

const WrappedPersonalForm = Form.create()(PersonalForm);

const Personal = ({ handerNext, userDetails, handerFastEntry }) => {
  let opt = {
    handerNext,
    userDetails,
    handerFastEntry,
  };

  return (
    <div>
      <div className={style.titleBox}>填写个人信息</div>
      <WrappedPersonalForm {...opt}/>
    </div>
  );
};

export default Personal;
