<template>
<div id="table">
  <el-table v-loading.body="loading" :data="tableData" @selection-change="handleSelectionChange" border class="table">
    <el-table-column v-if="checkBox" type="selection" width="50">
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" :key="index" :label="column.label" :prop="column.value" :width="column.width" :min-width="column.minw" :fixed="column.fixed" :sortable="column.sortable" :formatter="column.formatter">
    </el-table-column>
    <slot> </slot>
  </el-table>
  <div class="toolbar">
    <slot name="foot"> </slot>
    <el-pagination v-if="!noPaging" @current-change="handleCurPage" :current-page="currentPage" :page-size="limit" :total="totalCount" layout="total, prev, pager, next, jumper" class="paging">
    </el-pagination>
  </div>
</div>
</template>
<script>
export default {
  name: 'table',
  data: () => ({
    // 列表加载状态
    loading: true,
    // 当前分页
    currentPage: 1,
    // 列表数据
    tableData: [],
    // 总条目数
    totalCount: 0
  }),
  props: {
    checkBox: Boolean, // 是否显示多选框
    columns: Array, // 表格列数据,{ vlaue:对应列内容的字段名, label:对应显示的标题文字 }
    noPaging: Boolean // 是否显示分页
  },
  computed: {
    // 每页显示条目个数
    limit() {
      return this.$api.config.limit
    }
  },
  methods: {
    handleSelectionChange(selections) {
      this.$emit('selection-change', selections)
    },
    // 获取初始页列表数据
    getListData(url, para, list) {
      para = {
        ...para,
        // 当前页数
        page: this.currentPage,
        // 每页显示条目个数
        limit: this.$api.config.limit
      }
      // 激活加载状态
      this.loading = true
      this.axios.get(url, {
        params: para
      }).then(res => {
        // 关闭加载状态
        this.loading = false
        const {
          data
        } = res.data
        // 总条目数
        this.totalCount = data.total
        // 获取数据
        this.tableData = data[list]
      })
    },
    // 获取指定页列表数据
    handleCurPage(val) {
      this.currentPage = val
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss">
#table {
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
