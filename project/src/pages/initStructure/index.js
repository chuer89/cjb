import React from 'react'
import { connect } from 'dva'
import { Button, Icon } from 'antd'
import styles from './index.less'
import _ from 'lodash';
import { Link } from 'dva/router';

import StructureComponent from '@components/structure/';
import Footer from '@components/footer';


class Structure extends React.Component {
  state = {
    
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  save(payload) {
    if (this._isMounted) {
      this.setState(payload);
    }
  }

  render() {
    let { structure } = this.props;
    let { storeStructure } = structure;
    let brandData = [];
    let homeDisabled = true;
    // 进入首页是否可点击，判断是否有门店
    if (!_.isEmpty(storeStructure) && homeDisabled) {
      brandData = storeStructure[0].brand;
      _.forEach(brandData, (item) => {
        if (!_.isEmpty(item.area)) {
          _.forEach(item.area, (itemArea) => {
            if (!_.isEmpty(itemArea.store)) {
              homeDisabled = false;
            }
          });
        }
      })
    }
    
    return (
      <div className={styles.contentBox}>
        <div className={styles.content}>
          <div className={styles.toHome}>
            <Link to="/personnel/index">
              <Button type="primary" disabled={homeDisabled}>进入首页 <Icon type="right" /></Button>
            </Link>
          </div>
          <StructureComponent />
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(({ structure }) => ({
  structure
}))(Structure)