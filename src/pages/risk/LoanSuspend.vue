<template>
<div id="loan-suspend">
  <el-card>
    <!--搜索工具条  -->
    <div slot="header" class="card-header">
      <el-form :model="filters" :inline="false" class="header-left" style="max-width:85%;">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入客户姓名"  :inline="false" >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.cnumber" placeholder="请输入客户编号">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.idcard" placeholder="请输入身份证号">
          </el-input>
        </el-form-item>
        <el-button type="primary" icon='search' @click='handleSearchInfo'>搜索</el-button>
      </el-form>
      <el-button  @click="handleAdd" icon='plus' type="primary" style="margin-left:15px">新增</el-button>
    </div>

    <!-- 列表-分页 -->
    <wk-table-paging check-box :loading="loading" :columns="columns" :table-data="tableData" :total-count="total" @selection-change="handleSelectAll" @current-change="handlePageChange">
      <el-table-column label="操作">
        <template scope="scope" style="text-align:center" class="dobtn">
          <div scope="scope" class="dobox">
            <el-button size="small" icon="edit" type="info">暂停</el-button>
          </div>
        </template>
      </el-table-column>
      <template slot="foot">
        <el-button :disabled="this.selfs.length === 0" @click="batchRemove" icon="delete" type="danger">批量删除</el-button>
      </template>
    </wk-table-paging>

  </el-card>
</div>
</template>
<script>
import LoanSuspend from './formData/loanSuspend'
import fn from './functions'
import * as api from '@/api'
export default {
  name: 'loan-suspend',
  data: () => ({
    // 搜索关键词
    filters: {
      name: '',
      cnumber: '',
      idcard: ''
    },
    para: {
      limit: api.config.limit,
      page: 1,
      filters: []
    },
    loading: false, // layout初始化
    selfs: [],
    tableData: [], // 列表数据
    total: 0 // 数据总条数
  }),
  mounted() {
    // this.handleGetTableData()
  },
  computed: {
    columns () {
      return LoanSuspend.LoanSuspend
    }
  },
  methods: {
    // 获取表单数据
    handleGetTableData() {
      let that = this
      that.loading = true
      that.para.filters = that.filters
      fn.handleGetTableData(api.risk.lsuspendList, that.para, res => {
        let data = res.data.data
        let code = res.data.code
        if (code === 1) {
          that.tableData = data.data
          that.total = data.total
          that.loading = false
        }
      })
    },
    // 批量选中
    handleSelectAll(selfs) {
      let that = this
      that.selfs = selfs
      },
    // 增加记录
    handleAdd() {

    },
    // 搜索用户信息
    handleSearchInfo() {
      this.handleGetTableData()
    },
    // 翻页
    handlePageChange(val) {
      let that = this
      that.para.page = val
      this.handleGetTableData()
    },
    // 批量删除
    batchRemove() {
      let that = this
      let ids = that.selfs.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        fn.handleRemoveTableData(api.risk.lsuspendRemove, ids, (res) => {
           that.loading = false
           this.handleGetTableData()
        })
      }).catch(() => {

      })
    }
  },
  watch: {
    // 'this.$store.state.risk.tableData': 'get'
  }
}
</script>
<style lang="scss" scoped>
#loan-suspend {
  .el-form-item{
    display: inline-block;
    width: 250px;
    margin-right: 10px
  }
  .el-input{
    width:100%
  }
  .tablelist {
    .el-table__row td:last-child .cell{
      padding: 0;
      text-align: center;
    }
    .el-row{font-size: 12px}
    .lockstatus{color: #50bfff;margin-left: 0.2rem}
  }
  .dobox{
    text-align:center;
    .lockstatus{color:#50bfff;}
    button {margin-top:5px}
  }
}
</style>
