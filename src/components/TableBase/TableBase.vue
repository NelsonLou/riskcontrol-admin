<template>
<div id="table-base">
  <el-table v-loading.body="loading" :data="list" @selection-change="handleSelChg" border class="table">
    <el-table-column v-if="checkBox" type="selection" width="50">
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" :key="index" :label="column.label" :prop="column.value" :width="column.width" :min-width="column.minw" :fixed="column.fixed" :sortable="column.sortable" :formatter="column.formatter">
    </el-table-column>
    <slot> </slot>
  </el-table>
  <div class="toolbar">
    <el-button v-if="batchRemove" :disabled="sels.length === 0" @click="handleBatchRemove" icon="delete" type="danger">批量删除</el-button>
    <el-pagination v-if="!noPaging" @current-change="handleCurChg" :page-size="limit" :total="total" layout="total, prev, pager, next, jumper" class="paging">
    </el-pagination>
  </div>
</div>
</template>
<script>
export default {
  name: 'table-base',
  data: () => ({
    loading: false,
    page: 1,
    list: [],
    total: 0,
    sels: []
  }),
  props: {
    checkBox: Boolean, // 是否显示多选框
    batchRemove: Boolean, // 是否显示批量删除
    noPaging: Boolean, // 是否显示分页
    columns: Array // 表格列数据,{ vlaue:对应列内容的字段名, label:对应显示的标题文字 }
  },
  computed: {
    limit() {
      return this.$api.config.limit
    }
  },
  methods: {
    // 获取数据
    query(url, para, list) {
      this.loading = true
      // 请求参数
      para = {
        ...para,
        page: this.page,
        limit: this.limit
      }
      this.axios.get(url, {
        params: para
      }).then(res => {
        this.loading = false
        const {
          data
        } = res.data
        // 获取请求返回数据
        this.list = data[list]
        this.total = data.total
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    // 分页数据
    handleCurChg(val) {
      this.page = val
      this.$emit('query')
    },
    // 删除数据
    delete(url, para, type) {
      const title = type === 'batch' ? '确认删除选中记录吗？' : '确认删除该记录吗?'
      this.$confirm(title, '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.axios.post(url, para).then(res => {
          this.loading = false
          this.$emit('query')
          this.$message.success(res.data.msg)
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      }).catch(() => {})
    },
    // 批量选中
    handleSelChg(sels) {
      this.sels = sels
    },
    // 批量删除
    handleBatchRemove() {
      this.$emit('batch-remove', this.sels)
    }
  }
}
</script>
<style lang="scss" scoped>
#table-base {
    .table {
        margin-bottom: 20px;
    }
    .toolbar {
        overflow: hidden;
    }
    .paging {
        float: right;
    }
}
</style>
