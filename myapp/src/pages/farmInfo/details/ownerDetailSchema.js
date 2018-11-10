export const  ownerDetailsSchema= {
  detailsInfo: [
    {
      'title': '农场信息',
      'item': [
        {
          'label': '农场名称',
          'key': 'farmName',
          'content': ''
        },
        {
          'label': '是否销售',
          'key': 'isSaleDesc',
          'content': ''
        },
        {
          'label': '农场面积',
          'key': 'area',
          'content': '',
          unit:'亩'
        },
        {
          'label': '农场单价',
          key: 'unitPrice',
          'content': '',
          unit:'元/亩'
        },
        {
          'label': '农场总价',
          key: 'totalPrice',
          'content': '',
          unit:'元'
        },
        {
          'label': '农场地址',
          'key': 'provinceId',
          'content': ''
        },
        {
          'label': '农场详细地址',
          'key': 'address',
          'content': '',
          'ColConfig': {
            xs: 24,
            sm: 24,
            md: 24,
            xl: 24,
            xxl: 24
          },
        }
      ]
    }
  ]
}
