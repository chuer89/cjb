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
      statusData: [{
        value: '全部', code: '-1'
      }, {
        value: '离职', code: '1'
      }, {
        value: '在职', code: '2'
      }, {
        value: '待离职', code: '3'
      }],

      // 合同类型
      contractType: [{
        value: '全部', code: '-1'
      }, {
        value: '固定期限', code: '1'
      }, {
        value: '无固定期限', code: '2'
      }, {
        value: '试用', code: '3'
      }],

      visibleConfigMenus: false,
    }
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
    let { columns, dataBody, indentSize } = record;
    let inputStyle = {
      'width': '180px',
    }
    let { statusData, contractType, visibleConfigMenus } = this.state;
    let { records } = dataBody;

    let handleChange = (value) => {
      console.log(value, 'v');
    }

    console.log(records, 'neir')

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

    _.last(columns).render = (item) => {
      // console.log(item)
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
        })
      }

      let renderOperate = (
        <Menu>
          <Menu.Item>
            <span className={style.operateBtn}>编辑资料</span>
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

    let tableOpt = {
      rowKey: 'id',
      dataSource: records || [],
      columns,
      indentSize,
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
            <Link to="addUser">
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
