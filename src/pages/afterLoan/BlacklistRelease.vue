<template>
<div id="blacklist-release">
  申请解除黑名单
  <!-- <el-card class="box-card"> -->
    <!--工具条-->
    <!-- <div slot="header" class="card-header">
      <el-form :model="filters" :inline="true" class="header-left" style="max-width:1550px">
        <el-form-item>
          <el-input v-model="filters.username" placeholder="客户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.idNO" placeholder="身份证"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" @click="getBlacklist"></el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <!-- 列表-分页 -->
    <!-- <wk-table-paging :loading="listLoading" :table-data="blackList" :columns="columns" :total-count="total" @current-change="handleCurrentChange">
      <el-table-column label="操作" width="120">
        <template scope="scope">
          <el-button type="text" size="small" icon="edit">解除黑名单</el-button>
        </template>
      </el-table-column>
    </wk-table-paging>

  </el-card> -->
</div>
</template>

<script>
import * as api from '@/api'

export default {
  name: 'blacklist-release',
  data: () => ({
    // 表格列数据
    columns: [{
      value: 'userNO',
      label: '客户编号',
      width: 120
    }, {
      value: 'username',
      label: '客户名称',
      width: 120
    }, {
      value: 'idNO',
      label: '身份证号码',
      minw: 200
    }, {
      value: 'phoneNO',
      label: '手机号码',
      width: 160
    }, {
      value: 'rank',
      label: '级别',
      width: 120,
      sortable: true,
      formatter: row => row.rank === 1 ? '红色' : '橙色'
    }, {
      value: 'source',
      label: '来源',
      width: 120,
      sortable: true,
      formatter: row => row.source === 1 ? '外部导入' : '系统导入'
    }],
    // 筛选关键字
    filters: {
      username: '',
      idNO: ''
    },
    // 加载状态
    listLoading: false,
    // 列表
    blackList: [],
    total: 0,
    limit: api.config.limit,
    page: 1
  }),
  mounted() {
    // this.getBlacklist()
  },
  methods: {
    // 获取列表
    getBlacklist() {
      this.listLoading = true
      // 请求参数
      const para = {
        page: this.page,
        limit: this.limit,
        name: this.filters.username
      }
      this.axios.get(api.afterLoan.getBlacklist, {
        params: para
      }).then(res => {
        this.listLoading = false
        console.log('获取列表', res)
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          // 获取请求返回数据
          this.blackList = data.blackList
          this.total = data.total
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 用户列表分页
    handleCurrentChange(page) {
      this.page = page
      this.getBlacklist()
    }
  }
}
</script>
<style lang="scss" scoped>
#blacklist-release {}
</style>
