import { ORDER_STATUS, SERVICE_TYPE } from './enums'
export const filters = [
  {
    inputType: 'select',
    title: 'serviceType',
    value: '1',
    label: '商品类型',
    isAll: true,
    componentsConfig: {
      placeholder: '商品类型',
    },
    itemConfig: {
      initialValue: '2',
    },
    selectCondition: SERVICE_TYPE,
  },
  {
    inputType: 'input',
    title: 'orderNo',
    value: '',
    label: '订单编号',
    componentsConfig: {
      placeholder: '订单编号',
    },
  },
  {
    inputType: 'input',
    title: 'buyerName',
    value: '',
    label: '用户姓名',
    componentsConfig: {
      placeholder: '',
    },
  },
  {
    inputType: 'select',
    title: 'orderStatus',
    value: '1',
    label: '订单状态',
    isAll: true,
    componentsConfig: {
      placeholder: '订单状态',
    },
    selectCondition: ORDER_STATUS,
  },
  {
    inputType: 'input',
    title: 'farmName',
    value: '',
    label: '农场名称',
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
