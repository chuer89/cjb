import React from 'react';
import { connect } from 'dva';
import { Form, Button, DatePicker, Select, Input, Checkbox, InputNumber } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import _ from 'lodash';

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

      // 职业级别
      professionLevel: [{
        value: '普通店员', code: '0'
      }, {
        value: '店长', code: '1'
      }, {
        value: '经理', code: '2'
      }, {
        value: '其他', code: '3'
      }],

      // 应聘渠道
      invitationChannel: [{
        value: '社招', code: '0'
      }, {
        value: '内推', code: '1'
      }, {
        value: '其他', code: '2'
      }],

      // 店面关联
      storeRelevance: [{
        value: '瑶池', code: '1'
      }, {
        value: '功夫', code: '2'
      }, {
        value: '寝室', code: '3'
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

  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
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
    const { getFieldDecorator } = this.props.form;
    let { professionLevel, invitationChannel, 
      isRecommendChannel, storeRelevance, contractType } = this.state;
    let self = this;

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
    let renderProfessionLevel = professionLevel.map((item) => {
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
            {getFieldDecorator('tuijianren', {
              rules: [{
                required: true, message: '请输入推荐人',
              }],
            })(
              <Input placeholder="请输入推荐人" autoComplete="off" maxLength="32" />
            )}
          </FormItem>
        </div>
      )
    }

    // 店面关联
    let renderStoreRelevance = storeRelevance.map((item) => {
      return (
        <span key={item.code} style={{'paddingRight': '10px'}}>
          <Checkbox value={item.code}>{item.value}</Checkbox>
        </span>
      )
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="入职日期">
          {getFieldDecorator('joinTime', {
            rules: [{
              required: true, message: '请选择入职日期',
            }],
            initialValue: moment(new Date(), 'YYYY-MM-DD')
          })(
            <DatePicker onChange={onChange} locale={locale} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="职级">
          {getFieldDecorator('position')(
            <Select style={{ width: 120 }} onChange={handleChange}>
              {renderProfessionLevel}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="合同类型">
          {getFieldDecorator('contractType', {
            rules: [{
              required: true, message: '请选择合同类型',
            }],
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
          })(
            <RangePicker onChange={onChange} locale={locale} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="当前薪水">
          {getFieldDecorator('salary', {
            rules: [{
              required: true, message: '请输入当前薪水',
            }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="应聘渠道">
          {getFieldDecorator('applyChannel')(
            <Select style={{ width: 120 }} onChange={handleChangeChannel}>
              {renderInvitationChannel}
            </Select>
          )}
        </FormItem>
        {renderRecommendChannel}
        <FormItem {...formItemLayout} label="店面关联">
          {getFieldDecorator('storeRelevance')(
            <Checkbox.Group style={{ width: '100%' }}>
              <div>{renderStoreRelevance}</div>
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">下一步</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedBasicForm = Form.create()(BasicForm);

const Basic = ({ dispatch, addUser, loading }) => {
  let { addUserParam } = addUser;

  console.log(loading, 'lading');

  let handerNext = (values) => {
    _.extend(addUserParam, values, {
      contractDate: '',
    });
    console.log(addUserParam, 'add');
    dispatch({
      type: 'addUser/addUser',
      payload: addUserParam,
    });
    // dispatch({
    //   type: 'addUser/save',
    //   payload: {
    //     basicDisabled: false,
    //     activeTabsKey: '3',
    //     addUserParam,
    //   }
    // })
  };

  let opt = {
    handerNext,
  };

  return (
    <div>
      <div>基本信息</div>
      <WrappedBasicForm {...opt} />
    </div>
  );
};

export default connect((({ addUser, loading }) => ({
  addUser,
  loading,
})))(Basic);
