<template>
<div id='role'>
  <el-card class="box-card">
    <!--工具条-->
    <div slot="header" class="card-header">
      <el-button @click="handleAdd" type="primary" icon="plus" class="header-left">添加</el-button>
    </div>

    <!-- 列表 -->
    <wk-table-base ref="wk-table" :columns="data.columns" @query="getData" check-box batch-remove @batch-remove="handleBatchDel">
      <el-table-column label="操作" width="250" fixed="right">
        <template scope="scope">
          <!-- 操作按钮 -->
          <el-button @click="handleEdit(scope.row, 1)" type="primary" size="small" icon="edit">编辑</el-button>
          <el-button @click="handleEdit(scope.row, 2)" type="primary" size="small" icon="setting">权限</el-button>
          <el-button @click="handleDel(scope.row)" type="danger" size="small" icon="delete">删除</el-button>
  			</template>
      </el-table-column>
    </wk-table-base>

    <!--编辑添加对话框-->
    <el-dialog :visible.sync="dialogVisible" :title="formType === 0 ? '添加角色' : formType === 1 ? '编辑角色' : '设置权限'" :size="dialogSize">
      <!-- 表单 角色 -->
      <div v-if="formType !== 2">
        <wk-form-base :key="editFormKey" ref="wk-form" :form-item="data.editItem" :form-rule="data.editRule" @submit="editSave" @query="getData" labelWidth="130px">
          <!-- 表单按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">确定</el-button>
          </el-form-item>
        </wk-form-base>
      </div>
      <!-- 表单 权限 -->
      <div v-else>
        <el-form v-loading.body="permissLoading" label-width="130px" style="max-width:100%">
          <el-checkbox-group v-model="hasPermissionList">
            <div v-for="(title,indexP) in permissionList" :key="title.id" class="selectGrp">
              <el-checkbox :label="title.id" :indeterminate="title.isIndeterminate" @change="checkedChange(title.name)" class="selectFir">{{title.display_name}}</el-checkbox>
              <div v-for="(setting,indexC) in title.child" :key="setting.id">
                <el-checkbox :label="setting.id" :indeterminate="setting.isIndeterminate" @change="checkedChange(setting.name)" class="selectSec">{{setting.display_name}}</el-checkbox>
                <div v-for="option in setting.child" :key="option.id" class="checkboxGroup" style="padding:0 0 0 95px">
                  <el-checkbox :label="option.id" :indeterminate="option.isIndeterminate" @change="checkedChange(option.name)" class="selectThi">{{option.display_name}}</el-checkbox>
                  <div class="methodGroup" style="padding:0 0 0 40px">
                    <el-checkbox v-for="method in option.child" :key="method.id" :label="method.id" @change="checkedChange(method.name)" class="selectFour">{{method.display_name}}</el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </el-checkbox-group>
          <el-form-item style="margin:20px 100px 0 0;text-align:center">
            <el-button @click="submitForm" :loading="submitLoading" type="primary">确 定</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
import data from './Data/Role'
export default {
  name: 'Role',
  data: () => ({
    data,
    // 筛选关键字
    filters: {},
    // 列表加载
    permissLoading: false,
    submitLoading: false,
    // 是否显示编辑对话框
    dialogVisible: false,
    dialogSize: 'small',
    formType: 0,
    editFormKey: 1,
    rowId: 0,
    // 编辑权限
    hasPermissionList: [],
    permissionList: []
  }),
  mounted() {
    this.getData()
  },
  methods: {
    // 获取角色列表
    getData(obj) {
      if (obj) {
        this.filters = obj
      }
      // 请求参数
      const para = Object.assign({}, this.filters)
      // 调用组件获取数据
      this.$refs['wk-table'].query(this.$api.setting.roleList, para, 'role_list')
    },
    // 打开角色添加
    handleAdd() {
      this.formType = 0
      this.dialogSize = 'small'
      this.dialogVisible = true
      this.editFormKey = Date.parse(new Date()) / 1000
    },
    // 打开角色关闭
    handleClose() {
      this.dialogVisible = false
    },
    // 打开编辑对话框
    handleEdit(row, type) {
      this.editFormKey = Date.parse(new Date()) / 1000
      this.rowId = row.id
      this.formType = type
      const para = {
        role_id: row.id
      }
      if (type === 1) {
        this.dialogSize = 'small'
        this.dialogVisible = true
        this.$nextTick(() => {
          // 调用组件获取数据
          this.$refs['wk-form'].query(this.$api.setting.roleDetail, para, 'role_info')
        })
      } else {
        this.dialogSize = 'large'
        this.dialogVisible = true
        this.permissLoading = true
        this.axios.get(this.$api.setting.permissionRoleDetail, {
          params: para
        }).then(res => {
          this.permissLoading = false
          if (res.data.code === 1) {
            let data = res.data.data
            this.hasPermissionList = data.has_permission_list
            this.permissionList = data.permission_list
            for (let i = 0; i < this.permissionList.length; i++) {
              this.$set(this.permissionList[i], 'isIndeterminate', false)
              let child = this.permissionList[i].child
              for (let j = 0; j < child.length; j++) {
                this.$set(child[j], 'isIndeterminate', false)
                let grandChild = child[j].child
                for (let k = 0; k < grandChild.length; k++) {
                  this.$set(grandChild[k], 'isIndeterminate', false)
                }
              }
            }
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    // 提交编辑
    submitForm() {
      var para = {}
      if (this.formType !== 2) {
        this.$refs['wk-form'].submit()
      } else {
        // 编辑权限
        this.submitLoading = true
        // 将不确定项的id添加到已选中id中
        var pList = this.permissionList
        var child = []
        var grandChild = []
        for (let i = 0; i < pList.length; i++) {
          child = pList[i].child
          if (pList[i].isIndeterminate === true) {
            this.hasPermissionList.push(pList[i].id)
          }
          for (let j = 0; j < child.length; j++) {
            grandChild = child[j].child
            if (child[j].isIndeterminate === true) {
              this.hasPermissionList.push(child[j].id)
            }
            for (let k = 0; k < grandChild.length; k++) {
              if (grandChild[k].isIndeterminate === true) {
                this.hasPermissionList.push(grandChild[k].id)
              }
            }
          }
        }
        const ids = this.hasPermissionList.map(item => item).toString()
        para = {
          role_id: this.rowId,
          permission_id: ids
        }
        this.axios.post(this.$api.setting.permissionRoleAdd, para).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.getData()
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(error => {
          console.log(error)
        }).then(() => {
          this.submitLoading = false
          this.dialogVisible = false
        })
      }
    },
    // 编辑保存角色
    editSave(obj) {
      this.dialogVisible = false
      // 判断编辑或添加接口
      const url = obj.id ? this.$api.setting.roleEdit : this.$api.setting.roleAdd
      // 添加请求参数
      const para = {
        name: obj.name,
        display_name: obj.display_name,
        description: obj.description
      }
      // 编辑请求参数
      if (obj.id) {
        para.role_id = obj.id
      }
      // 调用组件提交数据
      this.$refs['wk-form'].save(url, para)
    },
    // 重置表单
    // resetForm() {
    //   this.$refs['wk-form'].reset()
    // },
    // 删除角色
    handleDel(row) {
      // 请求参数
      const para = {
        role_id: row.id
      }
      // 调用组件删除数据
      this.$refs['wk-table'].delete(this.$api.setting.roleDelete, para)
    },
    // 批量删除
    handleBatchDel(obj) {
      // 已选列表id
      const ids = obj.map(item => item.id).toString()
      // 请求参数
      const para = {
        role_id: ids
      }
      // 调用组件删除数据
      this.$refs['wk-table'].delete(this.$api.setting.roleDelete, para, 'batch')
    },
    // 权限选择
    // 判断某个层级是否全选
    isCheckAll(cList) {
      let checked = this.hasPermissionList
      let exist = 0
      for (let i = 0; i < cList.length; i++) {
        for (let j = 0; j < checked.length; j++) {
          if (cList[i].id === checked[j]) {
            exist++
          }
        }
      }
      if (exist === cList.length) {
        return true
      }
      return false
    },
    // 判断某个层级是否部分被选中
    isCheckSome(cList) {
      let checked = this.hasPermissionList
      for (let i = 0; i < cList.length; i++) {
        for (let j = 0; j < checked.length; j++) {
          if (cList[i].id === checked[j]) {
            return true
          }
        }
      }
      return false
    },
    // 判断某个层级是否部分不确定
    isIndetSome(cList) {
      for (let i = 0; i < cList.length; i++) {
        if (cList[i].isIndeterminate === true) {
          return true
        }
      }
      return false
    },
    // 判断某项是否被选中
    isChecked(opt) {
      let checked = this.hasPermissionList
      for (let i = 0; i < checked.length; i++) {
        if (opt === checked[i]) {
          return true
        }
      }
      return false
    },
    // 选中全部
    checkAll(cList) {
      let checked = this.hasPermissionList
      let exist = false
      for (let i = 0; i < cList.length; i++) {
        exist = false
        for (let j = 0; j < checked.length; j++) {
          if (cList[i].id === checked[j]) {
            exist = true
          }
        }
        if (!exist) {
          checked.push(cList[i].id)
        }
      }
    },
    // 取消全选
    cancelAll(cList) {
      let checked = this.hasPermissionList
      for (let i = 0; i < cList.length; i++) {
        for (let j = 0; j < checked.length; j++) {
          if (cList[i].id === checked[j]) {
            checked.splice(j, 1)
            break
          }
        }
      }
    },
    // 选中父类
    checkParent(opt) {
      let checked = this.hasPermissionList
      let exist = false
      for (let i = 0; i < checked.length; i++) {
        if (opt === checked[i]) {
          exist = true
        }
      }
      if (!exist) {
        checked.push(opt)
      }
    },
    // 取消父类选中
    cancleParent(opt) {
      let checked = this.hasPermissionList
      for (let i = 0; i < checked.length; i++) {
        if (opt === checked[i]) {
          checked.splice(i, 1)
          break
        }
      }
    },
    // 权限 四级多选逻辑
    checkedChange(name) {
      var pList = this.permissionList
      var child = []
      var grandChild = []
      var optionChild = []
      // 第一级
      for (let i = 0; i < pList.length; i++) {
        child = pList[i].child
        if (pList[i].name === name) {
          pList[i].isIndeterminate = false
          if (this.isChecked(pList[i].id)) {
            this.checkAll(child)
            for (let k = 0; k < child.length; k++) {
              child[k].isIndeterminate = false
              this.checkAll(child[k].child)
              let optChild = child[k].child
              for (let op = 0; op < optChild.length; op++) {
                optChild[op].isIndeterminate = false
                this.checkAll(optChild[op].child)
              }
            }
          } else {
            this.cancelAll(child)
            for (let k = 0; k < child.length; k++) {
              this.cancelAll(child[k].child)
              let optChild = child[k].child
              for (let op = 0; op < optChild.length; op++) {
                this.cancelAll(optChild[op].child)
              }
            }
          }
          break
        }
        // 第二级
        for (let j = 0; j < child.length; j++) {
          grandChild = child[j].child
          if (child[j].name === name) {
            pList[i].isIndeterminate = false
            child[j].isIndeterminate = false
            if (this.isChecked(child[j].id)) {
              this.checkAll(grandChild)
              for (let op = 0; op < grandChild.length; op++) {
                this.checkAll(grandChild[op].child)
              }
            } else {
              this.cancelAll(grandChild)
              for (let op = 0; op < grandChild.length; op++) {
                this.cancelAll(grandChild[op].child)
              }
            }
            if (this.isCheckAll(child)) {
              this.checkParent(pList[i].id)
            } else {
              this.cancleParent(pList[i].id)
              if (this.isCheckSome(child) || this.isIndetSome(child)) {
                pList[i].isIndeterminate = true
              }
            }
            break
          }
          // 第三级
          for (let n = 0; n < grandChild.length; n++) {
            optionChild = grandChild[n].child
            if (grandChild[n].name === name) {
              pList[i].isIndeterminate = false
              child[j].isIndeterminate = false
              grandChild[n].isIndeterminate = false
              if (this.isChecked(grandChild[n].id)) {
                this.checkAll(optionChild)
              } else {
                this.cancelAll(optionChild)
              }
              if (this.isCheckAll(grandChild)) {
                pList[i].isIndeterminate = true
                this.checkParent(child[j].id)
              } else {
                this.cancleParent(child[j].id)
                if (this.isCheckSome(grandChild) || this.isIndetSome(grandChild)) {
                  pList[i].isIndeterminate = true
                  child[j].isIndeterminate = true
                } else if (this.isCheckSome(child) || this.isIndetSome(child)) {
                  pList[i].isIndeterminate = true
                }
              }
              if (this.isCheckAll(child)) {
                pList[i].isIndeterminate = false
                this.checkParent(pList[i].id)
              } else {
                this.cancleParent(pList[i].id)
              }
              break
            }
            // 第四级
            for (var m = 0; m < optionChild.length; m++) {
              if (optionChild[m].name === name) {
                pList[i].isIndeterminate = false
                child[j].isIndeterminate = false
                grandChild[n].isIndeterminate = false
                if (this.isCheckAll(optionChild)) {
                  this.checkParent(grandChild[n].id)
                  pList[i].isIndeterminate = true
                  child[j].isIndeterminate = true
                } else {
                  this.cancleParent(grandChild[n].id)
                  if (this.isCheckSome(optionChild)) {
                    pList[i].isIndeterminate = true
                    child[j].isIndeterminate = true
                    grandChild[n].isIndeterminate = true
                  } else if (this.isCheckSome(grandChild) || this.isIndetSome(grandChild)) {
                    pList[i].isIndeterminate = true
                    child[j].isIndeterminate = true
                  }
                }
                if (this.isCheckAll(grandChild)) {
                  child[j].isIndeterminate = false
                  this.checkParent(child[j].id)
                } else {
                  this.cancleParent(child[j].id)
                }
                if (this.isCheckAll(child)) {
                  pList[i].isIndeterminate = false
                  this.checkParent(pList[i].id)
                } else {
                  this.cancleParent(pList[i].id)
                }
                break
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
#role {
    .selectGrp {
        border-top: solid 1px #eee;
        padding: 20px 0;
    }
    .selectFir {
        margin: 10px 0 0 15px;
        font-weight: 800;
    }
    .selectFir span:nth-of-type(2) {
        font-size: 18px;
    }
    .selectSec {
        margin: 10px 0;
        padding-left: 55px;
        font-weight: 800;
        font-size: 18px;
    }
    .selectSec span:nth-of-type(2) {
        font-size: 15px;
    }
    .selectThi {
        width: 163px;
        margin: 0 0 10px;
    }
    .selectFour {
        width: 140px;
        margin: 0 0 10px;
    }
}
</style>
