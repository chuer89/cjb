// 订单状态 （10:待支付,20:已支付，30:关闭）
export const ORDER_STATUS = [{
  label: '待支付', value: '10',
}, {
  label: '已支付', value: '20',
}, {
  label: '已关闭', value: '30'
}]

// 商品类型
// 商品类型 1：农场交易，2：畜牧服务，3：翻译服务
export const SERVICE_TYPE = [{
  label: '畜牧服务1年', value: '2', 
}, {
  label: '农场交易', value: '1', disabled: true,
}, {
  label: '翻译服务', value: '3', disabled: true,
}]
