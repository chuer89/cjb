import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import { Card, Tabs, Row, Col } from 'antd';
import style from './index.less';

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

  componentDidMount() {
    let self = this;
    NProgress.done();
    setTimeout(() => {
      self.setState({
        loading: false,
      })
    }, 2000)
  }

  render() {
    let { loading } = this.state;
    let personnelGeneral = [{
      name: '在职', number: '230', color: 'rgb(100, 234, 145)'
    }, {
      name: '全职', number: '630', color: 'rgb(143, 201, 251)'
    }, {
      name: '实习', number: '730', color: 'rgb(216, 151, 235)'
    }, {
      name: '兼职', number: '82', color: 'rgb(246, 152, 153)'
    }];

    let renderPersonnel = personnelGeneral.map((item, index) => {
      return (
        <Col span={6} key={index} className={style.generalBox}>
          <div className={style.generalItem} style={{'backgroundColor': item.color}}>
            <h4>{item.name}</h4>
            <p>
              <span className={style.generalNumber}>{item.number}</span>
              <span className={style.generalUnit}>人</span>
            </p>
          </div>
        </Col>
      )
    })

    return (
      <App>
        <div className={style.itemBox}>
          <Card title="人事概况">
            <Row style={{'padding': '24px 0'}}>{renderPersonnel}</Row>
          </Card>
        </div>
        <div className={style.itemBox}>
          <Card loading={loading} title="代办事项">
            <Tabs tabPosition={'left'}>
              <TabPane tab="全部" key="1">Content of Tab 1</TabPane>
              <TabPane tab="预警" key="2">Content of Tab 2</TabPane>
              <TabPane tab="提醒" key="3">Content of Tab 3</TabPane>
            </Tabs>
          </Card>
        </div>
      </App>
    );
  }
}

export default connect()(Dashboard);
