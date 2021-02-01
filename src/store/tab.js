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
    selectMenu(state, val) {
      if (val.name === 'home') {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        let idx = state.tabsList.findIndex(item => item.name === val.name);
        idx === -1 && state.tabsList.push(val)
      }
    },
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