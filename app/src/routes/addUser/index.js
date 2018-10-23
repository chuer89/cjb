// 添加
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import { Breadcrumb, Tabs, message } from 'antd';
import { Link } from 'dva/router';
import _ from 'lodash';
import services from './../../services/';
import { routerRedux } from 'dva/router';

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
    this.state = {
      uid: '',
    };
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  save(payload) {
    if (this._isMounted) {
      this.setState(payload);
    }
  }

  render() {
    let self = this;
    let { uid } = this.state;
    let { addUser, dispatch, app } = this.props;
    let { defaultImg } = app;
    let { personalDisabled, basicDisabled, experienceDisabled, departmentType, positionData,
      portrayalDisabled, activeTabsKey, addUserParam } = addUser;

    let handerChange = (activeKey) => {
      dispatch({
        type: 'addUser/save',
        payload: {
          activeTabsKey: activeKey
        }
      });
    }
    
    // 归属
    let departmentOpt = {
      handerNext(values) {
        const { storeId } = values;
        _.extend(addUserParam, values);
        dispatch({
          type: 'addUser/save',
          payload: {
            personalDisabled: false,
            activeTabsKey: '1',
            addUserParam,
          }
        });
        // 请求岗位
        if (departmentType === '1' && storeId) {
          dispatch({
            type: 'addUser/getPosition',
            payload: {
              sid: storeId,
            }
          })

          // 二级部门
          dispatch({
            type: 'addUser/getTwoDepartmentBySid',
            payload: {
              sid: storeId,
            }
          })
        }
        console.log(addUserParam, departmentType, 'addp')
      }
    }

    // 个人信息
    let personalOpt = {
      handerNext(values) {
        _.extend(addUserParam, values);
        dispatch({
          type: 'addUser/save',
          payload: {
            activeTabsKey: '2',
            basicDisabled: false,
            addUserParam,
          }
        });
      }
    }
    
    // 基本信息
    let baseOpt = {
      positionData,
      handerNext(values) {
        _.extend(addUserParam, values, {
          contractDate: '',
        });

        services.addUser(addUserParam).then(({ data }) => {
          if (data.msg === 'success') {
            self.save({
              uid: data.data.id,
            });

            // 切换tab
            dispatch({
              type: 'addUser/save',
              payload: {
                experienceDisabled: false,
                activeTabsKey: '3',
              }
            });
          } else {
            message.error(data.msg);
          }
        });
      }
    }

    // 工作经历
    let experienceOpt = {
      handerNext(param) {
        _.forEach(param, (item) => {
          item.uid = uid;
        });

        services.addUserWork({
          jsondata: JSON.stringify(param),
        }).then(({ data }) => {
          if (data.msg === 'success') {
            dispatch({
              type: 'addUser/save',
              payload: {
                portrayalDisabled: false,
                activeTabsKey: '4',
              }
            })
          } else {
            message.error(data.msg);
          }
        });
      }
    }

    // 员工画像
    let portrayalOpt = {
      action: services.addImg,
      defaultImg,
      handerNext(param) {
        _.extend(param, {
          uid,
        });

        services.addUserPortrayal(param).then(({ data }) => {
          if (data.msg === 'success') {
            message.success('员工添加成功')
            dispatch(routerRedux.push({
              pathname: '/personnel/record'
            }));
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
              <Link to="/personnel/record">员工档案</Link>
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
            <TabPane tab="员工画像" disabled={portrayalDisabled} key="4"><Portrayal {...portrayalOpt} /></TabPane>
          </Tabs>
        </div>
      </App>
    )
  }
}

export default connect((({ addUser, app }) => ({
  addUser,
  app,
})))(Add);