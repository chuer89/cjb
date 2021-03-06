// 档案管理列表
import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input, Select, Modal, message, Divider, Upload, Icon, Dropdown, Menu, Tabs } from 'antd';
import style from './record.less';
import Link from 'umi/link';
import _ from 'lodash';
import moment from 'moment';
import services from '@services/';
import {
  rankTypeMap, contractTypeMap, genderObj,
  educationObj, statusMap, statusMapObj
} from '@components/addUser/config';

import BatchEditUser from './components/batchEditUser'; // 批量修改
import JobStatus from './components/jobStatus'; // 在职状态

const Option = Select.Option;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

// 上传
const UploadFile = ({ addFile, token }) => {
  let props = {
    name: 'file',
    action: services.importUser + '?token=' + token,
    accept: '.xlsx,.xls,.xlt',
    showUploadList: false,
    beforeUpload() {
      message.loading('上传中，请稍后。。。', 0.8)
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        // loading = true;
      }

      if (info.file.status === 'done') {
        let response = info.file.response;
        let { msg, data } = response;

        if (msg === 'success') {
          message.success('导入成功');
          addFile(data);
        } else {
          Modal.error({
            title: '导入失败',
            content: msg,
          });
        }
      } else if (info.file.status === 'error') {
        Modal.error({
          title: '服务器有误',
          content: '上传失败，请稍后再试。',
        });
      }
    }
  }
  return (
    <Upload {...props}>
      <Icon type="upload" />批量导入
    </Upload>
  )
}

class RecordList extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      // 状态筛选
      statusData: statusMap,
      // 合同类型
      contractTypeSele: {},
      warningSele: { // 预警信息
        '0': '正常',
        '1': '身份证',
        '2': '健康证',
        '3': '劳动合同',
      },

      columns: [],

      //岗位
      rankType: rankTypeMap,

      // 合同类型
      contractType: contractTypeMap,
    }
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
    let { contractType } = this.state;
    let self = this;

    let contractTypeSele = {};
    _.forEach(contractType, (item) => {
      contractTypeSele['' + item.code] = item.value;
    });

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
      title: '入职年限',
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
      title: '操作',
      key: 'handle',
      align: 'center',
      fixed: 'right',
      width: 150,
      render(item) {
        return self.operateRender(item);
      },
    }];

    this.setState({
      columns,
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
    let { dataBody, contractType, warningData, visibleJobStatus, workUserinfo, loadingList,
      searchParam, pageSize, firstPage, selectedRowUserId, visibleBatch, defaultActiveStatusKey } = record;
    let { dept, userInfo: { token, userType, hr } } = user;
    let inputStyle = {
      'width': '180px',
    }
    let { columns, rankType, statusData } = this.state;
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

    // 岗位筛选
    let renderProfessionLevel = positionData.map((item) => {
      return (
        <Option value={item.id} key={item.id}>{item.name}</Option>
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
      loading: loadingList,
      rowSelection,
      pagination: {
        pageSize,
        total,
        showTotal: (total, range) => {
          return `[${range.join('-')}]； 总计：${total}`
        }
      },
      scroll: { x: 1500 },
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

    // 在职状态修改
    let jobStatusProps = {
      visible: visibleJobStatus,
      onCancel() {
        dispatch({
          type: 'record/save',
          payload: {
            visibleJobStatus: false,
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
          successBack() {
            dispatch({
              type: 'record/fetchWorkUserinfo',
            })
          }
        })
      }
    }
    let handerOpenJobStatus = () => {
      dispatch({
        type: 'record/save',
        payload: {
          visibleJobStatus: true,
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

    // 更多操作
    let renderChangeJob = '';
    if (userType === 0 || hr) {
      renderChangeJob = (
        <Menu.Item disabled={batchEditBtnDisabled}>
          <span onClick={handerOpenJobStatus}>
            <Icon type="form" />在职状态
            </span>
        </Menu.Item>
      )
    }
    let renderBatchOperate = (
      <Menu className={style.operateTopBox}>
        <Menu.Item>
          <Link to="/personnel/record/addUser" target="_blank">
            <Icon type="user-add" />添加员工
          </Link>
        </Menu.Item>
        {renderChangeJob}
        <Menu.Item disabled={batchEditBtnDisabled}>
          <span onClick={handerOpenBatchEdit}>
            <Icon type="edit" />批量修改
          </span>
        </Menu.Item>
        <Menu.Item disabled={batchEditBtnDisabled}>
          <span onClick={handerOpenBatchDelete}>
            <Icon type="delete" />批量删除
          </span>
        </Menu.Item>
        <Menu.Item disabled={btnDisabled}>
          <a href={exportUser} target="_blank">
            <Icon type="export" />导出表格
          </a>
        </Menu.Item>
        <Menu.Item>
          <span><UploadFile {...importUserAttr} /></span>
        </Menu.Item>
        <Menu.Item>
          <a href={exportTemplate} target="_blank">
            <Icon type="save" />模版下载
          </a>
        </Menu.Item>
      </Menu>
    )

    let renderSearch = (
      <div className={style.searchBox}>
        <div className={style.searchItemBox + ' clearfix'}>
          <div className={style.searchItem}>
            <span>工号：</span>
            <Input value={searchParam.code} onChange={(e) => { handerChangeSearch('code', e.target.value) }} placeholder="请输入工号" maxLength={32} style={inputStyle} />
          </div>
          <div className={style.searchItem}>
            <span>姓名：</span>
            <Input placeholder="请输入姓名" value={searchParam.name} onChange={(e) => { handerChangeSearch('name', e.target.value) }} maxLength={32} style={inputStyle} />
          </div>
          <div className={style.searchItem}>
            <span>岗位：</span>
            <Select value={searchParam.position || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('position', e) }}>
              <Option value="">全部</Option>
              {renderProfessionLevel}
            </Select>
          </div>
          <div className={style.searchItem}>
            <Button type="primary" onClick={handerSearch} style={{ 'marginRight': '15px' }}>查询</Button>
            <Button onClick={resetSearch}>重置</Button>
          </div>
        </div>
      </div>
    )

    let handerChangeTab = (keys) => {
      handerChangeSearch('code', '');
      handerChangeSearch('name', '');
      handerChangeSearch('status', keys || '');
      handerSearch();
    }

    // 2全职 1实习 5兼职 3离职 4待离职
    let tabsProps = {
      defaultActiveKey: defaultActiveStatusKey,
      onChange: handerChangeTab,
      type: "card",
      tabBarGutter: 8,
    }

    return (
      <div>
        <div>
          <BatchEditUser {...batchUserProps} />
          <JobStatus {...jobStatusProps} />
        </div>
        <div className={style.content}>
          <div className={style.operateTopeEtrance}>
            <Dropdown overlay={renderBatchOperate}>
              <Button type="primary" className="ant-dropdown-link">
                更多操作<Icon type="down" />
              </Button>
            </Dropdown>
          </div>

          <div>
            <Tabs {...tabsProps}>
              <TabPane tab="全部" key="">
                {renderSearch}<Table {...tableOpt} />
              </TabPane>
              <TabPane tab={`全职 ${workUserinfo.all || '0'}人`} key="2">
                {renderSearch}<Table {...tableOpt} />
              </TabPane>
              <TabPane tab={`实习 ${workUserinfo.practice || '0'}人`} key="1">
                {renderSearch}<Table {...tableOpt} />
              </TabPane>
              <TabPane tab={`兼职 ${workUserinfo.part || '0'}人`} key="5">
                {renderSearch}<Table {...tableOpt} />
              </TabPane>
              <TabPane tab={`离职 ${workUserinfo.leave || '0'}人`} key="3">
                {renderSearch}<Table {...tableOpt} />
              </TabPane>
            </Tabs>
          </div>

          <div className={style.searchBox} style={{ display: 'none' }}>
            <div className={'clearfix'}>
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
                <span>职级：</span>
                <Select value={searchParam.type || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('type', e) }}>
                  <Option value="">全部</Option>
                  {renderRankType}
                </Select>
              </div>
              <div className={style.searchItem}>
                <span>岗位：</span>
                <Select value={searchParam.position || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('position', e) }}>
                  <Option value="">全部</Option>
                  {renderProfessionLevel}
                </Select>
              </div>
              <div className={style.searchItem}>
                <span>在职状态：</span>
                <Select value={searchParam.status}
                  style={{ width: 150 }}
                  mode="multiple"
                  placeholder="全部"
                  onChange={(e) => { handerChangeSearch('status', e) }}>
                  {renderSeleStatus}
                </Select>
              </div>
            </div>
            <div className={style.searchItemBox + ' clearfix'}>
              <div className={style.searchItem}>
                <span>工号：</span>
                <Input value={searchParam.code} onChange={(e) => { handerChangeSearch('code', e.target.value) }} placeholder="请输入工号" maxLength={32} style={inputStyle} />
              </div>
              <div className={style.searchItem}>
                <span>姓名：</span>
                <Input placeholder="请输入姓名" value={searchParam.name} onChange={(e) => { handerChangeSearch('name', e.target.value) }} maxLength={32} style={inputStyle} />
              </div>
              <div className={style.searchItem}>
                <Button type="primary" onClick={handerSearch} style={{ 'marginRight': '15px' }}>查询</Button>
                <Button onClick={resetSearch}>重置</Button>
              </div>
            </div>
          </div>

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
