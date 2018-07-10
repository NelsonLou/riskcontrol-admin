<template>
<div id="product-type">
  <div class="typebox" v-if="showstatus">
    <div class="group-line searchbox">
      <div style="display:inline-block">
        <el-input placeholder="请输入产品类型" v-model="criteria" style="padding-bottom:10px;">
        </el-input>
        <el-button type="primary" icon='search'  @click='handleSearch' style="margin-left:10px;">搜索</el-button>
        </div> 
      <el-button @click="handleListAdd" type="primary" icon="plus" style="margin-left:10px">新增</el-button>
    </div>
		
    <!-- 列表-分页 -->
    <wk-table-paging check-box :loading="loading" :columns="columns" :table-data="tableData" :total-count="total" @selection-change="handleSelectAll" @current-change="handleCurrentChange">
      <el-table-column label="操作" width="250" >
        <template scope="scope" style="text-align:center" class="dobtn">
            <el-button  size="small" icon="edit" type="info" @click="handleEditInfo(scope.$index,scope.row)" >修改</el-button>
            <el-button  size="small" icon="delete" type="danger" @click="handleSingleDelete(scope.$index,scope.row)" >删除</el-button>
            <el-button  size="small" icon="warning" type="warning">禁用</el-button>
        </template>
      </el-table-column>
      <template slot="foot">
        <el-button :disabled="this.selfs.length === 0" @click="batchRemove" icon="delete" type="danger">批量删除</el-button>
      </template>
    </wk-table-paging>

  </div>

  <!--编辑或者新增 -->
  <div class="editbox" scope="scope" v-if="editstatus">
     <div class="typebox editinfobox" style="position:relative;">
  		  <p class="title">
          <span>基本信息</span>
        </p>
  			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" style="max-width:calc(100% - 20px);-webkit-max-width:calc(100% - 20px);-moz-max-width:calc(100% - 20px);margin-left:20px">
  				<el-form-item label="设置公司" prop="company" >
  					<el-select v-model="ruleForm.company" placeholder="请选择公司类型" class="">
  						<el-option label="shanghai" value="shanghai"></el-option>
  						<el-option label="beijing" value="beijing"></el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item label="产品类型" prop="protype" >
  					<el-select v-model="ruleForm.protype" placeholder="请选择产品类型" class="">
  						<el-option label="shanghai" value="shanghai"></el-option>
  						<el-option label="beijing" value="beijing"></el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item label="分类" prop="sort" >
  					<el-select v-model="ruleForm.sort" placeholder="请选择分类" class="">
  						<el-option label="shanghai" value="shanghai"></el-option>
  						<el-option label="beijing" value="beijing"></el-option>
  					</el-select>
  				</el-form-item>
  				<el-form-item label="适用于" prop="checkList" >
  					<el-checkbox-group v-model="ruleForm.checkList" style="">
              <el-checkbox v-for="item in checkList" :label="item" :key="item"></el-checkbox>
  					</el-checkbox-group>
  				</el-form-item>
          <el-form-item label="滞纳金" prop="lateFree">
            <el-input v-model.number="ruleForm.lateFree" placeholder="请输入滞纳金" style="width:auto"></el-input>
          </el-form-item>
          <el-form-item label="违约金" prop="damages">
            <el-input v-model.number="ruleForm.damages" placeholder="请输入违约金" style="width:auto"></el-input>
          </el-form-item>      
          <el-form-item v-for="(item, index) in ruleForm.content" :key="index" :label="item.label" :prop="item.prop" scope class="xinqian" label-width="95px">
            <el-checkbox v-model="item.radio.model" :checked="item.radio.status == 1" :label="item.radio.label"></el-checkbox>
  					<el-select v-for='(it, ids) in item.options' :key="ids" v-model="it.model" :placeholder="it.palceholder" class="" style="margin-right:5px">
              <el-option v-for="(op,oid) in it.sort" :key="oid" :label="op.label" :value="op.value">{{op.value}}</el-option>
  					</el-select>
            <el-input v-model="item.input.model" placeholder="" style="width:auto"></el-input>
            </br>
            <label>(注:按比率输入0.01即1%，按照绝对金额100元即100元)</label>
          </el-form-item>   
          <el-button type="primary" style="" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="goshowlist">返回</el-button> 
  			</el-form>
  	 </div>
  </div>

</div>
</template>
<script>
import FormJson from './formData/productType'
import {mapState} from 'vuex'
import fn from './../risk/functions'
import * as api from '@/api'
export default {
  name: 'product-type',
  data: () => ({
    criteria: '',
    tableData: [], // 数据源
    currentPage: 1, // 初始化当前页
    pageSize: 10, // 初始化当前页每页显示条数
    total: 0, // 初始化当前数据总数为0
    loading: false, // init loading status
    selfs: [], // 被选中列表
    ruleForm: [],
    params: {
      page: 1,
      limit: 10,
      protype: ''
    },
    checkList: ['日常生活消费', '提高生活质量', '购物', '教育支出', '医疗', '其他'],
    // ruleForm: {},
    // 列表显示状态
    showstatus: true,
    // 便捷页面显示状态
    editstatus: false,
    dialogVisible: false // 模态昆仑框状态
  }),
  computed: {
    ...mapState({
      // 验证规则
      rules: state => state.product.typerules
    }),
    columns () {
      return FormJson.columns
    }
  },
  mounted() {
    // this.getProduct()
  },
  methods: {
    // 获取产品类型信息
    getProduct: function() {
      var that = this
      that.loading = true
      var params = that.params
      this.axios.get('/products', {
         params
      }).then(res => {
        var result = res.data
        if (result.code === 1) {
            that.loading = false
            that.tableData = result.data.products
            that.total = result.data.total
        } else {
            that.loading = false
            that.tableData = []
            that.total = 0
        }
      }).catch(error => {
         console.log(error)
      })
    },
    // 翻页
    handleCurrentChange: function(val) {
      var that = this
      that.loading = true
      that.currentPage = val
      that.params.page = val
      this.getProduct()
    },
    // 编辑单条记录
    handleEditInfo: function(index, row) {
      var that = this
      that.showstatus = false
      that.editstatus = true
      that.dialogVisible = true
      this.ruleForm = Object.assign({}, row)
    },
    // 产品类型搜索
    handleSearch: function() {
      let that = this
      that.loading = true
      that.params.protype = that.criteria
      this.getProduct()
    },
    // 当前页全选
    handleSelectAll: function (selfs) {
      var that = this
      that.selfs = selfs
    },
    // 删除单个用户
    handleSingleDelete: function(index, row) {
      var that = this
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
         that.loading = true
         fn.handleRemoveTableData(api.product.pTypeSRemove, {id: row.id}, res => {
            that.loading = false
            var code = res.data.code
            var msg = res.data.message
            if (code === 1) {
              that.getProduct()
              this.$message.success(msg)
            } else {
              this.$message.error(msg)
            }
         })
      }).catch(() => {})
    },
    // 批量删除记录
    batchRemove: function() {
      var that = this
      var ids = this.selfs.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
         that.loading = true
         fn.handleRemoveTableData(api.product.pTypeRemove, {id: ids}, res => {
            that.loading = false
            var code = res.data.code
            var msg = res.data.message
            if (code === 1) {
              that.getProduct()
              this.$message.success(msg)
            } else {
              this.$message.error(msg)
            }
         })
      }).catch(() => {})
    },
    // 返回列表
    goshowlist: function() {
      var that = this
      that.editstatus = false
      that.showstatus = true
    },
    handleListAdd: function() {
      var that = this
      that.showstatus = false
      that.editstatus = true
      that.dialogVisible = true
      that.ruleForm = FormJson.FormJson
    },
    // 编辑或者添加时表单验证
    submitForm(formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.showstatus = true
          that.editstatus = false
          that.loading = true
          let para = Object.assign({}, this.ruleForm)
          var editapi = para.id ? 'pedit' : 'padd'
          this.axios.post(editapi, {
            id: para.id,
            company: para.company,
            protype: para.protype,
            sort: para.sort,
            checkList: para.checkList,
            lateFree: para.lateFree,
            damages: para.damages,
            createtime: '2017-08-09 10:42:50',
            creater: 'xinqian',
            updatetime: '2017-08-09 10:42:50',
            content: para.content
          }).then(res => {
            that.loading = true
            var data = res.data
            var code = data.code
            var message = data.message
            if (code === 1) {
              that.loading = false
              this.$message.success(message)
              this.getProduct()
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
#product-type {
	background-color:#fff;
	padding:10px;
  .tablecontent{
    .el-button{
      margin-top: 5px;
      padding:4px 6px;
    }
    .el-table__row td:last-child .cell{
      padding: 0;
      text-align: center;
    }
  }
	.typebox .searchbox{
			width: 100%;
      .el-input{width:250px}
	}
	.block{
    margin-top: 10px;
  }
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
    padding:0;
    border:none;
    cursor:pointer;
    padding:10px
  }
}
.editbox .el-dialog{width:60%}
@media only screen and (max-width: 1800px){
	.el-button+.el-button{margin: 5px 0 5px 0}
}
</style>
