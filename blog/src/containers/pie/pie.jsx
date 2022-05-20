import React from 'react'
import ReacEcharts from 'echarts-for-react';

export default function Pie() {
  const getOption = ()=>{
    return {
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 100,
              name: 'A'
            },
            {
              value: 200,
              name: 'B'
            },
            {
              value: 300,
              name: 'C'
            },
            {
              value: 400,
              name: 'D'
            },
            {
              value: 500,
              name: 'E'
            }
          ],
          roseType: 'area'
        }
      ]
    };
  }
  return (
    <div>
       <ReacEcharts option={getOption()}></ReacEcharts>
    </div>
  )
}
