// 添加
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import { Breadcrumb, Tabs, message } from 'antd';
import { Link } from 'dva/router';
import _ from 'lodash';
import services from './../../services/';

import Department from '../../components/addUser/department'; // 员工归属
import Personal from '../../components/addUser/personal'; // 个人信息
import Basic from '../../components/addUser/basic'; // 基本信息
import Experience from '../../components/addUser/experience'; // 工作经验
import Portrayal from '../../components/addUser/portrayal'; // 用户画像

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
    let { personalDisabled, basicDisabled, experienceDisabled,
      portrayalDisabled, activeTabsKey, addUserParam } = addUser;

    let handerChange = (activeKey) => {
      dispatch({
        type: 'addUser/save',
        payload: {
          activeTabsKey: activeKey
        }
      });
    }
    let handerNextBase = (values, activeTabsKey) => {
      _.extend(addUserParam, values);
      dispatch({
        type: 'addUser/save',
        payload: {
          basicDisabled: false,
          activeTabsKey,
          addUserParam,
        }
      })
    }
    
    let departmentOpt = {
      handerNext(values) {
        handerNextBase(values, '1');
      }
    }
    let personalOpt = {
      handerNext(values) {
        handerNextBase(values, '2');
      }
    }
    let baseOpt = {
      handerNext(values) {
        // handerNextBase(values, '3');
        _.extend(addUserParam, values, {
          contractDate: '',
        });
        dispatch({
          type: 'addUser/addUser',
          payload: addUserParam,
        });
      }
    }
    let experienceOpt = {
      handerNext(param) {
        services.addUserWork({
          jsondata: JSON.stringify(param),
        }).then(({ data }) => {
          if (data.msg === 'success') {
            
          } else {
            message.error(data.msg);
          }
        });
      }
    }

    return (
      <App>
        <div style={{'paddingBottom': '12px'}}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="record">员工档案</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>添加用户</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={'contentBox'}>
          <Tabs activeKey={activeTabsKey} tabPosition="left" onChange={handerChange}>
            <TabPane tab="归属部门" key="0"><Department {...departmentOpt} /></TabPane>
            <TabPane tab="个人信息" key="1" disabled={personalDisabled}><Personal {...personalOpt} /></TabPane>
            <TabPane tab="基本信息" disabled={basicDisabled} key="2"><Basic {...baseOpt} /></TabPane>
            <TabPane tab="工作经历" disabled={experienceDisabled} key="3"><Experience {...experienceOpt} /></TabPane>
            <TabPane tab="员工画像" disabled={portrayalDisabled} key="4"><Portrayal /></TabPane>
          </Tabs>
        </div>
      </App>
    )
  }
}

export default connect((({ addUser }) => ({
  addUser,
})))(Add);