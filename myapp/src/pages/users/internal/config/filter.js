import { STATUS } from './enums'
export const filters = [
  {
    inputType: 'select',
    title: 'accountType',
    value: '',
    isAll: true,
    label: '账户类型',
    componentsConfig: {
      placeholder: '请选择账户类型',
    },
    selectCondition: [],
  },
  {
    inputType: 'select',
    title: 'status',
    value: '',
    label: '账户状态',
    isAll: true,
    componentsConfig: {
      placeholder: '请选择账户状态',
    },
    selectCondition: STATUS,
  },
  {
    inputType: 'input',
    title: 'realName',
    value: '',
    label: '姓名',
    componentsConfig: {
      placeholder: '请输入姓名',
    },
  },
  {
    inputType: 'input',
    title: 'account',
    value: '',
    label: '账号',
    componentsConfig: {
      placeholder: '请输入账号',
    },
  },
  {
    inputType: 'phone',
    title: 'mobile',
    value: '',
    label: '手机号',
    componentsConfig: {
      placeholder: '请输入手机号',
    },
  },
]
