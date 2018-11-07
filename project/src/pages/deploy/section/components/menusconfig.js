// 档案管理列表
import React from 'react';
import { Modal, Tabs, Checkbox, message } from 'antd';
import style from './config.less';
import _ from 'lodash';
import services from '@services/';

const TabPane = Tabs.TabPane;

class Config extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {}
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

  // 配置菜单-添加
  handerAdd(param) {
    let { handerAdd } = this.props;
    services.addEnterpriseOrgMenu(param).then(({ data }) => {
      if (data.msg === 'success') {
        handerAdd(data.data);
        // message.success('注册成功，请登录');
      } else {
        message.error(data.msg);
      }
    })
  }

  // 配置菜单-删除
  handerDel(param) {
    services.deleteEnterpriseOrgMenuById(param).then(({ data }) => {
      if (data.msg === 'success') {
        // message.success('注册成功，请登录');
      } else {
        message.error(data.msg);
      }
    })
  }

  render() {
    let { user, visible, onCancel, orgIndex, enteryConfigMenus } = this.props;
    let { menus } = user;
    let self = this;

    // console.log(menus, enteryConfigMenus, 'menus')

    let renderStructure = '';
    let renderTab = '';
    let defaultActiveKey = '';
    if (!_.isEmpty(menus)) {
      defaultActiveKey = '' + menus[0].id;

      renderTab = menus.map((item) => {
        let renderTree = '';

        if (!_.isEmpty(item.tree)) {
          renderTree = item.tree.map((itemTree) => {
            let { id, index } = itemTree;
            let enteryMenu = enteryConfigMenus[id] || {};
            let isdefultCheck = enteryMenu.id ? true : false;
            let handerChange = (e) => {
              let checked = e.target.checked;
              if (checked) {
                self.handerAdd({
                  mid: id,
                  orgIndex,
                  mindex: index,
                });
              } else {
                self.handerDel({
                  id: enteryMenu.id,
                });
              }
            }
            return (
              <div key={itemTree.id} className={style.itemMenus}>
                <Checkbox defaultChecked={isdefultCheck} onChange={handerChange}>{itemTree.name}</Checkbox>
              </div>
            )
          })
        }

        return (
          <TabPane tab={item.name} key={item.id}>
            <div className={style.menusBox} style={{ overflow: 'hidden' }}>{renderTree}</div>
          </TabPane>
        )
      });

      renderStructure = (
        <Tabs defaultActiveKey={defaultActiveKey}>{renderTab}</Tabs>
      )
    }
    return (
      <Modal
        title="员工菜单权限配置"
        width={600}
        destroyOnClose={true}
        visible={visible}
        footer={null}
        onCancel={onCancel}>
        <div className={style.contentBox}>
          {renderStructure}
        </div>
      </Modal>
    )
  }
}

export default Config;
