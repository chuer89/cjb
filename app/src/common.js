export default {
  // 饼图所需参数
  getPieOption(seriesData = []) {
    return {
      // 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      tooltip: {
        formatter: "{b} : {c} ({d}%)"
      },
      legend: {
        bottom: 1,
        itemWidth: 8,
        itemHeight: 8,
      },
      series: [
        {
          type: 'pie',
          data: seriesData,
          selectedMode: 'single',
          // center: ['50%', '60%'],
          radius : '60%',
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
}