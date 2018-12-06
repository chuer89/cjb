import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import style from './index.less';

import Wage from './components/wage';
import Position from './components/position';

const TabPane = Tabs.TabPane; // 工资记录

// 人事变化异动记录
class ChangeList extends React.Component {
  state = {

  }

  render() {
    const { dispatch, personnelChange: {
      postionBody,
      deptBody,
    } } = this.props;
    let handerChangeTab = (key) => {
      if (key === '2' && _.isEmpty(postionBody)) {
        dispatch({
          type: 'personnelChange/getPostion',
        })
      } else if (key === '4' && _.isEmpty(deptBody)) {
        dispatch({
          type: 'personnelChange/getDept'
        })
      }
    }

    return (
      <div className={style.content}>
        <Tabs defaultActiveKey="1" onChange={handerChangeTab}>
          <TabPane tab="工资调整记录" key="1"><Wage /></TabPane>
          <TabPane tab="岗位调整记录" key="2"><Position dataBody={postionBody} /></TabPane>
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