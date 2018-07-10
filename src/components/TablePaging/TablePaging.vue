<template>
<div id="table-paging">
  <el-table v-loading.body="loading" :data="tableData" @selection-change="handleSelectionChange" border class="table">
    <el-table-column v-if="checkBox" type="selection" width="50">
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" :key="index" :label="column.label" :prop="column.value" :width="column.width" :min-width="column.minw" :fixed="column.fixed" :sortable="column.sortable" :formatter="column.formatter">
    </el-table-column>
    <slot> </slot>
  </el-table>
  <div class="toolbar">
    <slot name="foot"> </slot>
    <el-pagination v-if="totalCount" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="totalCount" layout="total, prev, pager, next, jumper" class="paging">
    </el-pagination>
  </div>
</div>
</template>
<script>
export default {
  name: 'table-paging',
  data: () => ({
    currentPage: 1
  }),
  props: {
    loading: Boolean, // 列表加载状态
    checkBox: Boolean, // 是否显示多选框
    tableData: Array, // 表格数据
    columns: Array, // 表格列数据,{ vlaue:对应列内容的字段名, label:对应显示的标题文字 }
    totalCount: Number, // 总条目数
    pageSize: Number // 每页显示条目个数
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.$emit('current-change', currentPage)
    },
    handleSelectionChange(selections) {
      this.$emit('selection-change', selections)
    }
  }
}
</script>
<style lang="scss" scoped>
#table-paging {
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
