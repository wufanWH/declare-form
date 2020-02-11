<template>
  <div class="dynamic-container" style="min-height: calc(100vh - 64px); background: #f0f2f5">
    <div style="background-color: #fff; padding-top: 10px">
      <el-button type="primary" style="margin-left: 20px" @click="addDynamicForm">新增动态模板</el-button>
      <el-button v-if="pageForm.selections.length === 0" type="text" style="color: #999; margin-left: 10px">批量操作</el-button>
      <el-dropdown v-else trigger="click" @command="operations" style="margin-left: 10px">
        <span class="el-dropdown-link">
          批量操作
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="online">批量上线</el-dropdown-item>
          <el-dropdown-item command="offline">批量下线</el-dropdown-item>
          <el-dropdown-item command="delete">批量删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <sizer style="margin: 20px" :search="true" :content="0">
        <el-input slot="card-search" placeholder="请输入申报名称" v-model="sizerForm.searchContent">
          <el-button slot="append" size="mini" @click="searchByTitle">搜  索</el-button>
        </el-input>
        <div slot="self-definition">
          <radio-button class="sizer-column" title="性别" :sortList="sizerForm.authorType.sortList" emitFuncName="authorType"
            @authorType="handleAuthorType" :sortSelected="sizerForm.authorType.sortSelected"></radio-button>
        </div>
        <div slot="card-bottom" class="card-bottom">当前数据总量：<span style="color: #1890ff">{{ pageForm.total }}</span>条</div>
      </sizer>
      <pagination-table ref="author-list-id" style="padding: 10px" :loading="pageForm.loading"
        :tableData="pageForm.tableData" :columns="columns" :total="pageForm.total" :page.sync="pageForm.page"
        :limit.sync="pageForm.limit" @paginationTable="getAuthorList" @handleSelectionChange="handleSelectionChange">
        <span slot="cell-text-content-0" slot-scope="props" class="no-wrap-text">
          {{ props.scope.authorName }}
        </span>
        <span slot="cell-text-content-1" slot-scope="props" class="no-wrap-text">
          {{ props.scope.authorType }}
        </span>
        <span slot="cell-text-content-2" slot-scope="props">
          {{ props.scope.releaseDate }}
        </span>
        <span slot="cell-text-content-3" slot-scope="props">
          {{ props.scope.areaType }}
        </span>
        <span slot="cell-text-content-4" slot-scope="props" :style="props.scope.isTopColor">
          {{ props.scope.isTop }}
        </span>
        <span slot="cell-text-content-5" slot-scope="props" :style="props.scope.isOnlineColor">
          {{ props.scope.isOnline }}
        </span>
        <template slot="cell-content-6" slot-scope="props">
          <el-button @click="handleEditClick(props.scope.id)" type="text">编辑</el-button>
          <span style="font-size: 9px; color: #999">|</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in props.scope.opration" :key="'authoroperation' + index"
                :command="commandValue(item.command, props.scope.id)">
                {{ item.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </pagination-table>
    </div>
  </div>
</template>

<script>
import paginationTable from '@/components/PaginationTable'
import sizer from '@/components/Sizer'
import radioButton from '@/components/RadioButton'

export default {
  components: { paginationTable, sizer, radioButton },
  data () {
    return {
      sizerForm: {
        searchContent: null,
        authorTypeIdx: null,
        authorType: {
          sortList: ['全部', '男', '女'],
          sortSelected: 0
        }
      },
      columns: [
        {
          text: '申报名称'
        },
        {
          text: '操作'
        }
      ],
      pageForm: {
        page: 1,
        limit: 10,
        total: 0,
        loading: false,
        selections: [],
        tableData: []
      }
    }
  },
  created () {
    this.getAuthorList()
  },
  methods: {
    addDynamicForm () {
      this.$router.push({
        path: '/dynamic-form/df-add'
      })
    },
    handleEditClick (id) {
      this.$router.push({
        path: '/dynamic-form/df-edit',
        query: {
          authorId: id
        }
      })
    },
    commandValue (command, id) {
      return {
        command: command,
        id: id
      }
    },
    searchByTitle () {
      this.page = 1
      this.getAuthorList()
    },
    handleAuthorType (val) {
      this.page = 1
      this.sizerForm.authorType.sortSelected = val.currentIdx
      this.sizerForm.authorTypeIdx = val.currentIdx - 1 < 0 ? null : val.currentIdx - 1
      this.getAuthorList()
    },
    handleSelectionChange (val) {
      this.pageForm.selections = val.selections
    },
    operations (command) {
      switch (command) {
        case 'offline':
          break
        case 'online':
          break
        case 'delete':
          this.$confirm('确定执行批量删除操作？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
          break
      }
    },
    handleCommand (val) {
      switch (val.command) {
        case 'online':
          this.authorBatch('online', [val.id])
          break
        case 'offline':
          this.authorBatch('offline', [val.id])
          break
        case 'onTop':
          this.authorBatch('onTop', [val.id])
          break
        case 'noTop':
          this.authorBatch('noTop', [val.id])
          break
        case 'delete':
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteAuthors(val.id)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
          break
      }
    },
    getAuthorList (val) {

    },
    deleteAuthors (ids) {

    },
    authorBatch (command, ids) {
      var data = {
        ids: ids
      }
      switch (command) {
        case 'offline':
          data['isOnline'] = 1
          break
        case 'online':
          data['isOnline'] = 0
          break
        case 'onTop':
          data['isTop'] = 0
          break
        case 'noTop':
          data['isTop'] = 1
          break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dynamic-container {
  min-height: calc(100vh - 64px);
  background: #f0f2f5;
  padding: 20px;
  .sizer-column {
    border-top: 1px dashed #f0f2f5;
    border-bottom: 1px dashed #f0f2f5;
  }
  .card-bottom {
    color: #999;
    font-size: 14px;
    padding: 10px 0 0 0;
  }
  .no-wrap-text {
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
