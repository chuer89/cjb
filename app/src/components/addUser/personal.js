import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Radio, DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import _ from 'lodash';
import style from './add.less';

const FormItem = Form.Item;
const Option = Select.Option;

// 个人信息
class PersonalForm extends React.Component {
  state = {
    // 学历
    education: [{
      value: '大学', code: '1'
    }, {
      value: '高中', code: '2'
    }, {
      value: '初中', code: '3'
    }, {
      value: '其他', code: '4'
    }]
  }

  render() {
    let { handerNext, form } = this.props;
    const { getFieldDecorator } = form;
    const { education } = this.state;

    let handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values.idcardTime = moment(values.idcardTime).format('YYYY-MM-DD');
          handerNext(values);
        }
      });
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
          })(
            <Input placeholder="请输入姓名" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="用户性别">
          {getFieldDecorator('gender', {
            initialValue: '1',
          })(
            <Radio.Group>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="联系方式">
          {getFieldDecorator('phone', {
            rules: [{
              required: true, message: '请输入联系方式',
            }],
          })(
            <Input placeholder="请输入联系方式" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证">
          {getFieldDecorator('idcard', {
            rules: [{
              required: true, message: '请输入身份证',
            }],
          })(
            <Input placeholder="请输入身份证" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证到期日期">
          {getFieldDecorator('idcardTime', {
            rules: [{
              required: true, message: '请选择身份证到期日期',
            }],
          })(
            <DatePicker locale={locale} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="学历">
          {getFieldDecorator('education')(
            <Select style={{ width: 120 }}>
              {renderEducation}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="婚姻状态">
          {getFieldDecorator('marry')(
            <Radio.Group>
              <Radio value="1">已婚</Radio>
              <Radio value="0">未婚</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="生育状态">
          {getFieldDecorator('bear')(
            <Radio.Group>
              <Radio value="1">已育</Radio>
              <Radio value="0">未育</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="银行卡号">
          {getFieldDecorator('bankCard', {
            rules: [{
              required: true, message: '请输入银行卡号',
            }],
          })(
            <Input placeholder="请输入银行卡号" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="特长">
          {getFieldDecorator('specialty')(
            <Input placeholder="请输入特长" autoComplete="off" maxLength="64"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="紧急联系人姓名">
          {getFieldDecorator('emergencyContact')(
            <Input placeholder="请输入紧急联系人姓名" autoComplete="off" maxLength="32"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="紧急联系人联系方式">
          {getFieldDecorator('emergencyContactPhone')(
            <Input placeholder="请输入紧急联系人联系方式" autoComplete="off" maxLength="11"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">下一步</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedPersonalForm = Form.create()(PersonalForm);

const Personal = ({ dispatch, addUser }) => {
  let { addUserParam } = addUser;

  let handerNext = (values) => {
    _.extend(addUserParam, values);
    dispatch({
      type: 'addUser/save',
      payload: {
        basicDisabled: false,
        activeTabsKey: '2',
        addUserParam,
      }
    })
  };

  let opt = {
    handerNext,
  };

  return (
    <div>
      <div className={style.titleBox}>填写个人信息</div>
      <WrappedPersonalForm {...opt}/>
    </div>
  );
};

export default connect((({ addUser }) => ({
  addUser,
})))(Personal);
