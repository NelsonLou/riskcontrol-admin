<template>
<el-tabs v-model="$route.path" @tab-click="handleClick" @tab-remove="removeTab" id="tabs">
  <el-tab-pane v-if="tabs.length" label="关闭所有"> </el-tab-pane>
  <el-tab-pane label="首页" name="/dashboard"> </el-tab-pane>
  <el-tab-pane v-for="(tag, index) in tabs" :label="tag.name" :name="tag.path" :key="index" closable> </el-tab-pane>
</el-tabs>
</template>
<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'tabs',
  computed: {
    ...mapGetters({
      'tabs': 'getTabs'
    })
  },
  methods: {
    // 获取子菜单
    getChildMenu(path) {
      const menus = JSON.parse(localStorage.getItem('navMenu'))
      let childMenu = menus.filter(obj => {
        if (path && obj.path.indexOf(path) === -1) {
          return false
        }
        return true
      })
      if (childMenu.length) {
        childMenu = menus.filter(obj => obj.path === path)[0].children
      }
      this.$store.commit('CHILD_MENU', childMenu)
    },
    // 切换标签页
    handleClick(tab) {
      const path = tab.name
      if (!path) {
        // 删除所有标签页
        this.batchRemoveTab()
        return
      }
      // 激活导航菜单
      this.navMenu(path)
      // 路由指向指定页
      this.$router.push(path)
    },
    // 添加标签页
    addTab() {
      this.$store.commit('ADD_TABS', this.$route)
    },
    // 删除标签页
    removeTab(targetPath) {
      let tabs = this.$store.state.app.tabs
      let path = this.$route.path
      if (path === targetPath) {
        tabs.map((tab, index) => {
          if (tab.path === targetPath) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            path = nextTab ? nextTab.path : '/dashboard'
            // 路由指向指定页
            this.$router.push(path)
          }
        })
      }
      this.$store.commit('DEL_TABS', targetPath)
      // 激活导航菜单
      this.navMenu(path)
    },
    // 删除所有标签页
    batchRemoveTab() {
      this.getChildMenu('loan') // 获取子菜单
      // this.$store.commit('CHILD_MENU', []) // 重置子菜单
      this.$store.commit('CLOSE_CHILD_MENU') // 关闭子菜单
      this.$store.commit('ACTIVE_NAV_MENU', 'loan') // 激活主菜单
      this.$store.commit('RESET_TABS') // 重置标签页
      // 路由指向首页
      this.$router.push('/dashboard')
    },
    // 激活导航菜单
    navMenu(path) {
      let mainPath = path.split('/')[1]
      let childPath = path.split('/')[2]
      mainPath = mainPath === 'dashboard' ? 'loan' : mainPath
      this.getChildMenu(mainPath) // 获取子菜单
      this.$store.commit('OPEN_CHILD_MENU', childPath) // 打开子菜单
      this.$store.commit('ACTIVE_NAV_MENU', mainPath) // 激活主菜单
      this.$store.commit('ACTIVE_CHILD_MENU', path) // 激活子菜单
    }
  },
  watch: {
    $route() {
      this.addTab()
    }
  }
}
</script>
<style lang="scss" scoped>
#tabs {
    margin-left: 224px;
    padding: 0 10px;
    background-color: #f8f8f8;
}
</style>
