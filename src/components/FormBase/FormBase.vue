<template>
<div id="form-base">
  <el-form v-loading.body="loading" :model="formData" :rules="formRule" ref="formData" :inline="inline" :label-width="labelWidth || '80px'" class="form">
    <el-form-item v-for="(item, index) in formItem" :key="index" :label="item.label" :prop="item.value">
      <!-- 搜索框 -->
      <el-input v-if="item.eleType === 'search'" v-model="formData[item.value]" :placeholder="item.plh" :icon="close ? 'close' : ''" :on-icon-click="handleClose" @keyup.enter.native="search"></el-input>
      <!-- 输入框, 文本域 -->
      <el-input v-if="item.eleType === 'input'" :type="item.iptType" v-model="formData[item.value]" :placeholder="item.plh" :disabled="item.disabled"></el-input>
      <!-- 下拉框 -->
      <el-select v-if="item.eleType === 'select'" v-model="formData[item.value]" :placeholder="item.plh" :disabled="item.disabled" :filterable="item.filter">
        <el-option v-for="(opt, index) in item.options" :key="index" :label="opt.label" :value="opt.value" :disabled="opt.disabled"></el-option>
      </el-select>
      <!-- 日期 -->
      <el-date-picker v-if="item.eleType === 'date'" :type="item.dateType" :placeholder="item.plh" v-model="formData[item.value]" :disabled="item.disabled"></el-date-picker>
      <!-- 时间 -->
      <el-time-picker v-if="item.eleType === 'time'" :placeholder="item.plh" v-model="formData[item.value]" :disabled="item.disabled"></el-time-picker>
      <el-switch v-if="item.eleType === 'switch'" on-text="" off-text="" v-model="formData[item.value]"></el-switch>
      <!-- 多选框 -->
      <el-checkbox-group v-if="item.eleType === 'checkbox'" v-model="formData[item.value]">
        <el-checkbox v-for="(opt, index) in item.options" :key="index" :label="opt.value" :disabled="item.disabled">{{opt.label}}</el-checkbox>
      </el-checkbox-group>
      <!-- 单选框 -->
      <el-radio-group v-if="item.eleType === 'radio'" v-model="formData[item.value]">
        <el-radio v-for="(opt, index) in item.options" :key="index" :label="opt.value" :disabled="item.disabled">{{opt.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <slot> </slot>
  </el-form>
</div>
</template>
<script>
export default {
  name: 'form-base',
  props: {
    inline: Boolean, // 行内表单模式
    labelWidth: String, // 表单域标签的宽度
    formItem: Array, // 表单元素
    formRule: Object // 表单规则
  },
  data: () => ({
    // formItem: [{
    //   eleType: 'input',
    //   label: '活动名称',
    //   value: 'name',
    //   plh: '请输入活动名称'
    // }, {
    //   eleType: 'select',
    //   label: '活动区域',
    //   value: 'region',
    //   options: [{
    //     value: 'beijing',
    //     label: '北京'
    //   }, {
    //     value: 'shanghai',
    //     label: '上海'
    //   }],
    //   plh: '请选择活动区域'
    // }, {
    //   eleType: 'date',
    //   label: '活动日期',
    //   value: 'date',
    //   plh: '请选择活动日期'
    // }, {
    //   eleType: 'time',
    //   label: '活动时间',
    //   value: 'time',
    //   plh: '请选择活动时间'
    // }, {
    //   eleType: 'switch',
    //   label: '即时配送',
    //   value: 'delivery'
    // }, {
    //   eleType: 'checkbox',
    //   label: '活动性质',
    //   value: 'type',
    //   options: [{
    //     value: '1',
    //     label: '美食/餐厅线上活动'
    //   }, {
    //     value: '2',
    //     label: '地推活动'
    //   }, {
    //     value: '3',
    //     label: '线下主题活动'
    //   }, {
    //     value: '4',
    //     label: '单纯品牌曝光'
    //   }]
    // }, {
    //   eleType: 'radio',
    //   label: '特殊资源',
    //   value: 'resource',
    //   options: [{
    //     value: '1',
    //     label: '线上品牌商赞助'
    //   }, {
    //     value: '2',
    //     label: '线下场地免费'
    //   }]
    // }, {
    //   eleType: 'input',
    //   iptType: 'textarea',
    //   label: '活动形式',
    //   value: 'desc',
    //   plh: '请输入活动形式'
    // }],
    // rules: {
    //   name: [{
    //       required: true,
    //       message: '请输入活动名称',
    //       trigger: 'blur'
    //     },
    //     {
    //       min: 3,
    //       max: 5,
    //       message: '长度在 3 到 5 个字符',
    //       trigger: 'blur'
    //     }
    //   ],
    //   region: [{
    //     required: true,
    //     message: '请选择活动区域',
    //     trigger: 'change'
    //   }],
    //   date: [{
    //     type: 'date',
    //     required: true,
    //     message: '请选择日期',
    //     trigger: 'change'
    //   }],
    //   time: [{
    //     type: 'date',
    //     required: true,
    //     message: '请选择时间',
    //     trigger: 'change'
    //   }],
    //   type: [{
    //     type: 'array',
    //     required: true,
    //     message: '请至少选择一个活动性质',
    //     trigger: 'change'
    //   }],
    //   resource: [{
    //     required: true,
    //     message: '请选择活动资源',
    //     trigger: 'change'
    //   }],
    //   desc: [{
    //     required: true,
    //     message: '请填写活动形式',
    //     trigger: 'blur'
    //   }]
    // },
    close: false,
    loading: false,
    formData: {}
  }),
  created() {
    this.dataType()
  },
  watch: {
    // 搜索
    formData: {
      handler: function(val) {
        this.formItem.map(item => {
          if (item.eleType === 'search') {
            this.close = val[item.value] ? 'true' : false
          }
        })
      },
      deep: true
    }
  },
  methods: {
    // 初始数据类型
    dataType() {
      this.formItem.map(item => {
        this.$set(this.formData, item.value, item.eleType === 'checkbox' ? [] : item.eleType === 'switch' ? false : '')
      })
    },
    // 搜索
    handleClose() {
      this.formItem.map(item => {
        if (item.eleType === 'search') {
          this.formData[item.value] = ''
          this.$emit('query', this.formData)
        }
      })
    },
    // 初始详情数据
    query(url, para, info, patch) {
      this.loading = true
      // 直接从 scope 中获取数据
      if (!url && !para) {
        this.loading = false
        this.formData = Object.assign({}, info)
        return
      }
      // 通过接口获取数据
      this.axios.get(url, {
        params: para
      }).then(res => {
        this.loading = false
        const {
          data
        } = res.data
        this.formData = Object.assign({}, data[info])
        // 是否重组数据结构
        if (patch === 'patch') {
          this.$emit('patch', this.formData)
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    // 补充详情数据
    patch(url) {
      this.loading = true
      this.axios.get(url).then(res => {
        this.loading = false
        const {
          data
        } = res.data
        this.formData = {
          ...this.formData,
          ...Object.assign({}, data)
        }
        this.$emit('patch', this.formData)
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    // 合并详情数据
    merge(data) {
      this.formData = Object.assign({}, data)
    },
    // 保存表单数据
    save(url, para) {
      // this.loading = true
      this.axios.post(url, para).then(res => {
        // this.loading = false
        this.$emit('query')
        this.$message.success(res.data.msg)
      }).catch(error => {
        console.log(error)
      })
    },
    // 提交表单
    submit() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    reset() {
      this.$refs['formData'].resetFields()
    },
    // 搜索表单
    search() {
      this.$emit('query', this.formData)
    }
  }
}
</script>
<style lang="scss" scoped>
#form-base {}
</style>
