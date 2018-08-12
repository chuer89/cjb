import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import ReactEcharts from 'echarts-for-react';
import common from '../../common';
import style from './index.less';
import { Row, Col } from 'antd';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
    }
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    let RowSpan3 = {
      span: 8,
    };

    let topPie = [{
      title: '年龄分布',
      data: [
        { value: 23, name: '80后' },
        { value: 53, name: '90后' },
        { value: 13, name: '70后' },
      ]
    }, {
      title: '学历分布',
      data: [
        { value: 23, name: '大学' },
        { value: 53, name: '初中' },
        { value: 13, name: '其他' },
        { value: 33, name: '高中' },
      ]
    }, {
      title: '性别分布',
      data: [
        { value: 23, name: '男' },
        { value: 53, name: '女' },
      ]
    }];
    let renderTopPie = topPie.map((item, index) => {
      let option = common.getPieOption(item.data);
      let colStyle = {};
      if (index === 2) {
        colStyle = {
          'marginRight': '0',
        }
      }
      return (
        <Col {...RowSpan3} key={index}>
          <div className={style.split3} style={colStyle}>
            <div className={style.title}>{item.title}</div>
            <ReactEcharts option={option} />
          </div>
        </Col>
      )
    });

    let lineOption = {
      xAxis: {
        // type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }]
    }

    return (
      <App>
        <Row>{renderTopPie}</Row>
        <div className={style.box}>
          <div className={style.title}>流动分析</div>
          <ReactEcharts style={{'height': '400px'}} option={lineOption} />
        </div>
      </App>
    );
  }
}

export default connect()(Dashboard);
