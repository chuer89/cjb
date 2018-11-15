// 档案管理列表
import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input, Select, Modal, message, Divider } from 'antd';
import style from './record.less';
import Link from 'umi/link';
import _ from 'lodash';
import moment from 'moment';
import services from '@services/';
import { UploadField, Uploader } from '@navjobs/upload';
import { rankTypeMap, contractTypeMap } from '@components/addUser/config';

import BatchEditUser from './components/batchEditUser'; // 批量修改

const Option = Select.Option;
const confirm = Modal.confirm;

// 上传
const UploadHead = ({ addFile, token }) => {
  let action = services.importUser + '?token=' + token;
  const reloadPage = () => {
    location.reload();
  }
  let isLoading = false;

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
        Modal.error({
          title: '服务器有误',
          content: '上传失败，请稍后再试。',
          onOk: reloadPage,
        });
        // message.error('上传失败，请稍后再试。', reloadPage);
      }}
      onComplete={({ response }) => {
        let { msg, data } = response;

        if (msg === 'success') {
          message.success('导入成功');
          addFile(data);
        } else {
          Modal.error({
            title: '导入失败',
            content: msg,
            onOk: reloadPage,
          });
          // message.error(msg, reloadPage);
        }
      }}
      //upload on file selection, otherwise use `startUpload`
      uploadOnSelection={true}
    >
      {({ onFiles, progress, complete }) => {
        let loading = false;
        if (progress && !complete) {
          loading = true;
          // message.loading('上传中，请稍后。。。')
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
            <Button loading={loading} type="primary" icon="usergroup-add">批量导入</Button>
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

      //职级
      rankType: rankTypeMap,

      // 合同类型
      contractType: contractTypeMap,
    }
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
    let { record } = this.props;
    let { statusData } = record;
    let { contractType } = this.state;
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
      // title: '信息预警',
      // dataIndex: 'warning',
      // render: (item) => {
      //   let value = '';
      //   if (_.isArray(item)) {
      //     _.forEach(item, (val) => {
      //       value += warningSele[val] + ',';
      //     });
      //   }
      //   return (
      //     <div>{value}</div>
      //   )
      // }
      title: '工作年限',
      dataIndex: 'workAge',
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
                page: 1,
              }
            });
          } else {
            message.error(data.msg);
          }
        })
      });
    }

    return (
      <div>
        <Link to={'/personnel/record/editUser/' + item.id} target="_blank" className={style.operateBtn}>编辑</Link>
        <Divider type="vertical" />
        <span className={style.operateBtn} onClick={delUser}>删除</span>
        <Divider type="vertical" />
        <Link target="_blank" to={'/personnel/record/userdetails/' + item.id} className={style.operateBtn}>详情</Link>
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
      okType: 'danger',
      onOk() {
        callBack();
      },
      onCancel() { },
    });
  }

  render() {
    let self = this;
    let { record, user, dispatch, structure, editUser: {
      positionData,
    } } = this.props;
    let { dataBody, statusData, contractType, warningData,
      searchParam, pageSize, firstPage, selectedRowUserId, visibleBatch } = record;
    let { dept, userInfo: { token, userType } } = user;
    let inputStyle = {
      'width': '180px',
    }
    let { columns, rankType } = this.state;
    let { records, total } = dataBody;

    let btnDisabled = total <= 0; // 列表无数据，导出按钮不可用
    let batchEditBtnDisabled = _.isEmpty(selectedRowUserId); // 批量修改按钮状态

    let handerSearch = () => {
      dispatch({
        type: 'record/getUserList',
        payload: {
          page: firstPage,
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
          page: firstPage,
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

    // 职级
    let renderRankType = rankType.map((item) => {
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

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch({
          type: 'record/save',
          payload: {
            selectedRowUserId: selectedRowKeys,
          }
        })
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
      //   name: record.name,
      // }),
    };

    let tableOpt = {
      rowKey: 'id',
      dataSource: records || [],
      columns,
      locale: {
        emptyText: '暂无数据'
      },
      rowSelection,
      pagination: {
        pageSize,
        total,
      },
      onChange({ current }) {
        dispatch({
          type: 'record/getUserList',
          payload: {
            page: current,
          }
        })
      }
    }

    let importUserAttr = {
      token,
      addFile() {
        dispatch({
          type: 'record/getUserList',
          payload: {
            page: firstPage,
          }
        })
      }
    }

    let exportUser = `${services.exportUser}?token=${token}&type=1&dept=${dept}`;
    let exportTemplate = `${services.exportUser}?token=${token}&type=2`;

    // 批量修改员工
    let batchUserProps = {
      visible: visibleBatch,
      structure,
      userType,
      positionData,
      onCancel() {
        dispatch({
          type: 'record/save',
          payload: {
            visibleBatch: false,
          }
        })
      },
      callBack(values) {
        let change = JSON.stringify(values);

        if (_.isEmpty(JSON.parse(change))) {
          message.error('请选择要修改的值');
          return false;
        }

        let payload = {
          change,
          userid: selectedRowUserId.join(','),
        }
        dispatch({
          type: 'record/updateAll',
          payload,
        })
      }
    }
    let handerOpenBatchEdit = () => {
      dispatch({
        type: 'record/save',
        payload: {
          visibleBatch: true,
        }
      })
    }

    // 批量删除
    let handerOpenBatchDelete = () => {
      let uids = selectedRowUserId.join(',');

      self.handerDel(() => {
        services.delUserAll({
          uids,
        }).then(({ data }) => {
          if (data.msg === 'success') {
            message.success('删除成功');
            dispatch({
              type: 'record/getUserList',
              payload: {
                page: 1,
              }
            });
          } else {
            message.error(data.msg);
          }
        })
      });
    }

    // 筛选条件：入职时间、离职时间、部门、年龄、性别、电话、合同类型、应聘渠道、到期时间

    return (
      <div>
        <div>
          <BatchEditUser {...batchUserProps} />
        </div>
        <div className={style.content}>
          <div className={style.operateTopBox}>
            <Link to="/personnel/record/addUser" target="_blank" className={style.operateTopBtn}>
              <Button type="primary" icon="user-add">添加员工</Button>
            </Link>
            <span className={style.operateTopBtn}>
              <Button onClick={handerOpenBatchEdit} type="primary" disabled={batchEditBtnDisabled} icon="edit">批量修改</Button>
            </span>
            <span className={style.operateTopBtn}>
              <Button onClick={handerOpenBatchDelete} type="primary" disabled={batchEditBtnDisabled} icon="delete">批量删除</Button>
            </span>
            <a href={exportUser} className={style.operateTopBtn} target="_blank">
              <Button disabled={btnDisabled} type="primary" icon="export" >导出</Button>
            </a>
            <span className={style.operateTopBtn}><UploadHead {...importUserAttr} /></span>
            <a href={exportTemplate} className={style.operateTopBtn} target="_blank">
              <Button type="primary" icon="save" className={style.operateTopBtn}>模版下载</Button>
            </a>
          </div>
          <div className={style.searchBox}>
            <div className={'clearfix'}>
              <div className={style.searchItem}>
                <span>工号：</span>
                <Input value={searchParam.code} onChange={(e) => { handerChangeSearch('code', e.target.value) }} placeholder="请输入工号" maxLength={32} style={inputStyle} />
              </div>

              <div className={style.searchItem}>
                <span>在职状态：</span>
                <Select value={searchParam.status || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('status', e) }}>
                  {renderSeleStatus}
                </Select>
              </div>
              <div className={style.searchItem}>
                <span>职级：</span>
                <Select value={searchParam.type || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('type', e) }}>
                  <Option value="">全部</Option>
                  {renderRankType}
                </Select>
              </div>
            </div>
            <div className={style.searchItemBox + ' clearfix'}>
              <div className={style.searchItem}>
                <span>姓名：</span>
                <Input placeholder="请输入姓名" value={searchParam.name} onChange={(e) => { handerChangeSearch('name', e.target.value) }} maxLength={32} style={inputStyle} />
              </div>
              <div className={style.searchItem}>
                <span>合同类型：</span>
                <Select value={searchParam.contractType || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('contractType', e) }}>
                  {renderContractType}
                </Select>
              </div>
              <div className={style.searchItem}>
                <span>信息预警：</span>
                <Select value={searchParam.warning || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('warning', e) }}>
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
      </div>
    );
  }
}

export default connect((({ record, user, structure, editUser }) => ({
  record,
  user,
  structure,
  editUser,
})))(RecordList);
