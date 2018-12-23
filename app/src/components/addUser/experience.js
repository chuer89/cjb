import React from 'react';
import { Form, Input, Button, DatePicker, Icon, Row, Col } from 'antd';
import moment from 'moment';
import style from './add.less';
import _ from 'lodash';

// 工作经验
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

let uuid = 10;
class DynamicFieldSet extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      disabledAdd: false, // 是否禁止添加
      maxKeysLen: 3, // 至多工作条数
    };
  }

  remove = (k) => {
    const { form, handerDel, userWork } = this.props;
    const { maxKeysLen } = this.state;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });

    const keysLen = keys.length;
    if (keysLen <= maxKeysLen) {
      this.setState({
        disabledAdd: false,
      });
    }

    let id = _.get(userWork, k + '.id');
    if (id) {
      handerDel(id);
    }
  }

  add = () => {
    const { maxKeysLen } = this.state;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');

    const keysLen = keys.length;
    if (keysLen >= maxKeysLen) {
      return false;
    }

    const nextKeys = keys.concat(uuid);
    uuid++;

    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });

    if (keysLen >= maxKeysLen - 1) {
      this.setState({
        disabledAdd: true,
      });
    }
  }

  handerFarmSave(e, cb) {
    e.preventDefault();
    let { form, userWork } = this.props;
    form.validateFields((err, values) => {
      let { keys } = values;
      let params = [];

      if (!err) {
        console.log('Received values of form: ', values);

        _.forEach(keys, (item) => {
          let date = values['date_' + item];
          let employer = values['employer_' + item];
          let certifierInfo = values['certifierInfo_' + item];
          let certifier = values['certifier_' + item];
          let startdate = '';
          let enddate = '';
          let id = _.get(userWork, item + '.id');

          if (!_.isEmpty(date)) {
            startdate = moment(date[0]).format('YYYY-MM-DD');
            enddate = moment(date[1]).format('YYYY-MM-DD');
          }

          let workParm = {
            startdate,
            enddate,
            employer,
            certifierInfo,
            certifier,
          }
          if (id) {
            workParm.id = id;
          }

          if (startdate && enddate) {
            params.push(workParm);
          }

          _.isFunction(cb) && cb(params);
        });
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
    let { handerFastEntry, handerNext } = this.props;
    this.handerFarmSave(e, (params) => {
      if (isFast) {
        handerFastEntry(params);
      } else {
        handerNext(params);
      }
    })
  }

  render() {
    const { userWork, form, handerFastEntry } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { disabledAdd } = this.state;
    const formItemLayout = {
      // labelCol: {
      //   sm: { span: 4 },
      // },
      wrapperCol: {
        sm: { span: 22 },
      },
    };

    let renderSave = (
      <div>
        <Button type="primary" onClick={this.onSave} size="large" className={style.saveBtn}>保存</Button>
        <Button htmlType="submit">下一步</Button>
      </div>
    )
    let renderfastEntry = '';
    if (_.isFunction(handerFastEntry)) {
      renderfastEntry = (
        <Button size="large" onClick={(e) => { self.handleSubmit(e, true) }}>快速入职</Button>
      )

      renderSave = (
        <Button type="primary" htmlType="submit" size="large" className={style.nextBtn}>下一步</Button>
      )
    }

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        sm: { span: 20 },
      },
    };
    const delIconStyle = {
      'fontSize': '20px',
      'paddingTop': '4px',
    }

    let initialValue = ['1'];
    if (!_.isEmpty(userWork)) {
      initialValue = [];
      _.forEach(userWork, (item, index) => {
        initialValue.push(index);
      });
    }

    getFieldDecorator('keys', { initialValue });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      let startdate = _.get(userWork, k + '.startdate');
      let enddate = _.get(userWork, k + '.enddate');
      let date = [moment(startdate), moment(enddate)];

      return (
        <div key={index}>
          <Row>
            <Col span={7}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('date_' + k, {
                  initialValue: startdate && date,
                })(
                  <RangePicker />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('employer_' + k, {
                  initialValue: _.get(userWork, k + '.employer')
                })(
                  <Input placeholder="请输入公司名称" autoComplete="off" maxLength="32" />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('certifier_' + k, {
                  initialValue: _.get(userWork, k + '.certifier')
                })(
                  <Input placeholder="请输入证明人" autoComplete="off" maxLength="32" />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('certifierInfo_' + k, {
                  initialValue: _.get(userWork, k + '.certifierInfo')
                })(
                  <Input placeholder="请输入联系方式" autoComplete="off" maxLength="11" />
                )}
              </FormItem>
            </Col>
            <Col span={1}>
              <div style={delIconStyle}>
                {keys.length > 1 ? (
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={keys.length === 1}
                    onClick={() => this.remove(k)}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
        </div>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row className={style.workTipsBox}>
          <Col span={7}>工作时间</Col>
          <Col span={5}>公司名称</Col>
          <Col span={5}>证明人</Col>
          <Col span={5}>证明人联系方式</Col>
        </Row>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" size="large" disabled={disabledAdd} onClick={this.add} style={{ width: '30%' }}>
            <Icon type="plus" /> 添加工作经验
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <div className={style.submitNextBtnBox}>
            {renderSave}{renderfastEntry}
          </div>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

const Personal = ({ handerNext, userWork, handerDel, handerFastEntry }) => {
  let opt = {
    handerNext,
    userWork,
    handerDel,
    handerFastEntry,
  };

  return (
    <div>
      <div className={style.titleBox}>填写工作经历</div>
      <WrappedDynamicFieldSet {...opt} />
    </div>
  );
};

export default Form.create()(DynamicFieldSet);
