import React, { Component } from 'react'
import { connect } from 'dva'
import { FormItem } from 'components'
import { SERVICE_TYPE } from '../config/enums'
import router from 'umi/router'
import _ from 'lodash'
import { reg } from 'utils'

class CreateIntent extends Component {
  state = {
    mobileRegion: '86',
  }

  save(payload) {
    this.setState(payload);
  }

  render() {
    const {
      dispatch,
      createBusinessIntent: {
        farmName,
        farmId,
        address,
        totalArea,
      },
    } = this.props
    const { mobileRegion } = this.state

    const handleOk = (values) => {
      let param = {}
      _.extend(param, values, {
        farmId,
      })

      dispatch({
        type: 'createBusinessIntent/addIntent',
        payload: param,
      })
    }

    const queryCondition = [
      {
        inputType: 'select',
        title: 'serviceType',
        label: '开通服务',
        itemConfig: {
          rules: [{
            required: true, message: '请选择开通服务',
          }],
        },
        ColConfig: {
          span: 24,
        },
        componentsConfig: {
          style: { width: 300 },
          placeholder: '请选择开通服务',
        },
        selectCondition: SERVICE_TYPE,
      },
      {
        inputType: 'input',
        title: 'name',
        label: '用户姓名',
        componentsConfig: {
          placeholder: '请输入用户姓名',
          style: { width: 300 },
          maxLength: 50,
        },
        itemConfig: {
          rules: [{
            required: true, message: '请输入用户姓名',
          }],
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
        },
        regionConfig: {
          initialValue: mobileRegion,
          key: 'mobileRegion',
        },
      },
      {
        inputType: 'input',
        title: 'farmId',
        label: '农场编码',
        itemConfig: {
          rules: [{
            // required: true, message: '请输入农场编码',
            // min: 8, message: '请输入正确的农场编码'
          }],
        },
        componentsConfig: {
          placeholder: '请输入农场编码',
          maxLength: 8,
          style: { width: 300 },
          onBlur({ target: { value } }) {
            if (value.length >= 8) {
              dispatch({
                type: 'createBusinessIntent/getFarmDetail',
                payload: {
                  farmNo: value,
                },
              })
            } else {
              dispatch({
                type: 'createBusinessIntent/updateState',
                payload: {
                  farmName: '',
                  address: '',
                  totalArea: '',
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
        title: 'address',
        label: '农场地址',
        render: (
          <span>{address || '无'}</span>
        ),
        ColConfig: {
          span: 24,
        },
      },
      {
        inputType: 'custom',
        title: 'totalArea',
        label: '农场面积',
        render: (
          <span>{totalArea || '无'}</span>
        ),
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
            router.push('/business/intention')
          }
        }} />
      </div>
    )
  }
}

export default connect(({ createBusinessIntent, loading }) => ({
  createBusinessIntent,
  loading
}))(CreateIntent)
