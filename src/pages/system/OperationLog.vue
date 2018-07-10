<template>
<div id="operation-log">
  <el-card class="box-card">
    <!--工具条  -->
    <div slot="header" class="card-header">
      <el-form :model="filters"  :inline="true" class="header-left">
        <el-form-item label="姓名">
          <el-input :icon="icon" :on-icon-click="clear" v-model="filters.keyword" placeholder="请输入姓名">
          </el-input>
          </el-form-item><el-form-item> 
            <el-button icon="search" @click="getUsers" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--列表  -->
    <wk-table ref="tableList" :loading="listLoading" :columns="columns"  @click="getUsers">
       
    </wk-table>
  </el-card>
</div>
</template>
<script>
export default {
  name: 'operation-log',
  data: () => ({
     // 表格列表数据
     columns: [{
       value: 'admin_name',
       label: '用户名',
       width: 180
     },
     {
       value: 'admin_id',
       label: '用户id',
       width: 180
     },
     {
       value: 'operate_target',
       label: '操作目标',
       minw: 180
     },
     {
       value: 'operate_ip',
       label: '操作IP',
       width: 180
     },
     {
       value: 'created_at',
       label: '操作时间',
       width: 180
     }
     ],
     // 删选关键字
     filters: {
       keyword: ''
     },
     // 加载状态
     listLoading: false,
     // 用户列表
     users: [],
     total: 0,
     page: 0,
     limit: 0
  }),
  mounted() {
    this.getUsers()
  },
  computed: {
      icon() {
        if (this.filters.keyword !== '') {
               return 'close'
        } else return ''
      }
  },
  methods: {
    // 获取用户列表
    getUsers() {
      // 获取用户列表
      // 获取列表请求参数
      const para = Object.assign({}, this.filters)
      // 触发子组件事件
      this.$refs['tableList'].getListData(this.$api.systemO.operationlog, para, 'adminLog_list')
    },
    // 用户列表的分页
    curChange(val) {
      this.page = val
      this.getUsers()
    },
    clear() {
       this.filters.keyword = ''
       this.getUsers()
    }
  }
}
</script>
<style lang="scss" scoped>
#operation-log {}
</style>
