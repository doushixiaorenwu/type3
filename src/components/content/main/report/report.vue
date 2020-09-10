<template>
  <div>
    <main-item>
      <template #main>
        <div id="main" style="width: 750px;height:400px;"></div>
      </template>
    </main-item>
  </div>
</template>

<script>
import echarts from 'echarts'
import MainItem from '../../../comomon/main'
import { getReportData } from '@/network/report/report'

export default {
  components: {
    MainItem
  },
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  async mounted () {
    var myChart = echarts.init(document.getElementById('main'))

    const { data: res } = await getReportData()
    if (res.meta.status !== 200) return this.$message.error('获取数据失败')
    const data = JSON.parse(JSON.stringify(res.data, this.options))

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(data)
  },
  meyhods: {}
}
</script>

<style></style>
