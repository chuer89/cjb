import React from 'react';
import { Icon } from 'antd';
import _ from 'lodash';
import styles from './index.less';

// 筛选部门
class DeptSele extends React.Component {
  state = {
    seleResult: '筛选部门',
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
    let { structure, userType, onChange } = this.props;
    let { storeStructure, sectionStructure } = structure;
    let { seleResult } = this.state;

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

    if (userType === 1) {
      deptData = [{
        value: '',
        label: '门店',
        children: bChildren
      }];
    }

    let renderResult = (
      <div>无筛选部门</div>
    );
    renderResult = deptData.map((item) => {
      return (
        <div key={item.value}>
          <div>{item.label}</div>
          {
            item.children.map((bItem) => {
              return (
                <div key={bItem.value}>
                  <div>{bItem.label}</div>
                  {
                    bItem.children.map((aItem) => {
                      return (
                        <div key={aItem.value}>
                          <div>{aItem.label}</div>
                          {
                            aItem.children.map((sItem) => {
                              return (
                                <div key={sItem.value}>
                                  <div>{sItem.label}</div>
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      )
    });

    console.log(storeStructure, deptData)

    return (
      <div className={styles.seleDeptBox}>
        <div className={styles.seleBox}>
          <span>{seleResult}</span><Icon type="down" theme="outlined" />
        </div>
        <div className={styles.seleResultBox}>{renderResult}</div>
      </div>
    )
  }
}


export default DeptSele;
