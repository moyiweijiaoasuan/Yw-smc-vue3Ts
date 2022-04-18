<template>
  <div class="base-echart">
    <div
      ref="echartDivRef"
      :style="{
        width: width,
        height: height
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
// import * as echarts from 'echarts'
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'
// 定义props
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  // setOptions(props.options)
  // 保证传入的options是响应式的，。用监听来监听props的改动
  watchEffect(() => {
    setOptions(props.options)
  })
  // const ecahrtInstance = echarts.init(echartDivRef.value!)

  // 使用刚指定的配置项和数据显示图表。
  // ecahrtInstance.setOption(props.options)
})
</script>

<style scoped></style>
