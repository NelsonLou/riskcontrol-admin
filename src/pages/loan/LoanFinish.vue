<template>
  <div id="business">
    <el-card class="box-card">
      <!-- 搜索栏 -->
      <div class="card-header">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="客户名称">
            <el-input v-model="formInline.name" placeholder="客户名称" size="small"></el-input>
          </el-form-item>
          <el-form-item label="客户编号">
            <el-input v-model="formInline.id" placeholder="客户编号" size="small"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="formInline.idCard" placeholder="身份证号码" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="getData" size="small">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="plus" @click="add" size="small">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 列表 -->
      <div class="tab-list">
        <el-table v-loading.body="listLoading" :data="dataList" border style="width: 100%">
          <el-table-column prop="id" label="编号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="客户名称" width="140">
          </el-table-column>
          <el-table-column prop="productName" label="产品名称" width="140">
          </el-table-column>
          <el-table-column prop="loanSubject" label="放款主体" width="145">
          </el-table-column>
          <el-table-column prop="money" label="申请金额(元)" width="160">
          </el-table-column>
          <el-table-column prop="term" label="申请期限" width="160">
          </el-table-column>
          <el-table-column prop="loanMoney" label="放款金额(元)" width="160">
          </el-table-column>
          <el-table-column prop="loanTerm" label="放款期限" width="160">
          </el-table-column>
          <el-table-column prop="date" label="申请日期" width="160">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="160">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template scope="scope">
              <el-button @click="Handle" size="small" type="text">处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination @current-change="handleCurrentChange" :page-size="limit" :current-page="1" layout="total, prev, pager, next, jumper" :total="total" style="float: right;">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'service',
  data: () => ({
    formInline: {
      name: '',
      id: '',
      idCard: ''
    },
    // 表单每页条数
    limit: 10,
    // 每页对应的数据
    dataList: [],
    // 表单总数据
    tableData: '',
    // 搜索总数据
    searchData: '',
    // 是否显示加载
    listLoading: false,
    // 数据总条数
    total: 0,
    // 当前页
    currentPage: 1
  }),
  mounted() {
    // this.getData()
  },
  methods: {
    // 获取分页数据
    getData() {
      // 激活加载状态
      this.listLoading = true
      // 请求参数
      const para = {
        // 当前页数
        page: this.currentPage,
        // 每页条数
        limit: this.api.config.limit,
        // 搜索
        name: this.formInline.name,
        id: this.formInline.id,
        idCard: this.formInline.idCard
      }
      var _this = this
      // 请求数据
      this.axios.get(this.api.loan.loanFinish, {
        params: para
      }).then(res => {
        _this.listLoading = false
       const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          // 设置数据总条数
          _this.total = data.total
          // 设置当前页的数据
          _this.dataList = data.data
        } else {
          _this.$message.error(msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 设置当前分页数据
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    Unlock() {
      this.$confirm('此操作将不可逆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '解锁成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解锁'
        })
      })
    },
    Handle() {
      this.$notify({
        title: '处理成功',
        message: '......................',
        type: 'success'
      })
    },
    add() {
      this.tableData.push({
        'id': this.formInline.id,
        'serviceName': '业务受理',
        'name': this.formInline.name,
        'productName': '店主贷',
        'loanSubject': '小贷系统',
        'money': this.formInline.money,
        'term': 1,
        'date': '2017-08-04'
      })
      // 重新设置数据条数
      this.total = this.tableData.length
      // 对应数据暂时存放的数组
      var arr = []
      // 初始化表单数据
      this.dataList = []
      // 遍历需要的数据范围
      for (var i = (this.currentPage * this.limit - this.limit); i < (this.limit * this.currentPage); i++) {
        if (i < this.tableData.length) {
          arr.push(this.tableData[i])
          // 获取对应页数的数据
          this.dataList = arr
        } else {
          break
        }
      }
    },
    deleteRow(index, dataList) {
      // 总数据中根据下标删除对应的数据
      this.tableData.splice((this.limit * this.currentPage - this.limit + index), 1)
      // 重新设置数据条数
      this.total = this.tableData.length
      // 对应数据暂时存放的数组
      var arr = []
      // 初始化表单数据
      this.dataList = []
      // 遍历需要的数据范围
      for (var i = (this.currentPage * this.limit - this.limit); i < (this.limit * this.currentPage); i++) {
        if (i < this.tableData.length) {
          arr.push(this.tableData[i])
          // 获取对应页数的数据
          this.dataList = arr
        } else {
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  padding-bottom: 20px;
}

.el-form {
  max-width: 100% !important;
}

.tab-list {
  margin-top: 20px;
}

.paging {
  margin-top: 20px;
}
</style>
