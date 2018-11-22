import React from 'react'
import { connect } from 'dva'
import { Button, Table, Modal, message, Divider } from 'antd'
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
    columns: [],
  }

  save(payload) {
    this.setState(payload);
  }

  UNSAFE_componentWillMount() {
    const self = this;
    let columns = [{
      title: '岗位',
      dataIndex: 'positionName',
    }, {
      title: '部门',
      dataIndex: 'pid',
    }, {
      title: '标配人数',
      dataIndex: 'num',
    }, {
      title: '在职人数', dataIndex: 'realNum',
    }, {
      title: '差异人数', dataIndex: 'difNum',
    }, {
      title: '操作',
      key: 'handle',
      align: 'center',
      width: 150,
      render(item) {
        return (
          <div>
            <span onClick={(e) => { self.handerModifySection(item) }} className={styles.operateBtn}>编辑</span>
            <Divider type="vertical" />
            <span onClick={(e) => { self.deletePositionById(item.id) }} className={styles.operateBtn}>删除</span>
          </div>
        )
      },
    }];

    this.save({
      columns,
    });
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

  // 修改岗位 弹框
  handerModifySection(data) {
    let self = this;
    const { id } = data;
    this.handerOpenModify({
      modifyTitle: '修改岗位',
      data,
      callBack(values) {
        let param = {};
        _.extend(param, values, {
          id,
        });
        services.updateUserStaffing(param)
          .then(({ data }) => {
            self.handerAjaxBack(data);
          });
      }
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
    const { visibleModify, modifyTitle, callBack, initialValue, data, columns } = this.state;
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

    let tableOpt = {
      rowKey: 'pid',
      dataSource: list || [],
      columns,
      locale: {
        emptyText: '暂无数据'
      },
      pagination: false,
    }

    return (
      <div className={styles.contentStyle}>
        <div className={styles.addBtnBox}>
          <Button type="primary" size="large" onClick={() => { self.handerAdd() }} style={{ width: '140px' }}>添加</Button>
        </div>
        <div><Table {...tableOpt} /></div>
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