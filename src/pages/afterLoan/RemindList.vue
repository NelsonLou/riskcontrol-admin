<template>
<div id="remind-list">
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
    <h4 style="overflow: hidden; position: relative;">
        <span style="position: absolute; bottom: 0;">提醒记录</span>
        <el-button @click="handleAdd" type="primary" icon="plus" class="header-right" style="float: right">添加</el-button>
      </h4>
    <wk-table-paging check-box :table-data="detail.remindRecord" :columns="columnsThree" @selection-change="selsChange">
      <el-table-column label="操作" width="180" fixed="right">
        <template scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="small" icon="edit">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="small" icon="delete">删除</el-button>
          </template>
      </el-table-column>
      <template slot="foot">
          <el-button :disabled="sels.length === 0" @click="batchDelete" :loading="deleteLoading" icon="delete" type="danger">批量删除</el-button>
        </template>
    </wk-table-paging>
    <!-- 编辑对话框 -->
    <el-dialog :title="editType ? '编辑提醒' : '添加提醒'" :visible="editFormVisible" :before-close="handleClose" size="small">
      <el-form :key="editFormKey" :model="editForm" :rules="editFormRules" ref="editForm" label-width="150px" style="max-width:100%">
        <el-form-item label="提醒日期" prop="remind_date">
          <el-date-picker v-model="editForm.remind_date" placeholder="选择日期" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="提醒人手机号码" prop="remind_mobile">
          <el-input v-model="editForm.remind_mobile" placeholder="提醒人提醒人手机号码" style="width:215px"></el-input>
        </el-form-item>
        <el-form-item label="提醒方式" prop="remind_type">
          <el-select v-model="editForm.remind_type" placeholder="请选择">
            <el-option v-for="opt in select.selectType" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提醒结果" prop="remind_result">
          <el-select v-model="editForm.remind_result" placeholder="请选择">
            <el-option v-for="opt in select.selectResult" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提醒说明" prop="remind_desc">
          <el-input v-model="editForm.remind_desc" type="textarea" placeholder="提醒人提醒说明"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="editSubmit" :loading="submitLoading" type="primary">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'remind-list',
  data: function() {
    return {
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
          value: 'order_sn',
          label: '订单编号',
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
          width: 150
        },
        {
          value: 'loan_product_id',
          label: '是否分期',
          width: 100
        },
        {
          value: 'amount',
          label: '借贷总金额',
          width: 120
        },
        {
          value: 'month',
          label: '分期期数',
          width: 100
        }
      ],
      // 详情显示
      detailVisible: false,
      detail: {
        contractSn: '',
        contractDetail: [],
        planInfo: [],
        remindRecord: []
      },
      // 合同计划
      columnsTwo: [{
          value: 'current_month',
          label: '当前期数',
          minw: 120
        },
        {
          value: 'month',
          label: '总期数',
          minw: 120
        },
        {
          value: 'plan_pay_fee',
          label: '应还款金额',
          minw: 150
        },
        {
          value: 'plan_pay_date',
          label: '计划还款日',
          minw: 150,
          formatter: row => this.$moment(row.plan_pay_date).format('YYYY-MM-DD')
        },
        {
          value: 'plan_bill_date',
          label: '计划账单日',
          minw: 150,
          formatter: row => this.$moment(row.plan_bill_date).format('YYYY-MM-DD')
        },
        {
          value: 'pay_status',
          label: '状态',
          minw: 120,
          formatter: row => row.pay_status === -1 ? '坏账' : row.pay_status === 0 ? '未还款' : row.pay_status === 1 ? '已还款' : row.pay_status === 2 ? '逾期' : row.pay_status === 3 ? '提前还款' : '未知'
        }
      ],
      // 提醒记录
      columnsThree: [{
          value: 'log_id',
          label: '提醒单号',
          width: 100
        },
        {
          value: 'contract_sn',
          label: '合同编号',
          width: 180
        },
        {
          value: 'remind_date',
          label: '提醒日期',
          width: 130
        },
        {
          value: 'remind_man',
          label: '提醒人姓名',
          width: 130
        },
        {
          value: 'remind_mobile',
          label: '提醒人手机号码',
          width: 150
        },
        {
          value: 'remind_type',
          label: '提醒方式',
          width: 120,
          formatter: row => row.remind_type === 1 ? '电话' : row.hurry_type === 2 ? '邮件' : '未知'
        },
        {
          value: 'remind_result',
          label: '提醒结果',
          width: 120,
          sortable: true,
          formatter: row => row.remind_result ? '成功' : '失败'
        },
        {
          value: 'remind_desc',
          label: '提醒说明',
          minw: 150
        }
      ],
      // 批量选中列表
      sels: [],
      deleteLoading: false,
      // 编辑框状态
      editFormVisible: false,
      editType: true,
      submitLoading: false,
      editFormKey: 100,
      // 编辑表单数据
      formInit: {
        remind_date: '',
        remind_mobile: '',
        remind_type: null,
        remind_result: null,
        remind_desc: ''
      },
      editForm: {},
      // 编辑框选择器
      select: {
        selectType: [{
            value: 1,
            label: '电话'
          },
          {
            value: 2,
            label: '邮件'
          }
        ],
        selectResult: [{
            value: 0,
            label: '失败'
          },
          {
            value: 1,
            label: '成功'
          }
        ]
      },
      // 编辑表单验证规则
      chooseDate: true,
      editFormRules: {
        remind_date: [{
          required: true,
          message: '请选择提醒日期',
          trigger: 'blur',
          type: 'date'
        }],
        remind_mobile: [{
            required: true,
            message: '请输入提醒人手机号码',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        remind_type: [{
          required: true,
          message: '请选择提醒方式',
          type: 'integer',
          trigger: 'change'
        }],
        remind_result: [{
          required: true,
          message: '请选择提醒结果',
          type: 'integer',
          trigger: 'change'
        }],
        remind_desc: [{
          required: true,
          message: '请输入提醒说明',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    'editForm.remind_date': function(newVal, oldVal) {
      if (typeof this.editForm.remind_date === 'string') {
        this.chooseDate = false
        this.editFormRules.remind_date[0].type = 'string'
      } else {
        this.chooseDate = true
        this.editFormRules.remind_date[0].type = 'date'
      }
    }
  },
  methods: {
    // 获取列表
    getData(obj) {
      if (obj) {
        this.filters = obj
      }
      const para = Object.assign({}, this.filters)
      this.$refs['wk-list'].query(this.$api.afterLoan.getRemindContracts, para, 'contract_info')
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-search'].search()
    },
    // 显示详情
    handleDetail(row) {
      this.detail.contractSn = row.contract_sn
      const reqUrl = this.$api.afterLoan.getRemindDetail
      const para = {
        contract_sn: row.contract_sn
      }
      // console.log(reqUrl, para)
      this.axios.post(reqUrl, para).then(res => {
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
          this.detail.remindRecord = data.remind_record
          this.detailVisible = true
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 返回列表
    handleBack() {
      this.detailVisible = false
    },
    // 显示新增对话框
    handleAdd() {
      this.editForm = Object.assign({}, this.formInit)
      this.editType = false
      this.editFormVisible = true
    },
    // 显示编辑对话框
    handleEdit(row) {
      this.editForm = Object.assign({}, row)
      this.editType = true
      this.editFormVisible = true
    },
    // 删除
    handleDelete(row) {
      const reqUrl = this.$api.afterLoan.deleteRemind
      const para = {
        log_id: row.log_id
      }
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        // console.log('request', reqUrl, para)
        this.axios.post(reqUrl, para).then(res => {
          // console.log(res)
          this.$message.success(res.data.msg)
          this.handleDetail({
            contract_sn: this.detail.contractSn
          })
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {})
    },
    // 关闭对话框
    handleClose() {
      this.editFormKey = Date.parse(new Date()) / 1000
      this.editFormVisible = false
      this.editForm = Object.assign({}, this.formInit)
    },
    // 提交编辑
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        // console.log(valid)
        if (valid) {
          this.submitLoading = true
          const reqUrl = this.editType ? this.$api.afterLoan.editRemind : this.$api.afterLoan.addRemind
          let para = {
            contract_sn: this.detail.contractSn,
            remind_date: this.chooseDate ? this.$moment(this.editForm.remind_date).format('YYYY-MM-DD') : this.editForm.remind_date,
            remind_mobile: this.editForm.remind_mobile,
            remind_type: this.editForm.remind_type,
            remind_result: this.editForm.remind_result,
            remind_desc: this.editForm.remind_desc
          }
          if (this.editType) {
            para.log_id = this.editForm.log_id
          }
          // console.log('request', reqUrl, para)
          this.axios.post(reqUrl, para).then(res => {
            // console.log('response', res)
            this.submitLoading = false
            this.$message.success(res.data.msg)
            this.handleClose()
            this.handleDetail({
              contract_sn: this.detail.contractSn
            })
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 批量选中列表
    selsChange(sels) {
      this.sels = sels
    },
    // 批量删除
    batchDelete() {
      const ids = this.sels.map(item => item.log_id).toString()
      const reqUrl = this.$api.afterLoan.deleteRemind
      const para = {
        log_id: ids
      }
      this.$confirm('确认删除选中记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteLoading = true
        // console.log('request', reqUrl, para)
        this.axios.post(reqUrl, para).then(res => {
          // console.log(res)
          this.deleteLoading = false
          this.$message.success(res.data.msg)
          this.handleDetail({
            contract_sn: this.detail.contractSn
          })
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {})
    }
  }
}
</script>
<style lang="scss">
#remind-list {
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
