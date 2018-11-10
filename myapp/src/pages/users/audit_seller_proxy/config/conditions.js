import { AUDIT_STATUS } from './enums';

export const filters = {
  selectCondition: {
    status: AUDIT_STATUS,
  },
  queryCondition: [ // 根据用户选择塞选
    {
      inputType: 'select',
      title: 'status',
      value: '',
      label: '状态',
      itemConfig:{
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请选择',
      },
      selectCondition: [{
        label: '全部',
        value: '',
      }, ...AUDIT_STATUS],
    },
    {
      inputType: 'input',
      title: 'sellerAgencyName',
      value: '',
      label: '姓名',
      componentsConfig: {
        placeholder: '请输入姓名',
      }
    },
    {
      inputType: 'phone',
      title: 'mobile',
      value: '',
      label: '手机号',
      componentsConfig: {
        placeholder: '请输入手机号',
      }
    },
    {
      inputType: 'rangePicker',
      title: 'time',
      value: '',
      label: '提交时间',
      // placeholder: '请选择发布时间',
    }]
}
