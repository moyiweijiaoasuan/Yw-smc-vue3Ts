import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'
// 注册中国地图数据
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const ecahrtInstance = echarts.init(el)

  // 使用刚指定的配置项和数据显示图表。
  const setOptions = (options: echarts.EChartsOption) => {
    ecahrtInstance.setOption(options)
  }
  const setSize = () => {
    ecahrtInstance.resize()
  }
  window.addEventListener('resize', () => {
    ecahrtInstance.resize()
  })
  return {
    ecahrtInstance,
    setOptions,
    setSize
  }
}
