import React from 'react'
import { connect } from 'dva'
import { Button, Row, Col, Form, Input, message } from 'antd'
import styles from './index.less'
import Link from 'umi/link';
import services from '@services/';
import common from '@common';
import _ from 'lodash';
import Company from './components/company';

const FormItem = Form.Item;

class Login extends React.Component {
  state = {
    companyData: [],
    visibleCompany: false,

    phone: '',
    password: '',
    index: '',
    userType: '',
    vcode: '',

    smsLogin: false, // 短信登录
    checkLogin: '短信登录',

    isSendSms: false,
    sendSmsTips: '获取验证码',
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

  handerPhone(phone) {
    let self = this;
    if (common.reg.phone.test(phone)) {
      services.checkupCompany({
        phone,
      }).then(({ data }) => {
        let companyData = [];
        if (data.msg === 'success') {
          companyData = data.data;
          if (_.isEmpty(companyData)) {
            message.error('该手机号未注册');
          } else {
            // 如果当前只有一个角色，默认直接登录
            if (companyData.length === 1) {
              self.handerEntery({
                index: companyData[0].index,
                userType: companyData[0].userType,
              });
            } else {
              self.save({
                visibleCompany: true,
                companyData,
              });
            }
          }
        }
      });
    } else {
      message.error('手机号格式有误');
    }
  }

  handerEntery({ index, userType }) {
    let { dispatch } = this.props;
    let { phone, password, vcode } = this.state;
    dispatch({
      type: 'user/login',
      payload: {
        phone,
        password,
        index,
        userType,
        vcode,
      },
    });
  }

  handerSendCode(phone) {
    services.sendCode({
      phone
    }).then(({data}) => {
      if (data.msg === 'success') {
        message.success('请注意查收短信验证码');
      } else {
        message.error(data.msg);
      }
    })
  }

  render() {
    let {
      dispatch,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        getFieldValue,
      },
    } = this.props;
    let self = this;
    let { visibleCompany, companyData, smsLogin, checkLogin, isSendSms, sendSmsTips } = this.state;

    // 选择角色 组件
    let companyOpt = {
      visible: visibleCompany,
      companyData,
      handleOk({ index, userType }) {
        self.handerEntery({
          index,
          userType
        });
      },
      onCancel() {
        self.save({
          visibleCompany: false,
        });
      }
    }

    let handleOk = () => {
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }

        self.save({
          phone: values.phone,
          password: values.password,
          vcode: values.vcode,
        });

        self.handerPhone(values.phone);
      })
    };
    // 切换登录方式
    let changeLogin = () => {
      let checkLogin = '短信登录'
      if (!smsLogin) {
        checkLogin = '密码登录'
      }
      self.save({
        smsLogin: !smsLogin,
        checkLogin,
      })
    }

    // 发送验证码
    let handerSendSms = () => {
      let phone = getFieldValue('phone');
      if (!phone) {
        message.error('请输入正确的手机号');
        return false
      }

      self.save({
        isSendSms: true,
      })

      let time = 60;
      let interTime = setInterval(() => {
        time -= 1;
        if (!time) {
          self.save({
            isSendSms: false,
            sendSmsTips: '获取验证码',
          })
          clearInterval(interTime);
          return false;
        }
        self.save({
          sendSmsTips: time + '秒后，再试',
        })
      }, 1000)

      self.handerSendCode(phone)
    }

    let renderPassword = '';
    if (smsLogin) {
      renderPassword = (
        <FormItem>
          <Row gutter={8}>
            <Col span={14}>
              {getFieldDecorator('vcode', {
                rules: [
                  { required: true, message: '请输入短信验证码' },
                  { pattern: common.reg.msCode, message: '请输入正确短信验证码', }
                ],
              })(
                <Input maxLength={4} size="large" onPressEnter={handleOk} placeholder="短信验证码" />
              )}
            </Col>
            <Col span={10}>
              <Button disabled={isSendSms} size="large" onClick={handerSendSms}>{sendSmsTips}</Button>
            </Col>
          </Row>
        </FormItem>
      )
    } else {
      renderPassword = (
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true, message: '请输入密码'
              },
            ],
          })(<Input type="password" maxLength={32} size="large" autoComplete="off" onPressEnter={handleOk} placeholder="密码" />)}
        </FormItem>
      )
    }

    return (
      <div className={styles.form}>
        <div>
          <Company {...companyOpt} />
        </div>
        <div className={styles.logo}>
          <img src={require('@assets/logo.png')} alt="" />
          <span>餐匠帮运营系统</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true, message: '请输入手机号',
                  pattern: common.reg.phone, message: '请输入正确的手机号',
                },
              ],
            })(<Input size="large" maxLength={11} onPressEnter={handleOk} autoComplete="off" placeholder="手机号" />)}
          </FormItem>
          {renderPassword}
          <Row>
            <Button type="primary" size="large" onClick={handleOk} loading={false}>登录</Button>
          </Row>
        </form>
        <div style={{ 'paddingTop': '10px' }}>
          <span className={styles.smsLogin} onClick={changeLogin}>{checkLogin}</span>
          <Link to="/register">注册企业账号</Link>
        </div>
      </div>
    )
  }
}

export default connect(({ user }) => ({
  user,
}))(Form.create()(Login));
