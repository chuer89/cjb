import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import style from './index.less';

import Wage from './components/wage';

const TabPane = Tabs.TabPane; // 工资记录

// 人事变化异动记录
class ChangeList extends React.Component {
  state = {

  }

  render() {
    let handerChangeTab = (key) => {
      console.log(key, 'key')
    }

    return (
      <div className={style.content}>
        <Tabs defaultActiveKey="1" onChange={handerChangeTab}>
          <TabPane tab="工资调整记录" key="1"><Wage /></TabPane>
          <TabPane tab="岗位调整记录" key="2">岗位调整记录</TabPane>
          <TabPane tab="职级调整记录" key="3">职级调整记录</TabPane>
          <TabPane tab="部门调整记录" key="4">部门调整记录</TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect((({ user, personnelChange }) => ({
  user,
  personnelChange,
})))(ChangeList);