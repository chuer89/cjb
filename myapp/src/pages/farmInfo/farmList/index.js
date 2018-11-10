import { Page} from 'components';
import { Component } from 'react';
import { connect } from 'dva';
import { Pagination, Spin, Affix } from 'antd';
import styles from './index.less';

import List from './components/List';
import MyFilter from './components/MyFilter';
import RawData from './components/RawData'

class FarmList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ps: 12,
      current: 1,
      detailShow: false,
      detailData: {},
      listEffect: this.props.noPublishfarm.listEffect,
    };
  }

  onQuery () {
    const { ps, current } = this.state;
    this.props.dispatch({
      type: this.state.listEffect,
      payload: {
        ps,
        pn : current,
      },
    });
  }

  onSeachSelf () {
    this.props.dispatch({
      type: 'noPublishfarm/myReceive',
    });
  }

  onDetailShowTaggle () {
    this.setState({detailShow: !this.state.detailShow});
  }

  render ({noPublishfarm, loading} = this.props) {
    const {list, pagination } = noPublishfarm;
    const listProps = {
      list: list.map(item => ({
        ...item,
        onPublish: ()=> {
          console.log(item);
          this.props.dispatch({
            type: 'noPublishfarm/receive',
            payload: {
              id: item.id,
            },
          });
        },
        onView: () => {
          console.log(item);
          this.props.dispatch({
            type: 'noPublishfarm/getDetail',
            payload: {
              id: item.id,
            },
          });
          this.onDetailShowTaggle();
          this.setState({detailData: item});
        },
      })),
    };

    const paginationProps = {
      ...pagination,
      pageSize: this.state.ps,
      showQuickJumper: false,
      showSizeChanger: false,
      current: this.state.current,
      onChange: (page) => {
        this.setState({current: page}, () => {
          this.onQuery();
        });
      },
    };

    const rawDataProps = {
      visible: this.state.detailShow,
      data: noPublishfarm.detailData || {},
      onCancel: () => {
        this.onDetailShowTaggle();
      },
      onPublish: (id) => {
        this.props.dispatch({
          type: 'noPublishfarm/receive',
          payload: {
            id: id,
          },
        });
      },
      loading: loading.effects['noPublishfarm/getDetail'],
    };

    const myFilterProps = {
      onSeach: (params) => {
        this.props.dispatch({
          type: 'noPublishfarm/updateParams',
          payload: params,
        });
        this.setState({current: 1}, () => {
          this.onQuery();
        });
      },
      onSeachSelf: () => {
        this.onSeachSelf();
      },
    };

    return (
      <Page inner
            loading={false}
            className={styles.farmContainer}>
        <Affix target={() => document.getElementById('mainContainer')}>
          <MyFilter {...myFilterProps}/>
        </Affix>
        <Spin spinning={loading.effects[this.state.listEffect]}>
          <List {...listProps}/>
        </Spin>
        <Pagination className={styles.pagination} {...paginationProps} />
        <RawData {...rawDataProps} />
      </Page>
    );
  }
};

export default connect(({ noPublishfarm, loading }) => ({ noPublishfarm, loading }))(FarmList);
