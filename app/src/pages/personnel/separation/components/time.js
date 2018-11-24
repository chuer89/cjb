import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { Card, Select } from 'antd';

const Option = Select.Option;

export default ({ data, handerChangeSearch }) => {
  let xAxisData = [];
  let seriesData = [];
  if (!_.isEmpty(data)) {
    _.forEach(data, (item, key) => {
      xAxisData.push(key);
      seriesData.push(item.v);
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

  return (
    <div>
      <Card title="按时间维度分析" extra={renderSele}>
        {renderEcharts}
      </Card>
    </div>
  )
}