<template>
<div id="dashboard">
  <el-card class="box-card">
    <div slot="header" class="card-header">
      <h3>{{ msg }}</h3>
    </div>
    <img class="logo" src="../assets/logo.png">
    <h3>维凯官网:
      <a href="http://www.weknet.cn/" target="_blank"> http://www.weknet.cn/ </a>
    </h3>
    <p>系统由维凯技术团队提供技术支持</p>
  </el-card>
</div>
</template>
<script>
export default {
  name: 'dashboard',
  data: () => ({
    msg: '维凯网络管理系统'
  })
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#dashboard {
    h3 {
        margin: 0;
        font-weight: normal;
        a {
            color: #42b983;
        }
    }
    p {
        text-align: right;
        color: #999;
    }
}
</style>
