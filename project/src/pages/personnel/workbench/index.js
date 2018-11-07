import React from 'react';
import { connect } from 'dva';
import { Card, Tabs, Row, Col } from 'antd';
import style from './index.less';
import { Link } from 'dva/router';
import moment from 'moment';
import common from '@common';

const TabPane = Tabs.TabPane;

// 工作台
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      loading: false,
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
  }

  render() {
    let { loading } = this.state;
    let { work: {
      workUserinfo, workusercare, todoList
    } } = this.props;

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

    // 代办事项
    let warnLevel = []; // 预警
    let remindLevel = []; // 提醒
    let renderAllList = '暂无数据';
    if (!_.isEmpty(todoList)) {
      renderAllList = todoList.map((item, index) => {
        const { level, content, eventDate } = item;
        if (level === 2) {
          remindLevel.push(item);
        } else if (level === 3) {
          warnLevel.push(item);
        }

        return (
          <li key={index}>
            <div className={style.messageListBox}>
              <div className={style.newMessage} style={{ 'display': item.isNew ? 'block' : 'none' }}></div>
              <div className={style.messageContent}>{content}</div>
              <div className={style.messageDate}>{common.format(eventDate)}</div>
            </div>
          </li>
        )
      });
    }
    let renderWarnLevel = '暂无数据';
    if (!_.isEmpty(warnLevel)) {
      renderWarnLevel = warnLevel.map((item, index) => {
        const { content, eventDate } = item;

        return (
          <li key={index}>
            <div className={style.messageListBox}>
              <div className={style.newMessage} style={{ 'display': item.isNew ? 'block' : 'none' }}></div>
              <div className={style.messageContent}>{content}</div>
              <div className={style.messageDate}>{common.format(eventDate)}</div>
            </div>
          </li>
        )
      });
    }
    let renderRemindLevel = '暂无数据';
    if (!_.isEmpty(remindLevel)) {
      renderRemindLevel = remindLevel.map((item, index) => {
        const { content, eventDate } = item;

        return (
          <li key={index}>
            <div className={style.messageListBox}>
              <div className={style.newMessage} style={{ 'display': item.isNew ? 'block' : 'none' }}></div>
              <div className={style.messageContent}>{content}</div>
              <div className={style.messageDate}>{common.format(eventDate)}</div>
            </div>
          </li>
        )
      });
    }

    // 员工关怀
    let renderUserCare = (
      <div>暂无数据</div>
    )
    if (!_.isEmpty(workusercare)) {
      renderUserCare = workusercare.map((item, index) => {
        let time = moment(item.eventDate).format('YYYY-MM-DD hh:mm');
        return (
          <div key={index} className={style.messageListBox}>
            <div className={style.messageContent}>
              <Link to={'/personnel/userdetails/' + item.uid} target="_blank">{item.content}</Link>
            </div>
            <div className={style.messageDate}>{time}</div>
          </div>
        )
      });
    }

    return (
      <div>
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
              <TabPane tab="预警" key="2">
                <ul>{renderRemindLevel}</ul>
              </TabPane>
              <TabPane tab="提醒" key="3">
                <ul>{renderWarnLevel}</ul>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <div className={style.itemBox}>
          <Card title="员工关怀" style={{ width: '50%' }}>{renderUserCare}</Card>
        </div>
      </div>
    );
  }
}

export default connect((({ work }) => ({
  work,
})))(Dashboard);
