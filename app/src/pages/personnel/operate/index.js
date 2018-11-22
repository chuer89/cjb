import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input } from 'antd';
import style from './index.less';

// 操作记录
class OperateList extends React.Component {
  state = {
    columns: []
  }

  UNSAFE_componentWillMount() {
    let columns = [{
      title: '工号',
      dataIndex: 'code',
      fixed: 'left',
      width: 100,
    }, {
      title: '姓名',
      dataIndex: 'name',
      fixed: 'left',
      width: 100,
    }, {
      title: '联系方式',
      dataIndex: 'phone',
    }, {
      title: '年龄', dataIndex: 'age',
    }, {
      title: '性别', dataIndex: 'gender',
      render: (gender) => {
        return (
          <div>{genderObj[gender]}</div>
        )
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (item) => {
        return (
          <div>{statusMapObj[item] || ''}</div>
        )
      }
    }, {
      title: '所在部门', dataIndex: 'deptName',
    }, {
      title: '学历', dataIndex: 'education', render: (education) => {
        return (
          <span>{educationObj[education]}</span>
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
      title: '入职时间',
      dataIndex: 'joinTime',
      render: (item) => {
        return (
          <div>{moment(item).format('YYYY-MM-DD')}</div>
        )
      }
    }, {
      title: '操作',
      key: 'handle',
      align: 'center',
      fixed: 'right',
      width: 150,
      render(item) {
        // return self.operateRender(item);
        return ''
      },
    }];

    this.save({
      columns,
    });
  }

  save(payload) {
    if (this._isMounted) {
      this.setState(payload);
    }
  }

  render() {
    let {
      operatingRecord: {
        searchParam,
        pageSize,
      }
    } = this.props;
    let { columns } = this.state;

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
      dataSource: [],
      columns,
      locale: {
        emptyText: '暂无数据'
      },
      pagination: {
        pageSize,
        total: 10,
        showTotal: (total, range) => {
          return `[${range.join('-')}]； 总计：${total}`
        }
      },
      scroll: { x: 1500 },
      onChange({ current }) {
        dispatch({
          type: 'operatingRecord/getList',
          payload: {
            page: current,
          }
        })
      }
    }

    return (
      <div>
        <div className={style.searchBox}>
          <div className={style.searchItemBox + ' clearfix'}>
            <div className={style.searchItem}>
              <span>操作人：</span>
              <Input placeholder="请输入姓名" value={searchParam.name} onChange={(e) => { handerChangeSearch('operator', e.target.value) }} maxLength={32} style={inputStyle} />
            </div>
            <div className={style.searchItem}>
              <span>员工姓名：</span>
              <Input value={searchParam.code} onChange={(e) => { handerChangeSearch('userName', e.target.value) }} placeholder="请输入员工" maxLength={32} style={inputStyle} />
            </div>
            <div className={style.searchItem}>
              <span>员工手机：</span>
              <Input value={searchParam.code} onChange={(e) => { handerChangeSearch('phone', e.target.value) }} placeholder="员工手机号" maxLength={32} style={inputStyle} />
            </div>
            <div className={style.searchItem}>
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