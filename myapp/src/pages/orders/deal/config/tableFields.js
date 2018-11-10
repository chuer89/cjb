import { ORDER_STATUS, SERVICE_TYPE } from './enums'
// 意向单表头
export const tableFields = [
  {
    title: '订单编号',
    key: "orderNo",
  },
  {
    title: '商品类型',
    key: 'serviceType',
    enums: SERVICE_TYPE,
  },
  {
    title: '姓名',
    key: 'buyerName',
  },
  {
    title: '农场名称',
    key: 'farmName'
  },
  {
    title: '手机号',
    key: 'buyerMobile',
    render: (value, props) => {
      const { buyerMobileRegion } = props
      const mobileRegionValue = buyerMobileRegion ? `+${buyerMobileRegion} ${value || ''}` : value
      return <span>{mobileRegionValue}</span>
    }
  },
  {
    title: '订单金额(元)',
    key: 'price'
  },
  {
    title: '实付金额(元)',
    key: 'paidPrice'
  },
  {
    title: '订单状态',
    key: 'orderStatus',
    enums: ORDER_STATUS,
  },
  {
    title: '创建时间',
    type: 'datetime',
    key: 'createTime',
  }
]