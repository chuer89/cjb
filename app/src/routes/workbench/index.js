import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';

function WorkBench() {
  NProgress.done();
  return (
    <App>
      <h1>工作台内容</h1>
    </App>
  );
}

export default connect()(WorkBench);