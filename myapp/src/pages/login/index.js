import React from 'react'
import PropTypes from 'prop-types'
import {
  connect,
} from 'dva'
import {
  Button,
  Row,
  Form,
  Input,
  Divider,
} from 'antd'
import {
  source,
  base,
} from 'config'
import styles from './index.less'

const FormItem = Form.Item

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({
        type: 'login/login',
        payload: values,
      })
    })
  }

  return (<div className={
    styles.form
  }>
    <div className={
      styles.logo
    }>
      <img alt="logo"
        src={
          source.logoWhite
        }
      /> <Divider type="vertical"
      /> <span> {
        base.name
      }
      </span> </div> <form>
      <div className={
        styles.loginForm
      }>
        <div className={
          styles.loginText
        }> 员工编号 </div> <FormItem hasFeedback> {
          getFieldDecorator('account', {
            rules: [{
              required: true,
              message: '请输入员工编号',
            }],
            initialValue: '100089',
          })(< Input placeholder="请输入员工编号" onPressEnter={
            handleOk
          }
          />)}
        </FormItem> <div className={
          styles.loginText
        }> 登录密码 </div> <FormItem hasFeedback> {
          getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入登录密码',
            }],
            initialValue: '123456',
          })(< Input placeholder='请输入登录密码' type="password"
            onPressEnter={
              handleOk
            }
          />)}
        </FormItem> <Row>
          <Button type="primary"
            onClick={
              handleOk
            }
            loading={
              loading.effects['login/login']
            }>
            登1录 </Button> </Row> </div> </form> </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({
  loading,
}) => ({
  loading,
}))(Form.create()(Login))
