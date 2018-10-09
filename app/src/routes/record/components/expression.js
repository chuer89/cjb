import React from 'react';
// import _ from 'lodash';
import style from './expression.less';
import { connect } from 'dva';

import SalaryRecord from './growup/salaryRecord';

// 个人成长
class Expression extends React.Component {
  state = {
  }

  render() {
    let { editUser, dispatch } = this.props;
    let { uid, salaryRecord } = editUser;
    let opt = {
      uid,
      salaryRecord,
      upSalaryList() {
        dispatch({
          type: 'editUser/getUserSalaryRecordByUid'
        });
      }
    }
    return (
      <div>
        <div className={style.itemBox}><SalaryRecord {...opt} /></div>
      </div>
    );
  }
};

export default connect((({ editUser }) => ({
  editUser,
})))(Expression);