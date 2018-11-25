import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input } from 'antd';
import style from './index.less';
import moment from 'moment';

import LoginInfo from './components/logininfo'; // 操作详情

// 操作记录
class OperateList extends React.Component {
  state = {
    columns: [],
    operateTypeSele: {
      '0': '新增', '1': '修改', '3': '删除'
    },
    visibleLoginfo: false,
    loginInfoRecords: [],
  }

  UNSAFE_componentWillMount() {
    const { operateTypeSele } = this.state;
    const self = this;

    let handerOpenLoginInfo = (loginInfoRecords) => {
      self.save({
        visibleLoginfo: true,
        loginInfoRecords,
      })
    }

    let columns = [{
      title: '操作人姓名', dataIndex: 'operationName'
    }, {
      title: '被操作人姓名', dataIndex: 'name',
    }, {
      title: '部门', dataIndex: 'deptName',
    }, {
      title: '门店', dataIndex: 'storeName'
    }, {
      title: '电话', dataIndex: 'phone'
    }, {
      title: '操作类型',
      dataIndex: 'type',
      render: (item) => {
        return (
          <div>{operateTypeSele[item] || ''}</div>
        )
      }
    }, {
      title: '操作时间',
      dataIndex: 'createTime',
      render: (item) => {
        return (
          <div>{moment(item).format('YYYY-MM-DD hh:mm')}</div>
        )
      }
    }, {
      title: '操作',
      key: 'handle',
      align: 'center',
      fixed: 'right',
      width: 100,
      render(item) {
        return (
          <div>
            <span className={style.operateBtn} onClick={(e) => {handerOpenLoginInfo(item.loginfo)}}>详情</span>
          </div>
        )
      },
    }];

    this.save({
      columns,
    });
  }

  save(payload) {
    this.setState(payload);
  }

  render() {
    let {
      operatingRecord: {
        searchParam,
        pageSize,
        firstPage,
        dataBody: {
          records,
          total,
        }
      },
      dispatch,
    } = this.props;
    let { columns, visibleLoginfo, loginInfoRecords } = this.state;
    const self = this;

    let handerSearch = () => {
      dispatch({
        type: 'operatingRecord/getList',
        payload: {
          page: firstPage,
        }
      })
    }
    let handerChangeSearch = (key, value) => {
      searchParam[key] = value;
      dispatch({
        type: 'operatingRecord/save',
        payload: {
          searchParam,
        }
      })
    }
    let resetSearch = () => {
      dispatch({
        type: 'operatingRecord/save',
        payload: {
          searchParam: {},
        }
      });

      dispatch({
        type: 'record/getUserList',
        payload: {
          page: firstPage,
        }
      })
    }
    let inputStyle = {
      'width': '180px',
    }

    let tableOpt = {
      rowKey: 'id',
      dataSource: records || [],
      columns,
      locale: {
        emptyText: '暂无数据'
      },
      scroll: { x: 1500 },
      pagination: {
        pageSize,
        total,
        showTotal: (total, range) => {
          return `[${range.join('-')}]； 总计：${total}`
        }
      },
      onChange({ current }) {
        dispatch({
          type: 'operatingRecord/getList',
          payload: {
            page: current,
          }
        })
      }
    }

    let loginInfoProps = {
      visible: visibleLoginfo,
      records: loginInfoRecords,
      onCancel() {
        self.save({
          visibleLoginfo: false,
        })
      }
    }

    return (
      <div className={style.content}>
        <div>
          <LoginInfo {...loginInfoProps} />
        </div>
        <div className={style.searchBox}>
          <div className={style.searchItemBox + ' clearfix'}>
            <div className={style.searchItem}>
              <span>被操作人名称：</span>
              <Input placeholder="请输入被操作人名称" value={searchParam.name} onChange={(e) => { handerChangeSearch('name', e.target.value) }} maxLength={32} style={inputStyle} />
            </div>
            <div className={style.searchItem}>
              <span>操作人名称：</span>
              <Input value={searchParam.operationName} onChange={(e) => { handerChangeSearch('operationName', e.target.value) }} placeholder="请输入操作人名称" maxLength={32} style={inputStyle} />
            </div>
            <div className={style.searchItem}>
              <span>手机号：</span>
              <Input value={searchParam.phone} onChange={(e) => { handerChangeSearch('phone', e.target.value) }} placeholder="被操作人手机号码" maxLength={32} style={inputStyle} />
            </div>
          </div>
          <div className={style.searchItemBox}>
            <div className={style.searchBtnBox}>
              <Button type="primary" onClick={handerSearch} style={{ 'marginRight': '15px' }}>查询</Button>
              <Button onClick={resetSearch}>重置</Button>
            </div>
          </div>
        </div>
        <Table {...tableOpt} />
      </div>
    )
  }
}

export default connect((({ user, operatingRecord }) => ({
  user,
  operatingRecord,
})))(OperateList);