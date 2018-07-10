<template>
<div id="repay-query">
  还款情况查询
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
          <el-button icon="search" @click="getRepayQueryList" type="primary"></el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <!-- 列表-分页 -->
    <!-- <wk-table-paging :loading="listLoading" :table-data="repayQueryList" :columns="columns" :total-count="total" @current-change="handleCurrentChange">
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button @click="handleDetail(scope.$index, scope.row)" size="small" icon="edit" type="text">查看</el-button>
        </template>
      </el-table-column>
    </wk-table-paging>
  </el-card> -->

  <!-- 查看详情 -->
  <!-- <el-dialog title="还款情况详细" :visible="editFormVisible" :before-close="handleClose" size="large">
    <h4 style="margin-top:0">业务信息</h4>
    <el-row>
      <el-col :span="3" class="label">客户编号</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">客户姓名</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">放款主体</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">产品名称</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">申请金额(元)</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">申请期限(月)</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">审批金额</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">审批期限</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">身份证</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">客户来源</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">渠道来源</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">所属行业</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">现居住地址</el-col>
      <el-col :span="13">
        <el-cascader disabled expand-trigger="hover" :options="options" v-model="selectedOptions" change-on-select style="display:inline-block">
        </el-cascader>
        <el-input v-model="inputText" :disabled="true" style="width:300px"></el-input>
      </el-col>
      </el-col>
      <el-col :span="3" class="label">身份证</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">单位地址</el-col>
      <el-col :span="13">
        <el-cascader disabled expand-trigger="hover" :options="options" v-model="selectedOptions" change-on-select>
        </el-cascader>
        <el-input v-model="inputText" :disabled="true" style="width:300px"></el-input>
      </el-col>
      </el-col>
      <el-col :span="3" class="label">联系号码</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">客服员</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">业务员</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">团队</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">受理日期</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">分部</el-col>
      <el-col :span="5">
        <el-input v-model="inputText" :disabled="true"></el-input>
      </el-col>
      <el-col :span="3" class="label">黑名单级别</el-col>
      <el-col :span="5" style="line-height:36px">
        <el-radio disabled v-model="radio" label="yellow">黄色</el-radio>
        <el-radio disabled v-model="radio" label="red">红色</el-radio>
        <el-radio disabled v-model="radio" label="black">黑色</el-radio>
      </el-col>
    </el-row>
    <h4>还款计划</h4>
    <div style="height:300px;overflow:auto">
      <el-table :data="repayList" highlight-current-row>
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column type="index" label="期数" width="100">
        </el-table-column>
        <el-table-column prop="repayDate" label="还款日期" width="150">
        </el-table-column>
        <el-table-column prop="yinghan" label="应还总额(元)" width="150">
        </el-table-column>
        <el-table-column prop="yihuan" label="已还金额" width="150">
        </el-table-column>
        <el-table-column prop="jieqing" label="结清违约金" width="150">
        </el-table-column>
        <el-table-column prop="tiqian" label="提前结清还款金额(元)" min-width="150">
        </el-table-column>
        <el-table-column prop="state" label="状态" :formatter="formatRepayState" width="150">
        </el-table-column>
        <el-table-column prop="days" label="逾期天数" width="150">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
              <el-button size="small" type="text">查看</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <h4>扣款信息记录</h4>
    <div style="height:300px;overflow:auto">
      <el-table :data="deductionRecordList" highlight-current-row>
        <el-table-column type="index" label="NO" width="100">
        </el-table-column>
        <el-table-column prop="type" label="类型" :formatter="formatDeductionType" width="150">
        </el-table-column>
        <el-table-column type="index" label="期数" width="150">
        </el-table-column>
        <el-table-column prop="date" label="还款日期" width="150">
        </el-table-column>
        <el-table-column prop="repayWay" label="还款方式" :formatter="formatDeductionWay" width="150">
        </el-table-column>
        <el-table-column prop="charge" label="上门费" width="150">
        </el-table-column>
        <el-table-column prop="applyDT" label="申请时间" min-width="150">
        </el-table-column>
        <el-table-column prop="checkDT" label="审核时间" min-width="150">
        </el-table-column>
        <el-table-column prop="repay" label="还款金额" width="150">
        </el-table-column>
        <el-table-column prop="state" label="状态" :formatter="formatDeductionState" width="150">
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">返 回</el-button>
    </span>
  </el-dialog> -->
</div>
</template>

<script>
import * as api from '@/api'

export default {
  name: 'repay-query',
  data: () => ({
    // 表格列数据
    columns: [{
      value: 'department',
      label: '分部',
      width: 120
    }, {
      value: 'contractNO',
      label: '合同编号',
      minw: 200
    }, {
      value: 'username',
      label: '客户名称',
      width: 120
    }, {
      value: 'idNO',
      label: '身份证号码',
      width: 200
    }, {
      value: 'phoneNO',
      label: '手机号码',
      width: 130
    }, {
      value: 'loanFigure',
      label: '贷款金额(元)',
      width: 120
    }, {
      value: 'loanDeadline',
      label: '贷款期限(月)',
      width: 120
    }, {
      value: 'state',
      label: '状态',
      width: 120,
      sortable: true,
      formatter: row => row.state === 1 ? '需提醒' : '已提醒'
    }],
    options: [{
      value: 'zhinan',
      label: '指南',
      children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
          value: 'fankui',
          label: '反馈'
        }, {
          value: 'xiaolv',
          label: '效率'
        }, {
          value: 'kekong',
          label: '可控'
        }]
      }, {
        value: 'daohang',
        label: '导航',
        children: [{
          value: 'cexiangdaohang',
          label: '侧向导航'
        }, {
          value: 'dingbudaohang',
          label: '顶部导航'
        }]
      }]
    }, {
      value: 'zujian',
      label: '组件',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout 布局'
        }, {
          value: 'color',
          label: 'Color 色彩'
        }, {
          value: 'typography',
          label: 'Typography 字体'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio 单选框'
        }, {
          value: 'checkbox',
          label: 'Checkbox 多选框'
        }, {
          value: 'input',
          label: 'Input 输入框'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table 表格'
        }, {
          value: 'tag',
          label: 'Tag 标签'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert 警告'
        }, {
          value: 'loading',
          label: 'Loading 加载'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu 导航菜单'
        }, {
          value: 'tabs',
          label: 'Tabs 标签页'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog 对话框'
        }, {
          value: 'tooltip',
          label: 'Tooltip 文字提示'
        }]
      }]
    }, {
      value: 'ziyuan',
      label: '资源',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'jiaohu',
        label: '组件交互文档'
      }]
    }],
    selectedOptions: [],
    inputText: '330111222233334444',
    radio: 'red',
    // 筛选关键字
    filters: {
      username: '',
      userNO: '',
      idNO: ''
    },
    // 加载状态
    listLoading: false,
    // 列表
    repayQueryList: [],
    total: 0,
    limit: api.config.limit,
    page: 1,
    // 是否显示详情
    editFormVisible: false,
    repayList: [],
    deductionRecordList: []
  }),
  mounted() {
    // this.getRepayQueryList()
  },
  methods: {
    // 状态显示转换
    formatRepayState: row => {
      return row.state === 1 ? '已还款' : '未还款'
    },
    formatDeductionType: row => {
      return row.type === 1 ? '正常' : '异常'
    },
    formatDeductionWay: row => {
      return row.repayWay === 1 ? '划拨' : '转账'
    },
    formatDeductionState: row => {
      return row.state === 1 ? '成功' : row.state < 1 ? '失败' : '拒绝'
    },
    // 获取列表
    getRepayQueryList() {
      this.listLoading = true
      // 请求参数
      const para = {
        page: this.page,
        limit: this.limit,
        name: this.filters.username
      }
      this.axios.get(api.afterLoan.getRepayQueryList, {
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
          this.repayQueryList = data.repayQueryList
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
      this.getRepayQueryList()
    },
    handleDetail(index, row) {
      console.log(index, row)
      this.listLoading = true
      this.getRepayList()
      this.getDeductionRecord()
    },
    handleClose() {
      this.editFormVisible = false
    },
    getRepayList() {
      this.axios.get(api.afterLoan.getRepayList).then(res => {
        console.log('getRepayList', res)
        const {
          code,
          data
        } = res.data
        if (code === 1) {
          this.repayList = data.repayList
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getDeductionRecord() {
      this.axios.get(api.afterLoan.getDeductionRecord).then(res => {
        console.log('getDeductionRecord', res)
        this.listLoading = false
        this.editFormVisible = true
        const {
          code,
          data
        } = res.data
        if (code === 1) {
          this.deductionRecordList = data.deductionRecordList
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#repay-query {}
.label {
    line-height: 36px;
    text-align: right;
    padding-right: 10px;
}
.el-row {
    margin-bottom: 6px;
}
</style>
