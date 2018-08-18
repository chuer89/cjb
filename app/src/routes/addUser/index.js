// 添加
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import { Table, Icon, Divider, Button, Input, Select, Breadcrumb, Tabs } from 'antd';
import style from './add.less';
import { Link } from 'dva/router';

const TabPane = Tabs.TabPane;

class Add extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {};
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return (
      <App>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="record">员工档案</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>添加用户</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
            <TabPane tab="Tab 2" disabled key="2">Tab 2</TabPane>
            <TabPane tab="Tab 3" key="3">Tab 3</TabPane>
          </Tabs>
        </div>
      </App>
    )
  }
}

export default connect((({ addUser }) => ({
  addUser,
})))(Add);