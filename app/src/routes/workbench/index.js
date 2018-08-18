import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import { Card, Button, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

// 工作台
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    let self = this;
    NProgress.done();
    setTimeout(() => {
      self.setState({
        loading: false,
      })
    }, 2000)
  }

  render() {
    let { loading } = this.state;

    return (
      <App>
        <h1>工作台</h1>
        <Card loading={loading} title="人事概况">
          <Tabs tabPosition={'left'}>
            <TabPane tab="全部" key="1">Content of Tab 1</TabPane>
            <TabPane tab="预警" key="2">Content of Tab 2</TabPane>
            <TabPane tab="提醒" key="3">Content of Tab 3</TabPane>
          </Tabs>
        </Card>
      </App>
    );
  }
}

export default connect()(Dashboard);
