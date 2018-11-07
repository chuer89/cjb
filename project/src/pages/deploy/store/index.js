import React from 'react'
import { connect } from 'dva'
import styles from './index.less'

import Structure from '@components/structure/';

// 门店管理
class StoreStru extends React.Component {
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
    return (
      <div>
        <div className={styles.content}><Structure /></div>
      </div>
    )
  }
}

export default connect()(StoreStru)