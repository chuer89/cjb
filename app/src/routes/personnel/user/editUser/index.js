// 添加
import React from 'react';
import { connect } from 'dva';
import App from '../../../app';
import { Breadcrumb, Tabs, message } from 'antd';
import { Link } from 'dva/router';
import _ from 'lodash';
import services from './../../../../services/';

import Personal from '../../../../components/addUser/personal'; // 个人信息
import Basic from '../../../../components/addUser/basic'; // 基本信息
import Experience from '../../../../components/addUser/experience'; // 工作经验
import Portrayal from '../../../../components/addUser/portrayal'; // 用户画像

const TabPane = Tabs.TabPane;

class Edit extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {};
  }

  render() {
    let { editUser, dispatch, app } = this.props;
    let { basicDisabled, experienceDisabled, 
      portrayalDisabled, activeTabsKey, userParam, uid,
      userWork, userDetails } = editUser;
    let { defaultImg } = app;

    // tab 切换
    let handerChange = (activeKey) => {
      dispatch({
        type: 'editUser/save',
        payload: {
          activeTabsKey: activeKey
        }
      });
    }

    // 个人信息
    let personalOpt = {
      userDetails,
      handerNext(values) {
        _.extend(userParam, values);
        dispatch({
          type: 'editUser/save',
          payload: {
            activeTabsKey: '2',
            userParam,
            basicDisabled: false,
          }
        });
      }
    }

    // 基本信息
    let baseOpt = {
      userDetails,
      handerNext(values) {
        _.extend(userParam, values, {
          contractDate: '',
          id: uid,
        });

        services.updateUser(userParam).then(({ data }) => {
          if (data.msg === 'success') {
            // 切换tab
            dispatch({
              type: 'editUser/save',
              payload: {
                experienceDisabled: false,
                activeTabsKey: '3',
              }
            });
            // 获取工作经验
            dispatch({
              type: 'editUser/getUserWorkByUid'
            });
          } else {
            message.error(data.msg);
          }
        });
      },
    }

    // 工作经验
    let experienceOpt = {
      userWork,
      handerNext(param) {
        _.forEach(param, (item) => {
          item.uid = uid;
        });
        
        services.addUserWork({
          jsondata: JSON.stringify(param),
        }).then(({ data }) => {
          if (data.msg === 'success') {
            dispatch({
              type: 'editUser/save',
              payload: {
                portrayalDisabled: false,
                activeTabsKey: '4',
              }
            })
          } else {
            message.error(data.msg);
          }
        });
      },
      handerDel(id) {
        services.deleteUserWorkById({
          ids: JSON.stringify([id])
        }).then(({ data }) => {
          if (data.msg === 'success') {
            
          } else {
            message.error(data.msg);
          }
        })
      }
    }

    // 员工画像
    let portrayalOpt = {
      action: services.addImg,
      defaultImg,
      handerNext() {
        
      }
    }

    return (
      <App>
        <div style={{'paddingBottom': '12px'}}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="record">员工档案</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>编辑用户</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={'contentBox'}>
          <Tabs activeKey={activeTabsKey} tabPosition="left" onChange={handerChange}>
            <TabPane tab="个人信息" key="1"><Personal {...personalOpt} /></TabPane>
            <TabPane tab="基本信息" disabled={basicDisabled} key="2"><Basic {...baseOpt} /></TabPane>
            <TabPane tab="工作经历" disabled={experienceDisabled} key="3"><Experience {...experienceOpt} /></TabPane>
            <TabPane tab="员工画像" disabled={portrayalDisabled} key="4"><Portrayal {...portrayalOpt} /></TabPane>
          </Tabs>
        </div>
      </App>
    )
  }
}

export default connect((({ editUser, app }) => ({
  editUser,
  app,
})))(Edit);