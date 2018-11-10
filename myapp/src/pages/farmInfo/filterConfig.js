import {enumType} from './enum'

const {FARM_TYPE} = enumType;
export const filterConfig = {
  queryCondition: [ // 根据用户选择塞选
    {
      inputType: 'input',
      title: 'farmName',
      value: '',
      label: '农场名称',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请输入农场名称',
      }
    },
    {
      inputType: 'input',
      title: 'farmId',
      value: '',
      label: '农场ID',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请输入农场ID',
      }
    },
    {
      inputType: 'input',
      title: 'farmer',
      value: '',
      label: '农场主',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请输入农场主',
      }
    },
    {
      inputType: 'input',
      title: 'sellerAgencyName',
      value: '',
      label: '卖家中介',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请输入卖家中介',
      }
    },
    {
      inputType: 'rangePicker',
      title: 'time',
      value: '',
      label: '发布时间',
      itemConfig: {
        initialValue: ''
      },
    },
    {
      inputType: 'select',
      title: 'farmType',
      value: '',
      label: '农场类型',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请选择农场类型',
      },
      isAll: true,//是否全部，如果设置为true增会添加全部一项，false则不会
      selectCondition: FARM_TYPE
    },
    {
      inputType: 'select',
      title: 'isSales',
      value: '',
      label: '是否销售',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请选择是否销售',
      },
      isAll: true,
      selectCondition: [
        {
          label: '销售',
          value: 1,
        },
        {
          label: '不出售',
          value: 2,
        }
      ]
    },
    {
      inputType: 'select',
      title: 'auditStatus',
      value: '',
      label: '审核状态',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请选择审核状态',
      },
      isAll: true,
      selectCondition: [{
        label: '待审核',
        value: '10',
      },
        {
          label: '审核通过',
          value: '20',
        },
        {
          label: '审核失败',
          value: '30',
        },
      ]
    },
    {
      inputType: 'select',
      title: 'translateStatus',
      value: '',
      label: '翻译状态',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请选择翻译状态',
      },
      isAll: true,
      selectCondition: [{
        label: '待翻译',
        value: '10',
      }, {
        label: '已翻译',
        value: '20',
      }
      ]
    },
    {
      inputType: 'select',
      title: 'saleStatus',
      value: '',
      label: '出售状态',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请选择出售状态',
      },
      isAll: true,
      selectCondition: [{
        label: '出售中',
        value: '10',
      },
        {
          label: '已下架',
          value: '20',
        }
      ]
    },
    {
      inputType: 'select',
      title: 'confirmStatus',
      value: '',
      label: '修改状态',
      itemConfig: {
        initialValue: ''
      },
      componentsConfig: {
        placeholder: '请选择修改状态',
      },
      isAll: true,
      selectCondition: [{
        label: '已修改',
        value: '1',
      },
        {
          label: '未修改',
          value: '2',
        },
      ]
    },
    {
      inputType: 'hidden',
      title: 'publishTimeStart',
      value: '',
    },
    {
      inputType: 'hidden',
      title: 'publishTimeEnd',
      value: '',
    }]
}
