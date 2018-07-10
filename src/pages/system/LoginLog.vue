<template>
<div id="login-log">
  <el-card>
    <wk-table-paging :columns="columns" :table-data="testDate" :total-count="total" @current-change="curChange">
    </wk-table-paging>
  </el-card>
</div>
</template>
<script>
export default {
  name: 'login-log',
  data: () => ({
    isBatch: false,
    sels: [],
    total: 10,
    columns: [{
        value: 'userName',
        page: 10,
        label: '登录用户',
        minw: 120
      },
      {
        value: 'role',
        label: '登录角色',
        minw: 120
      },
      {
        value: 'ip',
        label: '登录IP',
        width: 400,
        sortable: true
      },
      {
        value: 'loginDate',
        label: '登录时间',
        minw: 110,
        sortable: true
      }
    ],
    testDate: [{
      userName: 'admin',
      role: '管理员',
      ip: '192.168.0.1',
      loginDate: '2017.01.01 12:00'
    }, {
      userName: 'admin',
      role: '管理员',
      ip: '192.168.0.1',
      loginDate: '2017.01.01 12:00'
    }, {
      userName: 'admin',
      role: '管理员',
      ip: '192.168.0.1',
      loginDate: '2017.01.01 12:00'
    }, {
      userName: 'admin',
      role: '管理员',
      ip: '192.168.0.1',
      loginDate: '2017.01.01 12:00'
    }, {
      userName: 'admin',
      role: '管理员',
      ip: '192.168.0.1',
      loginDate: '2017.01.01 12:00'
    }, {
      userName: 'admin',
      role: '管理员',
      ip: '192.168.0.1',
      loginDate: '2017.01.01 12:00'
    }, {
      userName: 'admin',
      role: '管理员',
      ip: '192.168.0.1',
      loginDate: '2017.01.01 12:00'
    }, {
      userName: 'admin',
      role: '管理员',
      ip: '192.168.0.1',
      loginDate: '2017.01.01 12:00'
    }]
  }),
  methods: {
    getListDate() {
      // this.loading = true
      // this.axios.getListDate(this.$api.setting.______).then(res => {
      //   let list = res.data
      //   if (list.code === 1) {
      //     this.listDate = list.data
      //     this.$message.success(list.msg)
      //   } else {
      //     this.$message.error(list.msg)
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    curChange(val) {
      this.page = val
    }
  }
}
</script>
<style lang="scss" scoped>
#login-log {}
</style>
