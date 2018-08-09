import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';

function Dashboard() {
  NProgress.done();
  return (
    <App>
      <h1>仪表盘数据</h1>
    </App>
  );
}

export default connect()(Dashboard);
