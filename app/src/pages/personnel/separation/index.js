import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';
import common from '@common';
import style from './index.less';

class SeparationList extends React.Component {
  state = {

  }

  render() {
    let RowSpan3 = {
      span: 8,
    };

    let topPie = [{
      title: '原因分析',
      data: [],
    }, {
      title: '年龄分析',
      data: [],
    }, {
      title: '学历分析',
      data: [],
    }];
    let renderTopPie = topPie.map((item, index) => {
      let option = common.getPieOption(item.data);
      let colStyle = {};
      if (index === 2) {
        colStyle = {
          'marginRight': '0',
        }
      }
      let renderEcharts = (
        <div className={style.notData}>暂无数据</div>
      )
      if (!_.isEmpty(item.data)) {
        renderEcharts = (
          <ReactEcharts option={option} />
        )
      }

      return (
        <Col {...RowSpan3} key={index}>
          <div className={style.splitBox} style={colStyle}>
            <Card title={item.title}>{renderEcharts}</Card>
          </div>
        </Col>
      )
    });

    let lineOption = {
      xAxis: {
        // data: xAxisData,
        boundaryGap: false,
      },
      tooltip: {
        trigger: 'axis',
        // formatter: '{b} : {c}'
      },
      yAxis: {
        type: 'value'
      },
      series: []
    }

    return (
      <div>
        <div className={style.box}>
          <Row>{renderTopPie}</Row>
        </div>
        <div className={style.box}>
          <Card title="离职率">
            <ReactEcharts style={{ 'height': '400px' }} option={lineOption} />
          </Card>
        </div>
        <div className={style.box}>
          <Card title="年限分析">
            <ReactEcharts style={{ 'height': '400px' }} option={lineOption} />
          </Card>
        </div>
      </div>
    )
  }
}

export default connect((({ user, separationRate }) => ({
  user,
  separationRate,
})))(SeparationList);