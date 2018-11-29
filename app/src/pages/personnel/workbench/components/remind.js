import { Table } from 'antd';
import moment from 'moment';
import Link from 'umi/link';

export default ({ records, pageSize, total, handerChange }) => {
  let columns = [{
    title: '工号', dataIndex: 'code', width: 100
  }, {
    title: '姓名', dataIndex: 'name', width: 120
  }, {
    title: '说明信息', dataIndex: 'content',
  }, {
    title: '最新时间',
    dataIndex: 'createTime',
    width: 180,
    render: (item) => {
      return (
        <div>{moment(item).format('YYYY-MM-DD hh:mm')}</div>
      )
    }
  }, {
    title: '操作',
    key: 'handle',
    align: 'center',
    width: 100,
    render(item) {
      return (
        <div>
          <Link to={'/personnel/record/editUser/' + item.uid + '?complete=true'} target="_blank">完善资料</Link>
        </div>
      )
    },
  }];

  let tableOpt = {
    rowKey: 'uid',
    dataSource: records || [],
    columns,
    locale: {
      emptyText: '暂无数据'
    },
    // scroll: { x: 1200 },
    pagination: {
      pageSize,
      total,
      showTotal: (total, range) => {
        return `[${range.join('-')}]； 总计：${total}`
      }
    },
    onChange({ current }) {
      handerChange(current);
    }
  }

  return (
    <div>
      <Table {...tableOpt} />
    </div>
  )
}