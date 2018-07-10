<template>
<div id="constant">
  <!-- 常量类型 -->
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
    <wk-table-base ref="wk-table" :columns="data.columns" @query="getData">
    </wk-table-base>
    <!-- 编辑&添加的弹窗 -->
    <el-dialog title="添加常量分类" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <wk-form-base :key="editFormKey" ref="wk-form" :form-item="data.editItem" :form-rule="data.editRule" @submit="editSave" @query="getData" style="width: 400px;">
        <el-form-item>
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </el-form-item>
      </wk-form-base>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
import data from './Data/constantType'
export default {
  name: 'constant-type',
  data: () => ({
    data,
    // 筛选关键字
    filters: {},
    // 弹窗的显示和关闭
    dialogFormVisible: false,
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
      this.$refs['wk-table'].query(this.$api.dataManage.consTypeList, para, 'constantType_list')
    },
    // 获取新增数据
    handleAdd() {
      this.dialogFormVisible = true
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 编辑保存用户详情
    editSave(obj) {
      this.dialogFormVisible = false
      // 判断编辑或添加接口
      const edit = this.$api.dataManage.consTypeAdd
      // 添加请求参数
      const para = {
        name: obj.name,
        type: obj.type
      }
      // 编辑请求参数
      if (obj.type_id) {
        para.type_id = obj.type_id
      }
      // 调用组件提交数据
      this.$refs['wk-form'].save(edit, para)
    },
    // 关闭对话框
    handleClose(done) {
      this.dialogFormVisible = false
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-form'].submit()
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-forms'].search()
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
</style>
<style lang="scss">
.consPage .toolbar {
    overflow: hidden;
}
</style>
