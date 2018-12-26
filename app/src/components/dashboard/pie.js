import React from 'react';
import { Card, Button, Table } from 'antd';
import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';
import common from '@common';

const ButtonGroup = Button.Group;

class PieComp extends React.Component {
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

    let renderChangeChart = '';
    let dataSource = [];
    let tableOpt = {}
    let pieData = [];

    let extraCss = {
      padding: '0',
    }

    if (_.isArray(data)) {
      _.forEach(data, (item) => {
        pieData.push({
          name: item.name,
          value: item.num,
        });
      })
    }

    if (!_.isEmpty(data) && !_.isEmpty(columns)) {
      _.forEach(data, (item, key) => {
        dataSource.push({
          index: key,
          ...item,
        })
      })

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
            <Button icon="pie-chart" onClick={() => {this.save({ isCartTable: false })}} />
            <Button type="primary" icon="table" />
          </ButtonGroup>
        )
      } else {
        renderChangeChart = (
          <ButtonGroup style={extraCss}>
            <Button type="primary" icon="pie-chart" />
            <Button icon="table" onClick={() => {this.save({ isCartTable: true })}} />
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
    if (!_.isEmpty(pieData)) {
      renderEcharts = (
        <ReactEcharts option={common.getPieOption(pieData)} />
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

export default PieComp;
