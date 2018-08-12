// 档案管理列表
import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import { Table, Icon, Divider } from 'antd';
import style from './record.less';

class RecordList extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
    }
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    let { record } = this.props;
    let { columns, dataSource } = record;
    
    return (
      <App>
        <div className={style.content}>
        <h1>档案管理</h1>
        <Table dataSource={dataSource} columns={columns} />
        </div>
      </App>
    );
  }
}

export default connect((({ record }) => ({
  record,
})))(RecordList);
