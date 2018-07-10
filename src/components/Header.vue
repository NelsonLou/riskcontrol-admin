<template>
<div id="header">
  <!-- 企业名称 -->
  <div class="logo-info">
    <img class="logo" src="../assets/logo.png">
    <p class="name"> 维凯借贷管理系统 <span> www.weknet.com.cn </span> </p>
  </div>
  <!-- 导航菜单 -->
  <el-menu class="nav-menu" :default-active="navActive" @select="handleSelect" mode="horizontal" theme="dark">
    <el-menu-item v-for="(item, index) in navMenu" :index="item.path" :key="index">
      {{ item.display_name }}
    </el-menu-item>
  </el-menu>
  <!-- 登录信息 -->
  <div class="login-info"> 欢迎您,
    <el-dropdown>
      <strong class="user"> {{ userName }} </strong>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modifyPwdVisible = true"> 修改密码 </el-dropdown-item>
        <el-dropdown-item @click.native="handleLogout"> 退出系统 </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <!-- 修改密码 -->
  <wk-modify-pwd :visible="modifyPwdVisible" @close="modifyPwdVisible = false"></wk-modify-pwd>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import WkModifyPwd from '@/components/ModifyPwd'

export default {
  name: 'header',
  components: {
    WkModifyPwd
  },
  data: () => ({
    userName: '',
    modifyPwdVisible: false
  }),
  computed: {
    ...mapGetters({
      'navMenu': 'getNavMenu',
      'navActive': 'getNavActive'
    })
  },
  mounted() {
    // 获取用户昵称
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.userName = user.admin_nick || ''
    }
    // 获取主导航
    const menus = JSON.parse(localStorage.getItem('navMenu'))
    if (!menus) {
      this.$store.dispatch('handleNavMenu')
    }
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
    // 激活主导航
    handleSelect(path) {
      this.getChildMenu(path)
      this.$store.commit('ACTIVE_NAV_MENU', path)
    },
    // 用户退出
    handleLogout() {
      this.$confirm('您确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        // this.axios.post(this.$api.system.logout).then(res => {
        //   const {
        //     code,
        //     msg
        //   } = res.data
        //   if (code === 1) {
        this.$store.commit('RESET_TABS') // 重置标签页
        this.$store.commit('RESET_NAV_MENU') // 重置主导航
        this.$store.commit('RESET_CHILD_MENU') // 重置子菜单
        this.$router.push('/login') // 路由指向登录页
        //   } else {
        //     this.$message.error(msg)
        //   }
        // }).catch(error => {
        //   console.log(error)
        // })
      }).catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
#header {
    overflow: hidden;
    color: #fff;
    border-bottom: 4px solid #F7BA2A;
    background-color: #324057;
    .logo-info {
        float: left;
        width: 248px;
        .logo {
            float: left;
            width: 40px;
            height: 40px;
            margin: 10px 20px;
        }
        .name {
            float: left;
            width: 168px;
            margin: 12px 0 8px;
            line-height: 20px;
        }
    }
    .nav-menu {
        float: left;
        .is-active {
            border-bottom: 5px solid #20a0ff;
        }
    }
    .login-info {
        float: right;
        height: 60px;
        padding-right: 20px;
        text-align: right;
        line-height: 60px;
        .user {
            display: block;
            margin: 0 8px;
            cursor: pointer;
            color: #fff;
        }
    }
}
</style>
