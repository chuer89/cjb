import React from 'react'
import { connect } from 'dva'
import { Button, Input, Row, Col, Icon, Modal, message } from 'antd'
import styles from './index.less'
import _ from 'lodash';
import App from '../../app';
// import services from './../../services/';
import { Link } from 'dva/router';

class Section extends React.Component {
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
      <App>
        <div className={styles.content}>
          部门管理
        </div>
      </App>
    )
  }
}

export default connect()(Section)