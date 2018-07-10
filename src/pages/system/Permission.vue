<template>
<div class='permission'>
  <el-card>
    <div slot="header" class="card-header">
      <!-- 列表搜素 -->
      <el-input class="treeSearch" placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <el-button icon='plus' @click="handleAdd(addOBJ.id, addOBJ.level, addOBJ.name)" type="primary" class="header-left" onloadedmetadata="">添加</el-button>
    </div>
    <!-- 详情-->
    <el-tree :default-expanded-keys='openKey' :expand-on-click-node='false' :filter-node-method="filterNode" ref="tree" accordion :data='permissionList' :props="defaultProps" node-key="id" :render-content="renderContent" v-loading='loading' :highlight-current='myOBJ'>
    </el-tree>
    <el-dialog @close='cancel()' title='权限详情' :visible.sync='infoDialog'>
      <el-form :key='editFormKey' :model="formData" v-loading='loading' label-width="100px">
        <el-form-item label="标识名称:">
          <span>{{formData.name}}</span>
        </el-form-item>
        <el-form-item label="显示名称:">
          <span>{{formData.display_name}}</span>
        </el-form-item>
        <el-form-item label="所属权限组:">
          <span>{{formData.pname}}</span>
        </el-form-item>
        <el-form-item label="描述:">
          <span>{{formData.description}}</span>
        </el-form-item>
        <el-form-item v-if='formData.level!==4' label="是否显示:" prop='show'>
          <span>{{changeshow}}</span>
        </el-form-item>
        <el-form-item v-if='formData.level!==4' label="路径:" prop='path'>
          <span>{{formData.path}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog @close='cancel()' :title='title' :visible.sync='formDialog'>
      <el-form :key='editFormKey' ref="formData" :rules='formRules' :model="formData" v-loading='loading' label-width="100px">
        <el-form-item v-if='isAdd' label="所属权限组:">
          <span>{{formData.pname}}</span>
        </el-form-item>
        <el-form-item label="标识名称:" prop='name'>
          <el-input v-model='formData.name'></el-input>
        </el-form-item>
        <el-form-item label="显示名称:" prop='display_name'>
          <el-input v-model='formData.display_name'></el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input v-model='formData.description'></el-input>
        </el-form-item>
        <el-form-item v-if='formData.level!==4' label="是否显示:">
          <el-switch v-model="formData.show" on-value='1' off-value='0' on-text="是" off-text="否"></el-switch>
        </el-form-item>
        <el-form-item v-if='formData.level!==4' label="路径:">
          <el-input type="text" style="width: 320px" v-model='formData.path'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePost()">确 定</el-button>
          <el-button v-if='!isInfo' @click="cancel()" style="margin-left: 20px">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</div>
</template>
<script>
export default {
  name: 'permission',
  data: () => ({
    pname: '',
    addOBJ: {
      id: 0,
      level: 0,
      name: '顶级权限'
    },
    openKey: [],
    filterText: '',
    editFormKey: 0,
    permissionList: [], // 权限数据
    myOBJ: true,
    title: '', // 弹窗title
    loading: false, // 数据缓冲
    infoDialog: false, // 详情弹窗
    formDialog: false, // 添加弹窗
    isEdit: false, // 判断修改
    isInfo: false, // 判断详情
    isAdd: false, // 判断添加
    defaultProps: { // tree控件数据结构判断
      children: 'child',
      label: 'display_name'
    },
    formData: { // 添加用-传输
      pid: '',
      name: '',
      pname: '',
      display_name: '',
      description: '',
      level: '',
      show: '',
      path: ''
    },
    cleanForm: { // 清除用
      pid: '',
      name: '',
      pname: '',
      display_name: '',
      description: '',
      level: '',
      show: '',
      path: ''
    },
    formRules: { // 修改 表单验证
      name: [{
        required: true,
        message: '请输入权限名称',
        trigger: 'blur'
      }, {
        min: 2,
        max: 20,
        message: '长度在 2 到 20 个字符',
        trigger: 'blur'
      }],
      display_name: [{
        required: true,
        message: '请输入显示名称',
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
    this.getPermissionList(0)
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.display_name.indexOf(value) !== -1
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
            style: 'margin-left: 10px;font-size: 14px;color: #4db3ff;border: none;'
          },
          on: {
            click() {
              that.handleEdit(data)
            }
          }
        }, '编辑'),
        createElement('span', {
          attrs: {
            class: 'xx',
            style: 'margin-left: 10px;font-size: 14px;color: #4db3ff;'
          },
          on: {
            click() {
              that.handleInfo(data)
            }
          }
        }, '详情'),
        createElement('span', {
          attrs: {
            style: node.level === 4 ? 'margin-left: 10px;font-size: 14px;color: #4db3ff;display:none' : 'margin-left: 11px;font-size: 14px;color: #4db3ff;'
          },
          on: {
            click() {
              that.handleAdd(data.id, data.level, data.display_name)
            }
          }
        }, '添加')
      ])
    },
    // 获取列表
    getPermissionList() {
      this.loading = true
      this.axios.get(this.$api.setting.pList).then(res => {
        let list = res.data
        if (list.code === 1) {
          this.permissionList = list.data.permission_list
        } else {
          console.log('查询失败')
        }
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.loading = false
      })
    },
    // 获取权限详细信息
    getPermissionInfo(id) {
      this.loading = true
      this.axios.get(this.$api.setting.pDetail, {
        params: {
          permission_id: id
        }
      }).then(res => {
        let list = res.data
        if (list.code === 1) {
          this.formData = list.data.permission_info
          this.formData.show = this.formData.show.toString()
          if (this.isInfo) {
            this.infoDialog = true
          } else {
            this.formDialog = true
          }
        } else {
          console.log('查询失败')
        }
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.loading = false
      })
    },
    // 编辑
    handleEdit(data) {
      this.isAdd = false
      this.isInfo = false
      this.title = '权限编辑'
      this.isEdit = true
      this.openKey[0] = data.pid
      this.getPermissionInfo(data.id)
    },
    // 详请
    handleInfo(data) {
      this.isAdd = false
      this.isEdit = false
      this.title = '权限详情'
      this.isInfo = true
      this.getPermissionInfo(data.id)
    },
    // 添加
    handleAdd(id, level, name) {
      this.isEdit = false
      this.isInfo = false
      this.formData.pid = id
      this.formData.pname = name
      this.formData.level = level + 1
      this.openKey[0] = id
      this.formDialog = true
      this.title = '权限添加'
      this.isAdd = true
    },
    // 添加传输
    handlePostAdd() {
      if (this.formData.show === '') {
        this.formData.show === '0'
      }
      this.$refs.formData.validate(valid => {
        if (valid) {
          const para = {
            name: this.formData.name,
            display_name: this.formData.display_name,
            description: this.formData.description,
            pid: this.formData.pid,
            level: this.formData.level,
            show: this.formData.show,
            path: this.formData.path
          }
          this.axios.post(this.$api.setting.pAdd, para).then(res => {
            let list = res.data
            if (list.code === 1) {
              this.$message.success(list.msg) // 成功弹窗
              this.getPermissionList() // 刷新权限列表
            } else {
              this.$message.error(list.msg)
            }
          }).catch(error => {
            console.log(error)
          }).then(() => {
            this.cancel()
          })
        }
      })
    },
    // 修改传输
    handlePostEdit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          const para = {
            permission_id: this.formData.id,
            name: this.formData.name,
            display_name: this.formData.display_name,
            description: this.formData.description,
            pid: this.formData.pid,
            level: this.formData.level,
            show: this.formData.show,
            path: this.formData.path
          }
          this.axios.post(this.$api.setting.pEdit, para).then(res => {
            let list = res.data
            if (list.code === 1) {
              this.getPermissionList()
              this.$message.success(list.msg)
            } else {
              this.$message.error(list.msg)
            }
          }).catch(error => {
            console.log(error)
          }).then(() => {
            this.cancel()
          })
        }
      })
    },
    handlePost() {
      if (this.isAdd) {
        this.handlePostAdd()
      } else {
        this.handlePostEdit()
      }
    },
    // 关闭
    cancel() {
      this.formDialog = false
      this.infoDalog = false
      this.editFormKey = Date.parse(new Date()) / 1000
      this.formData = Object.assign({}, this.cleanForm)
    }
  },
  computed: {
    changeshow() {
      return this.formData.show === '1' ? '是' : this.formData.show === '0' ? '否' : '未知'
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tree {
    border: none;
}
.treeSearch {
    width: 200px;
    margin-left: 20px;
}
</style>
