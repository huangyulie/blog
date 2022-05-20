import React from 'react'
import ReacEcharts from 'echarts-for-react';

export default function Bar() {
  const getOption = ()=>{
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
  }
  return (
    <div>
      <ReacEcharts option={getOption()}></ReacEcharts>
    </div>
  )
}
