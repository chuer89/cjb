// 详情
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import { Link } from 'dva/router';
import { Tabs, Breadcrumb } from 'antd';

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
    let { userDetails, portrayalImg } = editUser;
    let { defaultHead } = app;

    let callback = (key) => {
      if (key === '3') {
        dispatch({
          type: 'editUser/getUserPortrayalByUid'
        })
      } else if (key === '2') {
        // 工作记录
        dispatch({
          type: 'editUser/getUserSalaryRecordByUid'
        });

        // 岗位记录
        dispatch({
          type: 'editUser/getUserPositionRecordByUid'
        });
      }
    }

    let contentStyle = {
      'background': 'white',
      'padding': '15px',
    }

    let basicOpt = {
      userDetails,
      defaultHead,
    }

    let pictureOpt = {
      portrayalImg,
    }

    return (
      <App>
        <div style={{'paddingBottom': '12px'}}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/personnel/record">员工档案</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>员工详情</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div style={contentStyle}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="基本信息" key="1"><Basic {...basicOpt} /></TabPane>
            <TabPane tab="个人成长" key="2"><Expression /></TabPane>
            <TabPane tab="员工画像" key="3"><Picture {...pictureOpt} /></TabPane>
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