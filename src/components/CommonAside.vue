<template>
  <el-menu :uniqueOpened="true" :collapse="isCollapse" default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >

    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span>{{ item.label }}</span>
    </el-menu-item>

    <el-submenu index="index" v-for="(item, index) in hasChildren" :key="index">
      <template #title>
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>

      <el-menu-item-group v-for="(item, index) in hasChildren" :key="index">
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>

    </el-submenu>

  </el-menu>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      asideMenu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home'
        },
        {
          path: '/video',
          name: 'video',
          label: '视频管理',
          icon: 'video-play'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user'
        },
        {
          label: '其他',
          icon: 'bank-card',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapMutations("tab", {
      selectMenu: 'selectMenu'
    }),
    noChildren() {
      return this.asideMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asideMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    // 动态生成导航
    menu() {
      return this.$store.state.tab.menu
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({name: item.name})
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu{
  height: 100%;
  border: none;

  .el-menu-item.is-active{
    color: #fff;
  }
}
</style>