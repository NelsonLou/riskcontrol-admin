<template>
<div id="urge-assign">
  催收分配
  <!-- <el-tabs v-model="tabs.activeName" @tab-click="tabChange">
    <el-tab-pane label="待分配逾期客户" name="assigned"></el-tab-pane>
    <el-tab-pane label="已分配逾期客户" name="toBeAssigned"></el-tab-pane>
  </el-tabs>
  <el-card class="box-card"> -->
    <!--工具条-->
    <!-- <div slot="header" class="card-header">
      <el-form :model="filters" :inline="true" class="header-left" style="max-width:1550px">
        <el-form-item>
          <el-input v-model="filters.username" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.contractNO" placeholder="合同编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.idNO" placeholder="身份证"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.phoneNO" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" @click="getUrgeAssignList"></el-button>
        </el-form-item>
      </el-form>
      <el-button :loading="addLoading" @click="handleAdd" type="primary" icon="edit" class="header-right">手动分配</el-button>
    </div> -->

    <!-- 列表-分页 -->
    <!-- <wk-table-paging check-box :loading="listLoadingFir" :table-data="urgeAssigns" :columns="columns" :total-count="total" @selection-change="selsChange" @current-change="handleCurrentChange">
    </wk-table-paging> -->

    <!--编辑添加对话框-->
    <!-- <el-dialog title="分配催收员" :visible="editFormVisible" :before-close="handleClose" size="large">
      <el-form :model="filters" :inline="true" style="max-width:100%">
        <el-form-item label="选择部门：">
          <el-select v-model="selDepartment" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="selName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" @click="getODVsList">搜索</el-button>
        </el-form-item>
      </el-form>
      <div style="height:400px;overflow:auto">
        <el-table v-loading.body="listLoadingSec" :data="odvs" highlight-current-row>
          <el-table-column type="selection" width="50">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="160" sortable>
          </el-table-column>
          <el-table-column prop="cname" label="姓名" width="120" sortable>
          </el-table-column>
          <el-table-column prop="department" label="部门" min-width="100">
          </el-table-column>
          <el-table-column prop="phoneNO" label="电话" width="130">
          </el-table-column>
          <el-table-column prop="sex" label="性别" :formatter="formatSex" width="80">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  <!-- </el-card> -->
</div>
</template>

<script>
import moment from 'moment'
import * as api from '@/api'

export default {
  name: 'urge-assign',
  data: () => ({
    // 表格列数据
    columns: [{
        value: 'contractID',
        label: '合同ID',
        width: 120
      },
      {
        value: 'contractNO',
        label: '合同编号',
        minw: 150
      },
      {
        value: 'username',
        label: '客户姓名',
        width: 100
      },
      {
        value: 'idNO',
        label: '身份证号码',
        width: 190
      },
      {
        value: 'phoneNO',
        label: '手机号码',
        width: 130
      },
      {
        value: 'department',
        label: '分部',
        width: 150
      },
      {
        value: 'product',
        label: '产品',
        width: 100
      },
      {
        value: 'overdue',
        label: '逾期天数',
        width: 100
      },
      {
        value: 'overdueTotal',
        label: '总逾期天数',
        width: 110
      },
      {
        value: 'overdueFine',
        label: '总滞纳金(元)',
        width: 120
      },
      {
        value: 'oughtToRepay',
        label: '总应还金额(元)',
        width: 140
      },
      {
        value: 'isAssigned',
        label: '分配状态',
        width: 120,
        sortable: true,
        formatter: row => row.isAssigned === 1 ? '已分配' : '待分配'
      }
    ],
    options: [{
      value: '业务部',
      label: '业务部'
    }, {
      value: '小贷系统',
      label: '--小贷系统'
    }, {
      value: '华东区',
      label: '----华东区'
    }, {
      value: '宁波营业部',
      label: '------宁波营业部'
    }, {
      value: '催收组',
      label: '--------催收组'
    }, {
      value: '嘉兴营业部',
      label: '------嘉兴营业部'
    }, {
      value: '内勤',
      label: '--------内勤'
    }, {
      value: '台州营业部',
      label: '------台州营业部'
    }, {
      value: '内勤',
      label: '--------内勤'
    }],
    selDepartment: '',
    selName: '',
    // 标签页
    tabs: {
      activeName: 'assigned',
      isAssigned: 0
    },
    // 筛选关键字
    filters: {
      username: '',
      contractNO: '',
      idNO: '',
      phoneNO: ''
    },
    // 加载状态
    addLoading: false,
    listLoadingFir: false,
    listLoadingSec: false,
    // 列表
    urgeAssigns: [],
    total: 0,
    limit: api.config.limit,
    page: 1,
    // 催收员列表
    odvs: [],
    // 批量选中列表
    sels: [],
    // 编辑对话框是否显示
    editFormVisible: false,
    editTitle: true,
    submitLoading: false,
    // 编辑表单验证
    editFormRules: {
      name: [{
        required: true,
        message: '请输入姓名',
        trigger: 'blur'
      }, {
        min: 2,
        max: 10,
        message: '长度在 2 到 10 个字符',
        trigger: 'blur'
      }]
    },
    // 编辑表单数据
    editForm: {}
  }),
  mounted() {
    // this.getUrgeAssignList()
  },
  methods: {
    // 性别显示转换
    formatSex: row => {
      return row.sex === 1 ? '男' : '女'
    },
    // 标签页点击事件
    tabChange(tab, event) {
      // console.log(tab, event)
      this.tabs.isAssigned = tab.index
      console.log(this.tabs.isAssigned)
      this.getUrgeAssignList()
    },
    // 获取列表
    getUrgeAssignList() {
      this.listLoadingFir = true
      // 请求参数
      const para = {
        page: this.page,
        limit: this.limit,
        name: this.filters.username,
        isAssigned: this.tabs.isAssigned
      }
      console.log(api.afterLoan.getUrgeAssignList, para)
      this.axios.get(api.afterLoan.getUrgeAssignList, {
        params: para
      }).then(res => {
        this.listLoadingFir = false
        console.log('获取列表', res)
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          // 获取请求返回数据
          this.urgeAssigns = data.urgeAssigns
          this.total = data.total
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取催收员列表
    getODVsList() {
      this.listLoadingSec = true
      // 请求参数
      const para = {
        page: this.page,
        limit: this.limit,
        selDepartment: this.selDepartment,
        selName: this.selName
      }
      this.axios.get(api.afterLoan.getODVsList, {
        params: para
      }).then(res => {
        this.listLoadingSec = false
        this.editFormVisible = true
        console.log('获取催收员列表', res)
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          this.odvs = data.odvs
        } else {
          this.$message.error(msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 用户列表分页
    handleCurrentChange(page) {
      this.page = page
      this.getUrgeAssignList()
    },
    // 显示新增对话框
    handleAdd() {
      this.getODVsList()
      // this.editTitle = false
      // this.editForm = {
      //   name: '',
      //   sex: -1,
      //   age: '',
      //   birth: ''
      // }
    },
    // 显示编辑对话框
    handleEdit(index, row) {
      this.editFormVisible = true
      this.editTitle = true
      this.editForm = Object.assign({}, row)
    },
    // 关闭对话框
    handleClose() {
      this.editFormVisible = false
      this.selDepartment = ''
      this.selName = ''
    },
    // 编辑保存用户详情
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          let para = Object.assign({}, this.editForm)
          // 判断编辑或添加接口
          const edit = para.id ? api.setting.userEdit : api.setting.userAdd
          // 添加请求参数
          para = {
            name: para.name,
            sex: para.sex,
            age: para.age,
            birth: !para.birth ? '' : moment(para.birth).format('YYYY-MM-DD')
          }
          // 编辑请求参数
          if (this.editForm.id) {
            para.id = this.editForm.id
          }
          // post请求
          this.axios.post(edit, para).then(res => {
            this.submitLoading = false
            const {
              code,
              msg
            } = res.data
            if (code === 1) {
              this.$message.success(msg)
              this.handleClose()
              this.getUrgeAssignList()
            } else {
              this.$message.error(msg)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 批量选中列表
    selsChange(sels) {
      this.sels = sels
    }
  }
}
</script>
<style lang="scss" scoped>
#urge-assign {}
</style>
