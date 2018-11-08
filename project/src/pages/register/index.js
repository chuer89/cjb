import React from 'react'
import { connect } from 'dva'
import { Button, Form, Input } from 'antd'
import styles from './index.less'
import Link from 'umi/link';

const FormItem = Form.Item

class Register extends React.Component {
  state = {

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
          type: 'user/register',
          payload: values
        });
      })
    }

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    let paramData = [{
      label: '用户名', key: 'username', maxLen: 32,
    }, {
      label: '密码', key: 'password', maxLen: 32, type: 'password'
    }, {
      label: '手机号', key: 'phone', maxLen: 11,
    }, {
      label: '企业名称', key: 'ename', maxLen: 32,
    }, {
      label: '企业地址', key: 'address', maxLen: 128,
    }, {
      label: '企业负责人', key: 'director', maxLen: 32
    }, {
      label: '企业法人', key: 'legal', maxLen: 32
    }, {
      label: '负责人电话', key: 'responsiblePhone', maxLen: 11
    }];
    let renderInputParam = paramData.map((item, index) => {
      return (
        <FormItem key={index} hasFeedback {...formItemLayout} label={item.label}>
          {getFieldDecorator(item.key, {
            rules: [
              {
                required: true, message: '请输入' + item.label
              },
            ],
          })(<Input size="large" maxLength={32} type={item.type || 'text'}
            autoComplete="off" placeholder={'请输入' + item.label} />)}
        </FormItem>
      )
    })

    return (
      <div>
        <div className={styles.form}>
          <div className={styles.titleBox}>
            <h1 className={styles.title}>注册餐匠企业账号</h1>
          </div>
          <form>
            {renderInputParam}
            <div className={styles.operateBox}>
              <Button type="primary" size="large" className={styles.registerBtn} onClick={handleOk} loading={false}>注册</Button>
              <Link to="/login">去登录</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(({ loading }) => ({
  loading
}))(Form.create()(Register))