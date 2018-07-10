<template>
<div id="urge-list">
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
      <span v-for="item in detail.contractInfo" :key="item.contract_id">
            <el-col :span="3" class="label">{{item.label}}</el-col>
            <el-col :span="5">
              <el-input :value="item.value" :disabled="true"></el-input>
            </el-col>
          </span>
    </el-row>
    <h4>逾期记录</h4>
    <wk-table-paging :table-data="detail.installOverdue" :columns="columnsTwo">
    </wk-table-paging>
    <h4 style="overflow: hidden; position: relative;">
        <span style="position: absolute; bottom: 0;">催收记录</span>
        <el-button @click="handleAdd" type="primary" icon="plus" class="header-right" style="float: right">添加</el-button>
      </h4>
    <wk-table-paging check-box :table-data="detail.hurryLog" :columns="columnsThree" @selection-change="selsChange">
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
    <el-dialog :title="editType ? '编辑催收' : '添加催收'" :visible="editFormVisible" :before-close="handleClose" size="small">
      <el-form :key="editFormKey" :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" style="max-width:100%">
        <el-form-item label="催收日期" prop="hurry_date">
          <el-date-picker v-model="editForm.hurry_date" placeholder="选择日期" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="催收方式" prop="hurry_type">
          <el-select v-model="editForm.hurry_type" placeholder="请选择">
            <el-option v-for="opt in select.selectType" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收人" prop="hurry_man">
          <el-input v-model="editForm.hurry_man" placeholder="清输入标题" style="width:215px"></el-input>
        </el-form-item>
        <el-form-item label="催收结果" prop="hurry_result">
          <el-select v-model="editForm.hurry_result" placeholder="请选择">
            <el-option v-for="opt in select.selectResult" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收说明" prop="hurry_desc">
          <el-input v-model="editForm.hurry_desc" type="textarea" placeholder="清输入催收说明"></el-input>
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
  name: 'urge-list',
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
      // 催收列表
      columnsOne: [{
          value: 'contract_id',
          label: '合同ID',
          width: 100
        },
        {
          value: 'contract_sn',
          label: '合同编号',
          minw: 180
        },
        {
          value: 'real_name',
          label: '客户姓名',
          width: 120
        },
        {
          value: 'user_idcard',
          label: '身份证号码',
          width: 200
        },
        {
          value: 'user_mobile',
          label: '手机号码',
          width: 150
        },
        {
          value: 'loan_product_name',
          label: '产品名称',
          minw: 150
        },
        {
          value: 'loan_product_id_name',
          label: '是否分期',
          width: 120
        },
        {
          value: 'total_breach_day',
          label: '总逾期天数',
          width: 120
        },
        {
          value: 'total_breach_fee',
          label: '总滞纳金(元)',
          width: 120
        },
        {
          value: 'total_should_pay_fee',
          label: '总应还金额(元)',
          width: 140
        }
      ],
      // 详情显示
      detailVisible: false,
      detail: {
        contract_sn: '',
        contractInfo: [],
        installOverdue: [],
        hurryLog: []
      },
      // 逾期记录
      columnsTwo: [{
          value: 'plan_id',
          label: '序号',
          width: 80
        },
        {
          value: 'contract_sn',
          label: '合同编号',
          minw: 180
        },
        {
          value: 'real_name',
          label: '客户姓名',
          width: 120
        },
        {
          value: 'user_idcard',
          label: '身份证号',
          minw: 200
        },
        {
          value: 'user_mobile',
          label: '手机号码',
          width: 150
        },
        {
          value: 'current_month',
          label: '当期期数',
          width: 120
        },
        {
          value: 'plan_pay_date',
          label: '当期应还日期',
          minw: 180,
          formatter: row => this.$moment(row.plan_pay_date).format('YYYY-MM-DD')
        },
        {
          value: 'overdue_day',
          label: '逾期天数',
          width: 120
        },
        {
          value: 'should_overdue_fee',
          label: '当期应还滞纳金',
          width: 180
        },
        {
          value: 'should_pay_fee',
          label: '当期应还总金额',
          width: 180
        }
      ],
      // 催收记录
      columnsThree: [{
          value: 'log_id',
          label: '催收单号',
          width: 100
        },
        {
          value: 'hurry_date',
          label: '催收时间',
          width: 150
        },
        {
          value: 'hurry_type',
          label: '催收方式',
          width: 120,
          formatter: row => row.hurry_type === 1 ? '电话' : row.hurry_type === 2 ? '邮件' : '未知'
        },
        {
          value: 'hurry_man',
          label: '催收人',
          width: 150
        },
        {
          value: 'hurry_result',
          label: '催收结果',
          width: 120,
          sortable: true,
          formatter: row => row.hurry_result ? '成功' : '失败'
        },
        {
          value: 'hurry_desc',
          label: '催收说明',
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
      editFormKey: 1,
      // 编辑表单数据
      formInit: {
        hurry_date: '',
        hurry_type: null,
        hurry_man: '',
        hurry_result: null,
        hurry_desc: ''
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
        hurry_date: [{
          required: true,
          message: '请选择提醒日期',
          trigger: 'blur',
          type: 'date'
        }],
        hurry_type: [{
          required: true,
          message: '请选择催收方式',
          type: 'integer',
          trigger: 'change'
        }],
        hurry_man: [{
          required: true,
          message: '请输入催收人',
          trigger: 'blur'
        }],
        hurry_result: [{
          required: true,
          message: '请选择催收结果',
          type: 'integer',
          trigger: 'change'
        }],
        hurry_desc: [{
          required: true,
          message: '请输入催收说明',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    'editForm.hurry_date': function(newVal, oldVal) {
      if (typeof this.editForm.hurry_date === 'string') {
        this.chooseDate = false
        this.editFormRules.hurry_date[0].type = 'string'
      } else {
        this.chooseDate = true
        this.editFormRules.hurry_date[0].type = 'date'
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
      this.$refs['wk-list'].query(this.$api.afterLoan.getUrgeList, para, 'hurry_list')
    },
    // 搜索表单
    searchForm() {
      this.$refs['wk-search'].search()
    },
    // 显示详情
    handleDetail(row) {
      this.detail.contract_sn = row.contract_sn
      const reqUrl = this.$api.afterLoan.getUrgeDetail
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
          let cInfo = data.contract_info
          this.detail.contractInfo = [{
              label: '合同ID',
              value: cInfo.contract_id
            },
            {
              label: '客户姓名',
              value: cInfo.real_name
            },
            {
              label: '产品名称',
              value: cInfo.loan_product_name
            },
            {
              label: '是否分期',
              value: cInfo.loan_product_id_name
            },
            {
              label: '借贷总金额',
              value: cInfo.amount
            },
            {
              label: '分期期数',
              value: cInfo.month
            },
            {
              label: '受理日期',
              value: this.$moment(cInfo.created_at).format('YYYY-MM-DD')
            },
            {
              label: '联系人姓名',
              value: cInfo.link_man
            },
            {
              label: '联系人手机',
              value: cInfo.link_mobile
            },
            {
              label: '与申请人关系',
              value: cInfo.link_relation
            }
          ]
          this.detail.installOverdue = data.install_overdue
          this.detail.hurryLog = data.hurry_log
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
      this.editType = false
      this.editFormVisible = true
      this.editForm = Object.assign({}, this.formInit)
    },
    // 显示编辑对话框
    handleEdit(row) {
      this.editForm = Object.assign({}, row)
      this.editType = true
      this.editFormVisible = true
    },
    // 删除
    handleDelete(row) {
      const reqUrl = this.$api.afterLoan.deleteUrge
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
            contract_sn: this.detail.contract_sn
          })
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {})
    },
    // 关闭对话框
    handleClose() {
      this.editFormVisible = false
      this.editFormKey = Date.parse(new Date()) / 1000
      this.editForm = Object.assign({}, this.formInit)
    },
    // 提交编辑
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        // console.log(valid)
        if (valid) {
          this.submitLoading = true
          const reqUrl = this.editType ? this.$api.afterLoan.editUrge : this.$api.afterLoan.addUrge
          let para = {
            hurry_date: this.chooseDate ? this.$moment(this.editForm.hurry_date).format('YYYY-MM-DD') : this.editForm.hurry_date,
            hurry_type: this.editForm.hurry_type,
            hurry_man: this.editForm.hurry_man,
            hurry_result: this.editForm.hurry_result,
            hurry_desc: this.editForm.hurry_desc
          }
          if (this.editType) {
            para.log_id = this.editForm.log_id
          } else {
            para.contract_sn = this.detail.contract_sn
          }
          // console.log('request', reqUrl, para)
          this.axios.post(reqUrl, para).then(res => {
            // console.log('response', res)
            this.submitLoading = false
            this.$message.success(res.data.msg)
            this.handleClose()
            this.handleDetail({
              contract_sn: this.detail.contract_sn
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
      const reqUrl = this.$api.afterLoan.deleteUrge
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
            contract_sn: this.detail.contract_sn
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
#urge-list {
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
