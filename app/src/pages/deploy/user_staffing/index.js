import React from 'react'
import { connect } from 'dva'
import { Button, Input, Row, Col, Modal, message } from 'antd'
import _ from 'lodash';
import services from '@services/';
import styles from './index.less'
import Modify from './components/modify';

const confirm = Modal.confirm;

// 岗位管理
class UserStaffing extends React.Component {
  state = {
    visibleModify: false,
    modifyTitle: '',
    callBack: () => { },
    initialValue: '',
    data: {},
  }

  save(payload) {
    this.setState(payload);
  }

  // 打开弹框
  handerOpenModify(payload) {
    _.extend(payload, {
      visibleModify: true,
    });
    this.save(payload);
  }
  // 关闭弹框
  handerCloseModify() {
    this.save({
      visibleModify: false,
    });
  }

  // 操作回调
  handerAjaxBack(data) {
    let { dispatch } = this.props;
    let self = this;
    if (data.msg === 'success') {
      self.handerCloseModify();
      message.success('操作成功');
      dispatch({
        type: 'userStaffing/getList'
      });
    } else {
      message.error(data.msg);
    }
  }

  // 确定删除
  handerShowDel(callBack) {
    confirm({
      title: '确定删除吗？',
      // content: '',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        callBack();
      },
      onCancel() { },
    });
  }

  // 新增
  handerAdd() {
    let self = this;
    this.handerOpenModify({
      modifyTitle: '添加编制',
      data: {},
      callBack(values) {
        services.addUserStaffing(values)
          .then(({ data }) => {
            self.handerAjaxBack(data);
          });
      }
    });
  }

  // 删除岗位
  deletePositionById(id) {
    let self = this;
    this.handerShowDel(() => {
      services.deleteUserStaffing({
        id,
      }).then(({ data }) => {
        self.handerAjaxBack(data);
      });
    });
  }

  render() {
    const {
      userStaffing: {
        list
      },
      structure,
      user: {
        userInfo: { userType }
      }
    } = this.props;
    const { visibleModify, modifyTitle, callBack, initialValue, data } = this.state;
    const self = this;

    let modifyOpt = {
      visible: visibleModify,
      title: modifyTitle,
      initialValue,
      onCancel() {
        self.save({
          visibleModify: false,
        });
      },
      callBack,
      data,
      structure,
      userType,
    }

    let renderStructure = '暂无数据';
    if (!_.isEmpty(list)) {
      renderStructure = list.map((item, index) => {
        return (
          <div key={index} className={styles.areaBox}>
            <div className={styles.titleBox}>
              <div className={styles.title}>
                <i className="iconfont">&#xe601;</i>
                {item.name}
              </div>
              <div className={styles.operateBox}>
                <span onClick={(e) => {self.handerModifySection(item)}}>编辑</span>
                <span onClick={(e) => {self.deletePositionById(item.id)}}>删除</span>
              </div>
            </div>
          </div>
        )
      })
    }
    return (
      <div className={styles.contentStyle}>
        <div className={styles.addBtnBox}>
          <Button type="primary" size="large" onClick={() => { self.handerAdd() }} style={{ width: '140px' }}>添加</Button>
        </div>
        <div>{renderStructure}</div>
        <div>
          <Modify {...modifyOpt} />
        </div>
      </div>
    )
  }
}

export default connect(({ userStaffing, structure, user }) => ({
  userStaffing,
  structure,
  user,
}))(UserStaffing)