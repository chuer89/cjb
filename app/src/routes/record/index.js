// 档案管理列表
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import { Table, Button, Input, Select } from 'antd';
import style from './record.less';
import { Link } from 'dva/router';

const Option = Select.Option;

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
      }]
    }
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    let { record } = this.props;
    let { columns, dataSource } = record;
    let inputStyle = {
      'width': '180px',
    }
    let { statusData, contractType } = this.state;

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

    return (
      <App>
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
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </App>
    );
  }
}

export default connect((({ record }) => ({
  record,
})))(RecordList);
