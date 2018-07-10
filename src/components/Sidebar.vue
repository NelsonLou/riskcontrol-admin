<template>
<div id="sidebar">
  <el-menu :default-openeds="[menuOpened]" :default-active="menuActive" :unique-opened="true" :router="true" @open="OPEN_CHILD_MENU" @close="CLOSE_CHILD_MENU" @select="ACTIVE_CHILD_MENU">
    <template v-for="item in childMenu">
    <!-- 三级菜单 -->
    <el-submenu v-if="item.children" :index="item.path" :key="item.id">
    <template slot="title">{{ item.display_name }}</template>
    <el-menu-item v-for="(child, index) in item.children" :index="child.path" :key="index">{{ child.display_name }}</el-menu-item>
    </el-submenu>
    <!-- 二级菜单 -->
    <el-menu-item v-else :index="item.path" :key="item.id">{{ item.display_name }}</el-menu-item>
    </template>
  </el-menu>
</div>
</template>
<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  name: 'sidebar',
  computed: {
    ...mapGetters({
      'childMenu': 'getChildMenu',
      'menuOpened': 'getMenuOpened',
      'menuActive': 'getMenuActive'
    })
  },
  methods: {
    ...mapMutations(['OPEN_CHILD_MENU', 'CLOSE_CHILD_MENU', 'ACTIVE_CHILD_MENU'])
  }
}
</script>
<style lang="scss" scoped>
#sidebar {
    float: left;
    overflow: auto;
    width: 224px;
    height: calc(100vh - 64px);
    background-color: #eef1f6;
}
</style>
