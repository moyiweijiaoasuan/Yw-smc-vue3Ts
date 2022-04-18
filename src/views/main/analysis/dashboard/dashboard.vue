<template>
  <div class="dashboard">
    <!-- <div ref="divRef" style="width: 600px; height: 400px"></div> -->
    <el-row :gutter="10">
      <el-col :span="7">
        <yw-csrd title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </yw-csrd>
      </el-col>
      <el-col :span="10">
        <yw-csrd title="不同城市商品数量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </yw-csrd>
      </el-col>
      <el-col :span="7">
        <yw-csrd title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </yw-csrd>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <yw-csrd title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </yw-csrd>
      </el-col>
      <el-col :span="12">
        <yw-csrd title="分类商品收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </yw-csrd>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
// import * as echarts from 'echarts'
import YwCsrd from '@/base-ui/card'
// import BaseEchart from '@/base-ui/echart'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'
export default defineComponent({
  name: 'dashboard',
  components: {
    YwCsrd,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    // 饼图数据 // 分类商品个数,
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    // 商品销量
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    // 商品收藏
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    // 不同城市销量
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  padding-top: 20px;
}
</style>
