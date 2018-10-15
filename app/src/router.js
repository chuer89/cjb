import { Route, Switch, routerRedux, Redirect } from 'dva/router';

import dynamic from 'dva/dynamic';

const { ConnectedRouter } = routerRedux;

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  });

  const routes = [
    {
      path: '/404',
      component: () => import('./routes/error'),
    },
    {
      path: '/login', // 登陆页
      component: () => import('./routes/login/')
    },
    {
      path: '/register', // 注册
      component: () => import('./routes/register/')
    },
    {
      path: '/initstructure', // 初始化组织架构
      component: () => import('./routes/initStructure/'),
    },

    {
      path: '/personnel/index', // 工作台
      models: () => [import('./models/work')],
      component: () => import('./routes/personnel/workbench/')
    },
    {
      path: '/personnel/dashboard', // 仪表盘
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/')
    },
    {
      path: '/personnel/record', // 档案管理 - 列表
      models: () => [import('./models/record')],
      component: () => import('./routes/record/')
    },
    {
      path: '/personnel/userdetails/:id', // 档案管理 - 详情
      models: () => [import('./models/editUser')],
      component: () => import('./routes/record/details.js'),
    },
    {
      path: '/personnel/addUser', // 添加用户
      models: () => [import('./models/addUser')],
      component: () => import('./routes/addUser/')
    },
    {
      path: '/personnel/editUser/:id', // 编辑员工
      models: () => [import('./models/editUser')],
      component: () => import('./routes/personnel/user/editUser/')
    },

    {
      path: '/deploy/store', // 门店管理
      component: () => import('./routes/deploy/store/')
    }, {
      path: '/deploy/section', // 部门管理
      component: () => import('./routes/deploy/section/')
    },

    { // 课程概况
      path: '/course/summary',
      component: () => import('./routes/course/summary/')
    },
    { // 课程管理
      path: '/course/config',
      component: () => import('./routes/course/config/')
    },
    { // 课程管理 - 新增
      path: '/course/config/add',
      component: () => import('./routes/course/config/add')
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/login" />)} />
        {
          routes.map(({ path, ...dynamics }, key) => (
            <Route key={key}
              exact
              path={path}
              component={dynamic({
                app,
                ...dynamics,
              })}
            />
          ))
        }
        <Route component={error} />
      </Switch>
    </ConnectedRouter>
  )
}

export default Routers;