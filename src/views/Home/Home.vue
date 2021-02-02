<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" class="l-clo">
      <div class="top shadow">
        <div class="user">
          <div class="img"><img :src="userImg" alt=""></div>
          <div class="userinfo">
            <p class="name">Nick</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2019-10-20</span></p>
          <p>上次登录地点：<span>北京</span></p>
        </div>
      </div>

      <div class="bottom shadow">
        <el-table :data="tableData" :stripe="true"  style="width: 100%">
          <el-table-column show-overflow-tooltip align="center" prop="name" label="课程" ></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="todayBuy" label="今日购买" ></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="monthBuy" label="本月购买" ></el-table-column>
          <el-table-column show-overflow-tooltip align="center" prop="totalBuy" label="总购买" ></el-table-column>
        </el-table>
      </div>
    </el-col>

    <el-col :span="16" class="r-clo">
      <div class="list">
        <div class="item shadow" style="padding: 0" v-for="item in countData" :key="item">
          <i class="icon" :style="`background:${item.color}`" :class="`el-icon-${item.icon}`"></i>
          <div class="detail">
            <p class="num">￥{{ item.num }}</p>
            <p class="txt">{{ item.txt }}</p>
          </div>
        </div>
      </div>
      
      <echart class="shadow" :echartData='echartData.order' style="height: 280px"></echart>

      <div class="graph">
        <echart class="card shadow" :echartData='echartData.user' style="height: 260px"></echart>
        <echart class="card shadow" :isAxisChart="false" :echartData='echartData.video' style="height: 260px"></echart>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import Echart from '@/components/Echart';
import * as echarts from 'echarts'
export default {
  components: {
    Echart
  },
  data() {
    return {
      userImg: require('@/assets/images/user.png'),
      // 今日相关
      countData: [],
      // 表单相关
      tableData: [
        // {
        //   name: '课程',
        //   todayBuy: '今日购买',
        //   monthBuy: '本月购买',
        //   totalBuy: '总购买'
        // }
      ],
      // 图表数据
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      },
      option: {
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'value',
            axisLine: {
              color: "#17b3a3"
            }
        },
        yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
            {
                name: '2011年',
                type: 'line',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2012年',
                type: 'line',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
      }
    }
  },
  methods: {
    // 设置折线图数据
    setOrderData(order) {
      this.echartData.order.xData = order.date;
      const keyArray = Object.keys(order.data[0])

      keyArray.forEach(key => {
        this.echartData.order.series.push({
          name: key === 'wechat' ? '小程序' : key,
          data: order.data.map(item => item[key]),
          type: 'line'
        })
      })
    },
    // 设置柱状图数据
    setCategoryData(userData) {
      const keyArray = userData.map(item => item.date);
      this.echartData.user.xData = keyArray;

      this.echartData.user.series.push({
        name: '新增用户',
        type: 'bar',
        data: userData.map(item => item.new)
      })

      this.echartData.user.series.push({
        name: '活跃用户',
        type: 'bar',
        data: userData.map(item => item.active)
      })
    },
    // 设置饼图数据
    setPieData(videoData) {
      this.echartData.video.series.push({
        type: 'pie',
        data: videoData
      })
    }
  },
  mounted() {
    this.$http.get('/home/getStatisticalData')
    .then(res => {
      const data = res.data.data;
      // 今日相关
      this.countData = data.countData;
      // 表单相关
      this.tableData = data.tableData;

      // 订单折线图
      this.setOrderData(data.orderData)
      
      // 设置饼图数据
      this.setPieData(data.videoData)

      // 设置柱状图数据
      this.setCategoryData(data.userData)
    })
  }
}
</script>

<style lang="scss" scoped>
.home{
  .l-clo{
    display: flex;
    flex-direction: column;
    
    .top{
      .user{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;

        .img{
          width: 150px;
          border-radius: 50%;
          margin-right: 30px;
          overflow: hidden;
        }

        .userinfo{
          .name{
            font-size: 32px;
            margin-bottom: 10px;
          }
          .access{
            color: #999;
          }
        }
      }

      .login-info{
        color: #999;
        font-size: 14px;
        line-height: 28px;

        span{
          margin-left: 20px;
          color: #333;
        }
      }
    }

    .bottom{
      margin-top: 20px;
      height: 100%;
    }
  }

  .r-clo{
    .list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .item{
        display: flex;
        align-items: center;
        width: 32%;
        margin-bottom: 2%;

        .icon{
          width: 70px;
          height: 70px;
          margin-right: 10px;
          color: #fff;
          font-size: 30px;
          text-align: center;
          line-height: 70px;
        }

        .detail{
          padding: 10px 0;
          line-height: 20px;

          .num{
            color: #333;
            font-size: 28px;
          }
          .txt{
            margin-top: 5px;
            font-size: 14px;
            color: #999;
          }
        }
      }
    }

    .graph{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .card{
        width: 48.5%;
      }
    }
  }
}
.el-table .success-row {
    background: #f0f9eb;
  }
</style>
