import { connect } from 'dva'
import { Filter } from 'components'
import { TableUtils } from 'utils'
import { Table } from 'antd';
import Link from 'umi/link'

const { getColumns } = TableUtils;

function AuditSellerProxy ({
  loading, selectCondition, queryCondition,
  actions, fields, audits, pagination,
}) {
  const filterProps = {
    selectCondition,
    queryCondition,
    onSearch (search) {
      console.log(search);
      const { time } = search;
      const confirmTimeStart = time[0].format('YYYY-MM-DD');
      const confirmTimeEnd = time[1].format('YYYY-MM-DD');
      // const confirmTime = search.endDate ? { confirmTimeStart: startDate, confirmTimeEnd: endDate } : {};
      delete search.time;
      actions.searchAuditList({ ...search, pn: 1, confirmTimeStart, confirmTimeEnd })
    },
  }

  const extraColumns = [{
    key: 'operator',
    name: '操作',
    fixed: 'right',
    width: 100,
    //扩展字段的render支持自定义渲染
    render: (value, record) => {
      // console.log(value, record);
      return (
        <Link to={`audit_seller_proxy/detail/${record.id}`}>详情</Link>
      );
    }
  }]

  const tableProps = {
    scroll: { x: 1000 },
    rowKey: "field",
    columns: getColumns(fields).extend(extraColumns).values(),
    loading: loading.effects['audit_seller_proxy/fetchLists'],
    dataSource: audits,
    pagination: {
      ...pagination,
      showTotal: tc => `总共 ${tc} 条`,
      onChange: index => actions.searchAuditList({ pn: index }),
    }
  }

  return (
    <div className="common-form-container">
      <Filter {...filterProps} />
      <Table {...tableProps} />
    </div>
  );
}

const mapStateToProps = ({ audit_seller_proxy, loading }) => {
  return { ...audit_seller_proxy, loading }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      searchAuditList (params) {
        dispatch({ type: 'audit_seller_proxy/fetchLists', payload: params })
      },
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(AuditSellerProxy)