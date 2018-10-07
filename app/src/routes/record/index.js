// 档案管理列表
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import { Table, Button, Input, Select, Menu, Dropdown, Icon, Modal } from 'antd';
import style from './record.less';
import { Link } from 'dva/router';
import _ from 'lodash';
import moment from 'moment';

import ConfigMenus from './components/menusconfig'; // 配置菜单

const Option = Select.Option;
const confirm = Modal.confirm;

class RecordList extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      // 状态筛选
      statusDataSele: {},
      // 合同类型
      contractTypeSele: {},
      warningSele: { // 预警信息
        '0': '正常',
        '1': '身份证',
        '2': '健康证',
        '3': '劳动合同',
      },

      visibleConfigMenus: false,
      columns: [],
    }
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
    let { record } = this.props;
    let { statusData, contractType } = record;
    let { warningSele } = this.state;
    let self = this;

    let statusDataSele = {};
    _.forEach(statusData, (item) => {
      statusDataSele['' + item.code] = item.value;
    });

    let contractTypeSele = {};
    _.forEach(contractType, (item) => {
      contractTypeSele['' + item.code] = item.value;
    });

    let columns = [{
      title: '工号',
      dataIndex: 'no',
    }, {
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (item) => {
        return (
          <div>{statusDataSele[item] || ''}</div>
        )
      }
    }, {
      title: '合作类型',
      dataIndex: 'contractType',
      render: (item) => {
        return (
          <div>{contractTypeSele[item] || ''}</div>
        )
      }
    }, {
      title: '信息预警',
      dataIndex: 'warning',
      render: (item) => {
        let value = '';
        if (_.isArray(item)) {
          _.forEach(item, (val) => {
            value += warningSele[val] + ',';
          });
        }
        return (
          <div>{value}</div>
        )
      }
    }, {
      title: '入职时间',
      dataIndex: 'joinTime',
      render: (item) => {
        return (
          <div>{moment(item).format('YYYY-MM-DD')}</div>
        )
      }
    }, {
      title: '联系方式',
      dataIndex: 'phone',
    }, {
      title: '操作',
      key: 'handle',
      align: 'center',
      render(item) {
        return self.operateRender(item);
      },
    }];

    this.setState({
      columns,
      statusDataSele,
      contractTypeSele,
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  save(payload) {
    if (this._isMounted) {
      this.setState(payload);
    }
  }

  // 最后一列操作
  operateRender(item) {
    let self = this;
    // console.log(item, this)
    // 删除用户
    let delUser = () => {
      self.handerDel(() => {
        console.log('删除')
      });
    }

    // 打开菜单配置
    let openConfigMenus = () => {
      self.save({
        visibleConfigMenus: true,
      });
    }

    let renderOperate = (
      <Menu>
        <Menu.Item>
          <Link to={'editUser/' + item.id} target="_blank" className={style.operateBtn}>编辑资料</Link>
        </Menu.Item>
        <Menu.Item>
          <span className={style.operateBtn} onClick={delUser}>删除员工</span>
        </Menu.Item>
        <Menu.Item>
          <span className={style.operateBtn} onClick={openConfigMenus}>菜单权限</span>
        </Menu.Item>
        <Menu.Item>
          <Link target="_blank" to="/personnel/userdetails/1" className={style.operateBtn}>员工详情</Link>
        </Menu.Item>
      </Menu>
    )
    return (
      <div>
        <Dropdown overlay={renderOperate}>
          <div>
            处理<Icon type="down" />
          </div>
        </Dropdown>
      </div>
    )
  }

  // 删除员工
  handerDel(callBack) {
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

  render() {
    let self = this;
    let { record, user } = this.props;
    let { dataBody, indentSize, statusData, contractType } = record;
    let inputStyle = {
      'width': '180px',
    }
    let { visibleConfigMenus, columns } = this.state;
    let { records } = dataBody;

    let handleChange = (value) => {
      console.log(value, 'v');
    }

    // 状态筛选
    let renderSeleStatus = statusData.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });

    // 合同类型
    let renderContractType = contractType.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });

    let tableOpt = {
      rowKey: 'id',
      dataSource: records || [],
      columns,
      indentSize,
      locale: {
        emptyText: '暂无数据'
      }
    }

    // 配置菜单参数
    let configMenusOpt = {
      user,
      visible: visibleConfigMenus,
      onCancel() {
        self.save({
          visibleConfigMenus: false,
        })
      },
      handleOk() {

      },
    }

    return (
      <App>
        <div>
          <ConfigMenus {...configMenusOpt} />
        </div>
        <div className={style.content}>
          <div>
            <Link to="addUser" target="_blank">
              <Button type="primary" icon="user-add" style={{ 'marginRight': '15px' }}>添加员工</Button>
            </Link>
            <Button type="primary" icon="usergroup-add">批量添加</Button>
          </div>
          <div className={style.searchBox}>
            <div className={'clearfix'}>
              <div className={style.searchItem}>
                <span>工号：</span>
                <Input placeholder="请输入工号" maxLength={32} style={inputStyle} />
              </div>
              <div className={style.searchItem}>
                <span>姓名：</span>
                <Input placeholder="请输入姓名" maxLength={32} style={inputStyle} />
              </div>
              <div className={style.searchItem}>
                <span>状态：</span>
                <Select defaultValue="全部" style={{ width: 120 }} onChange={handleChange}>
                  {renderSeleStatus}
                </Select>
              </div>
              <div className={style.searchItem}>
                <span>合同类型：</span>
                <Select defaultValue="全部" style={{ width: 120 }} onChange={handleChange}>
                  {renderContractType}
                </Select>
              </div>
            </div>
            <div className={style.searchItemBox + ' clearfix'}>
              <div className={style.searchItem}>
                <span>合同类型：</span>
                <Select defaultValue="全部" style={{ width: 120 }} onChange={handleChange}>
                  {renderContractType}
                </Select>
              </div>
              <div className={style.searchItem}>
                <Button type="primary" style={{ 'marginRight': '15px' }}>查询</Button>
                <Button>重置</Button>
              </div>
            </div>
          </div>
          <Table {...tableOpt} />
        </div>
      </App>
    );
  }
}

export default connect((({ record, user }) => ({
  record,
  user,
})))(RecordList);
