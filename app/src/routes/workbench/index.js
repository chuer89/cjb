import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
    }
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return (
      <App>
        <h1>工作台</h1>
      </App>
    );
  }
}

export default connect()(Dashboard);
