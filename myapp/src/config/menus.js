const originMenus = [
  {
    name: '用户管理',
    children: [{
      name: '内部账号管理',
      route: '/users/internal',
      display: true,
      siblings: [{ // 兄弟节点，公用一个menu选中菜单
        name: '新增账号',
        route: '/users/internal/create',
      }],
    }, {
      name: '用户账号管理',
      route: '/users/account',
      display: true,
      siblings: [{
        name: '用户详情',
        route: '/users/account/detail/:id',
      }]
    }, {
      name: '卖家代理审核',
      route: '/users/audit_seller_proxy',
      display: true, // 是否显示在左侧菜单栏
      siblings: [{ // 兄弟节点，公用一个menu选中菜单
        name: '基础详情页',
        route: '/users/audit_seller_proxy/detail/:id',
      }]
    }]
  },
  {
    name: '会话管理',
    route: '/contact',
  },
  {
    name: '农场管理',
    children: [{
      name: '农场信息',
      route: '/farmInfo',
      display: true // 是否显示在左侧菜单栏
    },
      {
        name: '农场名录',
        route: '/farmInfo/farmDirectories',
        display: true // 是否显示在左侧菜单栏
      },
      {
        name: '新增农场',
        route: '/farmInfo/add',
        display: false
      }, {
        name: '审核农场',
        route: '/farmInfo/audit',
        display: false
      }, {
        name: '农场详情',
        route: '/farmInfo/details',
        display: false
      }, {
        name: '农场资质',
        route: '/farmInfo/farm_qualification',
        display: true
      }, {
        name: '资质详情',
        route: '/farmInfo/farm_qualification/details',
        display: false
      }, {
        name: '农场翻译',
        route: '/farmInfo/translate',
        display: false
      }]
  },
  {
    name: '商机管理',
    children: [{
      name: '意向订单管理',
      route: '/business/intention',
      display: true,
      siblings: [{
        name: '新增意向订单',
        route: '/business/intention/create'
      }]
    }],
  },
  {
    name: '订单管理',
    children: [{
      name: '交易订单管理',
      route: '/orders/deal',
      display: true,
      siblings: [{
        name: '新增交易向订单',
        route: '/orders/deal/create',
      }, {
        name: '交易订单详情',
        route: '/orders/deal/detail/:id',
      }]
    }],
  },
]

// const getMenus = (menus) => {
//   return menus.map(menu => {
//     const children = menu.children;
//     if (children) {
//       const siblings = children.siblings;
//       return {
//         id: menu.id,
//         name: menu.name,
//         route: menu.route,
//       }
//       if (siblings) {
//         siblings
//       }
//     }
//   })
// }

const resultMenus = originMenus.reduce((arr, menu, index) => {
  const {children = [], name = '', route = ''} = menu;
  const id = index + '1';
  arr.push({
    id,
    name,
    route
  })
  children.length && children.map(({name = '', route = '', display = true, siblings = []}, i) => {
    arr.push({
      id: id + i,
      bpid: id,
      mpid: display ? id : '-1',
      name,
      route,
    })
    siblings.length && siblings.map(({name = '', route = ''}, s) => {
      arr.push({
        id: id + i + s,
        bpid: id + i,
        mpid: '-1',
        name,
        route,
      })
    })
  });
  return arr;
}, [])

export default resultMenus;
