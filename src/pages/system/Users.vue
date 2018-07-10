<template>
<div id="users">
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-search" :form-item="data.searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
        <el-button @click="handleAdd" icon="plus" type="primary" class="header-right">添加</el-button>
      </wk-form-base>
    </div>

    <!-- 列表 -->
    <wk-table-base ref="wk-list" :columns="data.columns" @query="getData" check-box batch-remove @batch-remove="handleBatchDel">
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <!-- 操作按钮 -->
  				<el-button @click="handleEdit(scope.$index, scope.row)" size="small" icon="edit" type="primary">编辑</el-button>
  				<el-button @click="handleDel(scope.$index, scope.row)" size="small" icon="delete" type="danger">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>

    <!--编辑添加对话框-->
    <el-dialog :visible.sync="editFormVisible" :title="editTitle ? '编辑用户' : '添加用户'">
      <wk-form-base :key="editFormKey" ref="wk-edit" :form-item="data.editItem" :form-rule="data.editRule" @submit="editSave" @query="getData" @patch="getInfo">
        <!-- 表单按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <!-- <el-button @click="resetForm">重置</el-button> -->
        </el-form-item>
      </wk-form-base>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
import data from './Data/users'
export default {
  name: 'users',
  data: () => ({
    data,
    // 筛选关键字
    filters: {},
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
      this.$refs['wk-list'].query(this.$api.setting.users, para, 'admin_list')
    },
    // 删除用户详情
    handleDel(index, row) {
      // 请求参数
      const para = {
        admin_id: row.admin_id
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.setting.userDel, para)
    },
    // 批量删除用户列表
    handleBatchDel(obj) {
      // 已选列表id
      const ids = obj.map(item => item.admin_id).toString()
      // 请求参数
      const para = {
        admin_id: ids
      }
      // 调用组件删除数据
      this.$refs['wk-list'].delete(this.$api.setting.userBatchRemove, para, 'batch')
    },
    // 获取新增数据
    handleAdd() {
      this.dialogVisible()
      this.editTitle = false
      this.$nextTick(() => {
        // 调用组件获取数据
        this.$refs['wk-edit'].patch(this.$api.setting.roleDeptList)
      })
    },
    dialogVisible() {
      this.editFormVisible = true
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 获取补充数据
    getInfo(obj) {
      // 角色列表
      this.data.editItem[0].options = obj.role_list.map(item => {
        return {
          value: item.id,
          label: item.display_name
        }
      })
      // 部门列表
      this.data.editItem[1].options = obj.dept_list.map(item => {
        return {
          value: item.dept_id,
          label: item.dept_name
        }
      })
      // 性别
      obj.admin_sex = obj.admin_sex.toString()
      // 新增数据
      this.$refs['wk-edit'].merge(obj)
    },
    // 获取编辑数据
    handleEdit(index, row) {
      this.dialogVisible()
      this.editTitle = true
      this.$nextTick(() => {
        // 请求参数
        const para = {
          admin_id: row.admin_id
        }
        // 调用组件获取数据
        this.$refs['wk-edit'].query(this.$api.setting.userInfo, para, 'admin_info', 'patch')
      })
    },
    // 编辑保存用户详情
    editSave(obj) {
      this.editFormVisible = false
      // 判断编辑或添加接口
      const edit = obj.admin_id ? this.$api.setting.userEdit : this.$api.setting.userAdd
      // 已选角色id
      const ids = obj.has_role_list.map(item => item).toString()
      // 添加请求参数
      const para = {
        role_id: ids,
        dept_id: obj.dept_id,
        admin_name: obj.admin_name,
        admin_sex: obj.admin_sex,
        admin_nick: obj.admin_nick,
        admin_birthday: !obj.admin_birthday ? '' : this.$moment(obj.admin_birthday).format('YYYY-MM-DD'),
        admin_password: obj.admin_password || ''
      }
      // 编辑请求参数
      if (obj.admin_id) {
        para.admin_id = obj.admin_id
      }
      // 调用组件提交数据
      this.$refs['wk-edit'].save(edit, para)
    },
    // 提交表单
    submitForm() {
      this.$refs['wk-edit'].submit()
    },
    // 重置表单
    // resetForm() {
    //   this.$refs['wk-edit'].reset()
    // },
    // 搜索表单
    searchForm() {
      this.$refs['wk-search'].search()
    }
  }
}
</script>
