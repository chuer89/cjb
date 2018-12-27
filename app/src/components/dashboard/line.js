import React from 'react';
import { Card, Button, Table } from 'antd';
import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';
import common from '@common';

const ButtonGroup = Button.Group;

class LineComp extends React.Component {
  state = {
    isCartTable: false,
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

  render() {
    const {
      title,
      data,
      columns,
    } = this.props;
    const { isCartTable } = this.state;
    let extraCss = {
      padding: '0',
    }
    let xAxisData = [];
    let seriesData = [];
    let dataSource = [];
    let renderChangeChart = '';
    let tableOpt = {};

    if (!_.isEmpty(data)) {
      _.forEach(data, (item, key) => {
        xAxisData.push(key);
        seriesData.push(item.v);
        dataSource.push({
          index: key,
          ...item,
        })
      })
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
        // name: '入职',
        data: seriesData,
        type: 'line',
        smooth: true
      }]
    }

    if (!_.isEmpty(data) && !_.isEmpty(columns)) {
      tableOpt = {
        dataSource,
        rowKey: 'index',
        scroll: { y: 250 },
        columns,
        pagination: false,
        locale: {
          emptyText: '暂无数据'
        }
      }

      if (isCartTable) {
        renderChangeChart = (
          <ButtonGroup style={extraCss}>
            <Button icon="pie-chart" onClick={() => { this.save({ isCartTable: false }) }} />
            <Button type="primary" icon="table" />
          </ButtonGroup>
        )
      } else {
        renderChangeChart = (
          <ButtonGroup style={extraCss}>
            <Button type="primary" icon="pie-chart" />
            <Button icon="table" onClick={() => { this.save({ isCartTable: true }) }} />
          </ButtonGroup>
        )
      }
    }

    let cssStyleBox = {
      height: '300px'
    }

    let renderEcharts = (
      <div style={cssStyleBox}>暂无数据</div>
    )
    if (!_.isEmpty(dataSource)) {
      renderEcharts = (
        <ReactEcharts option={lineOption} />
      )

      if (isCartTable) {
        renderEcharts = (
          <Table {...tableOpt} style={cssStyleBox} />
        )
      }
    }

    return (
      <div>
        <Card title={title} extra={renderChangeChart}>
          {renderEcharts}
        </Card>
      </div>
    )
  }
}

export default LineComp;
