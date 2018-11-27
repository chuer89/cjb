import React from 'react'
import { connect } from 'dva'
import { Button, Table, Modal, message, Divider, Select } from 'antd'
import _ from 'lodash';
import services from '@services/';
import styles from './index.less'
import Add from './components/add';
import Modify from './components/modify'

const confirm = Modal.confirm;
const Option = Select.Option;

// 岗位管理
class UserStaffing extends React.Component {
  state = {
    visibleModify: false,
    visibleAdd: false,
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
            <span onClick={(e) => { self.deletePositionById(item) }} className={styles.operateBtn}>删除</span>
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
      visibleAdd: false,
    });
  }

  // 打开弹框
  handerOpenAdd(payload) {
    _.extend(payload, {
      visibleAdd: true,
    });
    this.save(payload);
  }

  // 修改岗位 弹框
  handerModifySection(data) {
    let self = this;
    this.handerOpenModify({
      modifyTitle: '修改编制',
      data,
      callBack(values) {
        let param = {};
        _.extend(param, data, values);
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
    this.handerOpenAdd({
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
  deletePositionById(param) {
    let self = this;
    this.handerShowDel(() => {
      services.deleteUserStaffing(param).then(({ data }) => {
        self.handerAjaxBack(data);
      });
    });
  }

  render() {
    const {
      userStaffing: {
        list,
        searchParam,
      },
      structure,
      user: {
        userInfo: { userType }
      },
      dispatch,
    } = this.props;
    const { visibleModify, visibleAdd, modifyTitle, callBack, initialValue, data, columns } = this.state;
    const { positionStructure } = structure;
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
    }

    let addProps = {
      visible: visibleAdd,
      title: modifyTitle,
      initialValue,
      onCancel() {
        self.save({
          visibleAdd: false,
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

    let handerSearch = () => {
      dispatch({
        type: 'userStaffing/getList',
      })
    }
    let handerChangeSearch = (key, value) => {
      searchParam[key] = value;
      dispatch({
        type: 'userStaffing/save',
        payload: {
          searchParam,
        }
      })
    }

    // 岗位筛选
    let renderPosition = '';
    if (!_.isEmpty(positionStructure)) {
      renderPosition = positionStructure.map((item) => {
        return (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        )
      });
    }

    return (
      <div className={styles.contentStyle}>
        <div className={styles.searchBox}>
          <div className={styles.searchItemBox + ' clearfix'}>

            <div className={styles.searchItem}>
              <span>岗位：</span>
              <Select value={searchParam.pid || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('pid', e) }}>
                <Option value="">全部</Option>
                {renderPosition}
              </Select>
            </div>
            <div className={styles.searchItem}>
              <Button type="primary" onClick={handerSearch} style={{ 'marginRight': '15px' }}>查询</Button>
            </div>
          </div>
        </div>

        <div className={styles.addBtnBox}>
          <Button type="primary" size="large" onClick={() => { self.handerAdd() }} style={{ width: '140px' }}>添加</Button>
        </div>
        <div><Table {...tableOpt} /></div>
        <div>
          <Modify {...modifyOpt} />
          <Add {...addProps} />
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