import React from 'react'
import { connect } from 'dva'
import { Button, Input, Row, Col, Modal, message } from 'antd'
import styles from './index.less'
import _ from 'lodash';
import services from '@services/';
import Link from 'umi/link';
import routerRedux from 'umi/router';
import { UploadField, Uploader } from '@navjobs/upload';

import Modify from './modify';
import ConfigStore from './configStore';
import PositionManage from './positionManage';


const confirm = Modal.confirm;

// 上传
const UploadHead = ({ addFile, token, sid }) => {
  let action = services.importUser + '?token=' + token + '&sid=' + sid;
  const reloadPage = () => {
    location.reload();
  }

  return (
    <Uploader
      request={{
        fileName: 'file',
        url: action,
        method: 'POST',
        // use credentials for cross-site requests
        withCredentials: false,
      }}
      onError={({ error }) => {
        Modal.error({
          title: '服务器有误',
          content: '上传失败，请稍后再试。',
          onOk: reloadPage,
        });
        // message.error('上传失败，请稍后再试。', reloadPage);
      }}
      onComplete={({ response }) => {
        let { msg, data } = response;

        if (msg === 'success') {
          message.success('导入成功');
          addFile(data);
        } else {
          Modal.error({
            title: '导入失败',
            content: msg,
            onOk: reloadPage,
          });
          // message.error(msg, reloadPage);
        }
      }}
      //upload on file selection, otherwise use `startUpload`
      uploadOnSelection={true}
    >
      {({ onFiles, progress, complete }) => {
        let loading = false;
        let upText = '导入员工';

        if (progress && !complete) {
          loading = true;
          upText = '上传中';
          // message.loading('上传中，请稍后。。。')
        }

        return (
          <UploadField onFiles={(file) => {
            if (!_.isEmpty(file)) {
              // 文件限制5m
              if (file[0].size < 1024 * 1024 * 5) {
                onFiles(file);
              } else {
                message.error('文件最大5M，请压缩文件大小');
              }
            }
          }} uploadProps={{
            accept: '.xlsx,.xls,.xlt',
          }}>
            <span style={{ padding: '0' }}>{upText}</span>
          </UploadField>
        )
      }}
    </Uploader>
  )
}

// 门店组织架构
class Structure extends React.Component {
  state = {
    valueBrandInput: '', // 添加品牌
    visibleModify: false,
    modifyTitle: '', // 弹框标题
    modifyLabel: '',
    callBack: () => { },
    initialValue: '',

    visibleStroe: false, // 配置门店
    visiblePosition: false, // 岗位
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
      visibleStroe: false,
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
    let self = this;
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
            self.handerAjaxBack(data);
          });
      }
    });
  }
  // 删除品牌
  deleteCommonBrandById(bid) {
    let self = this;
    this.handerShowDel(() => {
      services.deleteCommonBrandById({
        bid,
      }).then(({ data }) => {
        self.handerAjaxBack(data);
      })
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
    let self = this;
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
            self.handerAjaxBack(data);
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
  addCommonStore(bid, aid) {
    let self = this;
    this.save({
      visibleStroe: true,
      modifyTitle: '添加门店',
      initialValue: {},
      callBack(values) {
        let param = {
          bid,
          aid,
        }
        _.extend(param, values);
        services.addCommonStore(param)
          .then(({ data }) => {
            self.handerAjaxBack(data);
          });
      }
    });
  }
  // 更新门店
  updateCommonStoreById({ sid, sname, saddress }) {
    let self = this;
    this.save({
      visibleStroe: true,
      modifyTitle: '修改门店',
      initialValue: {
        sname,
        saddress,
      },
      callBack(values) {
        let param = {
          sid,
        }
        _.extend(param, values);
        services.updateCommonStoreById(param)
          .then(({ data }) => {
            self.handerAjaxBack(data);
          });
      }
    });

    // this.handerOpenModify({
    //   modifyTitle: '修改门店',
    //   modifyLabel: '请输入门店名称',
    //   initialValue,
    //   callBack(values) {
    //     let param = {
    //       sid,
    //       sname: values,
    //     }
    //     services.updateCommonStoreById(param)
    //       .then(({ data }) => {
    //         self.handerAjaxBack(data);
    //       });
    //   }
    // });
  }
  // 删除门店
  deleteCommonStoreById(sid) {
    let self = this;
    this.handerShowDel(() => {
      services.deleteCommonStoreById({
        sid,
      }).then(({ data }) => {
        self.handerAjaxBack(data);
      });
    });
  }

  render() {
    let { structure, app, dispatch, user: {
      userInfo: { token, userType }
    } } = this.props;
    let { storeStructure } = structure;
    let { mapKey } = app;
    let { visibleModify, modifyTitle, visiblePosition,
      modifyLabel, callBack, initialValue, valueBrandInput, visibleStroe } = this.state;
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
      if (!valueBrandInput) {
        message.error('请填写品牌名称');
        return false;
      }
      services.addCommonBrand({
        bname: valueBrandInput
      }).then(({ data }) => {
        if (data.msg === 'success') {
          self.save({
            valueBrandInput: ''
          });
        }
        self.handerAjaxBack(data);
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
    let configStoreOpt = {
      visible: visibleStroe,
      title: modifyTitle,
      onCancel() {
        self.save({
          visibleStroe: false,
        });
      },
      callBack,
      initialValue,
      mapKey,
    }

    // 岗位
    let positionManageAttr = {
      visible: visiblePosition,
      onCancel() {
        self.save({
          visiblePosition: false,
        });
      }
    }
    let handerOpenPosition = ({ sid }) => {
      console.log(sid, 's')
      self.save({
        visiblePosition: true,
      });
    }

    let importUserAttr = {
      token,
      addFile() {
        // message.success('导入成功');
      }
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
                let linkTo = `/personnel/record/addUser?departmentType=1&storeId=${itemStore.sid}`;
                // 企业管理员，可以删除门店
                let renderDelete = '';
                if (userType === 0) {
                  renderDelete = (
                    <span onClick={() => { self.deleteCommonStoreById(itemStore.sid) }}>删除门店</span>
                  )
                }
                return (
                  <div key={indexStore} className={styles.storeBox}>
                    <div className={styles.titleBox}>
                      <div className={styles.title}>
                        <span>门店：</span>
                        <i className="iconfont">&#xe650;</i>
                        {itemStore.sname}
                      </div>
                      <div className={styles.operateBox}>
                        <span><Link target="_blank" to={linkTo}>添加员工</Link></span>
                        <span><UploadHead {...importUserAttr} sid={itemStore.sid} /></span>
                        <span onClick={() => { self.updateCommonStoreById(itemStore) }}>编辑门店</span>
                        {renderDelete}
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
                  <div className={styles.title}>
                    <span>区域：</span>
                    <i className="iconfont">&#xe657;</i>
                    {itemArea.aname}
                  </div>
                  <div className={styles.operateBox}>
                    <span onClick={() => { self.addCommonStore(item.bid, itemArea.aid) }}>添加门店</span>
                    <span onClick={() => { self.updateCommonAreaById(itemArea.aid, itemArea.aname) }}>编辑区域</span>
                    <span onClick={() => { self.deleteCommonAreaById(itemArea.aid) }}>删除区域</span>
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
                <span>品牌：</span>
                <i className="iconfont">&#xe612;</i>
                {item.bname}
              </div>
              <div className={styles.operateBox}>
                <span onClick={() => { self.addCommonArea(item.bid) }}>添加区域</span>
                <span onClick={() => { self.handerModifyBrand(item.bid, item.bname) }}>编辑品牌</span>
                <span onClick={() => { self.deleteCommonBrandById(item.bid) }}>删除品牌</span>
              </div>
            </div>
            <div>{renderArea}</div>
          </div>
        )
      })
      // console.log(brandData, '组织');
    }

    let exportTemplate = `${services.exportUser}?token=${token}&type=3`;

    return (
      <div>
        <div>
          <Modify {...modifyOpt} />
          <ConfigStore {...configStoreOpt} />
          <PositionManage {...positionManageAttr} />
        </div>
        <div className={styles.addBtnBox}>
          <Row>
            <Col span={9}>
              <Input value={valueBrandInput}
                onChange={handerChangeBrand}
                onPressEnter={handleAddBrand}
                autoComplete="off"
                placeholder="填写品牌名称" />
            </Col>
            <Col span={4} style={{ 'paddingLeft': '24px' }}>
              <Button type="primary" onClick={handleAddBrand} loading={false}>添加</Button>
            </Col>
            <Col span={10} style={{ textAlign: 'right' }}>
              <a href={exportTemplate} target="_blank">
                <Button type="primary" icon="save">门店模版下载</Button>
              </a>
            </Col>
          </Row>
        </div>
        <div>{renderStructure}</div>
      </div>
    )
  }
}

export default connect(({ structure, app, user }) => ({
  structure,
  app,
  user,
}))(Structure)