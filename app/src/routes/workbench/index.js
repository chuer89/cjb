import React from 'react';
import { connect } from 'dva';
import App from '../app';

function WorkBench() {
  return (
    <App>
      <h1>工作台内容</h1>
    </App>
  );
}

export default connect()(WorkBench);
