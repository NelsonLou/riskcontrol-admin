<template>
<div id="bad-debt-list">
  <el-card class="box-card" v-show="!detailVisible" key="listData">
    <!--工具条-->
    <div slot="header" class="card-header">
      <wk-form-base inline ref="wk-search" :form-item="searchItem" @query="getData">
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchForm" icon="search" type="primary">搜索</el-button>
        </el-form-item>
      </wk-form-base>
    </div>
    <!-- 列表 -->
    <wk-table-base ref="wk-list" :columns="columnsOne" @query="getData">
      <el-table-column label="操作" width="100" fixed="right">
        <template scope="scope">
              <el-button @click="handleDetail(scope.row)" type="primary" size="small" icon="edit">详情</el-button>
            </template>
      </el-table-column>
    </wk-table-base>
  </el-card>
  <!-- 详情 -->
  <el-card class="box-card" v-show="detailVisible" key="detail">
    <div slot="header" class="card-header">
      <el-button @click="handleBack" type="primary" icon="arrow-left">返 回</el-button>
    </div>
    <h4 style="margin-top: 0">合同信息</h4>
    <el-row>
      <span v-for="item in detail.contractDetail" :key="item.contract_sn">
          <el-col :span="3" class="label">{{item.label}}</el-col>
          <el-col :span="5">
            <el-input :value="item.value" :disabled="true"></el-input>
          </el-col>
        </span>
    </el-row>
    <h4>合同计划</h4>
    <wk-table-paging :table-data="detail.planInfo" :columns="columnsTwo">
    </wk-table-paging>
  </el-card>
</div>
</template>
<script>
export default {
  name: 'bad-debt-list',
  data: () => ({
    // 筛选关键字
    filters: {},
    // 搜索表单元素
    searchItem: [{
      eleType: 'search',
      value: 'keyword',
      plh: '请输入客户姓名 / 合同编号 / 身份证 / 手机号码'
    }],
    // 合同列表
    columnsOne: [{
        value: 'contract_sn',
        label: '合同编号',
        minw: 180
      },
      {
        value: 'real_name',
        label: '客户姓名',
        minw: 120
      },
      {
        value: 'user_idcard',
        label: '身份证号码',
        minw: 200
      },
      {
        value: 'user_mobile',
        label: '手机号码',
        minw: 150
      },
      {
        value: 'total_breach_day',
        label: '总逾期天数',
        minw: 120
      },
      {
        value: 'total_overdue_month',
        label: '总逾期期数',
        minw: 120
      }
    ],
    // 详情显示
    detailVisible: false,
    detail: {
      contractSn: '',
      contractDetail: [],
      planInfo: []
    },
    // 合同计划
    columnsTwo: [{
        value: 'current_month',
        label: '当前期数',
        width: 120
      },
      {
        value: 'plan_pay_fee',
        label: '计划还款金额',
        minw: 150
      },
      {
        value: 'plan_pay_date',
        label: '计划还款日',
        minw: 150
      },
      {
        value: 'pay_status',
        label: '还款状态',
        minw: 150,
        formatter: row => row.pay_status === 0 ? '未还款' : row.pay_status === 1 ? '已还款' : '逾期'
      }
    ]
  }),
  mounted() {
    this.getData()
  },
  methods: {
    // 获取列表
    getData(obj) {
      if (obj) {
        this.filters = obj
      }
      const para = Object.assign({}, this.filters)
      this.$refs['wk-list'].query(this.$api.afterLoan.getBadDebtList, para, 'bad_debt_list')
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-search'].search()
    },
    // 显示详情
    handleDetail(row) {
      this.detail.contractSn = row.contract_sn
      const reqUrl = this.$api.afterLoan.getBadDebtDetail
      const para = {
        params: {
          contract_sn: row.contract_sn
        }
      }
      // console.log(reqUrl, para)
      this.axios.get(reqUrl, para).then(res => {
        // console.log('获取详情', res)
        const {
          code,
          data
        } = res.data
        if (code === 1) {
          let cDetail = data.contract_detail
          this.detail.contractDetail = [{
              label: '合同编号',
              value: cDetail.contract_sn
            },
            {
              label: '订单编号',
              value: cDetail.order_sn
            },
            {
              label: '分期期数',
              value: cDetail.month
            },
            {
              label: '借贷总金额',
              value: cDetail.amount
            },
            {
              label: '金融产品类型',
              value: cDetail.loan_product_id === 1 ? '分期' : '不分期'
            },
            {
              label: '签约日期',
              value: this.$moment(cDetail.start_at).format('YYYY-MM-DD')
            },
            {
              label: '到期日期',
              value: this.$moment(cDetail.end_at).format('YYYY-MM-DD')
            },
            {
              label: '总应还本金',
              value: cDetail.total_bill_pay_fee
            },
            {
              label: '总违约天数',
              value: cDetail.total_breach_day
            },
            {
              label: '总违约费用',
              value: cDetail.total_breach_fee
            },
            {
              label: '总逾期费用',
              value: cDetail.total_overdue_fee
            },
            {
              label: '总逾期期数',
              value: cDetail.total_overdue_month
            },
            {
              label: '总已还金额',
              value: cDetail.total_real_pay_fee
            },
            {
              label: '总日服务费',
              value: cDetail.total_service_fee
            },
            {
              label: '客户姓名',
              value: cDetail.real_name
            },
            {
              label: '身份证号码',
              value: cDetail.user_idcard
            },
            {
              label: '手机号码',
              value: cDetail.user_mobile
            },
            {
              label: '客户ID',
              value: cDetail.user_id
            },
            {
              label: '最高学历',
              value: cDetail.user_education
            },
            {
              label: '专业',
              value: cDetail.user_profession
            },
            {
              label: '工作单位',
              value: cDetail.user_company
            },
            {
              label: '收入',
              value: cDetail.user_income
            },
            {
              label: 'QQ',
              value: cDetail.user_qq
            },
            {
              label: '邮箱',
              value: cDetail.user_email
            },
            {
              label: '联系人姓名',
              value: cDetail.link_man
            },
            {
              label: '联系人手机',
              value: cDetail.link_mobile
            },
            {
              label: '与申请人关系',
              value: cDetail.link_relation
            }
          ]
          this.detail.planInfo = data.plan_info
          this.detailVisible = true
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 返回列表
    handleBack() {
      this.detailVisible = false
    }
  }
}
</script>
<style lang="scss">
#bad-debt-list {
    .label {
        line-height: 36px;
        text-align: right;
        padding-right: 10px;
    }
    .el-col {
        margin-bottom: 6px;
    }
    .el-form-item__content {
        width: 320px;
    }
}
</style>
