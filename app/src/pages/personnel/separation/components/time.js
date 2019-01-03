import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { Card, Select, Icon, Tabs, Table } from 'antd';

const Option = Select.Option;
const TabPane = Tabs.TabPane;

export default ({ data, handerChangeSearch }) => {
  let xAxisData = [];
  let seriesData = [];
  let dataSource = [];

  if (!_.isEmpty(data)) {
    _.forEach(data, (item, key) => {
      xAxisData.push(key);
      seriesData.push(item.v);
      dataSource.push({
        time: key,
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

  // 状态筛选
  let statusData = [
    { value: '月', code: 1 },
    { value: '季度', code: 2 },
    { value: '年', code: 3 }
  ]
  let renderSeleStatus = statusData.map((item) => {
    return (
      <Option value={item.code} key={item.code}>{item.value}</Option>
    )
  });

  let renderSele = (
    <div>
      <Select defaultValue="" style={{ width: 100 }} onChange={(e) => { handerChangeSearch(e) }}>
        <Option value="">全部</Option>
        {renderSeleStatus}
      </Select>
    </div>
  )

  let renderEcharts = (
    <div style={{ height: '300px' }}>暂无数据</div>
  )
  if (!_.isEmpty(data)) {
    renderEcharts = (
      <ReactEcharts style={{ 'height': '400px' }} option={lineOption} />
    )
  }

  const columns = [{
    title: '时间', dataIndex: 'time', width: '40%',
  }, {
    title: '离职数', dataIndex: 'v', width: '30%'
  }, {
    title: '总人数', dataIndex: 'total', width: '30%'
  }];

  const tableOpt = {
    dataSource,
    rowKey: 'time',
    scroll: { y: 400 },
    columns,
    pagination: false,
    locale: {
      emptyText: '暂无数据'
    }
  }

  return (
    <div>
      <Card title="按时间维度分析" extra={renderSele}>
        <Tabs defaultActiveKey="1" tabPosition="right">
          <TabPane tab={<span><Icon type="line-chart" />趋势图</span>} key="1">
            <div>{renderEcharts}</div>
          </TabPane>
          <TabPane tab={<span><Icon type="table" />表格</span>} key="2">
            <div><Table {...tableOpt} /></div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}