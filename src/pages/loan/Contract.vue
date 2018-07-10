<template>
  <div id="contract">
    <el-card class="box-card">
      <!-- 搜索 -->
      <div slot="header" class="card-header">
        <el-button type="primary" v-show="isEdit" @click="back">返回</el-button>
        <wk-form v-show="!isEdit" type="search" :columns="search" name="formCol" :filters="filters" inline @click="handleListData" @clear="clear" :submit="false"></wk-form>
      </div>
      <!-- 列表 -->
      <wk-table v-show="!isEdit" ref="tableList" :columns="contractForm.columns" @click="handleListData">
        <el-table-column fixed="right" label="操作" width="80">
          <template scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" size="small" type="primary">查看</el-button>
          </template>
        </el-table-column>
      </wk-table>
      <!-- 编辑部分 -->
      <div id="edit" v-if="isEdit" style="height:690px;overflow:auto" v-loading.body="loading">
          <wk-form ref="formCol" title="合同信息" name="formCol" :columns="contractForm" inline label-width="120px" :submit="false"></wk-form>
          <wk-form type="table" ref="plan_list" title="计划信息" name="plan_list" :columns="contractForm" inline label-width="120px" :submit="false"></wk-form>
          <wk-form type="table" v-if="show" ref="overdue_list" title="逾期信息" name="overdue_list" :columns="contractForm" inline label-width="120px" :submit="false"></wk-form>
          <wk-form type="table" ref="remind_list" title="提醒记录" name="remind_list" :columns="contractForm" inline label-width="120px" :submit="false"></wk-form>
          <wk-form type="table" ref="hurry_list" title="催收记录" name="hurry_list" :columns="contractForm" inline label-width="120px" :submit="false"></wk-form>
      </div>
    </el-card>
  </div>
</template>
<script>
// 编辑页表单列表
import { mapState } from 'vuex'
import contractForm from './formData/contractForm'
export default {
  name: 'contract',
  data: () => ({
    // 编辑页表单
    contractForm,
    // 是否显示编辑表单
    isEdit: false,
    overdue_show: false,
    // 搜索字段
    filters: {
      keyword: ''
    },
    // 搜索列表
    search: {
      formCol: [{
        formType: 'search',
        model: 'keyword',
        placeholder: '客户名称 / 编号 / 身份证号'
      }]
    }
  }),
  mounted() {
    // 初始化列表数据
    this.handleListData()
  },
  computed: {
    ...mapState({
      loading: state => state.app.loading
    }),
    show() {
      return this.$store.state.app.overdue_show
    }
  },
  methods: {
    // 获取初始页列表数据
    handleListData(data) {
      // 获取子组件搜索参数
      if (data) {
        this.filters = data
      }
      // 获取列表请求参数
      const para = Object.assign({}, this.filters)
      // 触发子组件事件
      this.$refs['tableList'].getListData(this.$api.loan.contract, para, 'contract_list')
    },
    // 编辑
    handleEdit(index, row, tag) {
      this.isEdit = true
      // 请求参数
      const para = {
        // 合同id
        contract_sn: row.contract_sn
      }
      this.$nextTick(() => {
        // 触发子组件事件
        this.$refs['formCol'].getEditData(this.$api.loan.contractDetail, para, 'contract_info')
        this.$refs['plan_list'].getEditData(this.$api.loan.contractDetail, para, 'contract_info')
        this.$refs['remind_list'].getEditData(this.$api.loan.contractDetail, para, 'contract_info')
        this.$refs['hurry_list'].getEditData(this.$api.loan.contractDetail, para, 'contract_info')
        this.overdue_show = this.$refs['remind_list']._data.formData.loan_product_id
        this.overdue_show ? this.$refs['overdue_list'].getEditData(this.$api.loan.contractDetail, para, 'contract_info') : ''
      })
    },
    back() {
      this.isEdit = false
    },
    clear() {
      this.handleListData()
    },
    test(data) {
      alert(data)
    }
  }
}
</script>

<style>
.el-card__body {
  padding-top: 0 !important;
}
</style>

