import React from 'react';
import { connect } from 'dva';
import App from './app';

function IndexPage() {
  return (
    <App>
      <h1>这里是页面</h1>
    </App>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
