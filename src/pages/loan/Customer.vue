<template>
  <div id="customer">
    <el-card class="box-card">
      <!--工具条-->
      <div slot="header" class="card-header">
         <el-button v-if="!isE" type="primary" @click="handleClose">返回</el-button>
         <div v-if="isE">
           <el-form :model="filters" :inline="true" class="header-left">
          <el-form-item>
            <el-input :icon = icon :on-icon-click='clear' v-model="filters.keyword" @keyup.enter.native="getUsers" placeholder="请输入手机号码">
             
            </el-input>
              </el-form-item><el-form-item> 
            <el-button icon="search" @click="getUsers" type="primary">查询</el-button>
          </el-form-item>
           
        </el-form>
         </div>
        
      </div>
  
      <!--列表-->
      <wk-table v-show="isE" ref="tableList" :loading="listLoading" :columns="columns"  @click="getUsers">
        <el-table-column fixed="right" label="操作" width="80">
          <template scope="scope">
            <el-button type="primary" @click="handleDetails(scope.$index, scope.row)" size="small">查看</el-button>
          </template>
        </el-table-column>
      </wk-table>
  
      <!--查看显示对话框  -->
      <div v-show="isW" >
        <table class="tableBorder">
          <tr>
            <td>姓名:</td>
            <td>{{detailsForm.real_name}}</td>
          </tr>
          <tr>
            <td>电话号码:</td>
            <td>{{detailsForm.user_mobile}}</td>
          </tr>
          <tr>
            <td>身份证号码:</td>
            <td>{{detailsForm.user_idcard}}</td>
          </tr>
          <tr>
            <td>学历:</td>
            <td>{{detailsForm.user_education}}</td>
          </tr>
          <tr>
            <td>职业:</td>
            <td>{{detailsForm.user_profession}}</td>
          </tr>
          <tr>
            <td>公司:</td>
            <td>{{detailsForm.user_company}}</td>
          </tr>
          <tr>
            <td>收入:</td>
            <td>{{detailsForm.user_income}}</td>
          </tr>
          <tr>
            <td>qq:</td>
            <td>{{detailsForm.user_qq}}</td>
          </tr>
          <tr>
            <td>电子邮箱:</td>
            <td>{{detailsForm.user_email}}</td>
          </tr>
          <tr>
            <td>常用联系人:</td>
            <td>{{detailsForm.link_man}}</td>
          </tr>
          <tr>
            <td>联系人手机号:</td>
            <td>{{detailsForm.link_mobile}}</td>
          </tr>
          <tr>
            <td>与联系人关系:</td>
            <td>{{detailsForm.link_relation}}</td>
          </tr>
          <tr>
            <td>白条额度:</td>
            <td>{{detailsForm.white_amount}}</td>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'customer',
  data: () => ({
    // 表格列表数据
    columns: [{
      value: 'user_mobile',
      label: '手机号码',
      width: 180
    },
    {
      value: 'real_name',
      label: '姓名',
      width: 160
    },
    {
      value: 'user_idcard',
      label: '身份证号码',
      minw: 200
    },
    {
      value: 'created_at',
      label: '创建时间',
      width: 200
    },
    {
      value: 'updated_at',
      label: '更新时间',
      width: 200
    }
    ],
    // 删选关键字
    filters: {
      keyword: ''
    },
    // 加载状态
    listLoading: false,
    limit: 0,
    // 用户列表
    users: [],
    total: 0,
    // 用户详情数据
    detailsForm: [],
    // 列表显示隐藏
    isE: true,
    // 用户详情显示
    isW: false,
    page: 0
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
      // 获取列表请求参数
      const para = Object.assign({}, this.filters)
      // 触发子组件事件
      this.$refs['tableList'].getListData(this.$api.customer.management, para, 'user_list')
    },
    // 用户列表分页
    curChange(val) {
      this.page = val
      this.getUsers()
    },
    // 显示用户详情
    handleDetails(index, row) {
      this.listLoading = true
      console.log(row)
      const para = {
        user_id: row.user_id
      }
      this.axios.get(this.$api.customer.details, {
        params: para
      }).then(res => {
        this.listLoading = false
        this.isE = false
        this.isW = true
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          this.detailsForm = data.user_info
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 关闭用户详情
    handleClose() {
      this.isE = true
      this.isW = false
    },
    clear() {
      this.filters.keyword = ''
      this.getUsers()
    }
  }
}
</script>
<style lang="scss" scoped>
#customer {
  .customClass {
    background-color: black;
  }
  .tableBorder {
    border-spacing: 10px;
    font-size: 14px;
  }
  .move {
    padding: 16px 13px;
  }
}
</style>
