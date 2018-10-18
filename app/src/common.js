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
  },

  // 清除缓存数据
  clearLocalStorage() {
    localStorage.clear();
  },

  // 正则
  reg: {
    phone: /^\d{11}$/, // 手机号
    idcard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|([1−9]\d5\d2((0[1−9])|(10|11|12))(([0−2][1−9])|10|20|30|31)\d2[0−9Xx])/, // 身份证
    bankCard: /\d{15}|\d{19}/, // 银行卡
  }
}