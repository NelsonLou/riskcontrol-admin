<template>
  <div id="wk-form" v-show="show">
    <el-form class="wk-form" :model="formData" :rules="columns.formRule" ref="ruleForm" :inline="inline" :label-width="labelWidth">
      <p>{{ title }}</p>
      <el-table :data="formData[name]" stripe style="width: 100%" v-show="type == 'table'">
        <el-table-column v-for="(item, index) in columns[name]" :key="index" :prop="item.model" :label="item.label" :formatter="item.formatter">
      </el-table-column>
      </el-table>
      <el-form-item v-show="type != 'table'" class="wk-form-item" v-for="(item, index) in columns[name]" :key="index" :label="item.label" :prop="item.model">
        <el-input v-if="item.formType == 'search'" :icon="icon" :on-icon-click="clear" @keyup.enter.native="searchSubmit" v-model="formData[item.model]" :placeholder="item.placeholder"></el-input>
        <!-- 输入框 -->
        <el-input v-if="item.formType == 'number'" v-model.number="formData[item.model]" :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
        <!-- 文本域 -->
        <el-input v-if="item.formType == 'input'" :type="item.inputType || 'text'" v-model="formData[item.model]" :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
        <!-- 单选框 -->
        <el-radio-group v-if="item.formType == 'radio'" v-model="formData[item.model]">
          <el-radio v-for="(option, index) in item.options" :key="index" :label="option.label" :disabled="item.disabled">{{ option.value }}</el-radio>
        </el-radio-group>
        <!-- 多选框 -->
        <el-checkbox-group v-if="item.formType == 'checkbox'" v-model="formData[item.model]">
          <el-checkbox v-for="(option, index) in item.options" :key="index" :label="option.label" :disabled="item.disabled">{{ option.value }}</el-checkbox>
        </el-checkbox-group>
        <!-- 下拉框 -->
        <el-select v-if="item.formType == 'select'" v-model="formData[item.model]" :placeholder="item.placeholder" :disabled="item.disabled">
          <el-option v-for="(option, index) in item.options" :key="index" :label="option.label" :value="option.value" :disabled="option.disabled"></el-option>
        </el-select>
        <!-- 开关 -->
        <el-switch v-if="item.formType == 'switch'" v-model="formData[item.model]" on-text="" off-text=""></el-switch>
        <!-- 时间 -->
        <el-date-picker v-if="item.formType == 'date'" :type="item.dataType" v-model="formData[item.model]" :placeholder="item.placeholder" :disabled="item.disabled"></el-date-picker>
        <!-- 地址 -->
        <!-- <div class="address" v-if="item.formType == 'address'">
              <el-form-item :label="item.label">
                <el-cascader :options="columns.options" v-model="formData[item.selectedOptions]" :placeholder="item.placeholder" :disabled="item.disabled" filterable change-on-select></el-cascader>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="formData[item.modelEnd]" size="small" :disabled="true"></el-input>
              </el-form-item>
            </div> -->
      </el-form-item>
      <!-- 搜索 -->
      <el-form-item class="wk-search-btn" v-if="type == 'search'">
        <el-button type="primary" icon="search" @click="searchSubmit">查询</el-button>
      </el-form-item>
      <!-- 编辑 -->
      <el-form-item class="wk-edit-btn" v-if="type == 'edit' && submit">
        <el-button type="primary" @click="editSubmit" v-if="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'form',
  props: {
    title: String,
    name: String,
    submit: Boolean, // 判断是否显示保存按钮
    type: String, // 判断表单类型（搜索或编辑）
    labelWidth: String, // 表单域标签的宽度
    columns: Object, // 表单列表
    filters: Object, // 搜索字段
    inline: Boolean // 行内表单模式
  },
  data: () => ({
    // status: false,
    // 表单数据
    formData: {},
    // 禁用按钮
    // disabled: true
    show: true
  }),
  mounted() {
    // 设置搜索字段
    if (this.filters) {
      this.formData = Object.assign({}, this.filters)
    }
  },
  computed: {
    icon() {
      if (this.formData.keyword !== '') {
        return 'close'
      } else return ''
    }
  },
  methods: {
    // 获取编辑数据
    getEditData(url, para, info) {
      this.$store.state.app.loading = true
      // this.disabled = true
      // setTimeout(() => {
      this.axios.get(url, {
        params: para
      }).then(res => {
        // this.disabled = false
        const {
          data
        } = res.data
        this.formData = Object.assign({}, data[info])
        // if (this.formData.status === 1) {
        //   this.status = true
        // } else {
        //   this.status = false
        // }
        this.formData.loan_product_id === 1 ? this.$store.state.app.overdue_show = true : this.$store.state.app.overdue_show = false
        this.$store.state.app.loading = false
      })
      // }, 100)
    },
    // 提交搜索表单
    searchSubmit() {
      this.$emit('click', this.formData)
    },
    // 提交编辑表单
    editSubmit() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 返回列表
    back() {
      this.$emit('click', false)
    },
    clear() {
      this.formData.keyword = ''
      this.$emit('clear')
    }
  }
}
</script>
<style lang="scss">
#wk-form {
  .wk-edit-btn {
    width: 100%;
    padding-left: 3rem;
    border-top: 1px solid #f8f8f8;
    padding-top: 2rem;
  }
  .el-input input {
    max-width: 192px !important;
  }
}
</style>
