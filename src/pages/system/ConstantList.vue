<template>
<div id="constant">
  <!-- 常量管理 -->
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-forms" :form-item="data.searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
        <!-- 添加按钮 -->
        <el-button @click="handleAdd" icon="plus" type="primary" class="header-right">添加信息</el-button>
      </wk-form-base>
    </div>
    <!-- 列表 -->
    <wk-table-base ref="wk-list" :columns="data.columns" @query="getData">
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  				<el-button @click="handleDel(scope.$index, scope.row)" size="small" icon="delete" type="danger">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>
    <!--编辑添加对话框-->
    <el-dialog :visible.sync="dialogFormVisible" :title="formType ? '添加信息模板' : '编辑信息模板'" :before-close="handleClose">
      <wk-form-base :key="editFormKey" ref="wk-edit" :form-item="data.editItem" :form-rule="data.editRule" @submit="editSave" @query="getData">
        <!-- 表单按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </el-form-item>
      </wk-form-base>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
import data from './Data/constantList'
export default {
  name: 'constant-list',
  data: () => ({
    data,
    // 筛选关键字
    filters: {},
    // 弹窗的显示和关闭
    dialogFormVisible: false,
    // 表单类型
    formType: true,
    // 表单验证重置
    editFormKey: 1
  }),
  mounted() {
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
      this.$refs['wk-list'].query(this.$api.dataManage.consList, para, 'constant_list')
    },
    // 获取新增数据
    handleAdd() {
      this.dialogFormVisible = true
      this.formType = true
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 获取编辑数据
    handleEdit(row) {
      this.dialogFormVisible = true
      this.formType = false
      this.$nextTick(() => {
        // 请求参数
        const para = {
          constant_id: row.constant_id
        }
        // 调用组件获取数据
        this.$refs['wk-edit'].query(this.$api.dataManage.consDetail, para, 'constant_info')
      })
    },
    // 编辑保存用户详情
    editSave(obj) {
      this.dialogFormVisible = false
      // 判断编辑或添加接口
      const edit = obj.constant_id ? this.$api.dataManage.consEdit : this.$api.dataManage.consAdd
      // 添加请求参数
      const para = {
        type: obj.type,
        constant_key: obj.constant_key,
        constant_key_name: obj.constant_key_name,
        constant_val: obj.constant_val
      }
      // 编辑请求参数
      if (obj.constant_id) {
        para.constant_id = obj.constant_id
      }
      // 调用组件提交数据
      this.$refs['wk-edit'].save(edit, para)
    },
    // 删除方法
    handleDel(index, row) {
      // 请求参数
      const para = {
        constant_id: row.constant_id
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.dataManage.consDel, para)
    },
    // 关闭对话框
    handleClose(done) {
      this.dialogFormVisible = false
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-forms'].search()
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-edit'].submit()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-table {
    color: #48576a;
}
.adClass_add {
    float: right;
}
.el-pagination {
    padding: 0;
}
.adClass_serch {
    width: 239px;
    float: left;
}
.adTypeForm {
    width: 500px;
}
.toolBtn {
    overflow: hidden;
    border-bottom: 1px solid #f8f8f8;
    padding: 16px 20px;
    background: #fff;
}
.applyTea {
    width: 320px;
}
</style>
<style lang="scss">
.consPage .toolbar {
    overflow: hidden;
}
</style>
