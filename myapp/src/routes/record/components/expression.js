import React from 'react';
import style from './expression.less';
import { connect } from 'dva';

import SalaryRecord from './growup/salaryRecord';
import PositionRecord from './growup/positionRecord';

// 个人成长
class Expression extends React.Component {
  state = {
  }

  render() {
    let {
      editUser: {
        uid, salaryRecord, positionRecord, positionData
      },
      user: {
        userInfo: {
          userType
        }
      },
      dispatch 
    } = this.props;

    const showAdd = userType === 1 ? false : true;

    // 职位
    let salaryAttr = {
      uid,
      salaryRecord,
      showAdd,
      upSalaryList() {
        dispatch({
          type: 'editUser/getUserSalaryRecordByUid'
        });
      }
    }

    // 薪资调整记录
    let postionAttr = {
      uid,
      positionRecord,
      positionData,
      showAdd,
      upSalaryList() {
        dispatch({
          type: 'editUser/getUserPositionRecordByUid'
        });
      }
    }
    return (
      <div>
        <div className={style.itemBox}><SalaryRecord {...salaryAttr} /></div>
        <div className={style.itemBox}><PositionRecord {...postionAttr} /></div>
      </div>
    );
  }
};

export default connect((({ editUser, user }) => ({
  editUser,
  user,
})))(Expression);