// 详情
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import { Tabs } from 'antd';

import Basic from './components/basic';
import Expression from './components/expression';
import Picture from './components/picture';

const TabPane = Tabs.TabPane;

class DetailsInfo extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {};
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    // let { details, dispatch } = this.props;

    let callback = (key) => {

    }

    let contentStyle = {
      'background': 'white',
      // 'height': '100vh',
      'padding': '15px',
    }

    return (
      <App>
        <div style={contentStyle}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="基本信息" key="1"><Basic /></TabPane>
            <TabPane tab="个人成长" key="2"><Expression /></TabPane>
            <TabPane tab="员工画像" key="3"><Picture /></TabPane>
          </Tabs>
        </div>
      </App>
    )
  }
}

export default connect((({ details }) => ({
  details,
})))(DetailsInfo);