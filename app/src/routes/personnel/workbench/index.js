import React from 'react';
import { connect } from 'dva';
import App from '../../app';
import { Card, Tabs, Row, Col } from 'antd';
import style from './index.less';
import { Link } from 'dva/router';

const TabPane = Tabs.TabPane;

// 工作台
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      loading: true,
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

  componentDidMount() {
    let self = this;
    setTimeout(() => {
      self.save({
        loading: false,
      })
    }, 2000)
  }

  render() {
    let { loading } = this.state;
    let { work } = this.props;
    let { workUserinfo, workusercare } = work;

    let personnelGeneral = [{
      name: '在职', number: workUserinfo.all, color: 'rgb(100, 234, 145)'
    }, {
      name: '全职', number: workUserinfo.full, color: 'rgb(143, 201, 251)'
    }, {
      name: '实习', number: workUserinfo.practice, color: 'rgb(216, 151, 235)'
    }, {
      name: '兼职', number: workUserinfo.part, color: 'rgb(246, 152, 153)'
    }];

    let renderPersonnel = personnelGeneral.map((item, index) => {
      return (
        <Col span={6} key={index} className={style.generalBox}>
          <div className={style.generalItem} style={{ 'backgroundColor': item.color }}>
            <h4>{item.name}</h4>
            <p>
              <span className={style.generalNumber}>{item.number}</span>
              <span className={style.generalUnit}>人</span>
            </p>
          </div>
        </Col>
      )
    });

    let allListData = [{
      message: '今天重点新闻，宽松大翻领加上地方', date: '2018-02-11 12:33', isNew: true
    }, {
      message: '来到健身房阿斯顿发了；看见阿斯顿发爱上；两地分居', date: '2017-09-19 14:44'
    }];
    let renderAllList = allListData.map((item, index) => {
      return (
        <li key={index}>
          <div className={style.messageListBox}>
            <div className={style.newMessage} style={{ 'display': item.isNew ? 'block' : 'none' }}></div>
            <div className={style.messageContent}>{item.message}</div>
            <div className={style.messageDate}>{item.date}</div>
          </div>
        </li>
      )
    });

    let renderUserCare = (
      <div>暂无数据</div>
    )
    if (!_.isEmpty(workusercare)) {
      renderUserCare = workusercare.map((item, index) => {
        return (
          <div key={index}>
            <Link to={'editUser/' + item.id} target="_blank">{item.name}</Link>
          </div>
        )
      });
    }

    return (
      <App>
        <div className={style.itemBox}>
          <Card title="人事概况">
            <Row style={{ 'padding': '24px 0' }}>{renderPersonnel}</Row>
          </Card>
        </div>
        <div className={style.itemBox}>
          <Card loading={loading} title="代办事项">
            <Tabs tabPosition={'left'}>
              <TabPane tab="全部" key="1">
                <ul>{renderAllList}</ul>
              </TabPane>
              <TabPane tab="预警" key="2">Content of Tab 2</TabPane>
              <TabPane tab="提醒" key="3">Content of Tab 3</TabPane>
            </Tabs>
          </Card>
        </div>
        <div className={style.itemBox}>
          <Card title="员工关怀">{renderUserCare}</Card>
        </div>
      </App>
    );
  }
}

export default connect((({ work }) => ({
  work,
})))(Dashboard);
