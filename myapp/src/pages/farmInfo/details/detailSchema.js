export const detailsSchema = {
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
    },
    {
      'title': '农场类型以及降雨量',
      'item': [
        {
          'label': '降雨量',
          'key': 'rainfall',
          'content': ''
        }, {
          'label': '农场类型',
          'key': 'typeDesc',
          'content': ''
        },
        {
          'label': '永久权或租赁权',
          'key': 'landRightsDesc',
          'content': ''
        },
      ]
    }, {
      'title': '农场详细介绍',
      'item': [
        {
          'label': '土地酸碱度',
          'key': 'soilPhDesc',
          'content': ''
        }, {
          'label': '土壤类型',
          'key': 'soilTypeDesc',
          'content': ''
        },
        {
          'label': '可用水源',
          'key': 'waterRights',
          'content': ''
        },
        {
          'label': '土地使用规定',
          'key': 'regulations',
          'content': ''
        },
        {
          'label': '杂草和害虫',
          'key': 'disadvantage',
          'content': ''
        },
      ]
    },{
      'title': '农场主信息',
      'item': [
        {
          'label': '农场主姓名',
          'key': 'farmer_realName',
          'content': ''
        }, {
          'label': '农场主性别',
          'key': 'farmer_sexDesc',
          'content': ''
        },
        {
          'label': '农场主生日',
          'key': 'farmer_birthday',
          'content': ''
        },
        {
          'label': '农场主联系电话',
          'key': 'farmer_mobile',
          'content': ''
        },
        {
          'label': '名下农场数',
          'key': 'farmer_ownedFarmerNum',
          'content': ''
        },
        {
          'label': '农场主联系地址',
          'key': 'farmer_address',
          'content': ''
        },
      ]
    }
  ]
}
