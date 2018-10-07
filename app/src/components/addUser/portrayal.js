import React from 'react';
import { connect } from 'dva';
import { Form, Button, Row, Col, Icon, message } from 'antd';
import 'moment/locale/zh-cn';
import style from './add.less';
import { UploadField, Uploader } from '@navjobs/upload';
import _ from 'lodash';

// 上传
const UploadHead = ({ action, addFileImg, imgUrl, defaultImg }) => {
  let img = imgUrl || defaultImg;

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
          addFileImg({
            url: data.path,
          });
        }
      }}
      //upload on file selection, otherwise use `startUpload`
      uploadOnSelection={true}
    >
      {({ onFiles, progress, complete }) => {

        if (progress && !complete) {
          img = defaultImg;
        }
        if (complete) {
          img = imgUrl;
        }

        return (
          <div>
            <div className={style.addBox}>
              <div className={style.addFileBox}>
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
                  <div className={style.addFileItemBox}>
                    <div><Icon type="upload" theme="outlined" style={{ 'fontSize': '20px' }} /></div>
                    <div>上传</div>
                  </div>
                </UploadField>
              </div>
              <div className={style.addFileItem} style={{'display': imgUrl ? 'block': 'none'}}>
                <img src={img} alt="" className={style.headImg} />
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

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    let imgUrl = 'http://img1.gtimg.com/gd/pics/hv1/8/124/863/56148203.jpg';
    let { defaultImg, action } = this.props;

    // 身份证前照片
    let idcardFrontOpt = {
      // imgUrl,
      defaultImg,
      action,
      addFileImg(param) {
        console.log(param, 'p');
      }
    }

    return (
      <div>
        <Row>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传身份证：</div>
          </Col>
          <Col span={15}>
            <UploadHead {...idcardFrontOpt} />
          </Col>
        </Row>

        <Row style={{ 'padding': '20px 0' }}>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传健康证快照：</div>
          </Col>
          <Col span={15}>
            <div className={style.addBox}>
              <div className={style.addFileBox}>
                <div className={style.addFileItemBox}>
                  <div><Icon type="upload" theme="outlined" style={{ 'fontSize': '20px' }} /></div>
                  <div>上传</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传合同快照：</div>
          </Col>
          <Col span={15}>
            <div className={style.addBox}>
              <div className={style.addFileBox}>
                <div className={style.addFileItemBox}>
                  <div><Icon type="upload" theme="outlined" style={{ 'fontSize': '20px' }} /></div>
                  <div>上传</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const WrappedPortrayalForm = Form.create()(PortrayalForm);

const Portrayal = ({ handerNext, defaultImg, action }) => {
  let opt = {
    handerNext,
    defaultImg,
    action,
  };

  return (
    <div>
      <div className={style.titleBox}>上传用户画像</div>
      <WrappedPortrayalForm {...opt} />
      <div className={style.submitBtnBox} style={{ 'paddingTop': '24px' }}>
        <Button block type="primary" size="large">提交</Button>
      </div>
    </div>
  );
};

export default Portrayal;
