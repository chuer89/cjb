// 添加
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import { Table, Icon, Divider, Button, Input, Select, Breadcrumb, Tabs } from 'antd';
import style from './add.less';
import { Link } from 'dva/router';

import Personal from '../../components/addUser/personal'; // 个人信息
import Basic from '../../components/addUser/basic'; // 基本信息

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
    let { addUser, dispatch } = this.props;
    let { basicDisabled, experienceDisabled, portrayalDisabled, activeTabsKey } = addUser;

    let handerChange = (activeKey) => {
      dispatch({
        type: 'addUser/save',
        payload: {
          activeTabsKey: activeKey
        }
      });
    }

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
        <div className={style.content}>
          <Tabs activeKey={activeTabsKey} tabPosition="left" onChange={handerChange}>
            <TabPane tab="个人信息" key="1"><Personal /></TabPane>
            <TabPane tab="基本信息" disabled={basicDisabled} key="2"><Basic /></TabPane>
            <TabPane tab="工作经历" disabled={experienceDisabled} key="3">Tab 3</TabPane>
            <TabPane tab="员工画像" disabled={portrayalDisabled} key="4">Tab 3</TabPane>
          </Tabs>
        </div>
      </App>
    )
  }
}

export default connect((({ addUser }) => ({
  addUser,
})))(Add);