import React from 'react';
import { connect } from 'dva';
import App from '../app';
import NProgress from 'nprogress';
import ReactEcharts from 'echarts-for-react';

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
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        // orient: 'vertical',
        bottom: 2,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          // center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return (
      <App>
        <h1>仪表盘数据</h1>
        <div>
          <ReactEcharts option={option} />
        </div>
      </App>
    );
  }
}

export default connect()(Dashboard);
