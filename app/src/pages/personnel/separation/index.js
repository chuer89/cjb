import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import _ from 'lodash';
import style from './index.less';

import ChartWork from './components/work'; // 工作年限
import ChartTime from './components/time'; // 时间维度
import PieComp from '@components/dashboard/pie'; // 饼图

class SeparationList extends React.Component {
  state = {

  }

  render() {
    const { separationRate: {
      chartDepartureReason,
      chartDepartureAge,
      chartDepartureEducation,
      chartDepartureWork,
      chartDepartureTime,
      chartResignation,
    }, dispatch } = this.props;

    let RowSpan3 = {
      span: 8,
    };
    let RowSpan2 = {
      span: 12,
    }

    let pieData = [{
      title: '离职原因分析',
      data: chartDepartureReason.data,
      columns: [{
        title: '原因', dataIndex: 'name', width: '40%'
      }, {
        title: '离职数', dataIndex: 'num', width: '30%'
      }, {
        title: '占比(%)', dataIndex: 'proportion', width: '30%'
      }]
    }, {
      title: '离职率',
      data: chartResignation.data,
      columns: [{
        title: '状态', dataIndex: 'name', width: '40%'
      }, {
        title: '离职数', dataIndex: 'num', width: '30%'
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

    let topPie = [{
      title: '离职年龄分析',
      data: chartDepartureAge.data,
      columns: [{
        title: '年龄段', dataIndex: 'name', width: '40%'
      }, {
        title: '离职数', dataIndex: 'num', width: '30%'
      }, {
        title: '占比(%)', dataIndex: 'proportion', width: '30%'
      }]
    }, {
      title: '离职学历分析',
      data: chartDepartureEducation.data,
      columns: [{
        title: '学历', dataIndex: 'name', width: '40%'
      }, {
        title: '离职数', dataIndex: 'num', width: '30%'
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

    let chartTimeProps = {
      data: chartDepartureTime,
      handerChangeSearch(type) {
        dispatch({
          type: 'separationRate/chartDepartureTime',
          payload: {
            type,
          }
        })
      }
    }

    return (
      <div>
        <div className={style.box}>
          <Row>{renderPieQudao}</Row>
        </div>
        <div className={style.box}>
          <Row>{renderTopPie}</Row>
        </div>
        <div className={style.box}>
          <ChartTime {...chartTimeProps} />
        </div>
        <div className={style.box}>
          <Card title="离职人员工作年限分析">
            <ChartWork data={chartDepartureWork} />
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