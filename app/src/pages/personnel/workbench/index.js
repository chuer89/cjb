import React from 'react';
import { connect } from 'dva';
import { Card, Tabs, Row, Col, Button } from 'antd';
import style from './index.less';
import Link from 'umi/link';
import moment from 'moment';
import common from '@common';
import services from '@services/';
import Remind from './components/remind'; // 提醒完善资料

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
      workUserinfo,
      workusercare,
      todoList,
      pageSize,
      dataBody: {
        records,
        total,
      }
    }, user: {
      userInfo: { token }, dept
    }, dispatch } = this.props;

    let personnelGeneral = [{
      name: '全职', number: workUserinfo.all, color: 'rgb(100, 234, 145)', status: '2',
    }, {
      name: '实习', number: workUserinfo.practice, color: 'rgb(143, 201, 251)', status: '1',
    }, {
      name: '兼职', number: workUserinfo.part, color: 'rgb(246, 152, 153)', status: '5',
    }, {
      name: '离职', number: workUserinfo.leave, color: 'rgb(216, 151, 235)', status: '3',
    }];

    let renderPersonnel = personnelGeneral.map((item, index) => {
      let link = `/personnel/record?status=${item.status || ''}`
      return (
        <Link to={link} key={index}>
          <Col span={6} className={style.generalBox}>
            <div className={style.generalItem} style={{ 'backgroundColor': item.color }}>
              <h4>{item.name}</h4>
              <p>
                <span className={style.generalNumber}>{item.number}</span>
                <span className={style.generalUnit}>人</span>
              </p>
            </div>
          </Col>
        </Link>
      )
    });

    // 代办事项
    let warnLevel = []; // 预警
    let remindLevel = []; // 提醒
    let renderAllList = '暂无数据';
    // 代办 提醒 导出
    let todoExportUrl = `${services.todoExport}?token=${token}&dept=${dept}`;
    let rendertodoExport = '';

    if (!_.isEmpty(todoList)) {
      rendertodoExport = (
        <a href={todoExportUrl} target="_blank">
          <Button type="primary">导出</Button>
        </a>
      )

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

    // 预警
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

    // 提醒
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
    // 员工关怀 导出
    let usercareExportUrl = `${services.usercareExport}?token=${token}&dept=${dept}`;;
    let renderUsercareExport = '';
    if (!_.isEmpty(workusercare)) {
      renderUserCare = workusercare.map((item, index) => {
        let time = moment(item.eventDate).format('YYYY-MM-DD hh:mm');
        return (
          <div key={index} className={style.messageListBox}>
            <div className={style.messageContent}>
              <Link to={'/personnel/record/userdetails/' + item.uid} target="_blank">{item.content}</Link>
            </div>
            <div className={style.messageDate}>{time}</div>
          </div>
        )
      });
      renderUsercareExport = (
        <a href={usercareExportUrl} target="_blank">
          <Button type="primary">导出</Button>
        </a>
      )
    }

    let remindProps = {
      pageSize,
      records,
      total,
      handerChange(current) {
        dispatch({
          type: 'work/getRemindIncomplete',
          payload: {
            page: current,
          }
        })
      }
    }

    return (
      <div>
        <div className={style.itemBox}>
          <Card title="人事概况">
            <Row style={{ 'padding': '24px 0' }}>{renderPersonnel}</Row>
          </Card>
        </div>
        <div className={style.itemBox}>
          <Card title="员工信息待完善">
            <Remind {...remindProps} />
          </Card>
        </div>
        <div className={style.itemBox}>
          <Card loading={loading} title="提醒事项" extra={rendertodoExport}>
            <Tabs tabPosition={'left'}>
              <TabPane tab="全部" key="1">
                <ul>{renderAllList}</ul>
              </TabPane>
              <TabPane tab="提醒" key="2">
                <ul>{renderRemindLevel}</ul>
              </TabPane>
              <TabPane tab="预警" key="3">
                <ul>{renderWarnLevel}</ul>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <div className={style.itemBox}>
          <Card title="员工关怀" style={{ width: '50%' }} extra={renderUsercareExport}>{renderUserCare}</Card>
        </div>
      </div>
    );
  }
}

export default connect((({ work, user }) => ({
  work,
  user,
})))(Dashboard);
