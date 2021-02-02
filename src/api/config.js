import axios from 'axios';

// 创建一个axios实例
const service = axios.create({
  // 请求超时时间
  timeout: 3000
})

// 添加请求拦截器
service.interceptors.request.use(
  // 成功
  config => {
    return config
  },
  // 失败
  err => {
    console.log(err)
  }
)

// 响应拦截器 拦截状态码 
service.interceptors.response.use(
  response => {
    let res = {};
    res.status = response.status;
    res.data = response.data;

    // 添加判断状态码等于200  或者404 跳转制定页面
    // if () {}

    return res
  },
  err => console.log(err)
)

export default service