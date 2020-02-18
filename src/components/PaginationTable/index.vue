<template>
  <div>
    <el-table
      ref="pageTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      highlight-current-row
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      @current-change="handleTableCurrentChange"
      @sort-change="handleSortChange">
      <el-table-column
        v-if="canSelect"
        type="selection"
        width="50"
        align='center'
        :selectable="checkSelectable"/>
      <el-table-column v-for="(column, index) in columns" :key="column.value" :label="column.text"
        :width="column.width" :align="index === 0 ? '' : 'center'" :render-header="renderHeader"
        :sortable="column.sortable">
        <template slot-scope="scope">
          <slot :name="'cell-text-content-' + index" :scope="scope.row"></slot>
          <slot :name="'cell-content-' + index" :scope="scope.row"></slot>
        </template>
      </el-table-column>
      <slot name="table-content"></slot>
    </el-table>
    <div :class="{ 'hidden': hidden }" class="bottom">
      <el-pagination
        :background="background"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :layout="layout"
        :small="small"
        :page-sizes="pageSizes"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationTable',
  props: {
    // 表格数据
    tableData: {
      type: [Array, Object],
      required: true
    },
    checkedCondition: {
      type: String
    },
    checkedAble: {
      type: Number
    },
    columns: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    renderHeader: Function,
    // 分页控制
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    canSelect: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      multipleSelection: []
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    // 分页方法
    handleSizeChange (val) {
      this.$emit('paginationTable', { page: this.currentPage, limit: val })
    },
    handleCurrentChange (val) {
      this.$emit('paginationTable', { page: val, limit: this.pageSize })
    },
    // 表格方法
    handleRowClick (row, column, event) {
      this.$emit('handleRowClick', { row: row, column: column, event: event })
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', { selections: val })
    },
    handleTableCurrentChange (val) {
      this.$emit('handleTableCurrentChange', { currentRow: val })
    },
    handleSortChange (val) {
      this.$emit('handleSortChange', { sortData: val })
    },
    checkSelectable (row) {
      if (this.checkedCondition && this.checkedAble) {
        return row[this.checkedCondition] === this.checkedAble
      } else {
        return true
      }
    },
    scopeValue (scope) {
      console.log(scope)
    }
  }
}
</script>

<style lang="scss" scoped>
  .bottom {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 10px;
    align-items: center;
    justify-content: flex-start;
  }
  .hidden {
    display: none;
  }
</style>
