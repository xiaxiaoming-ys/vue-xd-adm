<template>
  <div class="tabs">
    <!-- :closable='tag.name !== "home"' 首页禁止关闭 -->
    <el-tag size="mini" v-for="tag in tags" :key="tag" :closable='tag.name !== "home"' :disable-transitions="false" @close="handleClose(tag)" @click="tabClick(tag)" :effect="$route.name === tag.name ? 'dark' : 'plain'">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations(['closeTab']),
    handleClose(tag) {
      this.closeTab(tag)
      const len = this.tags.length - 1;

      this.$router.push({name: this.tags[len].name})
    },
    tabClick(tag) {
      this.$router.push({name: tag.name})
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
  .tabs{
    margin-bottom: 10px;
    .el-tag{
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>