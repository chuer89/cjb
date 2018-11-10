import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Filter, EditModal} from 'components'
import {TableUtils} from 'utils'
import router from 'umi/router';
import {Table, Divider, Button, Spin} from 'antd'
import styles from './index.less'
import {columns} from './columnsConfig';
import {operatorType} from './operatorType';

const {getColumns} = TableUtils;
const viewDetail = (query) => router.push({
  pathname: '/farmInfo/details',
  query,
});
const handleAdd = () => {
  router.push('/farmInfo/add');
}

function Farm({
                dispatch,
                loading,
                actions,
                farm: {
                  list,
                  pagination,
                  queryCondition,
                  spinning,
                },
              }) {
  const paginationProps = {
    ...pagination,
    onChange: (page, size) => actions.changePagination(page, size)
  }
  const filterProps = {
    queryCondition,
    onSearch: (payload) => {
      const {time} = payload
      if (time && time.length) {
        payload.startDate = time[0].format('YYYY-MM-DD')
        payload.endDate = time[1].format('YYYY-MM-DD')

      }
      actions.searchFarmList(payload)
    },
    onReset: () => actions.restFilter()
  }
  const extraColumns = [{
    fixed: 'right',
    title: '操作',
    dataIndex: 'operator',
    key: 'operator',
    width: '220',
    render: (text, record) => {
      const id = record.id;
      const isSale = record.isSale;
      return [record && Object.keys(record).map((key, index) => operatorType[key] && operatorType[key][record[key]] && operatorType[key][record[key]](index, record)),
        <a href="javascript:;" onClick={() => viewDetail({id, isSale})} style={{paddingLeft: 10}}
           key={`details_${id}`}>详情</a>]
    }
  }]
  return (
    <div className={styles.farmContainer}>
      <div className={styles.add}><Button type="primary" onClick={handleAdd}>新增农场</Button></div>
      <Filter {...filterProps}></Filter>
      <Table
        style={{marginTop: 20}}
        scroll={{x: 1400}}
        columns={getColumns(columns).extend(extraColumns).values()}
        dataSource={list}
        loading={spinning}
        pagination={paginationProps}
      />
    </div>
  )
}

Farm.propTypes = {
  order: PropTypes.object,
  loading: PropTypes.object,
}
const mapStateToProps = ({farm, loading}) => ({farm, loading})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      changePagination(page, size) {
        dispatch({
          type: 'farm/updatePagination',
          payload: {
            ps: size,
            pn: page,
            current: page,
          },
        });
        dispatch({
          type: 'farm/farmList'
        });
      },
      searchFarmList(payload) {
        dispatch({
          type: 'farm/updatePagination',
          payload: {
            pn: 1,
            current: 1,
          },
        });
        dispatch({
          type: 'farm/farmFilter', payload: {'queryParameters': payload}
        });
        dispatch({
          type: 'farm/farmList'
        });
      },
      restFilter() {
        dispatch({type: 'farm/clearFilter'});
        dispatch({
          type: 'farm/farmList', payload: {
            ps: 10,
            pn: 1,
          }
        });
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Farm)
