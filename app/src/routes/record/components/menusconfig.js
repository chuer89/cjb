// 档案管理列表
import React from 'react';
import { Modal, Tabs, Checkbox } from 'antd';
import style from './config.less';
import _ from 'lodash';

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

  render() {
    let { user, visible, onCancel, handleOk } = this.props;
    let { menus } = user;

    let renderStructure = '';
    let renderTab = '';
    let defaultActiveKey = '';
    if (!_.isEmpty(menus)) {
      defaultActiveKey = '' + menus[0].id;

      renderTab = menus.map((item) => {
        let renderTree = '';

        if (!_.isEmpty(item.tree)) {
          renderTree = item.tree.map((itemTree) => {
            let handerChange = (e) => {
              let checked = e.target.checked;
              console.log(checked, 'qieh')
            }
            return (
              <div key={itemTree.id} className={style.itemMenus}>
                <Checkbox onChange={handerChange}>{itemTree.name}</Checkbox>
              </div>
            )
          })
        }

        return (
          <TabPane tab={item.name} key={item.id}>
            <div className={style.menusBox}>{renderTree}</div>
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
        cancelText="取消"
        okText="确定"
        onOk={handleOk}
        onCancel={onCancel}>
        <div className={style.contentBox}>
          {renderStructure}
        </div>
      </Modal>
    )
  }
}

export default Config;
