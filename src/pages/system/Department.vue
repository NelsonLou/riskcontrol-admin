z<template>
<div id="department">
  <el-card>
    <!--工具条-->
    <div slot="header" class="card-header">
      <el-button @click="handleAdd(addOBJ.id, addOBJ.name, addOBJ.level)" icon="plus" type="primary" class="header-left">添加</el-button>
      <el-input class="header-left treeSearch" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    </div>
    <!-- 列表 -->
    <div>
      <el-tree
        check-strictly
        show-checkbox
        accordion
        @check-change='selsChange()'
        ref="tree"
        :data='listData'
        :props="defaultProps"
        node-key="dept_id"
        :default-expanded-keys='openKey'
        :expand-on-click-node="false"
        :render-content="renderContent"
        v-loading='listLoading'
        :filter-node-method="filterNode"
        highlight-current>
      </el-tree>
    </div>
    <!-- 详情 -->
    <el-dialog @close='handleCancel()' :title="title" :visible.sync='infoDialog'>
      <el-form :key='editFormKey' :model='postForm' label-width="100px" >
        <el-form-item v-if="!isAdd" label="部门序号：">
          <span>{{postForm.dept_id}}</span>
        </el-form-item>
        <el-form-item label="部门名称:">
          <span>{{postForm.dept_name}}</span>
        </el-form-item>
        <el-form-item label="父级:">
          <span>{{postForm.pid_name}}</span>
        </el-form-item>
        <el-form-item label="部门等级:">
          <span>第{{postForm.level}}级</span>
        </el-form-item>
        <el-form-item label="创建时间:">
          <span>{{postForm.created_at}}</span>
        </el-form-item>
        <el-form-item label="更新时间:">
          <span>{{postForm.updated_at}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 弹出框 -->
    <el-dialog @close='handleCancel()' :title="title" :visible.sync='formDialog'>
      <el-form :key='editFormKey' :model='postForm' label-width="100px" :rules='formRules' ref='postForm'>
        <el-form-item v-if="!isAdd" label="部门序号：">
          <span>{{postForm.dept_id}}</span>
        </el-form-item>
        <el-form-item label="部门名称:" prop='dept_name'>
          <el-input v-model='postForm.dept_name'></el-input>
        </el-form-item>
        <el-form-item v-if='isAdd' label="父级:">
          <span>{{postForm.pid_name}}</span>
        </el-form-item>
        <el-form-item v-if="!isInfo">
          <el-button type="primary" @click="handlePost">确 定</el-button>
          <el-button type="primary" @click="handleCancel">返 回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div>
      <hr>
      <el-button :disabled="sels.length === 0" @click="resetChecked" type="primary" class="header-left">取消选择</el-button>
      <el-button :disabled="sels.length === 0" @click="batchRemove" icon="delete" type="danger" class="header-left">批量删除</el-button>
    </div>
  </el-card>
</div>
</template>
<script>
export default {
  name: 'department',
  data: () => ({
    openKey: [],
    filterText: '',
    addOBJ: {
      id: 0,
      name: '顶级权限',
      level: 0
    },
    title: '',
    defaultProps: { // tree控件数据结构判断
      children: 'children',
      label: 'dept_name'
    },
    editFormKey: 0, // 表单Key
    sels: [], // 多选删除
    listLoading: false, // 数据-缓冲
    isInfo: false,
    isAdd: false, // 判断添加
    isEdit: false, // 判断编辑
    formDialog: false, // 表单弹窗
    infoDialog: false, // 详情弹窗
    listData: [], // 数据列表
    postForm: { // 编辑form表单
      dept_id: '',
      dept_name: '',
      pid_name: '',
      pid: '',
      level: '',
      created_at: '',
      updated_at: ''
    },
    cleanForm: { // 清除form表单
      dept_id: '',
      dept_name: '',
      pid_name: '',
      pid: '',
      level: '',
      created_at: '',
      updated_at: ''
    },
    formRules: { // 表单验证
      dept_name: [{
        required: true,
        message: '请输部门名称',
        trigger: 'blur'
      }, {
        min: 2,
        max: 20,
        message: '长度在 2 到 20 个字符',
        trigger: 'blur'
      }]
    }
  }),
  mounted() {
    const pid = 0
    this.getListData(pid)
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 树形搜索
    filterNode(value, data) {
      if (!value) return true
      return data.dept_name.indexOf(value) !== -1
    },
    // 动态添加功能按钮
    renderContent(createElement, {
      node,
      data,
      store
    }) {
      var that = this
      return createElement('span', [
        createElement('span', node.label),
        createElement('span', {
          attrs: {
            style: 'color:#20a0ff;margin-left:10px;font-size:14px'
          },
          on: {
            click() {
              that.handleEdit(data, store)
            }
          }
        }, '编辑'),
        createElement('span', {
          attrs: {
            style: 'color:#20a0ff;margin-left:10px;font-size:14px'
          },
          on: {
            click() {
              that.handleInfo(data)
            }
          }
        }, '详情'),
        createElement('span', {
          attrs: {
            style: 'color:#20a0ff;margin-left:10px;font-size:14px'
          },
          on: {
            click() {
              that.handleDelete(data.dept_id, data.pid)
            }
          }
        }, '删除'),
        createElement('span', {
          attrs: {
            style: 'color:#20a0ff;margin-left:10px;font-size:14px'
          },
          on: {
            click() {
              that.handleAdd(data.dept_id, data.dept_name, data.level)
            }
          }
        }, '添加')
      ])
    },
    getListData(pid) { // 获取数据
      this.listLoading = true
      this.axios.get(this.$api.setting.DList).then(res => {
        const list = res.data
        if (list.code === 1) {
          this.listData = list.data.smsTemplate_list
        } else {
          this.$message.error(list.msg)
        }
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.listLoading = false
      })
    },
    getDetal(id) { // 详细
      this.listLoading = true
      const para = {
        dept_id: id
      }
      this.axios.get(this.$api.setting.DDetail, {
        params: para
      }).then(res => {
        const list = res.data
        if (list.code === 1) {
          this.postForm = list.data.departmentDetail_info
          if (this.isInfo) {
            this.infoDialog = true
          } else {
            this.formDialog = true
          }
        } else {
          this.$message.error(list.msg)
        }
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.listLoading = false
      })
    },
    handleInfo(id) { // 详情
      this.isEdit = false
      this.isAdd = false
      this.title = '部门详情'
      this.isInfo = true
      this.getDetal(id.dept_id)
    },
    handleEdit(id) { // 编辑
      this.isAdd = false
      this.isInfo = false
      this.editFormKey = Date.parse(new Date()) / 1000
      this.title = '部门编辑'
      this.isEdit = true
      this.openKey[0] = id.pid
      this.getDetal(id.dept_id)
    },
    handleAdd(id, name, level) { // 添加
      this.isEdit = false
      this.isInfo = false
      this.editFormKey = Date.parse(new Date()) / 1000
      this.title = '部门添加'
      this.postForm.pid = id
      this.postForm.pid_name = name
      this.postForm.level = level + 1
      this.openKey[1] = id
      this.formDialog = true
      this.isAdd = true
    },
    handlePost() { // 表单传输（添加/编辑）
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (!this.isAdd) {
            this.axios.post(this.$api.setting.DEdit, {
              dept_id: this.postForm.dept_id,
              dept_name: this.postForm.dept_name,
              pid: this.postForm.pid,
              level: this.postForm.level
            }).then(res => {
              const list = res.data
              if (list.code === 1) {
                this.handleCancel()
                this.$message.success(list.msg)
              } else {
                this.$message.error(list.msg)
              }
            }).catch(error => {
              console.log(error)
            }).then(() => {
              this.getListData(0)
            })
          } else {
            const para = {
              dept_name: this.postForm.dept_name,
              pid: this.postForm.pid,
              level: this.postForm.level
            }
            this.axios.post(this.$api.setting.DAdd, para).then(res => {
              const list = res.data
              if (list.code === 1) {
                this.handleCancel()
                this.$message.success(list.msg)
              } else {
                this.$message.error(list.msg)
              }
            }).catch(error => {
              console.log(error)
            }).then(() => {
              this.getListData(0)
            })
          }
        }
      })
    },
    handleDelete(id) { // 删除
      let type = typeof id
      let para = []
      if (type === 'number') {
        para[0] = id
      } else {
        para = id
      }
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        const paras = {
          dept_id: para
        }
        this.axios.post(this.$api.setting.DDelete, paras).then(res => {
          const list = res.data
          if (list.code === 1) {
            this.$message.success(list.msg)
          } else {
            this.$message.error(list.msg)
          }
        }).catch(error => {
          console.log(error)
        }).then(() => {
          this.sels = []
          this.getListData(0)
        })
      }).catch(() => {})
    },
    selsChange() {
      this.sels = this.$refs.tree.getCheckedNodes()
    },
    batchRemove() { // 批量删除
      var x = []
      for (let i = 0; i < this.sels.length; i++) {
        x[i] = this.sels[i].dept_id
      }
      this.handleDelete(x)
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    }, // 重置批量选择
    handleCancel() {
      this.editFormKey = Date.parse(new Date()) / 1000
      this.postForm = Object.assign({}, this.cleanForm)
      this.infoDialog = false
      this.formDialog = false
    } // 表单重置
  }
}
</script>
<style lang="scss" scoped>
#department {}
.el-tree {
    border: none;
}
.treeSearch {
    width: 200px;
    margin-left: 20px;
    margin-right: 20px;
}
hr {
    height: 1px;
    border: none;
    border-top: 1px solid #F7F7F7;
}
</style>
