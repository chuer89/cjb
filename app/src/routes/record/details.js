// 详情
import React from 'react';
import { connect } from 'dva';
import App from '../app';
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

  render() {
    let { editUser, dispatch, app } = this.props;
    let { userDetails, salaryRecord } = editUser;
    let { defaultHead } = app;

    let callback = (key) => {
      console.log(key);
      dispatch({
        type: 'editUser/getUserSalaryRecordByUid'
      })
    }

    let contentStyle = {
      'background': 'white',
      'padding': '15px',
    }

    let basicOpt = {
      userDetails,
      defaultHead,
    }
    let expressionOpt = {
      salaryRecord,
    }

    return (
      <App>
        <div style={contentStyle}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="基本信息" key="1"><Basic {...basicOpt} /></TabPane>
            <TabPane tab="个人成长" key="2"><Expression {...expressionOpt} /></TabPane>
            <TabPane tab="员工画像" key="3"><Picture /></TabPane>
          </Tabs>
        </div>
      </App>
    )
  }
}

export default connect((({ editUser, app }) => ({
  editUser,
  app,
})))(DetailsInfo);