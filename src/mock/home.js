import Mock from 'mockjs'

// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          vue: Mock.Random.float(100, 8000, 0, 2),
          wechat: Mock.Random.float(100, 8000, 0, 2),
          ES6: Mock.Random.float(100, 8000, 0, 2),
          Redis: Mock.Random.float(100, 8000, 0, 2),
          React: Mock.Random.float(100, 8000, 0, 2),
          springboot: Mock.Random.float(100, 8000, 0, 2)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 今日相关
        countData: [
          {
            txt: '今日支付订单',
            num: Mock.Random.float(1000, 10000, 0, 0),
            icon: 's-help',
            color: '#2ec7c9'
          },
          {
            txt: '今日收藏订单',
            num: Mock.Random.float(1000, 10000, 0, 0),
            icon: 'star-on',
            color: '#ffb980'
          },
          {
            txt: '今日未支付订单',
            num: Mock.Random.float(1000, 10000, 0, 0),
            icon: 's-goods',
            color: '#5ab1ef'
          },
          {
            txt: '今日支付订单',
            num: Mock.Random.float(1000, 10000, 0, 0),
            icon: 's-help',
            color: '#2ec7c9'
          },
          {
            txt: '今日收藏订单',
            num: Mock.Random.float(1000, 10000, 0, 0),
            icon: 'star-on',
            color: '#ffb980'
          },
          {
            txt: '今日未支付订单',
            num: Mock.Random.float(1000, 10000, 0, 0),
            icon: 's-goods',
            color: '#5ab1ef'
          }
        ],
        // 饼图
        videoData: [
          {
            name: 'springboot',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: 'vue',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: '小程序',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: 'ES6',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: 'HTML5',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: 'React',
            value: Mock.Random.float(1000, 10000, 0, 2)
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周二',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周三',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周四',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周五',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周六',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周日',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          }
        ],
        // 折线图
        orderData: {
          date: ['20201001', '20201002', '20201003', '20201004', '20201005', '20201006', '20201007'],
          data: List
        },
        tableData: [
          {
            name: 'ES6',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '小程序',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: 'Vue',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: 'springboot',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: 'React',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: 'HEML5',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          }
        ]
      }
    }
  }
}
