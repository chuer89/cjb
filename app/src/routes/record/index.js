// 档案管理列表
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import { Table, Button, Input, Select, Menu, Dropdown, Icon, Modal, message } from 'antd';
import style from './record.less';
import { Link } from 'dva/router';
import _ from 'lodash';
import moment from 'moment';
import services from './../../services/';
import { UploadField, Uploader } from '@navjobs/upload';

const Option = Select.Option;
const confirm = Modal.confirm;

// 上传
const UploadHead = ({ addFile }) => {
  let action = services.importUser;
  return (
    <Uploader
      request={{
        fileName: 'file',
        url: action,
        method: 'POST',
        // use credentials for cross-site requests
        withCredentials: false,
      }}
      onError={({ error }) => {
        message.error('上传失败，请稍后再试。');
      }}
      onComplete={({ response }) => {
        let { msg, data } = response;

        if (msg === 'success') {
          message.success('导入成功');
          addFile(data);
        } else {
          message.error(data.msg);
        }
      }}
      //upload on file selection, otherwise use `startUpload`
      uploadOnSelection={true}
    >
      {({ onFiles, progress, complete }) => {
        let loading = false;
        if (progress && !complete) {
          loading = true;
        }

        return (
          <UploadField onFiles={(file) => {
            if (!_.isEmpty(file)) {
              // 文件限制5m
              if (file[0].size < 1024 * 1024 * 5) {
                onFiles(file);
              } else {
                message.error('文件最大5M，请压缩文件大小');
              }
            }
          }} uploadProps={{
            accept: '.xlsx,.xls,.xlt',
          }}>
            <Button loading={loading} type="primary" icon="usergroup-add">批量添加</Button>
          </UploadField>
        )
      }}
    </Uploader>
  )
}

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
      dataIndex: 'code',
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
    let { dispatch } = this.props;
    // console.log(item, this)
    // 删除用户
    let delUser = () => {
      self.handerDel(() => {
        services.deleteUserById({
          id: item.id
        }).then(({ data }) => {
          if (data.msg === 'success') {
            message.success('删除成功');
            dispatch({
              type: 'record/getUserList',
              payload: {
                start: 1,
              }
            });
          } else {
            message.error(data.msg);
          }
        })
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
          <Link target="_blank" to={'/personnel/userdetails/' + item.id} className={style.operateBtn}>员工详情</Link>
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
    let { record, user, dispatch } = this.props;
    let { dataBody, indentSize, statusData, contractType, warningData, searchParam } = record;
    let { dept, userInfo: { token } } = user;
    let inputStyle = {
      'width': '180px',
    }
    let { columns } = this.state;
    let { records } = dataBody;

    let handerSearch = () => {
      dispatch({
        type: 'record/getUserList',
        payload: {
          start: 1,
        }
      })
    }
    let handerChangeSearch = (key, value) => {
      searchParam[key] = value;
      dispatch({
        type: 'record/save',
        payload: {
          searchParam,
        }
      })
    }
    let resetSearch = () => {
      dispatch({
        type: 'record/save',
        payload: {
          searchParam: {},
        }
      });

      dispatch({
        type: 'record/getUserList',
        payload: {
          start: 1,
        }
      })
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

    // 信息预警
    let renderWarningData = warningData.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    })

    let tableOpt = {
      rowKey: 'id',
      dataSource: records || [],
      columns,
      indentSize,
      locale: {
        emptyText: '暂无数据'
      }
    }

    let exportUser = `${services.exportUser}?token=${token}&type=1&dept=${dept}`;
    let exportTemplate = `${services.exportUser}?token=${token}&type=2`;

    let importUserAttr = {
      addFile() {
        dispatch({
          type: 'record/getUserList',
          payload: {
            start: 1,
          }
        })
      }
    }

    return (
      <App>
        <div className={style.content}>
          <div className={style.operateTopBox}>
            <Link to="addUser" target="_blank" className={style.operateTopBtn}>
              <Button type="primary" icon="user-add">添加员工</Button>
            </Link>
            <span className={style.operateTopBtn}><UploadHead {...importUserAttr} /></span>
            <a href={exportUser} className={style.operateTopBtn} target="_blank">
              <Button type="primary" icon="export" >导出</Button>
            </a>
            <a href={exportTemplate} className={style.operateTopBtn} target="_blank">
              <Button type="primary" icon="save" className={style.operateTopBtn}>模版下载</Button>
            </a>
          </div>
          <div className={style.searchBox}>
            <div className={'clearfix'}>
              <div className={style.searchItem}>
                <span>工号：</span>
                <Input value={searchParam.code} onChange={(e) => {handerChangeSearch('code', e.target.value)}} placeholder="请输入工号" maxLength={32} style={inputStyle} />
              </div>
              <div className={style.searchItem}>
                <span>姓名：</span>
                <Input placeholder="请输入姓名" value={searchParam.name} onChange={(e) => {handerChangeSearch('name', e.target.value)}} maxLength={32} style={inputStyle} />
              </div>
              <div className={style.searchItem}>
                <span>状态：</span>
                <Select value={searchParam.status || ''} style={{ width: 120 }} onChange={(e) => {handerChangeSearch('status', e)}}>
                  {renderSeleStatus}
                </Select>
              </div>
              <div className={style.searchItem}>
                <span>合同类型：</span>
                <Select value={searchParam.contractType || ''} style={{ width: 120 }} onChange={(e) => {handerChangeSearch('contractType', e)}}>
                  {renderContractType}
                </Select>
              </div>
            </div>
            <div className={style.searchItemBox + ' clearfix'}>
              <div className={style.searchItem}>
                <span>信息预警：</span>
                <Select value={searchParam.warning || ''} style={{ width: 120 }} onChange={(e) => {handerChangeSearch('warning', e)}}>
                  {renderWarningData}
                </Select>
              </div>
              <div className={style.searchItem}>
                <Button type="primary" onClick={handerSearch} style={{ 'marginRight': '15px' }}>查询</Button>
                <Button onClick={resetSearch}>重置</Button>
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
