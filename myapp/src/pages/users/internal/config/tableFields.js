import { STATUS } from './enums'
// 内部账号列表
export const tableFields = [
  {
    title: '类型',
    key: 'accountTypeDesc',
  },
  {
    title: '账号',
    key: 'account',
  },
  {
    title: '手机号',
    key: 'mobile',
    render: (value, props) => {
      const { mobileRegion } = props
      const mobileRegionValue = mobileRegion ? `+${mobileRegion} ${value}` : value
      return <span>{mobileRegionValue}</span>
    }
  },
  {
    title: '姓名',
    key: 'realName',
  },
  {
    title: '创建时间',
    key: 'createTime',
    type: 'datetime',
  },
  {
    title: '状态',
    key: 'statusDesc',
    enums: STATUS,
  },
]