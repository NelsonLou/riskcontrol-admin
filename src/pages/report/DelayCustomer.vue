<template>
	<div id="delay-customer">
		<el-card class="box-card">
			<div slot="header" class="card-header">
				<p class="export-prompt">由于金额计算量比较大，故导出exle时需要较长时间，建议分批（分部门）导出</p>
				<el-form :model="filters" :inline = "true" class="header-left">
					<el-form-item label = "部门:">
						<el-select v-model="filters.address" placeholder="请选择">
						  <el-option v-for="(item,key) in addressData" :key="key" :value="item.id" :label='item.addressName'></el-option>
						</el-select>
					</el-form-item>
          </el-form>
          <el-form :model="filters" :inline = "true" class="header-left">
					<el-form-item label="客户名称:">
						<el-input v-model="filters.keyword" placeholder="请输入姓名">
							<el-button slot="append" icon="search" @click="getUsers" type="primary">搜索</el-button>
						</el-input>
					</el-form-item>
				 </el-form>
			</div>
			
			<!--列表-->
			<div>
				<el-table v-loading.body="listLoading" :data="users"  highlight-current-row>
					<el-table-column prop="customerName" label="分部" width="120">
					</el-table-column>
					<el-table-column prop="collectionLot" label="回款批次" width="120">
					</el-table-column>				
					<el-table-column prop="name" label="客户姓名" width="120">
					</el-table-column>		
					<el-table-column prop="sex" label="性别" width="120" :formatter="formatSex">
            
					</el-table-column>
					
					<el-table-column prop="productType" label="产品类型" width="120">
					</el-table-column>
					
					<el-table-column prop="contractAmount" label="合同金额" width="120">
					</el-table-column>
					
					<el-table-column prop="appropriationAmount" label="批款金额" width="120">
					</el-table-column>
					
					<el-table-column prop="loanAmount" label="放款金额" width="120">
					</el-table-column>
					
					<el-table-column prop="loanTerm" label="贷款期限" width="120">
					</el-table-column>
					
					<el-table-column prop="loanDate" label="放款日期" min-width="120">
					</el-table-column>
					  
					<el-table-column prop="interest" label="利息" width="120">
					</el-table-column>
					
					<el-table-column prop="residualPrincipal" label="剩余本金" width="120">
					</el-table-column>
					
					<el-table-column prop="currentPeriod" label="当期期数" width="120">
					</el-table-column>
					
					<el-table-column prop="expectedNumber" label="已还期数" width="120">
					</el-table-column>
					
					<el-table-column prop="outstandingNumber" label="未还期数" width="120">
					</el-table-column>
					
					<el-table-column prop="overdueNumber" label="逾期期数" width="120">
					</el-table-column>
					
					<el-table-column prop="overdueDays" label="逾期天数" width="120">
					</el-table-column>
					
					<el-table-column prop="nowInterest" label="本期应还利息" width="120">
					</el-table-column>
					
					<el-table-column prop="lateFee" label="滞纳金" width="120">
					</el-table-column>
					
					<el-table-column prop="nowRepayment" label="本期已还款额" width="120">
					</el-table-column>
					
					<el-table-column prop="nowShould" label="本期应还款额" width="120">
					</el-table-column>
					
					<el-table-column prop="age" label="年龄" width="120">
					</el-table-column>
					
					<el-table-column prop="maritalStatus" :formatter="formatMaritalStatus" label="婚姻状况" width="120">
					</el-table-column>
					
					<el-table-column prop="education" :formatter="forEducation" label="学历" width="120">
					</el-table-column>
					
					<el-table-column prop="jobLevel" label="职位级别" width="120">
					</el-table-column>
					
					<el-table-column prop="unitAttribute" label="单位属性" width="120">
					</el-table-column>
					
					<el-table-column prop="salesman" label="业务员" width="120">
					</el-table-column>
					
					
				</el-table>
			</div>
			
			<!--分页-->
			<div class="toolbar">
				<el-pagination layout="total,prev,pager,next,jumper" :page-size="limit" :total="total" @current-change="handleCurrentChange" style="float:right"></el-pagination>
			</div>
		</el-card>

	</div>
</template>
<script>
  import * as api from '@/api'
  export default {
    name: 'delay-customer',
    data: () => ({
      filters: {
        keyword: '',
        address: ''
      },
      // 加载状态
      listLoading: false,
      // 用户列表
      users: [],
      total: 0,
      limit: api.config.limit,
      page: 1,
      addressData: ''
    }),
    mounted() {
      this.getUsers()
      this.getAddress()
    },
    methods: {
      // 性别转换
      formatSex: row => {
        return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '人妖'
      },
      // 婚姻状况转换
      formatMaritalStatus: row => {
       return row.maritalStatus === 1 ? '是' : row.maritalStatus === 2 ? '否' : ''
      },
      // 学历转换
      forEducation: row => {
        return row.education === 1 ? '高中' : row.education === 2 ? '大专' : '小学'
      },
    // 获取用户
    getUsers() {
        this.listLoading = true
        const para = {
            page: this.page,
            limit: this.limit,
            name: this.filters.keyword
        }
        this.axios.get(api.report.overdueUser, {
          params: para
        }).then(res => {
           this.listLoading = false
      const {
        code,
        msg,
        data
      } = res.data
      if (code === 1) {
        this.users = data.users
        this.total = data.total
       } else {
        this.$message.error(msg)
      }
        }).catch(errpr => {
      console.log(errpr)
     })
   },
   // 获取地区选项
   getAddress() {
    //  var _this = this
      this.axios.get('/addressName', {
      }).then(res => {
        console.log(res)
        this.addressData = res.data.data.address
        console.log(this.addressData)
      })
   },
  // 用户列表分页
  handleCurrentChange(val) {
    this.page = val
    this.getUsers()
  }
}
}
</script>
<style lang="scss" scoped>
	.export-prompt{
		font-size: 12px;
		color: red;
	}
</style>
