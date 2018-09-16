import React from 'react'
import { connect } from 'dva'
import { Button, Input, Row, Col, Icon } from 'antd'
import styles from './index.less'
import NProgress from 'nprogress';
import _ from 'lodash';
import services from './../../services/';

import Modify from './components/modify';

NProgress.start();
class Structure extends React.Component {
  state = {
    brand: [],
    visibleModify: false,
    modifyTitle: '', // 弹框标题
    modifyType: '',
    modifyLabel: '',
    callBack: () => {},
    initialValue: '',
  }

  componentDidMount() {
    NProgress.done();
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

  handerOpenModify(payload) {
    _.extend(payload, {
      visibleModify: true,
    });
    this.save(payload);
  }

  handleAddBrand() {
    this.handerOpenModify({
      modifyTitle: '添加品牌',
    })
  }

  // 修改品牌 弹框
  handerModifyBrand(bid, initialValue) {
    this.handerOpenModify({
      modifyTitle: '修改品牌',
      modifyType: 'brand',
      modifyLabel: '请输入品牌名称',
      initialValue,
      callBack(values) {
        let param = {
          bid,
          bname: values,
        }
        services.editCommonBrand(param).then(({ data }) => {

        })
      }
    });
  }

  render() {
    let { structure } = this.props;
    let { storeStructure } = structure;
    let { visibleModify, modifyTitle, modifyType, modifyLabel, callBack, initialValue } = this.state;
    let brandData = [];
    let self = this;

    let modifyOpt = {
      visible: visibleModify,
      title: modifyTitle,
      inputLabel: modifyLabel,
      initialValue,
      onCancel() {
        self.save({
          visibleModify: false,
        });
      },
      callBack,
    }

    let renderStructure = '';
    if (!_.isEmpty(storeStructure)) {
      brandData = storeStructure[0].brand;
      renderStructure = brandData.map((item, index) => {
        let { area } = item;
        let renderArea = '';
        if (!_.isEmpty(area)) {
          renderArea = area.map((itemArea, indexArea) => {
            let { store } = itemArea;
            let renderStore = '';
            if (!_.isEmpty(store)) {
              renderStore = store.map((itemStore, indexStore) => {
                return (
                  <div key={indexStore} className={styles.storeBox}>
                    <div className={styles.titleBox}>
                      <div className={styles.title}>{itemStore.sname}</div>
                      <div className={styles.operateBox}>
                        <span>编辑</span><span>删除</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            return (
              <div key={indexArea} className={styles.areaBox}>
                <div className={styles.titleBox}>
                  <div className={styles.title}>{itemArea.aname}</div>
                  <div className={styles.operateBox}>
                    <span>添加</span><span>编辑</span><span>删除</span>
                  </div>
                </div>
                <div>{renderStore}</div>
              </div>
            )
          });
        }

        return (
          <div key={index} className={styles.brandBox}>
            <div className={styles.titleBox}>
              <div className={styles.title}>
                <Icon type="plus-circle" theme="outlined" />
                {item.bname}
              </div>
              <div className={styles.operateBox}>
                <span>添加</span>
                <span onClick={() => {self.handerModifyBrand(item.bid, item.bname)}}>编辑</span>
                <span>删除</span>
              </div>
            </div>
            <div>{renderArea}</div>
          </div>
        )
      })
      console.log(brandData, '组织');
    }

    return (
      <div className={styles.content}>
        <div>
          <Modify {...modifyOpt} />
        </div>
        <div>
          <h3>请初始化企业的组织结构，例如（品牌-》区域-》门店），至少需要一个门店</h3>
        </div>
        <div>
          <Row>
            <Col span={7}>
              <Input onPressEnter={() => { self.handleAddBrand() }} autoComplete="off" placeholder="填写品牌名称" />
            </Col>
            <Col span={5} style={{ 'paddingLeft': '24px' }}>
              <Button type="primary" onClick={() => { self.handleAddBrand() }} loading={false}>添加</Button>
            </Col>
          </Row>
        </div>
        <div>{renderStructure}</div>
      </div>
    )
  }
}

export default connect(({ structure }) => ({
  structure
}))(Structure)