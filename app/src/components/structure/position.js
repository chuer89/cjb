import React from 'react'
import { connect } from 'dva'
import { Button, Input, Row, Col, Modal, message } from 'antd'
import styles from './index.less'
import _ from 'lodash';
import services from '@services/';
import ModifyPosition from './modifyPosition';

const confirm = Modal.confirm;

// 岗位组织架构
class Structure extends React.Component {
  state = {
    visibleModify: false,
    modifyTitle: '', // 弹框标题
    callBack: () => { },
    initialValue: '',
    data: {},
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
        type: 'structure/getPosition'
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

  // 修改岗位 弹框
  handerModifySection(data) {
    let self = this;
    const { id } = data;
    this.handerOpenModify({
      modifyTitle: '修改岗位',
      data,
      callBack(values) {
        let param = {};
        _.extend(param, values, {
          id,
        });
        services.updatePositionById(param)
          .then(({ data }) => {
            self.handerAjaxBack(data);
          });
      }
    });
  }

  // 新增
  handerAdd() {
    let self = this;
    this.handerOpenModify({
      modifyTitle: '添加岗位',
      data: {},
      callBack(values) {
        services.addPosition(values)
          .then(({ data }) => {
            self.handerAjaxBack(data);
          });
      }
    });
  }

  // 删除岗位
  deletePositionById(id) {
    let self = this;
    this.handerShowDel(() => {
      services.deletePositionById({
        id,
        type: '1', // 强制删除
      }).then(({ data }) => {
        self.handerAjaxBack(data);
      });
    });
  }

  render() {
    let self = this;
    let { structure: { positionStructure } } = this.props;
    let { visibleModify, modifyTitle, data,
      callBack, initialValue } = this.state;

    let renderStructure = '暂无数据';
    if (!_.isEmpty(positionStructure)) {
      renderStructure = positionStructure.map((item, index) => {
        return (
          <div key={index} className={styles.areaBox}>
            <div className={styles.titleBox}>
              <div className={styles.title}>
                <i className="iconfont">&#xe601;</i>
                {item.name}
              </div>
              <div className={styles.operateBox}>
                <span onClick={(e) => {self.handerModifySection(item)}}>编辑</span>
                <span onClick={(e) => {self.deletePositionById(item.id)}}>删除</span>
              </div>
            </div>
          </div>
        )
      })
    }

    let modifyOpt = {
      visible: visibleModify,
      title: modifyTitle,
      initialValue,
      onCancel() {
        self.save({
          visibleModify: false,
        });
      },
      callBack,
      data,
    }

    return (
      <div>
        <div>
          <ModifyPosition {...modifyOpt} />
        </div>
        <div className={styles.addBtnBox} style={{ textAlign: 'right' }}>
          <Button type="primary" size="large" onClick={() => { self.handerAdd() }} style={{ width: '140px' }}>添加</Button>
        </div>
        <div>{renderStructure}</div>
      </div>
    )
  }
}

export default connect(({ structure }) => ({
  structure
}))(Structure)