import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

function IndexPage() {
  return (
    <div>
      <h1>错误页面</h1>
      <Button>错误页面</Button>
    </div>
  );
}

export default connect()(IndexPage);
