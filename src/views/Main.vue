<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <commonAside />
    </el-aside>

    <el-container>
      <el-header>
        <commonHeader />
      </el-header>

      <el-main>
        <commonTab />
        <router-view />
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import commonAside from '@/components/CommonAside';
import commonHeader from '@/components/CommonHeader';
import commonTab from '@/components/CommonTab';
export default {
  components: {
    commonAside,
    commonHeader,
    commonTab
  }
}
</script>

<style lang="scss" scoped>
.el-header{
  background-color: #333;
  color: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>