import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

export default ({ data }) => {
  let _data = _.get(data, 'data') || [];
  let yAxisData = [];
  let seriesData = [];

  if (!_.isEmpty(_data)) {
    _.forEach(_data, (item, index) => {
      yAxisData.push(item.name);
      seriesData.push(item.num);
    })
  }

  let columnProps = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: yAxisData
    },
    series: [
      {
        // name: '2011年',
        type: 'bar',
        data: seriesData,
      },
    ]
  }

  let renderEcharts = (
    <div style={{ height: '300px' }}>暂无数据</div>
  )
  if (!_.isEmpty(_data)) {
    renderEcharts = (
      <ReactEcharts style={{ 'height': '400px' }} option={columnProps} />
    )
  }

  return (
    <div>
      {renderEcharts}
    </div>
  )
}