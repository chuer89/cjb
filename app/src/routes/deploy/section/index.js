import React from 'react'
import { connect } from 'dva'
import styles from './index.less'
import App from '../../app';
import Structure from './../../../components/structure/section';

import ConfigMenus from './components/menusconfig'; // 配置菜单

// 行政部门管理
class Section extends React.Component {
  state = {
    visibleConfigMenus: false,
    mid: '',
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
    let { user } = this.props;
    let { visibleConfigMenus } = this.state;
    let self = this;

    // 打开菜单配置
    let openConfigMenus = (mid) => {
      self.save({
        visibleConfigMenus: true,
        mid,
      });
    }
    let configMenusOpt = {
      user, 
      visible: visibleConfigMenus, 
      onCancel() {
        self.save({
          visibleConfigMenus: false,
        })
      },
    }
    return (
      <App>
        <div className={styles.content}><Structure openConfigMenus={openConfigMenus}/></div>
        <div>
          <ConfigMenus {...configMenusOpt} />
        </div>
      </App>
    )
  }
}

export default connect(({ structure, user }) => ({
  structure,
  user,
}))(Section)