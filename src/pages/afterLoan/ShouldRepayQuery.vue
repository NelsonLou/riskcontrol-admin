<template>
<div id="should-repay-query">
  应还信息查询
  <!-- <el-card class="box-card"> -->
    <!--工具条-->
    <!-- <div slot="header" class="card-header">
      <el-form :model="filters" :inline="true" class="header-left" style="max-width:1550px">
        <el-form-item>
          <el-input v-model="filters.username" placeholder="客户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.userNO" placeholder="客户编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.idNO" placeholder="身份证"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" @click="getShouldRepay" type="primary"></el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <!-- 列表-分页 -->
    <!-- <wk-table-paging :loading="listLoading" :table-data="shouldRepayList" :columns="columns" :total-count="total" @current-change="handleCurrentChange">
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button @click="handleDetail(scope.$index, scope.row)" size="small" type="text">业务信息</el-button>
        </template>
      </el-table-column>
    </wk-table-paging>
  </el-card> -->

  <!-- 查看详情 -->
  <!-- <el-dialog title="应还信息详细" :visible="editFormVisible" :before-close="handleClose" size="large" class="serviceInfo">
    <el-tabs v-model="activeCard" type="card" @tab-click="handleCard">
      <el-tab-pane label="客户信息" name="customerInfo">
        <h4>申请人基本信息</h4>
        <el-row>
          <el-col :span="3" class="label">客户编号</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">客户姓名</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">身份证号码</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">手机号码</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">受教育程度</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">婚姻状况</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">年龄</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">性别</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">来本地时间</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">子女数</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">子女是否在申请地读书或就业</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">社保电脑号</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">现居住地址</el-col>
          <el-col :span="21">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">户口所在地</el-col>
          <el-col :span="21">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">居住状况</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">电子邮箱</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">QQ号码</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">备注</el-col>
          <el-col :span="21">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>

        <h4>职业信息</h4>
        <el-row>
          <el-col :span="3" class="label">工作单位</el-col>
          <el-col :span="13">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">单位属性</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">所属行业</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">职位级别</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
          <el-col :span="3" class="label">起始服务时间</el-col>
          <el-col :span="5">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">单位地址</el-col>
          <el-col :span="21">
            <p class="formData">{{inputText}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">单位电话</el-col>
          <el-col :span="5">
            <p class="formData">0</p>
          </el-col>
          <el-col :span="3" class="label">每月薪资(元)</el-col>
          <el-col :span="5">
            <p class="formData">0</p>
          </el-col>
          <el-col :span="3" class="label">每月支薪日</el-col>
          <el-col :span="5">
            <p class="formData">0</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">每月总收入(元)</el-col>
          <el-col :span="21">
            <p class="formData">0</p>
          </el-col>
        </el-row>

        <h4>个人资产情况</h4>
        <el-row>
          <el-col :span="3" class="label">个人资产情况</el-col>
          <el-col :span="21">
            <p class="formData">
              <el-checkbox-group v-model="personalAssetsChecked">
                <el-checkbox label="商品房" disabled></el-checkbox>
                <el-checkbox label="车辆" disabled></el-checkbox>
                <el-checkbox label="其他" disabled></el-checkbox>
              </el-checkbox-group>
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">其他收入(元)</el-col>
          <el-col :span="21">
            <p class="formData">0</p>
          </el-col>
        </el-row>

        <h4>个人车辆信息</h4>
        <el-table :data="pCarInfo" highlight-current-row>
          <el-table-column type="index" label="NO" width="100"></el-table-column>
          <el-table-column prop="carNumber" label="车辆号码" min-width="200"></el-table-column>
          <el-table-column prop="carVersion" label="车辆品牌型号" min-width="200"></el-table-column>
          <el-table-column prop="buyWay" label="购买方式" min-width="200"></el-table-column>
          <el-table-column prop="buyDate" label="购买日期" min-width="200"></el-table-column>
          <el-table-column prop="buyPrice" label="购买价格" min-width="200"></el-table-column>
        </el-table>
        <el-row>
          <el-col :span="3" class="label">车辆总数量(辆)</el-col>
          <el-col :span="9">
            <p class="formData">0</p>
          </el-col>
          <el-col :span="3" class="label">按揭数量(辆)</el-col>
          <el-col :span="9">
            <p class="formData">0</p>
          </el-col>
        </el-row>

        <h4>个人房产信息</h4>
        <el-table :data="pHouseInfo" highlight-current-row>
          <el-table-column type="index" label="NO" width="100"></el-table-column>
          <el-table-column prop="address" label="房产地址" min-width="200"></el-table-column>
          <el-table-column prop="rightsHolder" label="共有权人" width="200"></el-table-column>
          <el-table-column prop="buyWay" label="购买方式" width="200"></el-table-column>
          <el-table-column prop="area" label="面积" width="200"></el-table-column>
          <el-table-column prop="buyPrice" label="购买价格" width="200"></el-table-column>
        </el-table>
        <el-row>
          <el-col :span="3" class="label">房产总数量(处)</el-col>
          <el-col :span="9">
            <p class="formData">0</p>
          </el-col>
          <el-col :span="3" class="label">按揭数量(处)</el-col>
          <el-col :span="9">
            <p class="formData">0</p>
          </el-col>
        </el-row>

        <h4>个人信贷历史</h4>
        <el-table :data="pCreditHistory" highlight-current-row>
          <el-table-column type="index" label="NO" width="100"></el-table-column>
          <el-table-column prop="department" label="贷款类型" min-width="150"></el-table-column>
          <el-table-column prop="contractNO" label="贷款机构" min-width="150"></el-table-column>
          <el-table-column prop="userNO" label="贷款金额" min-width="150"></el-table-column>
          <el-table-column prop="username" label="贷款日期" min-width="150"></el-table-column>
          <el-table-column prop="idNO" label="每月还款额" min-width="150"></el-table-column>
          <el-table-column prop="username" label="尚欠期数(月)" min-width="150"></el-table-column>
          <el-table-column prop="idNO" label="尚欠余额" min-width="150"></el-table-column>
        </el-table>
        <el-row>
          <el-col :span="3" class="label">信用卡总张数(张)</el-col>
          <el-col :span="5">
            <p class="formData">0</p>
          </el-col>
          <el-col :span="3" class="label">总额度(元)</el-col>
          <el-col :span="5">
            <p class="formData">0</p>
          </el-col>
          <el-col :span="3" class="label">已透支(元)</el-col>
          <el-col :span="5">
            <p class="formData">0</p>
          </el-col>
        </el-row>

        <h4>配偶信息</h4>
        <el-row>
          <el-col :span="3" class="label">配偶名称</el-col>
          <el-col :span="5">
            <p class="formData">0</p>
          </el-col>
          <el-col :span="3" class="label">身份证号码</el-col>
          <el-col :span="5">
            <p class="formData">0</p>
          </el-col>
          <el-col :span="3" class="label">手机号码</el-col>
          <el-col :span="5">
            <p class="formData">0</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">工作单位</el-col>
          <el-col :span="21">
            <p class="formData">0</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">职务</el-col>
          <el-col :span="9">
            <p class="formData">0</p>
          </el-col>
          <el-col :span="3" class="label">单位电话</el-col>
          <el-col :span="9">
            <p class="formData">0</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">住宅地址</el-col>
          <el-col :span="21">
            <p class="formData">0</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">住宅电话</el-col>
          <el-col :span="21">
            <p class="formData">0</p>
          </el-col>
        </el-row>

        <h4>其他联系人信息</h4>
        <el-row>
          <el-col :span="3" class="label">家人是否知道此贷款</el-col>
          <el-col :span="21">
            <p class="formData">0</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="label">备注</el-col>
          <el-col :span="21">
            <p class="formData">0</p>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="业务信息" name="serviceInfo">业务信息</el-tab-pane>
      <el-tab-pane label="放款条件" name="termsOfLoan">放款条件</el-tab-pane>
      <el-tab-pane label="审核记录" name="auditList">审核记录</el-tab-pane>
      <el-tab-pane label="评审意见" name="reviewerComment">评审意见</el-tab-pane>
      <el-tab-pane label="还款计划" name="repayPlan">还款计划</el-tab-pane>
      <el-tab-pane label="还款记录" name="repayHistory">还款记录</el-tab-pane>
      <el-tab-pane label="催收记录" name="urgeRecords">催收记录</el-tab-pane>
      <el-tab-pane label="提醒记录" name="remindRecords">提醒记录</el-tab-pane>
      <el-tab-pane label="业务文档" name="businessDoc">业务文档</el-tab-pane>
      <el-tab-pane label="考察记录" name="inspectRecords">考察记录</el-tab-pane>
      <el-tab-pane label="项目进度" name="projectSchedule">项目进度</el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">返 回</el-button>
    </span>
  </el-dialog> -->
</div>
</template>

<script>
import * as api from '@/api'

export default {
  name: 'should-repay-query',
  data: () => ({
    // 表格列数据
    columns: [{
        value: 'department',
        label: '营业部',
        width: 120
      },
      {
        value: 'contractNO',
        label: '合同编号',
        minw: 150
      },
      {
        value: 'userNO',
        label: '客户编号',
        width: 100
      },
      {
        value: 'username',
        label: '客户名称',
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
        value: 'periods',
        label: '期数',
        width: 70
      },
      {
        value: 'repayDate',
        label: '应还日期',
        width: 120
      },
      {
        value: 'hadRepay',
        label: '已还金额',
        width: 100
      },
      {
        value: 'shouldRepay',
        label: '应还金额',
        width: 100
      },
      {
        value: 'state',
        label: '状态',
        width: 120,
        sortable: true,
        formatter: row => row.state === 1 ? '已还' : '未还'
      }
    ],
    pCarInfo: [],
    pHouseInfo: [],
    pCreditHistory: [],
    personalAssetsChecked: ['商品房', '车辆'],
    inputText: '330111222233334444',
    // 筛选关键字
    filters: {
      username: '',
      userNO: '',
      idNO: ''
    },
    // 加载状态
    listLoading: false,
    // 列表
    shouldRepayList: [],
    total: 0,
    limit: api.config.limit,
    page: 1,
    // 是否显示详情
    editFormVisible: false,
    activeCard: 'customerInfo'
  }),
  mounted() {
    // this.getShouldRepay()
  },
  methods: {
    // 获取列表
    getShouldRepay() {
      this.listLoading = true
      // 请求参数
      const para = {
        page: this.page,
        limit: this.limit,
        name: this.filters.username
      }
      this.axios.get(api.afterLoan.getShouldRepay, {
        params: para
      }).then(res => {
        this.listLoading = false
        console.log('获取列表', res)
        const {
          code,
          msg,
          data
        } = res.data
        if (code === 1) {
          // 获取请求返回数据
          this.shouldRepayList = data.shouldRepay
          this.total = data.total
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
      this.getShouldRepay()
    },
    handleDetail(index, row) {
      console.log(index, row)
      // this.listLoading = true
      this.editFormVisible = true
    },
    handleClose() {
      this.editFormVisible = false
    },
    handleCard(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
#should-repay-query {}
.formData {
    margin: 0;
    background: #eee;
    padding: 0 10px;
}
.serviceInfo .el-row {
    line-height: 30px;
    margin: 6px 0;
    font-size: 14px;
}
.serviceInfo .label {
    padding-left: 16px;
}
</style>
