// 柱状图组件
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const BarChart = ({ title, data }) => {
  // 1. 把功能代码都放到这个组件中
  const chartRef = useRef(null)
  // 保证dom可用，再进行图表的渲染
  useEffect(() => {
    // 1. 获取渲染图表的dom节点
    const chartDom = chartRef.current
    // 2. 初始化echarts，生成图表实例对象
    const myChart = echarts.init(chartDom)
    // 3. 配置图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'Angular', 'React']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data,
          type: 'bar'
        }
      ]
    }

    // 4. 使用图表参数，完成图表的渲染
    option && myChart.setOption(option)
  }, [data, title])
  return <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
}

// 2. 把可变的部分抽象成props参数

export default BarChart
