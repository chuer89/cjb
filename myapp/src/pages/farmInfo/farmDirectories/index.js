import React from "react";
import {Component} from 'react';
import {connect} from 'dva';
import styles from './index.less';
import {Page, Filter} from 'components';
import {Table, Input, Button, Select} from 'antd';
import {filterConfig} from './filterConfig'
import RawData from './RawData'
import {columns} from './columnsConfig'

const {queryCondition} = filterConfig;

class FarmDirectories extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    detailShow: false
  }
  render({farmDirectories, actions} = this.props) {
    const {list, pagination, spinning, detailData} = farmDirectories;
    const handlenShowDetail = (id) => {
      this.setState({detailShow:true});
      actions.onView(id);
    }
    const column = columns(handlenShowDetail)
    const paginationProps = {
      ...pagination,
      onChange: (page, size) => actions.changePagination(page, size)
    };
    const filterProps = {
      queryCondition,
      onSearch: payload => actions.search(payload),
      onReset: () => actions.restFilter()
    }
    const rawDataProps = {
      visible: this.state.detailShow,
      data: detailData || {},
      showBtn:false,
      loading:spinning,
      onCancel: () => {
        this.setState({detailShow:false})
      },
      onPublish: (id) => {
        this.props.dispatch({
          type: 'noPublishfarm/receive',
          payload: {
            id: id,
          },
        });
      }
    };
    return (
      <div className={styles.farmContainer}>
        <Filter {...filterProps}></Filter>
        <Table
          style={{marginTop: 20}}
          scroll={{x: 1400}}
          dataSource={list}
          columns={column}
          loading={spinning}
          pagination={paginationProps}
        />
        <RawData {...rawDataProps} />
      </div>);
  }
}

const mapStateToProps = ({farmDirectories, loading}) => ({farmDirectories, loading})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      search: (payload) =>{
        dispatch({
        type: 'farmDirectories/getList',
        payload: {
          ps: 12,
          pn: 1,
          ...payload
        }
      })},
      changePagination(page, size) {
        dispatch({
          type: 'farmDirectories/updatePagination',
          payload: {
            ps: size,
            pn: page
          },
        });
        dispatch({
          type: 'farmDirectories/getList'
        });
      },
      onView: (id) => {
        dispatch({
          type: 'farmDirectories/getDetail',
          payload: {id},
        });
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FarmDirectories);
