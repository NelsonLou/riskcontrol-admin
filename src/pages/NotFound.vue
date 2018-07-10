<template>
<div id="not-found">
  <h1 class="nf-title">哎呀..</h1>
  <h2>居然没找到页面...</h2>
  <h1 class="nf-title">404</h1>
  <h3 class="nf-count"> 维凯将在
    <span class="count">{{ count }}</span>
    秒后为您返回首页
  </h3>
</div>
</template>
<script>
export default {
  name: 'not-found',
  data: () => ({
    count: 3
  }),
  mounted() {
    this.delayAndRedirect()
  },
  methods: {
    delayAndRedirect() {
      setInterval(() => {
        this.count -= 1
      }, 1000)
      setTimeout(() => {
        this.$store.commit('RESET_NAV_MENU') // 重置主导航
        this.$store.commit('RESET_CHILD_MENU') // 重置子菜单
        this.$store.commit('ACTIVE_NAV_MENU', '/dashboard') // 激活主导航
        this.$router.push('/dashboard') // 路由指向首页
      }, 3000)
    }
  }
}
</script>
<style lang="scss" scoped>
#not-found {
    overflow: hidden;
    text-align: center;
    .nf-title {
        color: coral;
    }
    .nf-count {
        color: green;
    }
    .count {
        color: red;
        font-size: 24px;
    }
}
</style>
