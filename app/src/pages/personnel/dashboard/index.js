import React from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import common from '@common';
import style from './index.less';
import { Row, Col, Card } from 'antd';
import _ from 'lodash';

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
      chartResignation, chartJobType, chartOnJobProportion, chartUserTurnover } = dashboard;

    let RowSpan3 = {
      span: 8,
    };
    let RowSpan2 = {
      span: 12,
    }

    // 年龄分布
    let agePie = [];
    if (_.isArray(chartAge.data)) {
      _.forEach(chartAge.data, (item) => {
        agePie.push({
          name: item.name,
          value: item.num,
        });
      })
    }

    // 学历分布
    let educationPie = [];
    if (_.isArray(chartEducation.data)) {
      _.forEach(chartEducation.data, (item) => {
        educationPie.push({
          name: item.name,
          value: item.num,
        });
      });
    }

    // 性别分布
    let genderPie = [];
    if (_.isArray(chartGender.data)) {
      _.forEach(chartGender.data, (item) => {
        genderPie.push({
          name: item.name,
          value: item.num,
        });
      });
    }

    // 招聘渠道
    let applyChannelPie = [];
    if (_.isArray(chartApplyChannel.data)) {
      _.forEach(chartApplyChannel.data, (item) => {
        applyChannelPie.push({
          name: item.name,
          value: item.num,
        });
      });
    }

    // 离职率
    let resignationPie = [];
    if (_.isArray(chartResignation.data)) {
      _.forEach(chartResignation.data, (item) => {
        resignationPie.push({
          name: item.name,
          value: item.num,
        });
      });
    }

    // 兼职全职分布
    let jobTypePie = [];
    if (_.isArray(chartJobType.data)) {
      _.forEach(chartJobType.data, (item) => {
        jobTypePie.push({
          name: item.name,
          value: item.num,
        });
      });
    }

    let onJobProportionPie = [];
    if (_.isArray(chartOnJobProportion.data)) {
      _.forEach(chartOnJobProportion.data, (item) => {
        onJobProportionPie.push({
          name: item.name,
          value: item.num,
        });
      });
    }

    let topPie = [{
      title: '年龄分布',
      data: agePie,
    }, {
      title: '学历分布',
      data: educationPie,
    }, {
      title: '性别分布',
      data: genderPie,
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

    let pieData = [{
      title: '招聘渠道',
      data: applyChannelPie,
    }, {
      title: '离职率',
      data: resignationPie,
    }];
    let renderPieQudao = pieData.map((item, index) => {
      let option = common.getPieOption(item.data);
      let colStyle = {};
      if (index === 1) {
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
        <Col {...RowSpan2} key={index}>
          <div className={style.splitBox} style={colStyle}>
            <Card title={item.title}>{renderEcharts}</Card>
          </div>
        </Col>
      )
    });

    let pieZhi = [{
      title: '兼职全职分布',
      data: jobTypePie,
    }, {
      title: '满编率',
      data: onJobProportionPie
    }];
    let renderPieZhi = pieZhi.map((item, index) => {
      let option = common.getPieOption(item.data);
      let colStyle = {};
      if (index === 1) {
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
        <Col {...RowSpan2} key={index}>
          <div className={style.splitBox} style={colStyle}>
            <Card title={item.title}>{renderEcharts}</Card>
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
