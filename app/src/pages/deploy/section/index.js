import React from 'react'
import { connect } from 'dva';
import { message } from 'antd';
import styles from './index.less'
import Structure from '@components/structure/section';
import services from '@services/';

import ConfigMenus from './components/menusconfig'; // 配置菜单

// 行政部门管理
class Section extends React.Component {
  state = {
    visibleConfigMenus: false,
    orgIndex: '',
    enteryConfigMenus: [],
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
    let { visibleConfigMenus, orgIndex, enteryConfigMenus } = this.state;
    let self = this;

    // 打开菜单配置
    let openConfigMenus = (orgIndex) => {
      services.getEnterpriseOrgMenuByOrgId({
        orgIndex
      }).then(({ data }) => {
        if (data.msg === 'success') {
          let obj = {};
          let dataMenus = data.data;
          _.forEach(dataMenus, (item) => {
            obj[item.mid] = item;
          });
          self.save({
            visibleConfigMenus: true,
            orgIndex,
            enteryConfigMenus: obj,
          });
        } else {
          message.error(data.msg);
        }
      });
    }

    let configMenusOpt = {
      user,
      visible: visibleConfigMenus,
      orgIndex,
      enteryConfigMenus,
      handerAdd(data) {
        enteryConfigMenus[data.mid] = data;
        self.save({
          enteryConfigMenus,
        });
      },
      onCancel() {
        self.save({
          visibleConfigMenus: false,
        })
      },
    }
    return (
      <div>
        <div className={styles.content}><Structure openConfigMenus={openConfigMenus} /></div>
        <div>
          <ConfigMenus {...configMenusOpt} />
        </div>
      </div>
    )
  }
}

export default connect(({ structure, user }) => ({
  structure,
  user,
}))(Section)