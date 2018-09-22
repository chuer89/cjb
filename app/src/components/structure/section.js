import React from 'react'
import { connect } from 'dva'
import { Button, Input, Row, Col, Modal, message } from 'antd'
import styles from './index.less'
import _ from 'lodash';
import services from './../../services/';

import Modify from './modify';

const confirm = Modal.confirm;

class Structure extends React.Component {
  state = {
    valueInput: '', // 添加品牌
    visibleModify: false,
    modifyTitle: '', // 弹框标题
    modifyLabel: '',
    callBack: () => { },
    initialValue: '',
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
  // 关闭弹框
  handerCloseModify() {
    this.save({
      visibleModify: false,
    });
  }

  // 操作回调
  handerAjaxBack(data) {
    let { dispatch } = this.props;
    let self = this;
    if (data.msg === 'success') {
      self.handerCloseModify();
      message.success('操作成功');
      dispatch({
        type: 'structure/getEnterpriseOrgInfoList'
      });
    } else {
      message.error(data.msg);
    }
  }

  // 添加部门
  addEnterpriseOrgInfo() {
    let self = this;
    this.handerOpenModify({
      modifyTitle: '添加区域',
      modifyLabel: '请输入区域名称',
      initialValue: '',
      callBack(values) {
        let param = {
          parentId: -1,
          aname: values,
        }
        services.addEnterpriseOrgInfo(param)
          .then(({ data }) => {
            self.handerAjaxBack(data);
          });
      }
    });
  }

  render() {
    let self = this;
    let { structure } = this.props;
    let { sectionStructure } = structure;
    let { visibleModify, modifyTitle,
      modifyLabel, callBack, initialValue, valueInput } = this.state;

    let handerChangeBrand = (e) => {
      let value = e.target.value;
      self.save({
        valueInput: value
      });
    }

    // 添加部门
    let handleAddBrand = () => {
      if (!valueInput) {
        message.error('请填写部门名称');
        return false;
      }
      services.addEnterpriseOrgInfo({
        name: valueInput,
        parent_id: -1,
      }).then(({ data }) => {
        if (data.msg === 'success') {
          self.save({
            valueInput: ''
          });
        }
        self.handerAjaxBack(data);
      });
    }

    let renderStructure = '';
    if (!_.isEmpty(sectionStructure)) {
      console.log(sectionStructure, 'str');
      renderStructure = sectionStructure.map((item, index) => {
        return (
          <div key={index} className={styles.areaBox}>
            <div className={styles.titleBox}>
              <div className={styles.title}>
                <i className="iconfont">&#xe639;</i>
                {item.name}
              </div>
              <div className={styles.operateBox}>
                <span>编辑</span>
                <span>删除</span>
              </div>
            </div>
          </div>
        )
      })
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

    return (
      <div>
        <div>
          <Modify {...modifyOpt} />
        </div>
        <div className={styles.addBtnBox}>
          <Row>
            <Col span={9}>
              <Input value={valueInput}
                onChange={handerChangeBrand}
                onPressEnter={handleAddBrand}
                autoComplete="off"
                placeholder="填写部门名称" />
            </Col>
            <Col span={4} style={{ 'paddingLeft': '24px' }}>
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