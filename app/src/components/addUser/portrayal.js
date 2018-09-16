import React from 'react';
import { connect } from 'dva';
import { Form, Button, Row, Col, Icon } from 'antd';
import 'moment/locale/zh-cn';
import style from './add.less';

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
    return (
      <div>
        <Row>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传身份证：</div>
          </Col>
          <Col span={15}>
            <div className={style.addBox}>
              <div className={style.addFileBox}>
                <div className={style.addFileItemBox}>
                  <div><Icon type="upload" theme="outlined" style={{'fontSize': '20px'}} /></div>
                  <div>上传</div>
                </div>
              </div>
              <div className={style.addFileItem}>
                <img src={imgUrl} alt="身份证"/>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{'padding': '20px 0'}}>
          <Col span={6}>
            <div className={style.portrayalLabel}>上传健康证快照：</div>
          </Col>
          <Col span={15}>
            <div className={style.addBox}>
              <div className={style.addFileBox}>
                <div className={style.addFileItemBox}>
                  <div><Icon type="upload" theme="outlined" style={{'fontSize': '20px'}} /></div>
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
                  <div><Icon type="upload" theme="outlined" style={{'fontSize': '20px'}} /></div>
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

const Portrayal = ({ dispatch }) => {
  let handerNext = () => {
    dispatch({
      type: 'addUser/save',
      payload: {
        basicDisabled: false,
        activeTabsKey: '3'
      }
    })
  };

  let opt = {
    handerNext,
  };

  return (
    <div>
      <div>用户画像</div>
      <WrappedPortrayalForm {...opt} />
      <div><Button type="primary">提交</Button></div>
    </div>
  );
};

export default connect((({ addUser }) => ({
  addUser,
})))(Portrayal);
