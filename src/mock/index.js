import Mock from 'mockjs';
// 数据模板
import homeApi from './home'

// 设置200 - 2000延时请求到数据
Mock.setup({
  timeout: '200-800'
})

// 首页相关
Mock.mock('/home/getStatisticalData', 'get', homeApi.getStatisticalData)