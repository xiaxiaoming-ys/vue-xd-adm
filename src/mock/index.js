import Mock from 'mockjs';
// 数据模板
import homeApi from './home'
import userApi from './user'
import permission from './permission'

// 设置200 - 2000延时请求到数据
Mock.setup({
  timeout: '200-800'
})

// 首页相关
Mock.mock('/home/getStatisticalData', 'get', homeApi.getStatisticalData)

// 用户列表页查询
Mock.mock(/\/user\/getUserList/, 'get', userApi.getUserList)
// 用户编辑
Mock.mock(/\/user\/updateUser/, 'put', userApi.updateUser)
// 用户删除
Mock.mock(/\/user\/deleteUser/, 'delete', userApi.deleteUser)
// 新建
Mock.mock(/\/user\/createUser/, 'post', userApi.createUser)

//登录页面
Mock.mock(/\/api\/permission\/getMenu/, 'post', permission.getMenu)
