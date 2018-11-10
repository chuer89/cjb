import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, message } from 'antd'
import TreeSelect from './components/tree_select'
import MyModal from './components/modal'
import { FormItem } from 'components'
import _ from 'lodash'
import { reg } from 'utils'
import router from 'umi/router'

class CreateAccount extends Component {

  state = {
    selectCountryNo: '86',
  }

  onChangeCountryNo = (value, callback) => {
    this.setState({ selectCountryNo: value }, callback)
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'createAccount/initState',
    })
  }
  render() {
    const {
      dispatch,
      createAccount: {
        authorityIsOk,
      },
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
      },
    } = this.props
    const { selectCountryNo } = this.state
    const { onChangeCountryNo } = this
    const emailAfter = '@worldfarm.com'

    // 树形选择change事件
    const onChange = (data) => {
      const pkeys = []
      data.forEach(item => {
        item.pkey && pkeys.push(item.pkey)
      })
      const authority = data.filter(item => {
        return pkeys.includes(item.key) ? false : true
      })
      getFieldDecorator('roles', {
        initialValue: authority, rules: [{
          required: true,
        }]
      })
      setFieldsValue({ 'roles': authority })
    }

    const queryCondition = [{
      inputType: 'input',
      title: 'realName',
      label: '姓名',
      itemConfig: {
        rules: [{
          required: true, message: '请输入姓名！',
        }],
      },
      componentsConfig: {
        placeholder: '请输入姓名',
        maxLength: 64,
        style: { width: 300 },
      },
      ColConfig: {
        span: 24,
      },
    }, {
      inputType: 'countryPhone',
      title: 'mobile',
      label: '手机',
      itemConfig: {
        initialValue: '',
        rules: [{
          required: true, message: '请输入手机号',
          pattern: reg.phone, message: '请输入正确的手机号',
        }]
      },
      componentsConfig: {
        placeholder: '请输入手机号',
        style: { width: 300 },
        maxLength: 20,
      },
      regionConfig: {
        initialValue: selectCountryNo,
        onChange(value) {
          onChangeCountryNo(value, () => {
            // 当选择国家是重新验证手机号码
            validateFields('mobile', {
              first: true,
              firstFields: 'mobile',
              force: true,
            }, (error) => {
              console.log(error)
            })
          })
        }
      },
      ColConfig: {
        span: 24,
      },
    }, {
      inputType: 'email',
      emailAfter,
      title: 'email',
      label: '邮箱',
      itemConfig: {
        rules: [{
          required: true, message: '请输入邮箱！',
        }],
      },
      componentsConfig: {
        placeholder: '请输入邮箱！',
        maxLength: 64,
        style: { width: 300 },
      },
      ColConfig: {
        span: 24,
      },
    }, {
      inputType: 'custom',
      title: 'rolesCustom',
      label: '权限设置',
      ColConfig: {
        span: 24,
      },
      render: (
        <TreeSelect onChange={onChange} />
      )
    }]

    let handleOk = (values) => {

      getFieldDecorator('mobileRegion', {
        initialValue: selectCountryNo, rules: [{
          required: true,
        }]
      })
      setFieldsValue({ 'mobileRegion': selectCountryNo })

      const formData = {
        ...getFieldsValue(),
      }
      const param = {...formData, ...values}
      param.email += emailAfter

      delete param.mobileRegionPrefix
      delete param.rolesCustom

      if (_.isEmpty(param.roles)) {
        message.error('请选择权限')
        return false
      }

      if (authorityIsOk) {
        dispatch({
          type: 'createAccount/updateState',
          payload: {
            formData: param,
            modalShow: true,
          },
        })
      }
    }

    return (
      <Form layout="horizontal" >
        <h1>新增账号</h1>
        <FormItem {...{
          queryCondition,
          onSave: handleOk,
          onCancel: () => {
            router.push('/users/internal')
          },
          containerStyle: { background: 'white' }
        }} />
        <MyModal />
      </Form>
    )
  }
}

CreateAccount.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  createAccount: PropTypes.object,
}

export default connect(({ createAccount, loading }) => ({ createAccount, loading }))(Form.create()(CreateAccount))
