<template>
  <div id="business">
    <!-- 编辑部分 -->
    <div class="edit" v-if="isEdit">
      <el-card class="box-card">
        <div class="edit-title">业务信息</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline" :inline="true">
          <el-form-item label="客户编号">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="放款主体">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="申请金额(元)">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="申请期限(月)">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="审批金额">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="审批期限">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="客户来源">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="渠道来源">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="所属行业">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="联系号码">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="客服员">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="业务员">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="团队">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="现居住地址">
            <el-cascader placeholder="" :options="options" filterable change-on-select size='small'></el-cascader>
          </el-form-item>
          <el-form-item label="">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="受理时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.AcceptanceDate" style="width: 100%;" size="small"></el-date-picker>
          </el-form-item>
          <div class="edit-title">合同签订结果</div>
          <el-form-item label="合同编号" prop="contractNum">
            <el-input size="small" v-model="ruleForm.contractNum"></el-input>
          </el-form-item>
          <el-form-item label="签约时间" prop="signDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.signDate" style="width: 100%;" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item label="生效日期" prop="takeEffectDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.takeEffectDate" style="width: 100%;" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item label="到期日期" prop="expireDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.expireDate" style="width: 100%;" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item label="审批金额(元)">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="审批期限(月)">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="放款类型" prop="loanType">
            <el-select v-model="ruleForm.loanType" placeholder="请选择放款类型" size="small">
              <el-option label="银行转账1" value="1"></el-option>
              <el-option label="银行转账2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="放款账号" prop="loanNumber">
            <el-input size="small" v-model="ruleForm.loanNumber"></el-input>
          </el-form-item>
          <el-form-item label="放款账户户名">
            <el-input size="small" v-model="ruleForm.loanName"></el-input>
          </el-form-item>
          <el-form-item label="放款开户行" prop="bank">
            <el-select v-model="ruleForm.bank" placeholder="请选择开户行" size="small">
              <el-option label="银行1" value="1"></el-option>
              <el-option label="银行2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="放款开户行支行" prop="bankBranch">
            <el-select v-model="ruleForm.bankBranch" placeholder="请选择开户行支行" size="small">
              <el-option label="银行1" value="1"></el-option>
              <el-option label="银行2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还款类型" prop="repaymentType">
            <el-select v-model="ruleForm.repaymentType" placeholder="请选择放款类型" size="small">
              <el-option label="银行代扣1" value="1"></el-option>
              <el-option label="银行代扣2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还款账号" prop="repaymentNumber">
            <el-input size="small" v-model="ruleForm.repaymentNumber"></el-input>
          </el-form-item>
          <el-form-item label="还款账户户名">
            <el-input size="small" v-model="ruleForm.repaymentName"></el-input>
          </el-form-item>
          <el-form-item label="还款开户行" prop="repaymentBank">
            <el-select v-model="ruleForm.repaymentBank" placeholder="请选择开户行" size="small">
              <el-option label="银行1" value="1"></el-option>
              <el-option label="银行2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还款开户行支行" prop="repaymentBankBranch">
            <el-select v-model="ruleForm.repaymentBankBranch" placeholder="请选择开户行支行" size="small">
              <el-option label="银行1" value="1"></el-option>
              <el-option label="银行2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首期还款日" prop="firstRepaymentDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.firstRepaymentDate" style="width: 100%;" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item label="共同借款人">
            <el-input size="small" v-model="ruleForm.commonLoanName"></el-input>
          </el-form-item>
          <el-form-item label="共同借款人身份证">
            <el-input size="small" v-model="ruleForm.commonLoanIdCard"></el-input>
          </el-form-item>
          <el-form-item label="共同借款人手机号">
            <el-input size="small" v-model="ruleForm.commonLoanTel"></el-input>
          </el-form-item>
          <el-form-item label="是否为循环货">
            <el-radio class="radio" v-model="ruleForm.radio" label="1">是</el-radio>
            <el-radio class="radio" v-model="ruleForm.radio" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="放款金额">
            <el-input size="small" v-model="ruleForm.loanMoney"></el-input>
          </el-form-item>
          <el-form-item label="合同金额">
            <el-input size="small" v-model="ruleForm.contractMoney"></el-input>
          </el-form-item>
          <el-form-item label="服务费">
            <el-input size="small" v-model="ruleForm.serviceMoney"></el-input>
          </el-form-item>
          <div class="edit-title">意见列表</div>
          <el-table :data="opinionList" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="type" label="意见类型" width="150">
            </el-table-column>
            <el-table-column prop="result" label="结论" width="145">
            </el-table-column>
            <el-table-column prop="reason" label="原因" width="300">
            </el-table-column>
            <el-table-column prop="advantage" label="优势" width="300">
            </el-table-column>
            <el-table-column prop="inferiority" label="劣势" width="300">
            </el-table-column>
            <el-table-column prop="name" label="经办人" width="180">
            </el-table-column>
            <el-table-column prop="date" label="完成时间" width="180">
            </el-table-column>
          </el-table>
          <el-form-item label="结果" prop="result" style="margin-top:1rem">
            <el-select v-model="ruleForm.result" placeholder="请选择" size="small">
              <el-option label="通过" value="1"></el-option>
              <el-option label="退回" value="2"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="意见：">
            <el-input type="textarea" v-model="ruleForm.opinion"></el-input>
          </el-form-item>
          <br>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  
    <el-card class="box-card" v-else>
      <!-- 搜索栏 -->
      <div class="card-header">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="客户名称">
            <el-input v-model="formInline.name" placeholder="客户名称" size="small"></el-input>
          </el-form-item>
          <el-form-item label="客户编号">
            <el-input v-model="formInline.id" placeholder="客户编号" size="small"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="formInline.idCard" placeholder="身份证号码" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="getData" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 列表 -->
      <div class="tab-list">
        <el-table v-loading.body="listLoading" :data="dataList" border style="width: 100%">
          <el-table-column prop="id" label="编号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="客户名称" width="140">
          </el-table-column>
          <el-table-column prop="productName" label="产品名称" width="140">
          </el-table-column>
          <el-table-column prop="loanSubject" label="放款主体" width="145">
          </el-table-column>
          <el-table-column prop="money" label="申请金额(元)" width="160">
          </el-table-column>
          <el-table-column prop="term" label="申请期限" width="160">
          </el-table-column>
          <el-table-column prop="loanMoney" label="放款金额(元)" width="160">
          </el-table-column>
          <el-table-column prop="loanTerm" label="放款期限" width="160">
          </el-table-column>
          <el-table-column prop="date" label="申请日期" width="210">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="160">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template scope="scope">
              <el-button @click="handle" size="small" type="text">处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination @current-change="handleCurrentChange" :page-size="limit" :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="total" style="float: right;">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'service',
  data: () => ({
    formInline: {
      name: '',
      id: '',
      idCard: ''
    },
    ruleForm: {
      // 客户编号
      contractNum: '1000',
      // 受理时间
      AcceptanceDate: '',
      // 签约时间
      signDate: '',
      // 生效时间
      takeEffectDate: '',
      // 到期时间
      expireDate: '',
      // 放款类型
      loanType: '',
      // 放款账号
      loanNumber: '666666666666666',
      // 放款账户户名
      loanName: '测试',
      // 放款开户行
      bank: '',
      // 放款开户行支行
      bankBranch: '',
      // 还款类型
      repaymentType: '',
      // 还款账号
      repaymentNumber: '6666666666666666',
      // 还款账户户名
      repaymentName: '测试',
      // 还款开户行
      repaymentBank: '',
      // 还款开户行支行
      repaymentBankBranch: '',
      // 首期还款日
      firstRepaymentDate: '',
      // 共同借款人
      commonLoanName: '测试',
      // 共同借款人身份证
      commonLoanIdCard: '123456',
      // 共同借款人手机号
      commonLoanTel: '123',
      // 是否循环货
      radio: '1',
      // 放款金额
      loanMoney: '6000',
      // 合同金额
      contractMoney: '1000',
      // 服务费
      serviceMoney: '2400',
      // 结果
      result: '',
      // 意见
      opinion: ''
    },
    options: [{
      value: '浙江省',
      label: '浙江省',
      children: [{
        value: '宁波市',
        label: '宁波市',
        children: [{
          value: '鄞州',
          label: '鄞州'
        }, {
          value: '江东',
          label: '江东'
        }, {
          value: '海曙',
          label: '海曙'
        }]
      }, {
        value: '杭州市',
        label: '杭州市',
        children: [{
          value: '下沙',
          label: '下沙'
        }, {
          value: '滨江',
          label: '滨江'
        }]
      }]
    }],
    rules: {
      contractNum: [
        { required: true, message: '编号不能为空', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      signDate: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
      ],
      takeEffectDate: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
      ],
      expireDate: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
      ],
      loanType: [
        { required: true, message: '请选择放款类型', trigger: 'blur' }
      ],
      loanNumber: [
        { required: true, message: '放款账号不能为空', trigger: 'blur' },
        { min: 15, max: 15, message: '长度在15个字符', trigger: 'blur' }
      ],
      bank: [
        { required: true, message: '请选择放款开户行', trigger: 'blur' }
      ],
      bankBranch: [
        { required: true, message: '请选择放款开户行支行', trigger: 'blur' }
      ],
      repaymentType: [
        { required: true, message: '请选择还款类型', trigger: 'blur' }
      ],
      repaymentNumber: [
        { required: true, message: '还款账号不能为空', trigger: 'blur' },
        { min: 15, max: 15, message: '长度在15个字符', trigger: 'blur' }
      ],
      repaymentBank: [
        { required: true, message: '请选择还款开户行', trigger: 'blur' }
      ],
      repaymentBankBranch: [
        { required: true, message: '请选择还款开户行支行', trigger: 'blur' }
      ],
      firstRepaymentDate: [
        { required: true, message: '请选择首期还款日', trigger: 'blur' }
      ],
      result: [
        { required: true, message: '请选择结果', trigger: 'blur' }
      ]
    },
    opinionList: [{
      type: '客户登记',
      result: '通过',
      reason: '资料不齐全',
      content: '申请表少一页',
      advantage: '本地人',
      inferiority: '',
      money: '100000',
      name: '测试',
      date: '2016-05-02'
    }, {
      type: '客户登记',
      result: '通过',
      reason: '资料不齐全',
      content: '申请表少一页',
      advantage: '本地人',
      inferiority: '',
      money: '100000',
      name: '测试',
      date: '2016-05-02'
    }, {
      type: '客户登记',
      result: '通过',
      reason: '资料不齐全',
      content: '申请表少一页',
      advantage: '本地人',
      inferiority: '',
      money: '100000',
      name: '测试',
      date: '2016-05-02'
    }, {
      type: '客户登记',
      result: '通过',
      reason: '资料不齐全',
      content: '申请表少一页',
      advantage: '本地人',
      inferiority: '',
      money: '100000',
      name: '测试',
      date: '2016-05-02'
    }],
    // 表单每页条数
    limit: 10,
    // 每页对应的数据
    dataList: [],
    // 表单总数据
    tableData: '',
    // 搜索总数据
    searchData: '',
    // 是否显示加载
    listLoading: false,
    // 数据总条数
    total: 0,
    // 当前页
    currentPage: 1,
    // 是否编辑
    isEdit: false
  }),
  mounted() {
    // this.getData()
  },
  methods: {
    // 获取分页数据
    getData() {
      // 激活加载状态
      this.listLoading = true
      // 请求参数
      const para = {
        // 当前页数
        page: this.currentPage,
        // 每页条数
        limit: this.api.config.limit,
        // 搜索
        name: this.formInline.name,
        id: this.formInline.id,
        idCard: this.formInline.idCard
      }
      var _this = this
      // 请求数据
      this.axios.get(this.api.loan.loanApply, {
        params: para
      }).then(res => {
        _this.listLoading = false
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          // 设置数据总条数
          _this.total = data.total
          // 设置当前页的数据
          _this.dataList = data.data
        } else {
          _this.$message.error(msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 设置当前分页数据
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    handle() {
      this.isEdit = true
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return 'info-row'
      } else if (index === 3) {
        return 'positive-row'
      }
      return ''
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    back() {
      this.isEdit = false
    }
  }
}
</script>

<style>
.box-card {
  padding-bottom: 20px;
}

.el-form {
  max-width: 100% !important;
}

.tab-list {
  margin-top: 20px;
}

.paging {
  margin-top: 20px;
}

.edit-title {
  border-bottom: 1px solid #CCC;
  width: auto;
  padding-left: 6px;
  padding-right: 6px;
  padding-bottom: 6px;
  margin-top: 1rem;
  margin-bottom: 2rem;
  color: #20a0ff;
}

.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}

.el-textarea {
  width: 600px;
}
</style>
