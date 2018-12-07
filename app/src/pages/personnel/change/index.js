import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import style from './index.less';

import Wage from './components/wage';
import Position from './components/position';
import Dept from './components/dept';
import UserType from './components/type';

const TabPane = Tabs.TabPane; // 工资记录

// 人事变化异动记录
class ChangeList extends React.Component {
  state = {

  }

  render() {
    const { dispatch, personnelChange: {
      postionBody,
      deptBody,
      userTypeBody,
      pageSize,

      positionSearch,
      deptSearch,
      userTypeSearch,
    } } = this.props;
    let handerChangeTab = (key) => {
      if (key === '1') {
        dispatch({
          type: 'personnelChange/getPostion',
        })
      } else if (key === '3') {
        dispatch({
          type: 'personnelChange/getDept'
        })
      } else if (key === '2') {
        dispatch({
          type: 'personnelChange/getUserType'
        })
      }
    }

    const postionProps = {
      dataBody: postionBody,
      pagination: {
        pageSize,
        total: postionBody.total || 0,
        current: positionSearch.page || 1,
        showTotal: (total, range) => {
          return `[${range.join('-')}]； 总计：${total}`
        }
      },
      onChange({ current }) {
        dispatch({
          type: 'personnelChange/getPostion',
          payload: {
            page: current,
          }
        })
      }
    }
    const deptProps = {
      dataBody: deptBody,
      pagination: {
        pageSize,
        total: deptBody.total || 0,
        current: deptSearch.page || 1,
        showTotal: (total, range) => {
          return `[${range.join('-')}]； 总计：${total}`
        }
      },
      onChange({ current }) {
        dispatch({
          type: 'personnelChange/getDept',
          payload: {
            page: current,
          }
        })
      }
    }
    const userTypeProps = {
      dataBody: userTypeBody,
      pagination: {
        pageSize,
        total: userTypeBody.total || 0,
        current: userTypeSearch.page || 1,
        showTotal: (total, range) => {
          return `[${range.join('-')}]； 总计：${total}`
        }
      },
      onChange({ current }) {
        dispatch({
          type: 'personnelChange/getUserType',
          payload: {
            page: current,
          }
        })
      }
    }

    return (
      <div className={style.content}>
        <Tabs defaultActiveKey="1" onChange={handerChangeTab}>
          <TabPane tab="岗位调整记录" key="1"><Position {...postionProps} /></TabPane>
          <TabPane tab="职级调整记录" key="2"><UserType {...userTypeProps} /></TabPane>
          <TabPane tab="部门调整记录" key="3"><Dept {...deptProps} /></TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect((({ user, personnelChange }) => ({
  user,
  personnelChange,
})))(ChangeList);