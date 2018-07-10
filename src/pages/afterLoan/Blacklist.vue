<template>
<div id="blacklist">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <el-button @click="handleAdd" icon="plus" type="primary" class="header-right">添加</el-button>
    </div>

    <!-- 列表 -->
    <wk-table-base ref="wk-list" :columns="data.columns" @query="getData" check-box batch-remove @batch-remove="handleBatchDel">
      <el-table-column label="操作" width="180" fixed="right">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.$index, scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  				<el-button @click="handleDel(scope.$index, scope.row)" size="small" icon="delete" type="danger">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>

    <!--编辑添加对话框-->
    <el-dialog :visible.sync="editFormVisible" :title="editTitle ? '编辑' : '添加'">
      <wk-form-base :key="editFormKey" ref="wk-edit" :form-item="data.editItem" :form-rule="data.editRule" @submit="editSave" @patch="getInfo" @query="getData">
        <!-- 表单按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="handleClose">取 消</el-button>
          <!-- <el-button @click="resetForm">重置</el-button> -->
        </el-form-item>
      </wk-form-base>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
import data from './Data/blacklist'
export default {
  name: 'blacklist',
  data: () => ({
    data,
    // 编辑对话框是否显示
    editFormVisible: false,
    editTitle: true,
    editFormKey: 0
  }),
  mounted() {
    // 获取初始列表
    this.getData()
  },
  methods: {
    // 获取列表数据
    getData(obj) {
      if (obj) {
        this.filters = obj
      }
      // 请求参数
      const para = Object.assign({}, this.filters)
      // 调用组件获取数据
      this.$refs['wk-list'].query(this.$api.afterLoan.userBlackList, para, 'black_list')
    },
    // 删除用户详情
    handleDel(index, row) {
      // 请求参数
      const para = {
        user_id: row.user_id
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.afterLoan.userBlackDelete, para)
    },
    // 批量删除用户列表
    handleBatchDel(obj) {
      // 已选列表id
      const ids = obj.map(item => item.user_id).toString()
      // 请求参数
      const para = {
        user_id: ids
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.afterLoan.userBlackDelete, para, 'batch')
    },
    // 获取新增数据
    handleAdd() {
      data.editItem[0].plh = '请输入用户ID'
      data.editItem[0].disabled = false
      this.editFormKey = Date.parse(new Date()) / 1000
      this.editFormVisible = true
      this.editTitle = false
      this.$nextTick(() => {
        // 调用组件获取数据
        this.$refs['wk-edit'].patch(this.$api.afterLoan.userList)
      })
    },
    handleClose() {
      this.editFormVisible = false
    },
    // 获取编辑数据
    handleEdit(index, row) {
      data.editItem[0].plh = row.real_name
      data.editItem[0].disabled = true
      data.editRule.user_id[0].required = false
      this.editFormKey = Date.parse(new Date()) / 1000
      this.editFormVisible = true
      this.editTitle = true
      this.$nextTick(() => {
        // 请求参数
        const info = {
          black_id: row.black_id,
          black_desc: row.black_desc
        }
        // 调用组件获取数据
        this.$refs['wk-edit'].query(null, null, info)
      })
    },
    // 编辑保存用户详情
    editSave(obj) {
      this.editFormVisible = false
      // 判断编辑或添加接口
      const url = obj.black_id ? this.$api.afterLoan.userBlackEdit : this.$api.afterLoan.userBlackAdd
      // 添加请求参数
      const para = {
        black_desc: obj.black_desc
      }
      // 编辑请求参数
      if (obj.black_id) {
        para.black_id = obj.black_id
      } else {
        para.user_id = obj.user_id
      }
      // 调用组件提交数据
      this.$refs['wk-edit'].save(url, para)
    },
    // 获取下拉框
    getInfo(obj) {
      this.data.editItem[0].options = obj.user_list.map(item => {
        return {
          value: item.user_id,
          label: item.real_name + '（...' + item.user_idcard.substr(14, 18) + '）'
        }
      })
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-edit'].submit()
    }
  }
}
</script>

<style lang="scss" scoped>
#blacklist {}
</style>
