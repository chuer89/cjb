// 添加
import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Tabs, message } from 'antd';
import Link from 'umi/link';
import _ from 'lodash';
import services from '@services/';
import routerRedux from 'umi/router';

import Department from '@components/addUser/department'; // 员工归属
import Personal from '@components/addUser/personal'; // 个人信息
import Basic from '@components/addUser/basic'; // 基本信息
import Experience from '@components/addUser/experience'; // 工作经验
import Portrayal from '@components/addUser/portrayal'; // 用户画像

const TabPane = Tabs.TabPane;

class Edit extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {};
  }

  render() {
    let { editUser, dispatch, app, user } = this.props;
    let { personalDisabled, basicDisabled, experienceDisabled, twoDepartmentData,
      portrayalDisabled, activeTabsKey, userParam, uid, positionData,
      userWork, userDetails, portrayalImg, departmentType } = editUser;
    let { defaultImg } = app;
    const { userInfo: { token } } = user;

    // tab 切换
    let handerChange = (activeKey) => {
      dispatch({
        type: 'editUser/save',
        payload: {
          activeTabsKey: activeKey
        }
      });
    }

    // 归属
    let departmentOpt = {
      departmentType,
      userDetails,
      handerChange(departmentType) {
        dispatch({
          type: 'editUser/save',
          payload: {
            departmentType,
          }
        });
      },
      handerNext(values) {
        const { storeId } = values;
        _.extend(userParam, values);
        dispatch({
          type: 'editUser/save',
          payload: {
            personalDisabled: false,
            activeTabsKey: '1',
            userParam,
          }
        });
        // 请求岗位
        if (departmentType === '1' && storeId) {
          dispatch({
            type: 'editUser/getPosition',
          })

          // 二级部门
          dispatch({
            type: 'editUser/getTwoDepartmentBySid',
            payload: {
              sid: storeId,
            }
          })
        }
      }
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
      positionData,
      twoDepartmentData,
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
            });

            dispatch({
              type: 'editUser/getUserPortrayalByUid',
            });
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
      action: services.addImg + '?token=' + token,
      defaultImg,
      portrayalImg,
      handerNext(param) {
        _.extend(param, {
          uid,
        });

        services.addUserPortrayal(param).then(({ data }) => {
          if (data.msg === 'success') {
            message.success('员工修改成功')
            routerRedux.push({
              pathname: '/personnel/record'
            })
          } else {
            message.error(data.msg);
          }
        });
      }
    }

    return (
      <div>
        <div style={{'paddingBottom': '12px'}}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/personnel/record">员工档案</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>编辑用户</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={'contentBox'}>
          <Tabs activeKey={activeTabsKey} tabPosition="left" onChange={handerChange}>
            <TabPane tab="归属部门" key="0"><Department {...departmentOpt} /></TabPane>
            <TabPane tab="个人信息" disabled={personalDisabled} key="1"><Personal {...personalOpt} /></TabPane>
            <TabPane tab="基本信息" disabled={basicDisabled} key="2"><Basic {...baseOpt} /></TabPane>
            <TabPane tab="工作经历" disabled={experienceDisabled} key="3"><Experience {...experienceOpt} /></TabPane>
            <TabPane tab="员工画像" disabled={portrayalDisabled} key="4"><Portrayal {...portrayalOpt} /></TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default connect((({ editUser, app, user }) => ({
  editUser,
  app,
  user,
})))(Edit);