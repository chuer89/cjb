import React from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import common from '@common';
import style from './index.less';
import { Row, Col, Card } from 'antd';
import _ from 'lodash';

import PieComp from '@components/dashboard/pie'; // 饼图
import Comments from './components/comments';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      month: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
    }
  }

  render() {
    let { dispatch, dashboard } = this.props;
    let { month } = this.state;
    let { chartAge, chartEducation, chartGender, chartApplyChannel, 
      chartJobType, chartOnJobProportion, chartUserTurnover } = dashboard;

    let RowSpan3 = {
      span: 8,
    };
    let RowSpan2 = {
      span: 12,
    }
    
    let topPie = [{
      title: '年龄分布',
      data: chartAge.data,
      columns: [{
        title: '年龄段', dataIndex: 'name', width: '40%'
      }, {
        title: '人数', dataIndex: 'num', width: '30%'
      }, {
        title: '占比(%)', dataIndex: 'proportion', width: '30%'
      }]
    }, {
      title: '学历分布',
      data: chartEducation.data,
      columns: [{
        title: '学历', dataIndex: 'name', width: '40%'
      }, {
        title: '人数', dataIndex: 'num', width: '30%'
      }, {
        title: '占比(%)', dataIndex: 'proportion', width: '30%'
      }]
    }];
    let renderTopPie = topPie.map((item, index) => {
      let colStyle = {};
      if (index === 2) {
        colStyle = {
          'marginRight': '0',
        }
      }

      let pieCompProps = {
        ...item,
      }

      return (
        <Col {...RowSpan2} key={index}>
          <div className={style.splitBox} style={colStyle}>
            <PieComp {...pieCompProps} />
          </div>
        </Col>
      )
    });

    let pieData = [{
      title: '招聘渠道',
      data: chartApplyChannel.data,
      columns: [{
        title: '渠道', dataIndex: 'name', width: '40%'
      }, {
        title: '人数', dataIndex: 'num', width: '30%'
      }, {
        title: '占比(%)', dataIndex: 'proportion', width: '30%'
      }]
    }, {
      title: '性别分布',
      data: chartGender.data,
      columns: [{
        title: '性别', dataIndex: 'name', width: '40%'
      }, {
        title: '人数', dataIndex: 'num', width: '30%'
      }, {
        title: '占比(%)', dataIndex: 'proportion', width: '30%'
      }]
    }];
    let renderPieQudao = pieData.map((item, index) => {
      let colStyle = {};
      if (index === 1) {
        colStyle = {
          'marginRight': '0',
        }
      }
      let pieCompProps = {
        ...item,
      }
      return (
        <Col {...RowSpan2} key={index}>
          <div className={style.splitBox} style={colStyle}>
            <PieComp {...pieCompProps} />
          </div>
        </Col>
      )
    });

    let pieZhi = [{
      title: '兼职全职分布',
      data: chartJobType.data,
      columns: [{
        title: '类别', dataIndex: 'name', width: '40%'
      }, {
        title: '人数', dataIndex: 'num', width: '30%'
      }, {
        title: '占比(%)', dataIndex: 'proportion', width: '30%'
      }]
    }, {
      title: '满编率',
      data: chartOnJobProportion.data,
      columns: [{
        title: '类别', dataIndex: 'name', width: '40%'
      }, {
        title: '人数', dataIndex: 'num', width: '30%'
      }, {
        title: '占比(%)', dataIndex: 'proportion', width: '30%'
      }]
    }];
    let renderPieZhi = pieZhi.map((item, index) => {
      let colStyle = {};
      if (index === 1) {
        colStyle = {
          'marginRight': '0',
        }
      }
      let pieCompProps = {
        ...item,
      }
      return (
        <Col {...RowSpan2} key={index}>
          <div className={style.splitBox} style={colStyle}>
            <PieComp {...pieCompProps} />
          </div>
        </Col>
      )
    });

    let xAxisData = [];
    let inService = []; // 在职
    let outService = []; // 离职
    if (_.isArray(chartUserTurnover)) {
      _.forEach(chartUserTurnover, (item, index) => {
        let { entry, out } = item || {};

        xAxisData.push(month[index] + '月');
        inService.push(entry || undefined);
        outService.push(out || undefined);
      });
    }
    let lineOption = {
      xAxis: {
        data: xAxisData,
        boundaryGap: false,
      },
      tooltip: {
        trigger: 'axis',
        // formatter: '{b} : {c}'
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '入职',
        data: inService,
        type: 'line',
        smooth: true
      }, {
        name: '离职',
        data: outService,
        type: 'line',
        smooth: true
      }]
    }

    return (
      <div>
        <div className={style.box}>
          <Row>{renderTopPie}</Row>
        </div>
        <div className={style.box}>
          <Row>{renderPieQudao}</Row>
        </div>
        <div className={style.box}>
          <Card title="流动分析">
            <ReactEcharts style={{ 'height': '400px' }} option={lineOption} />
          </Card>
        </div>
        <div className={style.box}>
          <Row>{renderPieZhi}</Row>
        </div>
        <div className={style.box} style={{ display: 'none' }}><Comments /></div>
      </div>
    );
  }
}

export default connect((({ dashboard }) => ({
  dashboard,
})))(Dashboard);
