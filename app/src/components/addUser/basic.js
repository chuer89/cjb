import React from 'react';
import { Form, Button, DatePicker, Select, Input, InputNumber } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import style from './add.less';

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
      invitationChannel: [{
        value: '社招', code: '0'
      }, {
        value: '内推', code: '1'
      }, {
        value: '其他', code: '2'
      }],

      // 合同类型
      contractType: [{
        value: '固定期限', code: '1'
      }, {
        value: '非固定期限', code: '2'
      }, {
        value: '试用', code: '3'
      }]
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { form, handerNext } = this.props;
    form.validateFields((err, values) => {
      console.log(values.contractDate, 'time')
      let contractStarttime = '';
      let contractEndtime = '';
      let joinTime = '';
      if (!err) {
        joinTime = moment(values.joinTime).format('YYYY-MM-DD');
        contractStarttime = moment(values.contractDate[0]).format('YYYY-MM-DD');
        contractEndtime = moment(values.contractDate[1]).format('YYYY-MM-DD');

        _.extend(values, {
          joinTime,
          contractStarttime,
          contractEndtime,
        });

        console.log('Received values of form: ', values);
        handerNext(values);
      }
    });
  }

  render() {
    let { userDetails, form, positionData } = this.props;
    const { getFieldDecorator } = form;
    let { invitationChannel, 
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
    // 状态筛选
    let renderProfessionLevel = positionData.map((item) => {
      return (
        <Option value={item.id} key={item.id}>{item.name}</Option>
      )
    });

    // 合同类型
    let renderContractType = contractType.map((item) => {
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
      if (_.toString(value) === '1') {
        self.setState({
          isRecommendChannel: true,
        });
      }
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

    // 职位
    let renderPosition = ''
    if (!_.isEmpty(positionData)) {
      renderPosition = (
        <FormItem {...formItemLayout} label="职级">
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
        {renderPosition}
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

const Basic = ({ handerNext, userDetails, positionData }) => {

  let opt = {
    handerNext,
    userDetails,
    positionData,
  };

  return (
    <div>
      <div className={style.titleBox}>上传基本信息</div>
      <WrappedBasicForm {...opt} />
    </div>
  );
};

export default Basic;
