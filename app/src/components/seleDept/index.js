import React from 'react';
import { Cascader } from 'antd';
import _ from 'lodash';

// 筛选部门
class DeptSele extends React.Component {
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
    let { structure, userType, onChange, defaultValue, getPopupContainerId, cascaderConfig } = this.props;
    let { storeStructure, sectionStructure } = structure;

    // userType 0：企业账号；1：员工账号 2: 直属部门
    // 类型（1门店类 2直属部门类）
    let deptData = [];
    let bChildren = [];
    if (!_.isEmpty(storeStructure) && !_.isEmpty(storeStructure[0].brand)) {
      _.forEach(storeStructure[0].brand, (bItem) => {
        let aChildren = [];
        let bid = '1.' + bItem.bid;

        if (!_.isEmpty(bItem.area)) {
          _.forEach(bItem.area, (aItem) => {
            let sChildren = [];
            let aid = bid + '.' + aItem.aid;

            if (!_.isEmpty(aItem.store)) {
              _.forEach(aItem.store, (sItem) => {
                sChildren.push({
                  value: aid + '.' + sItem.sid,
                  label: sItem.sname,
                });
              });
            }

            aChildren.push({
              value: aid,
              label: aItem.aname,
              children: sChildren,
            });
          });
        }

        bChildren.push({
          value: bid,
          label: bItem.bname,
          children: aChildren,
        });
      });
    }

    let sChildren = [];
    if (!_.isEmpty(sectionStructure)) {
      _.forEach(sectionStructure, (item) => {
        sChildren.push({
          value: '2.' + item.id,
          label: item.name,
        });
      })
    }

    if (userType === 1) {
      deptData = [{
        value: '1',
        label: '门店',
        children: bChildren
      }];
    } else if (userType === 0 || userType === 2) {
      deptData = [{
        value: '1',
        label: '门店',
        children: bChildren
      }, {
        value: '2',
        label: '直属部门',
        children: sChildren,
      }];
    }

    let deptOpt = {
      options: deptData,
      onChange,
      defaultValue,
      placeholder: '全部',
      notFoundContent: '无筛选部门',
      expandTrigger: 'hover',
      changeOnSelect: userType === 1 ? false : true,
      getPopupContainer: () => document.getElementById(getPopupContainerId || 'js_sele_dept'),
      ...cascaderConfig,
    }

    return (
      <div>
        <Cascader {...deptOpt} />
        <div id="js_sele_dept"></div>
      </div>
    )
  }
}

export default DeptSele;
