<template>
<div id="product-list">
  <div class="listbox" v-if="showstatus">
  	<div class="group-line searchbox">
			<div style="display:inline-block">
				<el-input placeholder="请输入产品名称" v-model="criteria" style="padding-bottom:10px;">
				</el-input>
        <el-button type="primary" icon='search'  @click='handleSearch' style="margin-left:10px;">搜索</el-button>
				</div> 
			<el-button @click="handleListAdd" type="primary" icon="plus" style="margin-left:10px">新增</el-button>
  	</div>

    <!-- 列表-分页 -->
    <wk-table-paging check-box :loading="loading" :columns="columns" :table-data="tableData" :total-count="total" @selection-change="handleSelectAll" @current-change="handleCurrentChange">
      <el-table-column label="操作" width="220" fixed="right">
        <template scope="scope" style="text-align:center" class="dobtn">
            <el-button  size="small" icon="edit" type="info" @click="handleCalculate(scope.$index,scope.row)">计息规则</el-button>
            <el-button  size="small" icon="edit" type="info" @click="handleEditInfo(scope.$index,scope.row)" >修改</el-button>
            <el-button  size="small" icon="delete" type="danger" @click="handleSingleDelete(scope.$index,scope.row)" >删除</el-button>
            <el-button  size="small" icon="edit" type="info" >克隆</el-button>
            <el-button  size="small" icon="edit" type="info" >提前结算公式</el-button>
            <el-button  size="small" icon="warning" type="info">禁用</el-button>
        </template>
      </el-table-column>
      <template slot="foot">
        <el-button :disabled="this.selfs.length === 0" @click="batchRemove" icon="delete" type="danger">批量删除</el-button>
      </template>
    </wk-table-paging>



  </div>
  <!--编辑、  -->
  <div class="editbox" scope="scope" v-if="editstatus">
      <div class="listbox editinfobox"  style="">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="计息规则" name="first"></el-tab-pane>
          <el-tab-pane label="修改" name="second"></el-tab-pane>
          <el-tab-pane label="角色管理" name="third">提前结算公式</el-tab-pane>
        </el-tabs>
        <!-- 、计息规则 -->
        <div style="margin-top:-20px" v-show="activeName == 'first'">
          <el-col class="toptips">基本信息</el-col>
          <el-form :model="ruleFormjx.content" :rules="rules" ref="ruleFormjx.content" label-width="120px"  class="demo-ruleForm" style="max-width:100%">
            <el-form-item v-for="(item, index) in ruleFormjx.content.items" :label="item.label" :prop="item.prop" :key="index" >
              <el-select  v-model="item.select.model" :placeholder="item.select.placeholder" class="" :disabled="item.select.disabled">
                <el-option v-for="(op,oi) in item.select.options" :key="oi" :label="op.label" :value="op.value"></el-option>
              </el-select>
            </el-form-item>
          <el-col class="toptips">基本信息</el-col>
            <el-form-item v-for="(set,is) in ruleFormjx.content.settings" :label="set.label" :prop="set.prop"  :key="is">
              <el-input v-for="(ip,ix) in set.input" v-model="ip.model"  :placeholder="ip.placeholder" :key="ix" style="width:auto;margin-right:10px" :disabled="ip.disabled"></el-input>
              <label>{{set.labelcontent}}</label>
            </el-form-item>

            <el-form-item label="月利息公式" prop="monthCal">
              <el-input type="textarea" v-model="monthCal" style="width:550px;"></el-input>
            </el-form-item> 
            <el-button type="primary" style="margin-left:120px" @click="submitForm('ruleFormjx')">确认</el-button>
            <el-button @click="goshowlist">返回</el-button>        
          </el-form>
        </div>    

        <!-- 修改 -->
        <div style="margin-top:-20px" v-show="activeName == 'second'">
          <el-col class="toptips">基本信息</el-col>
          <el-form :model="ruleFormjx" :rules="rules" ref="ruleFormjx" label-width="120px"  class="demo-ruleForm" style="max-width:100%">
            <el-form-item label="设置公司" prop="company" >
              <el-select v-model="ruleFormjx.company" placeholder="请选择公司类型" class="">
                <el-option label="shanghai" value="shanghai"></el-option>
                <el-option label="beijing" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品类型" prop="protype" >
              <el-select v-model="ruleFormjx.protype" placeholder="请选择产品类型" class="">
                <el-option label="shanghai" value="shanghai"></el-option>
                <el-option label="beijing" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="滞纳金" prop="lateFree">
              <el-input v-model.number="ruleFormjx.lateFree" placeholder="请输入滞纳金" style="width:auto"></el-input>
            </el-form-item>
            <el-form-item label="违约金" prop="damages">
              <el-input v-model.number="ruleFormjx.damages" placeholder="请输入违约金" style="width:auto"></el-input>
            </el-form-item>      
            <el-form-item v-for="(item, indexs) in ruleFormjx.content2" :key="indexs" :label="item.label" :prop="item.prop" scope class="xinqian" label-width="120px">
              <el-input v-model="item.input.model" placeholder="" style="width:auto"></el-input>
              <label>(注:按比率输入0.01即1%，按照绝对金额100元即100元)</label>
            </el-form-item>   
            <el-button type="primary" style="margin-left:120px" @click="submitForm('ruleFormjx')">确认</el-button>
            <el-button @click="goshowlist">返回</el-button>
           
          </el-form>
        </div>   
      </div>
  </div>

</div>
</template>
<script>
import ProductList from './formData/productList'
import fn from '@/pages/risk/functions'
import * as api from '@/api'
export default {
  name: 'product-list',
  data: () => ({
    showstatus: true, // 列表显示状态
    dialogVisible: false, // 编辑页显示状态
    editstatus: false,
    loading: false, // layout初始化
    criteria: '', // 搜索条件
    para: {
      page: 1, // 初始化当前页
      limit: 10, // 初始化每页条数
      name: '' // 产品名称初始化
    },
    tableData: [], // 初始化列表数据
    total: 0, // 数据总数
    selfs: [], // 批量删除时数据暂存区
    activeName: 'first',
    monthCal: '{A/C}',
    ruleFormjx: []
  }),
  // 页面初始化数据加载
  mounted() {
    let that = this
    // this.handleGetTableData()
    that.ruleFormjx = []
  },
  computed: {
    rules () {
      return ProductList.JXformRules.rules
    },
    columns () {
      return ProductList.columns
    }
  },
  methods: {
    // 获取表单数据
    handleGetTableData() {
      let that = this
      that.loading = true
      fn.handleGetTableData(api.product.pList, that.para, res => {
        let data = res.data.data
        let code = res.data.code
        if (code === 1) {
          that.tableData = data.data
          that.total = data.total
          that.loading = false
        }
      })
    },
    // 搜索记录
    handleSearch: function() {
      let that = this
      that.para.name = that.criteria
      this.handleGetTableData()
    },
    // 增加记录
    handleListAdd: function() {
      let that = this
      that.showstatus = false
      that.editstatus = true
    },
    // 编辑记录
    handleEditInfo: function(index, row) {
      let that = this
      that.showstatus = false
      that.editstatus = true
      that.activeName = 'second'
      that.dialogVisible = true
      that.ruleFormjx = row
    },
    // 删除单条记录
    handleSingleDelete: function(index, row) {
      let that = this
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        fn.handleRemoveTableData(api.product.pListSremove, {id: row.id}, (res) => {
           that.loading = false
           this.handleGetTableData()
        })
      }).catch(() => {

      })
    },
    // 批量选中
    handleSelectAll: function(selfs) {
      let that = this
      that.selfs = selfs
    },
    // 批量删除
    batchRemove: function() {
      let that = this
      let ids = that.selfs.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        fn.handleRemoveTableData(api.product.pListPremove, {id: ids}, (res) => {
           that.loading = false
           this.handleGetTableData()
        })
      }).catch(() => {

      })
    },
    // 页面切换（翻页）
    handleCurrentChange: function(val) {
      let that = this
      that.para.page = val
      this.$store.state.product.loading = true
      this.handleGetTableData()
    },
    // 计息规则
    handleCalculate: function(index, row) {
      let that = this
      that.showstatus = false
      that.editstatus = true
      that.activeName = 'first'
      that.dialogVisible = true
      that.ruleFormjx = row
    },
    handleClick: function(tab, event) {
    },
    // 返回
    goshowlist: function() {
      var that = this
      that.editstatus = false
      that.showstatus = true
    },
    // 编辑或者添加时表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('success submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button+.el-button{
  margin: 2px 0 2px 0
}
#product-list {
	background-color:#fff;
	padding:10px;
	.listbox .searchbox{
			width: 100%;
      .el-input{width:250px}
		}
	.block{
    margin-top: 10px
  }
	.el-button+.el-button{
    margin-top: 5px
  }
  .el-card__body{padding-top: 0}
}
.editinfobox{
	margin:0;padding:0;
	.title{
		-webkit-margin-before:0;
    -webkit-margin-after:0;
    -webkit-margin-start:0;
    -webkit-margin-end:0;
		span{
      padding: 5px;
      border-bottom: 2px solid #0b8ff1
    }
	}
	.el-form{margin-top:20px}
  .goback{
    position:absolute;
    right:5px;top:-5px;
    padding:0;border:none;
    cursor:pointer;
    padding:10px
  }
  .el-col{
    width: 100%;
    height: 40px;
    line-height:40px;
    background-color:#eee;
    color:#333
  }
  .el-card .el-card__body{
    padding:0
  }
  .toptips{margin-bottom:20px;text-indent:10px}
}
.editbox .el-dialog{width:60%}

@media only screen and (max-width: 1800px){
	.el-button+.el-button{margin: 2px 0 2px 0}
}
</style>
