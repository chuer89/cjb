import React, { Component } from 'react'
import { connect } from 'dva'
import { FormItem } from 'components'
import { SERVICE_TYPE } from '../config/enums'
import router from 'umi/router'
import { message } from 'antd'
import _ from 'lodash'
import { reg } from 'utils'

class CreateDeal extends Component {
  state = {
    mobileRegion: '86',
    mobile: '',
  }

  save(payload) {
    this.setState(payload);
  }

  render() {
    const {
      dispatch,
      createOrdersMeal: {
        farmName,
        farmId,
        realName,
        buyerId,
      },
    } = this.props
    const { mobileRegion, mobile } = this.state
    const self = this

    const handleOk = (values) => {
      
      if (!farmId) {
        message.error('农场名称不能为空，请输入正确的农场编号')
        return false
      }

      if (!buyerId) {
        message.error('用户姓名不能为空，请输入正确的手机号')
        return false
      }

      let param = {}
      _.extend(param, values, {
        farmId,
        buyerId,
      })
      dispatch({
        type: 'createOrdersMeal/addOrderDeal',
        payload: param,
      })
    }

    // 根据手机号，查询用户
    const handerGetUser = (payload) => {
      self.save(payload)
      let param = {
        mobile,
        mobileRegion,
      }
      _.extend(param, payload)
      if (reg.phone.test(param.mobile)) {
        dispatch({
          type: 'createOrdersMeal/getUserInfo',
          payload: param,
        })
      } else {
        dispatch({
          type: 'createOrdersMeal/updateState',
          payload: {
            buyerId: '',
            realName: '',
          }
        })
      }
    }

    const queryCondition = [
      {
        inputType: 'select',
        title: 'serviceType',
        label: '商品类型',
        itemConfig: {
          rules: [{
            required: true, message: '请选择商品类型',
          }],
          initialValue: '2',
        },
        ColConfig: {
          span: 24,
        },
        componentsConfig: {
          style: { width: 300 },
          placeholder: '请选择商品类型',
        },
        selectCondition: SERVICE_TYPE,
      },

      {
        inputType: 'input',
        title: 'farmId',
        label: '农场编码',
        itemConfig: {
          rules: [{
            required: true, message: '请输入农场编码',
            min: 8, message: '请输入正确的农场编码'
          }],
        },
        componentsConfig: {
          placeholder: '请输入农场编码',
          maxLength: 8,
          style: { width: 300 },
          onBlur({ target: { value } }) {
            if (value.length >= 8) {
              dispatch({
                type: 'createOrdersMeal/getFarmDetail',
                payload: {
                  farmNo: value,
                },
              })
            } else {
              dispatch({
                type: 'createOrdersMeal/updateState',
                payload: {
                  farmName: '',
                  farmId: '',
                }
              })
            }
          }
        },
        ColConfig: {
          span: 24,
        },
      },
      {
        inputType: 'countryPhone',
        title: 'mobile',
        label: '手机',
        itemConfig: {
          rules: [{
            required: true, message: '请输入手机号',
            pattern: reg.phone, message: '请输入正确的手机号',
          }]
        },
        ColConfig: {
          span: 24,
        },
        componentsConfig: {
          placeholder: '请输入手机号',
          style: { width: 300 },
          maxLength: 20,
          onBlur({ target: { value } }) {
            handerGetUser({
              mobile: value,
            })
          }
        },
        regionConfig: {
          initialValue: mobileRegion,
          key: 'mobileRegion',
          onChange(code) {
            handerGetUser({
              mobileRegion: code,
            })
          }
        },
      },

      {
        inputType: 'custom',
        title: 'farmName',
        label: '农场名称',
        render: (
          <span>{farmName || '无'}</span>
        ),
        ColConfig: {
          span: 24,
        },
      },
      {
        inputType: 'custom',
        title: 'realName',
        label: '用户姓名',
        render: (
          <span>{realName || '无'}</span>
        ),
        ColConfig: {
          span: 24,
        },
      },
      
      {
        inputType: 'inputNumber',
        title: 'price',
        label: '农场金额',
        itemConfig: {
          rules: [{
            required: true, message: '请输入农场金额',
          }],
        },
        componentsConfig: {
          placeholder: '请输入农场金额（元）',
          maxLength: 8,
          style: { width: 300 },
          max: 50000000,
          min: 0,
        },
        ColConfig: {
          span: 24,
        },
      },
      {
        inputType: 'textArea',
        title: 'comment',
        label: '备注',
        itemConfig: {
        },
        componentsConfig: {
          placeholder: '请输入备注',
          maxLength: 500,
          rows: 5,
        },
        ColConfig: {
          span: 24,
        },
      }
    ]

    return (
      <div>
        <h3>新增交易订单</h3>
        <FormItem {...{
          queryCondition,
          onSave: handleOk,
          onCancel() {
            // 返回列表页
            router.push('/orders/deal')
          }
        }} />
      </div>
    )
  }
}

export default connect(({ createOrdersMeal, loading }) => ({
  createOrdersMeal,
  loading
}))(CreateDeal)
