<template>
  <div id="business">
    <div class="edit" v-if="isEdit">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="客户信息" name="first">
            <div class="edit-title">申请人基本信息</div>
            <el-form :model="editContent" :rules="rules" ref="ruleForm" class="demo-form-inline" :inline="true">
              <el-form-item label="客户编号">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="客户姓名" prop="name">
                <el-input size="small" v-model="editContent.name"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idCard">
                <el-input size="small" v-model.number="editContent.idCard"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="tel">
                <el-input size="small" v-model.number="editContent.tel"></el-input>
              </el-form-item>
              <el-form-item label="分部" prop="branch">
                <el-select v-model="editContent.branch" placeholder="请选择" size="small">
                  <el-option label="台州营业部" value="1"></el-option>
                  <el-option label="台州营业部" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="业务员" prop="salesman">
                <el-input size="small" v-model="editContent.salesman"></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="登记日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.signDate" style="width: 100%;" size="small"></el-date-picker>
              </el-form-item>
              <el-form-item label="婚姻状况" prop="status">
                <el-select v-model="editContent.status" placeholder="请选择" size="small">
                  <el-option label="已婚" value="1"></el-option>
                  <el-option label="未婚" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="子女数">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="现居住地址" prop="LivingAddress">
                <el-cascader placeholder="请选择现居住地址" v-model="editContent.LivingAddress" :options="options" filterable change-on-select size='small'></el-cascader>
              </el-form-item>
              <el-form-item label="" prop="LivingAddressSpecific">
                <el-input size="small" v-model="editContent.LivingAddressSpecific"></el-input>
              </el-form-item>
              <el-form-item label="户口所在地"> 
                <el-cascader placeholder="" :options="options" filterable change-on-select size='small'></el-cascader>
              </el-form-item>
              <el-form-item label="">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="家庭电话">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="微信">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="居住状况">
                <el-select placeholder="请选择" size="small">
                  <el-option label="" value="1"></el-option>
                  <el-option label="" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年收入">
                <el-input size="small" v-model="ruleForm.contractNum"></el-input>
              </el-form-item>
              <el-form-item label="受教育程度">
                <el-select v-model="ruleForm.bank" placeholder="请选择" size="small">
                  <el-option label="" value="1"></el-option>
                  <el-option label="" value="2"></el-option>
                </el-select>
              </el-form-item>
              <div class="edit-title">职业信息</div>
              <el-form-item label="工作单位" prop="workUnit">
                <el-input size="small" v-model="editContent.workUnit"></el-input>
              </el-form-item>
              <el-form-item label="单位属性" prop="unitAttribute">
                <el-select v-model="editContent.unitAttribute" placeholder="请选择" size="small">
                  <el-option label="个体" value="1"></el-option>
                  <el-option label="" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属行业" prop="industry">
                <el-select v-model="editContent.industry" placeholder="请选择" size="small">
                  <el-option label="" value="1"></el-option>
                  <el-option label="" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位级别">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="起始服务时间" prop="startDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="editContent.startDate" style="width: 100%;" size="small"></el-date-picker>
              </el-form-item>
              <el-form-item label="单位地址" prop="unitAddress">
                <el-cascader placeholder="" v-model="editContent.unitAddress" :options="options" filterable change-on-select size='small'></el-cascader>
              </el-form-item>
              <el-form-item label="" prop="unitAddressSpecific">
                <el-input size="small" v-model="editContent.unitAddressSpecific"></el-input>
              </el-form-item>
              <el-form-item label="单位电话">
                <el-input size="small" v-model="ruleForm.loanName"></el-input>
              </el-form-item>
              <el-form-item label="每月薪资(元)" prop="aMonthlySalary">
                <el-input size="small" v-model="editContent.aMonthlySalaryr"></el-input>
              </el-form-item>
              <el-form-item label="每月支薪日">
                <el-input size="small" v-model="ruleForm.repaymentName"></el-input>
              </el-form-item>
              <el-form-item label="其他收入(元)">
                <el-input size="small" v-model="ruleForm.repaymentName"></el-input>
              </el-form-item>
              <el-form-item label="每月总收入(元)">
                <el-input size="small" v-model="ruleForm.repaymentName"></el-input>
              </el-form-item>
              <div class="edit-title">个人资产情况</div>
              <el-form-item label="个人资产情况">
                <el-checkbox-group v-model="editContent.Assets">
                  <el-checkbox label="商品房"></el-checkbox>
                  <el-checkbox label="车辆"></el-checkbox>
                  <el-checkbox label="其他"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="其他收入(元)">
                <el-input size="small"></el-input>
              </el-form-item>
              <div class="edit-title">个人车辆信息</div>
              <el-table :data="car" style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="" label="车辆号码">
                </el-table-column>
                <el-table-column prop="" label="车辆品牌型号">
                </el-table-column>
                <el-table-column prop="" label="购买方式">
                </el-table-column>
                <el-table-column prop="" label="购买日期">
                </el-table-column>
                <el-table-column prop="" label="购买价格">
                </el-table-column>
              </el-table>
              <el-form-item label="车辆总数量(辆)">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="按揭数量(辆)">
                <el-input size="small"></el-input>
              </el-form-item>
              <div class="edit-title">个人房产信息</div>
              <el-table :data="car" style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="" label="房产地址">
                </el-table-column>
                <el-table-column prop="" label="共有权人">
                </el-table-column>
                <el-table-column prop="" label="购买方式">
                </el-table-column>
                <el-table-column prop="" label="面积(平方)">
                </el-table-column>
                <el-table-column prop="" label="购买日期">
                </el-table-column>
                <el-table-column prop="" label="预评估价格">
                </el-table-column>
              </el-table>
              <el-form-item label="房产总数量(处)">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="按揭数量(处)">
                <el-input size="small"></el-input>
              </el-form-item>
              <div class="edit-title">个人信贷历史</div>
              <el-table :data="car" style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="" label="贷款类型">
                </el-table-column>
                <el-table-column prop="" label="贷款机构">
                </el-table-column>
                <el-table-column prop="" label="贷款金额">
                </el-table-column>
                <el-table-column prop="" label="贷款日期">
                </el-table-column>
                <el-table-column prop="" label="每月还款额">
                </el-table-column>
                <el-table-column prop="" label="尚欠期数(月)">
                </el-table-column>
                <el-table-column prop="" label="尚欠余额">
                </el-table-column>
              </el-table>
              <el-form-item label="信用卡数量(张)">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="总额度(元)">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="已透支(元)">
                <el-input size="small"></el-input>
              </el-form-item>
              <div class="edit-title">配偶信息</div>
              <el-form-item label="配偶名称">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="工作单位">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="职务">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="单位电话">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="户口所在地">
                <el-cascader placeholder="" :options="options" filterable change-on-select size='small'></el-cascader>
              </el-form-item>
              <el-form-item label="">
                <el-input size="small"></el-input>
              </el-form-item>
              <el-form-item label="住宅电话">
                <el-input size="small"></el-input>
              </el-form-item>
              <div class="edit-title">其他联系人信息</div>
              <el-table :data="car" style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="" label="姓名">
                  <template scope="scope">
                    <el-input size="small"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="与申请人关系">
                  <template scope="scope">
                    <el-input size="small"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="手机号码">
                  <template scope="scope">
                    <el-input size="small"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="住宅电话">
                  <template scope="scope">
                    <el-input size="small"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="公职务">
                  <template scope="scope">
                    <el-input size="small"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="单位电话">
                  <template scope="scope">
                    <el-input size="small"></el-input>
                  </template>
                </el-table-column>
              </el-table>
              <el-form-item label="家人是否知道此贷款">
                <el-radio class="radio" v-model="editContent.radio" label="1">是</el-radio>
                <el-radio class="radio" v-model="editContent.radio" label="2">否</el-radio>
              </el-form-item>
              <br>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="ruleForm.opinion"></el-input>
              </el-form-item>
              <br>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="back">返回</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="业务信息" name="second">业务信息</el-tab-pane>
          <el-tab-pane label="客户资料" name="third">客户资料</el-tab-pane>
          <el-tab-pane label="受理意见" name="fourth">受理意见</el-tab-pane>
        </el-tabs>
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
          <el-table-column prop="serviceName" label="任务名称" width="200">
          </el-table-column>
          <el-table-column prop="name" label="客户名称" width="200">
          </el-table-column>
          <el-table-column prop="productName" label="产品名称" width="200">
          </el-table-column>
          <el-table-column prop="loanSubject" label="放款主体" width="200">
          </el-table-column>
          <el-table-column prop="money" label="申请金额(元)" width="200">
          </el-table-column>
          <el-table-column prop="term" label="申请期限" width="185">
          </el-table-column>
          <el-table-column prop="date" label="申请日期" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template scope="scope">
              <el-button @click="edit" size="small">处理</el-button>
              <el-button size="small">解锁</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="total" style="float: right;">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'business',
  data: () => ({
    car: [{
    }, {
    }, {
    }, {
    }],
    formInline: {
      name: '',
      id: '',
      idCard: ''
    },
    editContent: {
      // 客户名称
      name: '测试',
      // 身份证号码
      idCard: 330,
      // 手机号码
      tel: 123,
      // 分部
      branch: '',
      // 业务员
      salesman: '',
      // 婚姻状况
      status: '',
      // 现居住地址
      LivingAddress: '',
      // 现居住详细地址
      LivingAddressSpecific: '',
      // 工作单位
      workUnit: '',
      // 单位属性
      unitAttribute: '',
      // 所属行业
      industry: '',
      // 起始服务时间
      startDate: '',
      // 单位地址
      unitAddress: '',
      // 单位地址详细
      unitAddressSpecific: '',
      // 单位电话
      unitPhone: '',
      // 每月薪资
      aMonthlySalary: '',
      // 其他联系人名字
      otherName: '',
      // 个人资产
      Assets: ''
    },
    rules: {
      name: [
        { required: true, message: '姓名不能为空' },
        { min: 2, max: 5, message: '长度在 2 到 5 个字符' }
      ],
      idCard: [
        { required: true, message: '身份证号不能为空' },
        { type: 'number', message: '身份证号必须为数字' }
      ],
      tel: [
        { required: true, message: '手机号码不能为空' },
        { type: 'number', message: '手机号码必须为数字' }
      ],
      branch: [
        { required: true, message: '请选择分部' }
      ],
      salesman: [
        { required: true, message: '姓名不能为空' },
        { min: 2, max: 5, message: '长度在 2 到 5 个字符' }
      ],
      status: [
        { required: true, message: '请选择婚姻状况' }
      ],
      LivingAddress: [
        { required: true, message: '请选择现居住地址' }
      ],
      LivingAddressSpecific: [
        { required: true, message: '详细地址不能为空' }
      ],
      workUnit: [
        { required: true, message: '工作单位不能为空' }
      ],
      unitAttribute: [
        { required: true, message: '单位属性不能为空' }
      ],
      industry: [
        { required: true, message: '所属行业不能为空' }
      ],
      startDate: [
        { required: true, message: '起始服务时间不能为空' }
      ],
      unitAddress: [
        { required: true, message: '请选择单位地址' }
      ],
      unitAddressSpecific: [
        { required: true, message: '单位详细地址不能为空' }
      ],
      aMonthlySalary: [
        { required: true, message: '不能为空' },
        { type: 'number', message: '必须为数字' }
      ]
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
    // 每页对应的数据
    dataList: [],
    // 是否显示加载
    listLoading: false,
    // 数据总条数
    total: 0,
    // 当前页
    currentPage: 1,
    // 是否编辑
    isEdit: false,
    // 选项卡
    activeName: 'first'
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
      this.axios.get(this.api.loan.business, {
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
    edit() {
      this.isEdit = true
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(formName) {
      console.log(this.editContent.tel)
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

<style scoped>
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
  background: #F1F1F1;
  width: auto;
  padding: 10px;
  margin-top: 1rem;
  margin-bottom: 2rem;
  color: #666;
  font-size: 13px;
  margin-top: -0.1rem;
}

.el-textarea {
  width: 600px;
}
</style>
