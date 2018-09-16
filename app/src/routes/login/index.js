import React from 'react'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import styles from './index.less'
import NProgress from 'nprogress';
import { Link } from 'dva/router';

const FormItem = Form.Item;

class Login extends React.Component {
  state = {
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    let {
      dispatch,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
    } = this.props;


    let handleOk = () => {
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }
        dispatch({
          type: 'user/login',
          payload: values
        });
      })
    };

    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <div>CANJIANG餐匠</div>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true, message: '请输入用户名'
                },
              ],
            })(<Input size="large" onPressEnter={handleOk} autoComplete="off" placeholder="用户名" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true, message: '请输入密码'
                },
              ],
            })(<Input type="password" size="large" autoComplete="off" onPressEnter={handleOk} placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={handleOk} loading={false}>登录</Button>
          </Row>
        </form>
        <div style={{ 'paddingTop': '10px' }}>
          <Link to="/register">去注册</Link>
        </div>
      </div>
    )
  }
}

export default connect(({ user }) => ({
  user,
}))(Form.create()(Login));
