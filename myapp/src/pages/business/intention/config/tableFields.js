import { ORDER_STATUS, SERVICE_TYPE } from './enums'
// 意向单表头
export const tableFields = [
  {
    title: '意愿单编号',
    key: "orderNo",
  },
  {
    title: '商品类型',
    key: 'serviceType',
    enums: SERVICE_TYPE,
  },
  {
    title: '姓名',
    key: 'name',
  },
  {
    title: '手机号',
    key: 'mobile',
    render: (value, props) => {
      const { mobileRegion } = props
      const mobileRegionValue = mobileRegion ? `+${mobileRegion} ${value || ''}` : value
      return <span>{mobileRegionValue}</span>
    }
  },
  {
    title: '邮箱地址',
    key: 'contactInformation',
  },
  {
    title: '农场名称',
    key: 'farmName',
  },
  {
    title: '订单状态',
    key: 'status',
    enums: ORDER_STATUS,
  },
  {
    title: '创建时间',
    type: 'datetime',
    key: 'createTime',
  }
]