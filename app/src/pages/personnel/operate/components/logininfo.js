// 操作详情 弹框
import { Modal, Table } from 'antd';
import React from 'react';
import moment from 'moment';

class LoginInfo extends React.Component {
  state = {
    columns: [],
  }

  save(payload) {
    this.setState(payload);
  }

  UNSAFE_componentWillMount() {
    let columns = [{
      title: '操作字段', dataIndex: 'fieldName',
    }, {
      title: '修改前', dataIndex: 'oldName',
    }, {
      title: '修改后', dataIndex: 'newName',
    }, {
      title: '操作时间',
      dataIndex: 'createTime',
      render: (item) => {
        return (
          <div>{moment(item).format('YYYY-MM-DD hh:mm')}</div>
        )
      }
    }];

    this.save({
      columns,
    });
  }

  render() {
    let {
      visible,
      onCancel,
      records,
    } = this.props;
    const { columns } = this.state;

    let tableOpt = {
      rowKey: 'id',
      dataSource: records || [],
      scroll: { y: 500 },
      columns,
      locale: {
        emptyText: '暂无数据'
      },
      pagination: false
    }

    return (
      <Modal
        title="操作详情"
        width={800}
        destroyOnClose={true}
        visible={visible}
        centered={true}
        footer={null}
        onCancel={onCancel}>
        <div>
          <Table {...tableOpt} />
        </div>
      </Modal>
    )
  }
}

export default LoginInfo;