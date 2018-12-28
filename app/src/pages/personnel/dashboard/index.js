import React from 'react';
import { connect } from 'dva';
import style from './index.less';
import { Row, Col } from 'antd';
import _ from 'lodash';

import PieComp from '@components/dashboard/pie'; // 饼图
import Comments from './components/comments';
import FlowComp from './components/flow'; // 流动分析

class Dashboard extends React.Component {
  state = {
  }

  render() {
    let { dispatch, dashboard } = this.props;
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

    let FlowCompProps = {
      title: '流动分析',
      data: chartUserTurnover,
      columns: [{
        title: '月份', dataIndex: 'month', width: '40%'
      }, {
        title: '入职', dataIndex: 'entry', width: '30%'
      }, {
        title: '离职', dataIndex: 'out', width: '30%'
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
          <FlowComp {...FlowCompProps} />
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
