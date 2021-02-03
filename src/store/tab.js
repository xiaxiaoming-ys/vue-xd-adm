import Cookie from 'js-cookie';
export default {
  state: {
    isCollapse: false, // 默认展开侧边栏
    currentMenu: null, // 当前所在导航
    menu: [],
    tabsList: [ // 菜单列表
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  },
  mutations: {
    // 设置菜单
    setMenu(state, val) {
      state.menu = val;
      Cookie.set('menu', JSON.stringify(val))
    },
    // 清除菜单
    clearMenu(state) {
      state.menu = [];
      // 移除
      Cookie.remove('menu')
    },
    addMenu(state, router) {
      let menu = JSON.parse(Cookie.get('menu'))
      if (!menu) return;

      state.menu = menu;
      let currentMenu = [
        {
          path: '/',
          component: () => import(`@/views/Main`),
          children: []
        }
      ]

      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })

      router.addRoute(currentMenu)
      console.log(currentMenu)
    },
    // 面包屑
    selectMenu(state, val) {
      if (val.name === 'home') {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        let idx = state.tabsList.findIndex(item => item.name === val.name);
        idx === -1 && state.tabsList.push(val)
      }
    },
    // 删除一个面包屑
    closeTab(state, val) {
      let idx = state.tabsList.findIndex(item => item.name === val.name);
      state.tabsList.splice(idx, 1)
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}