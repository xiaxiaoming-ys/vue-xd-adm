<template>
  <div class="header">
    <div class="l-content">
      <el-button plain type="primary" @click="collapseMenu" icon="el-icon-menu" size="mini"></el-button>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

        <el-breadcrumb-item :to="{name: current.name}" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>

      </el-breadcrumb>

    </div>
    <div class="r-content" size="mini">
      <el-dropdown trigger="click">
      <div class="el-dropdown-link">
        <img :src="userImg" alt="">
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'CommonHeader',
  data() {
    return {
      userImg: require('@/assets/images/user.png')
    }
  },
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  methods: {
    collapseMenu() {
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .l-content{
    display: flex;
    justify-content: start;
    align-items: center;

    .el-button{
      margin-right: 20px;
    }
  }

  .r-content{
    .el-dropdown-link{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>
<style lang="scss">
.el-breadcrumb__item{
  .el-breadcrumb__inner{
    color: #606266;
  }

  &:last-child{
    .el-breadcrumb__inner.is-link{
      display: block;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>