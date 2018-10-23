import React from 'react';
import { Form, Button, Row, Col, Icon, message } from 'antd';
import style from './add.less';
import { UploadField, Uploader } from '@navjobs/upload';
import _ from 'lodash';

// 上传
const UploadHead = ({ action, addFileImg, imgUrl, defaultImg }) => {
  let img = imgUrl;

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
        message.error('上传失败，请稍后再试。');
      }}
      onComplete={({ response }) => {
        let { msg, data } = response;
        if (msg === 'success') {
          addFileImg(data);
        }
      }}
      //upload on file selection, otherwise use `startUpload`
      uploadOnSelection={true}
    >
      {({ onFiles, progress, complete }) => {
        let isLoading = false;
        if (progress && !complete) {
          img = {path: defaultImg};
          isLoading = true;
        }
        if (complete) {
          img = imgUrl;
        }

        let renderImg = '';
        if (!_.isEmpty(imgUrl)) {
          if (_.isArray(imgUrl)) {
            renderImg = imgUrl.map((item, index) => {
              return (
                <div key={index} className={style.addFileItem}>
                  <img src={item.path} alt="" className={style.headImg} />
                </div>
              )
            })
          } else {
            renderImg = (
              <div className={style.addFileItem}>
                <img src={img.path} alt="" className={style.headImg} />
              </div>
            )
          }
        }

        let renderIcon = (
          <Icon type="upload" theme="outlined" style={{ 'fontSize': '20px' }} />
        )
        if (isLoading) {
          renderIcon = (
            <Icon type="loading" theme="outlined" style={{ 'fontSize': '20px' }} />
          )
        }

        return (
          <div>
            <div className={style.addBox}>
              {renderImg}
              <div className={style.addFileItemClone}>
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
                  accept: '.jpg,.jpeg,.png,.gif',
                }}>
                  <div className={style.addFileBox}>
                    <div className={style.addFileItemBox}>
                      <div>
                        {renderIcon}
                      </div>
                      <div>上传</div>
                      
                    </div>
                  </div>
                </UploadField>
              </div>
            </div>
          </div>
        )
      }}
    </Uploader>
  )
}

// 用户画像
class PortrayalForm extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      idcardFront: {}, // 身份证正面
      idcardReverse: {}, // 身份证反面
      healthCertificateFront: {}, // 健康证正面
      healthCertificateReverse: {}, // 健康证反面
      contract: [], // 合同图片，数组

      isInit: false,
    }
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

  componentDidUpdate() {
    let { portrayalImg } = this.props;
    let { isInit } = this.state;
    let { idcardFront, idcardReverse, healthCertificateFront,
      healthCertificateReverse, contract } = portrayalImg || {};
    if(!_.isEmpty(portrayalImg) && !isInit) {
      this.save({
        isInit: true,

        idcardFront, 
        idcardReverse,
        healthCertificateFront,
        healthCertificateReverse,
        contract,
      });

      // console.log(this.props.portrayalImg)
    }
  }

  render() {
    let { defaultImg, action, handerNext } = this.props;
    let { idcardFront, idcardReverse, healthCertificateFront,
      healthCertificateReverse, contract } = this.state;
    let self = this;

    // 身份证前照片
    let idcardFrontOpt = {
      imgUrl: idcardFront,
      defaultImg,
      action: action + '&type=1',
      addFileImg(param) {
        self.save({
          idcardFront: param,
        });
      }
    }

    // 身份证反照片
    let idcardReverseOpt = {
      imgUrl: idcardReverse,
      defaultImg,
      action: action + '&type=2',
      addFileImg(param) {
        self.save({
          idcardReverse: param,
        });
      }
    }

    let healthCertificateFrontOpt = {
      imgUrl: healthCertificateFront,
      defaultImg,
      action: action + '&type=3',
      addFileImg(param) {
        self.save({
          healthCertificateFront: param,
        });
      }
    }

    let healthCertificateReverseOpt = {
      imgUrl: healthCertificateReverse,
      defaultImg,
      action: action + '&type=4',
      addFileImg(param) {
        self.save({
          healthCertificateReverse: param,
        });
      }
    }

    let contractOpt = {
      imgUrl: contract,
      defaultImg,
      action: action + '&type=5',
      addFileImg(param) {
        contract.push(param);
      }
    }

    let handerSubmit = () => {
      let _contract = [];
      _.forEach(contract, (item) => {
        _contract.push(item.id);
      });

      handerNext({
        idcardFront: idcardFront && idcardFront.id, 
        idcardReverse: idcardReverse && idcardReverse.id, 
        healthCertificateFront: healthCertificateFront && healthCertificateFront.id,
        healthCertificateReverse: healthCertificateReverse && healthCertificateReverse.id, 
        contract: JSON.stringify(_contract),
      });
    }

    return (
      <div>
        <Row>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传身份证正面：</div>
          </Col>
          <Col span={15}>
            <UploadHead {...idcardFrontOpt} />
          </Col>
        </Row>

        <Row style={{ 'padding': '20px 0' }}>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传身份证反面：</div>
          </Col>
          <Col span={15}>
            <UploadHead {...idcardReverseOpt} />
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传健康证快照正面：</div>
          </Col>
          <Col span={15}>
            <UploadHead {...healthCertificateFrontOpt} />
          </Col>
        </Row>

        <Row style={{ 'padding': '20px 0' }}>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传健康证快照反面：</div>
          </Col>
          <Col span={15}>
            <UploadHead {...healthCertificateReverseOpt} />
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传合同快照：</div>
          </Col>
          <Col span={15}>
            <UploadHead {...contractOpt} />
          </Col>
        </Row>

        <div className={style.submitBtnBox} style={{ 'paddingTop': '24px' }}>
          <Button block type="primary" onClick={handerSubmit} size="large">提交</Button>
        </div>
      </div>
    )
  }
}

const WrappedPortrayalForm = Form.create()(PortrayalForm);

const Portrayal = ({ dispatch, handerNext, defaultImg, action, portrayalImg }) => {
  let opt = {
    dispatch,
    handerNext,
    defaultImg,
    action,
    portrayalImg,
  };

  return (
    <div>
      <div className={style.titleBox}>上传用户画像</div>
      <WrappedPortrayalForm {...opt} />
    </div>
  );
};

export default Portrayal;
