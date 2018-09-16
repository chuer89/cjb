import React from 'react'
import { connect } from 'dva'
import { Button, Input, Row, Col, Icon, Modal } from 'antd'
import styles from './index.less'
import NProgress from 'nprogress';
import _ from 'lodash';
import { message } from 'antd';
import services from './../../services/';

import Modify from './components/modify';

const confirm = Modal.confirm;

NProgress.start();
class Structure extends React.Component {
  state = {
    valueBrandInput: '', // 添加品牌
    visibleModify: false,
    modifyTitle: '', // 弹框标题
    modifyLabel: '',
    callBack: () => { },
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

  // 打开弹框
  handerOpenModify(payload) {
    _.extend(payload, {
      visibleModify: true,
    });
    this.save(payload);
  }
  
  // 操作回调
  handerAjaxBack(data) {
    let { dispatch } = this.props;
    if (data.msg === 'success') {
      message.success('操作成功');
      dispatch({
        type: 'structure/getOrganizations'
      });
    } else {
      message.error(data.msg);
    }
  }

  // 确定删除
  handerShowDel(callBack) {
    confirm({
      title: '确定删除吗？',
      // content: '',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        callBack();
      },
      onCancel() { },
    });
  }

  // 修改品牌 弹框
  handerModifyBrand(bid, initialValue) {
    this.handerOpenModify({
      modifyTitle: '修改品牌',
      modifyLabel: '请输入品牌名称',
      initialValue,
      callBack(values) {
        let param = {
          bid,
          bname: values,
        }
        services.editCommonBrand(param)
          .then(({ data }) => {

          });
      }
    });
  }

  // 添加区域
  addCommonArea(bid) {
    let self = this;
    this.handerOpenModify({
      modifyTitle: '添加区域',
      modifyLabel: '请输入区域名称',
      initialValue: '',
      callBack(values) {
        let param = {
          bid,
          aname: values,
        }
        services.addCommonArea(param)
          .then(({ data }) => {
            self.handerAjaxBack(data);
          });
      }
    });
  }

  // 更新区域
  updateCommonAreaById(aid, initialValue) {
    this.handerOpenModify({
      modifyTitle: '修改区域',
      modifyLabel: '请输入区域名称',
      initialValue,
      callBack(values) {
        let param = {
          aid,
          aname: values,
        }
        services.updateCommonAreaById(param)
          .then(({ data }) => {

          });
      }
    });
  }

  // 删除区域
  deleteCommonAreaById(aid) {
    let self = this;
    this.handerShowDel(() => {
      services.deleteCommonAreaById({
        aid,
      }).then(({ data }) => {
        self.handerAjaxBack(data);
      });
    });
  }

  // 添加门店
  addCommonStore() {
    let self = this;
    let ajaxBack = this.handerAjaxBack;
    this.handerOpenModify({
      modifyTitle: '添加门店',
      modifyLabel: '请输入门店名称',
      initialValue: '',
      callBack(values) {
        // let param = {
        //   bid,
        //   aname: values,
        // }
        // services.addCommonArea(param)
        //   .then(({ data }) => {
        //     ajaxBack(data);
        //   });
      }
    });
  }

  render() {
    let { structure } = this.props;
    let { storeStructure } = structure;
    let { visibleModify, modifyTitle,
      modifyLabel, callBack, initialValue, valueBrandInput } = this.state;
    let brandData = [];
    let self = this;

    let handerChangeBrand = (e) => {
      let value = e.target.value;
      self.save({
        valueBrandInput: value
      });
    }
    // 添加品牌
    let handleAddBrand = () => {
      services.addCommonBrand({
        bname: valueBrandInput
      }).then(({ data }) => {

      });
    }

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
              // 门店
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

            // 区域
            return (
              <div key={indexArea} className={styles.areaBox}>
                <div className={styles.titleBox}>
                  <div className={styles.title}>{itemArea.aname}</div>
                  <div className={styles.operateBox}>
                    <span>添加</span>
                    <span onClick={() => { self.updateCommonAreaById(itemArea.aid, itemArea.aname) }}>编辑</span>
                    <span onClick={() => { self.deleteCommonAreaById(itemArea.aid) }}>删除</span>
                  </div>
                </div>
                <div>{renderStore}</div>
              </div>
            )
          });
        }

        // 品牌
        return (
          <div key={index} className={styles.brandBox}>
            <div className={styles.titleBox}>
              <div className={styles.title}>
                <Icon type="plus-circle" theme="outlined" />
                {item.bname}
              </div>
              <div className={styles.operateBox}>
                <span onClick={() => { self.addCommonArea(item.bid) }}>添加</span>
                <span onClick={() => { self.handerModifyBrand(item.bid, item.bname) }}>编辑</span>
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
              <Input value={valueBrandInput}
                onChange={handerChangeBrand}
                onPressEnter={handleAddBrand}
                autoComplete="off"
                placeholder="填写品牌名称" />
            </Col>
            <Col span={5} style={{ 'paddingLeft': '24px' }}>
              <Button type="primary" onClick={handleAddBrand} loading={false}>添加</Button>
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