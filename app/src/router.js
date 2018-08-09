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
      path: '/index', // 首页
      models: () => [import('./models/example')],
      component: () => import('./routes/workbench/')
    },
    {
      path: '/login', // 登陆页
      component: () => import('./routes/login/')
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/index" />)} />
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