// 内部账号列表
export const tableFields = [
  {
    title: '用户ID',
    key: 'userId',
  },
  {
    title: '用户类型',
    key: 'accountTypeDesc',
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
    title: '注册时间',
    key: 'createTime',
    type: 'datetime',
  },
  {
    title: '状态',
    key: 'statusDesc',
  },
]