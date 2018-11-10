import { ORDER_STATUS, SERVICE_TYPE } from './enums'
export const filters = [
  {
    inputType: 'select',
    title: 'serviceType',
    value: '1',
    label: '商品类型',
    isAll: true,
    componentsConfig: {
      placeholder: '所有商品类型',
    },
    selectCondition: SERVICE_TYPE,
  },
  {
    inputType: 'select',
    title: 'status',
    value: '1',
    label: '订单状态',
    isAll: true,
    componentsConfig: {
      placeholder: '所有订单状态',
    },
    selectCondition: ORDER_STATUS,
  },
  {
    inputType: 'input',
    title: 'orderNo',
    value: '',
    label: '订单编号',
    componentsConfig: {
      placeholder: '所有订单',
    },
  },
  {
    inputType: 'input',
    title: 'name',
    value: '',
    label: '用户姓名',
    componentsConfig: {
      placeholder: '',
    },
  },
  {
    inputType: 'phone',
    title: 'mobile',
    value: '',
    label: '手机号',
    componentsConfig: {
      placeholder: '',
    },
  },
]
