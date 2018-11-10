import React from "react";
import locale from 'antd/lib/date-picker/locale/zh_CN'
import { Col, Input, Select, DatePicker, InputNumber } from 'antd'
import { Item, CountryAddress, UploadFile, CountryRegion } from 'components'
import styles from './index.less'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input;

const phoneDefaultProps = (config) => {
  return {
    className: styles['filter-input-phone'],
    formatter: value => {
      const maxLen = config.maxLength || 20;
      value = value.toString().replace(/[^\d]/g,'');
      if(!maxLen) {
        return value;
      }
      if(value.length > maxLen) {
        return value.toString().substring(0, maxLen);
      }
      return value
    }
  }
}

export const ItemType = ({
  ColProps,
  queryCondition,
  form: {
    getFieldDecorator,
    setFieldsValue,
  },
}) => {
  const defaultColConfig = {
    xs: 24,
    sm: 12,
    md: 8,
    xl: 8,
    xxl: 8,
    style: {
      marginBottom: 16,
    }
  }
  const ColConfig = ColProps ? { ...defaultColConfig, ...ColProps } : defaultColConfig
  const type = (item) => {
    const type = item.inputType;
    const itemColConfig = item.ColConfig || ColConfig;
    switch (type) {
      case 'select':
        const _selectCondition = item.selectCondition ? [...item.selectCondition] : [];
        //检查isAll字段配置属性，如果为true则添加全部选项
        if (item.isAll) {
          _selectCondition.unshift({
            label: '全部',
            value: '',
          })
        }
        const defaultSelect = {
          getPopupContainer: () => document.getElementById('js_filter_box'), // 父级：下拉内容不会随着滚动条滚动
          style: { width: '100%' }
        }
        return (<Col key={item.title} {...itemColConfig}>
          <Item label={item.label}>
            {getFieldDecorator(item.title, { ...item.itemConfig })(<Select
              {...defaultSelect} {...item.componentsConfig}>
              {_selectCondition.map((_item) => {
                return (<Option key={_item.value} disabled={_item.disabled} value={_item.value}>{_item.label}</Option>)
              })}
            </Select>)}
          </Item>
        </Col>)
      case 'input':
        return (<Col key={item.title} {...itemColConfig}>
          <Item label={item.label}>
            {getFieldDecorator(item.title, { ...item.itemConfig })(<div><Input {...item.componentsConfig} />{item.transverse?<span style={{padding: "0 15px"}}>-</span>:null}</div>)}
          </Item>
        </Col>)
      case 'inputNumber':
        return (<Col key={item.title} {...itemColConfig}>
          <Item label={item.label}>
            {getFieldDecorator(item.title, { ...item.itemConfig })(<div><InputNumber {...item.componentsConfig} />{item.transverse?<span style={{padding: "0 15px"}}>-</span>:null}</div>)}
          </Item>
        </Col>)
      case 'phone':
        const config = item.componentsConfig || {};
        const inputNumberProps = {
          ...phoneDefaultProps(config),
          ...config,
        }
        return (<Col key={item.title} {...itemColConfig}>
          <Item label={item.label}>
            {getFieldDecorator(item.title, { ...item.itemConfig })(<InputNumber {...inputNumberProps} />)}
          </Item>
        </Col>)
      case 'textArea':
        return (<Col key={item.title} {...itemColConfig}>
          <Item label={item.label}>
            {getFieldDecorator(item.title, { ...item.itemConfig })(<TextArea {...item.componentsConfig} />)}
          </Item>
        </Col>)
      case 'rangePicker':
        return (<Col key={item.title} {...itemColConfig}>
          <Item label={item.label}>
            {getFieldDecorator(item.title, { ...item.itemConfig })(
              <RangePicker {...{ locale, ...item.componentsConfig }} />)}
          </Item>
        </Col>)
      case 'datePicker':
        return (<Col key={item.title} {...itemColConfig}>
          <Item label={item.label}>
            {getFieldDecorator(item.title, { ...item.itemConfig })(
              <DatePicker {...{ locale, ...item.componentsConfig }} />)}
          </Item>
        </Col>)
      case 'countryAddress':
        return (<Col key={item.title} {...itemColConfig}>
          <Item label={item.label}>
            {getFieldDecorator(item.title, { ...item.itemConfig })(
              <CountryAddress {...item.componentsConfig} />)}
          </Item>
        </Col>)
      case 'upload':
        return (
          <Col key={item.title} {...itemColConfig}>
            <Item label={item.label}>
              {getFieldDecorator(item.title, { ...item.itemConfig })(
                <UploadFile {...item.componentsConfig} />)}
            </Item>
          </Col>
        )
      case 'email':
        let emailAfter = item.emailAfter || '@worldfarm.com'
        return (<Col key={item.title} {...itemColConfig}>
          <Item label={item.label}>
            {getFieldDecorator(item.title, { ...item.itemConfig })(
              <Input {...item.componentsConfig} addonAfter={emailAfter} />
            )}
          </Item>
        </Col>)
      case 'countryPhone':
        let regionKey = item.regionConfig.key || 'mobileRegionPrefix'
        const prefixSelector = getFieldDecorator(regionKey, { ...item.regionConfig })(
          <CountryRegion {...item.regionConfig} />
        )
        return (
          <Col key={item.title} {...itemColConfig}>
            <Item label={item.label}>
              {getFieldDecorator(item.title, { ...item.itemConfig })(
                <Input addonBefore={prefixSelector} {...item.componentsConfig} />
              )}
            </Item>
          </Col>
        )
      case 'custom':
        return (
          <Col key={item.title} {...itemColConfig}>
            <Item label={item.label}>
              {getFieldDecorator(item.title, { ...item.itemConfig })(
                <div>{item.render}</div>
              )}
            </Item>
          </Col>
        )
      default: null
    }
  }

  return queryCondition.map(type)
}
