import React from 'react'
import styles from "../index.less";
import {Table} from 'antd'
import {TableUtils} from 'utils'
import {Filter} from 'components'
import {connect} from 'dva'
import {enumType} from './../enum'

const {getColumns} = TableUtils;
const {FARM_TYPE} = enumType;
const FarmQualification = ({
                             dispatch,
                             loading,
                             actions,
                             farmQualification: {
                               list,
                               spinning,
                               pagination
                             },
                           }) => {
  const queryCondition = [{
    inputType: 'input',
    title: 'farmName',
    value: '',
    label: '农场名称',
    itemConfig: {
      initialValue: ''
    },
    componentsConfig: {
      placeholder: '请输入农场名称',
    }
  }, {
    inputType: 'input',
    title: 'farmNo',
    value: '',
    label: '农场编号',
    itemConfig: {
      initialValue: ''
    },
    componentsConfig: {
      placeholder: '请输入农场编号',
    }
  }]
  const columns = [{
    title: '农场编号',
    dataIndex: 'farmNo',
    key: 'farmNo',
  }, {
    title: '农场名称',
    dataIndex: 'farmName',
    key: 'farmName',
  }, {
    title: '农场类型',
    enums: FARM_TYPE,
    dataIndex: 'farmType',
    key: 'farmType',
  }, {
    title: '已上传资料数量',
    dataIndex: 'uploadNum',
    key: 'uploadNum',
  }, {
    title: '已翻译数量',
    dataIndex: 'translationNum',
    key: 'translationNum',
  }, {
    title: '发布时间',
    type: 'datetime',
    dataIndex: 'createTime',
    key: 'createTime',
  }, /*{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render:(text,recod)=> <Link to="farm_qualification/details">查看详情</Link>
  }*/];
  const paginationProps = {
    ...pagination,
    onChange: (page, size) => actions.changePagination(page, size)
  }
  const filterProps = {
    queryCondition,
    onSearch: (payload) => {
      actions.searchfarmQualification(payload)
    },
    onReset: () => actions.restFilter()
  }
  return (
    <div className={styles.farmContainer}>
      <Filter {...filterProps}></Filter>
      <div style={{marginTop: 20}}>
        <Table
          columns={getColumns(columns).values()}
          dataSource={list}
          style={{textAlign:'center'}}
          loading={spinning}
          pagination={paginationProps}
        />
      </div>
    </div>
  )
}
const mapStateToProps = ({farmQualification, loading}) => ({farmQualification, loading});
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      changePagination(page, size) {
        dispatch({
          type: 'farmQualification/updatePagination',
          payload: {
            ps: size,
            pn: page,
            current: page,
          },
        });
        dispatch({
          type: 'farmQualification/getList'
        });
      },
      searchfarmQualification: (payload) => {
        dispatch({
          type: 'farmQualification/updatePagination',
          payload: {
            pn: 1,
            current: 1,
          },
        });
        dispatch({
          type: 'farmQualification/farmFilter', payload: {'queryParameters': payload}
        });
        dispatch({
          type: 'farmQualification/getList'
        });
      },
      restFilter: () => {
        dispatch({type: 'farmQualification/clearFilter'});
        dispatch({
          type: 'farmQualification/getList', payload: {
            ps: 10,
            pn: 1,
          }
        });
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FarmQualification)
