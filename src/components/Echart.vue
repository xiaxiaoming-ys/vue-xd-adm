<template>
  <div style="height: 100%" ref="echart"></div>
</template>

<script>
import echarts from 'echarts'
// 5.0以后引入方法
// import * as echarts from 'echarts';
export default {
  name: 'Echart',
  props: {
    echartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    },
    // 区分是否有坐标轴的数据
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      echart: null,
      // 有坐标轴图表
      axisOption: {
        // 浮层提示
        tooltip: {
          trigger:'axis'
        },
        // 图例组件
        legend: {
          textStyle: {
            color: '#000'
          }
        },
        // x轴线
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          // 底部文字颜色配置
          axisLabel: {
            color: '#000'
          }
        },
        // y轴线
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#17b3a3'
            }
          }
        },
        // 数据展示
        series: []
      },
      // 无坐标轴图表
      normalOption: {
        // 浮层提示
        tooltip: {
          trigger:'item'
        },
        // 数据展示
        series: []
      }
    }
  },
  watch: {
    // 深度监听
    echartData: {
      handler: function() {
        this.initChart()
      },
      deep: true
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    }
  },
  methods: {
    initChart() {
      this.initChartData()
      // 退出页面不能注销事件
      let echart = echarts.init(this.$refs.echart)
      echart.setOption(this.options);
      window.addEventListener('resize', echart.resize)

      // this.echart = echarts.init(this.$refs.echart)

      
      // 下面方法遇到浮层框 trigger:'axis' 不起作用bug
      // if (this.echart) {
      //   this.echart.setOption(this.options)
      //   console.log(this.echart)
      // } else {
      //   this.echart = echarts.init(this.$refs.echart)
      //   this.echart.setOption(this.options)
      // }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.echartData.xData;
        this.axisOption.series = this.echartData.series;
      } else {
        this.normalOption.series = this.echartData.series;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>