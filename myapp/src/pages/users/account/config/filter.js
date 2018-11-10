import { STATUS } from './enums'
export const filters = [
  {
    inputType: 'select',
    title: 'status',
    value: '',
    isAll: true,
    label: '账户状态',
    selectCondition: STATUS,
    componentsConfig: {
      placeholder: '请选择账户状态',
    },
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
    inputType: 'phone',
    title: 'mobile',
    value: '',
    label: '手机号',
    componentsConfig: {
      placeholder: '请输入手机号',
    },
  },
  {
    inputType: 'input',
    title: 'email',
    value: '',
    label: '邮箱',
    componentsConfig: {
      placeholder: '请输入电子邮箱',
    },
  },
]
