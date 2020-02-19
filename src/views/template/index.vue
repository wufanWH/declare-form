<template>
  <div class="template-container" style="min-height: calc(100vh - 64px); background: #f0f2f5">
    <div style="background-color: #fff; padding-top: 10px">
      <el-button type="primary" style="margin-left: 20px" @click="handleClick('')">新增模板</el-button>
      <el-button v-if="pageForm.selections.length === 0" type="text" style="color: #999; margin-left: 10px">批量操作</el-button>
      <el-dropdown v-else trigger="click" @command="operations" style="margin-left: 10px">
        <span class="el-dropdown-link">
          批量操作
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="online">批量上线</el-dropdown-item>
          <el-dropdown-item command="offline">批量下线</el-dropdown-item> -->
          <el-dropdown-item command="delete">批量删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <sizer style="margin: 20px" :search="true" :content="0">
        <el-input slot="card-search" placeholder="请输入模板名称" v-model="sizerForm.searchContent">
          <el-button slot="append" size="mini" @click="searchByTitle">搜  索</el-button>
        </el-input>
        <!-- <div slot="self-definition">
          <radio-button class="sizer-column" title="性别" :sortList="sizerForm.authorType.sortList" emitFuncName="authorType"
            @authorType="handleAuthorType" :sortSelected="sizerForm.authorType.sortSelected"></radio-button>
        </div> -->
        <div slot="card-bottom" class="card-bottom">当前数据总量：<span style="color: #1890ff">{{ pageForm.total }}</span>条</div>
      </sizer>
      <pagination-table ref="author-list-id" style="padding: 10px" :loading="pageForm.loading"
        :tableData="pageForm.tableData" :columns="columns" :total="pageForm.total" :page.sync="pageForm.page"
        :limit.sync="pageForm.limit" @paginationTable="getTemplateList" @handleSelectionChange="handleSelectionChange">
        <span slot="cell-text-content-0" slot-scope="props" class="no-wrap-text">
          {{ props.scope.name }}
        </span>
        <span slot="cell-text-content-1" slot-scope="props" class="no-wrap-text">
          {{ props.scope.code }}
        </span>
        <span slot="cell-text-content-2" slot-scope="props">
          {{ props.scope.isList === 1 ? '是':'否' }}
        </span>
        <template slot="cell-content-3" slot-scope="props">
          <el-button @click="handleClick(props.scope.id)" type="text">编辑</el-button>
          <span style="font-size: 9px; color: #999">|</span>
          <el-button @click="editField(props.scope.id)" type="text">配置字段</el-button>
          <span style="font-size: 9px; color: #999">|</span>
          <el-button @click="deleteTemplate(props.scope.id)" type="text">删除</el-button>
        </template>
      </pagination-table>
    </div>
    <el-dialog title="模板新增/修改" :visible.sync="dialogVisible" width="42%">
      <dialog-form v-if="dialogVisible" :is-edit="isTemplateEdit" :dialog-id="dialogId" @cancel="cancel" @refreshList="getTemplateList"></dialog-form>
    </el-dialog>
  </div>
</template>

<script>
import paginationTable from '@/components/PaginationTable'
import sizer from '@/components/Sizer'
import radioButton from '@/components/RadioButton'
import dialogForm from '@/views/template/components/dialog-form'
export default {
  components: { paginationTable, sizer, radioButton, dialogForm },
  data () {
    return {
      fieldStatus: false,
      dialogVisible: false,
      isTemplateEdit: false,
      dialogId: '',
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
          text: '模板名称'
        },
        {
          text: '模板编码'
        },
        {
          text: '是否列表模板'
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
    this.getTemplateList()
  },
  methods: {
    handleClick (id) {
      if (id) {
        this.dialogId = id
        this.isTemplateEdit = true
        this.dialogVisible = true
      } else {
        this.dialogId = ''
        this.isTemplateEdit = false
        this.dialogVisible = true
      }
      console.log(this.isTemplateEdit)
    },
    cancel () {
      this.dialogVisible = false
    },
    editField (id) {
      this.$router.push({
        path: '/template/template-edit',
        query: {
          templateId: id
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
      this.pageForm.page = 1
      this.getTemplateList()
    },
    handleAuthorType (val) {
      this.pageForm.page = 1
      this.sizerForm.authorType.sortSelected = val.currentIdx
      this.sizerForm.authorTypeIdx = val.currentIdx - 1 < 0 ? null : val.currentIdx - 1
      this.getTemplateList()
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
          const resData = {
            ids: this.transDataToIds(this.pageForm.selections)
          }
          this.$confirm('确定执行批量删除操作？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.template.templateDelete(resData).then(res => {
              if (res.code === 0 && res.success) {
                this.$alert('删除成功')
                this.getTemplateList()
              } else {
                this.$alert('删除失败')
              }
            }).catch(err => {
              console.log('删除模板', err)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
          break
      }
    },
    getTemplateList (val) {
      if (val) {
        this.pageForm.page = val.page
        this.pageForm.limit = val.limit
      } else {
        this.pageForm.page = 1
        this.pageForm.limit = 10
      }

      let feildRequestData = {
        page: this.pageForm.page,
        pageSize: this.pageForm.limit
      }
      if (this.sizerForm.searchContent) {
        feildRequestData.name = this.sizerForm.searchContent
      }
      this.loading = true
      console.log(feildRequestData)
      this.$api.template.getTemplateList(feildRequestData).then(res => {
        console.log(res)
        this.loading = false
        if (res.code === 0) {
          this.pageForm.total = res.data.total
          this.pageForm.tableData = res.data.list
          console.log(this.total, this.tableData)
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    deleteTemplate (id) {
      const resData = {
        ids: id
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.template.templateDelete(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('删除成功')
            this.getTemplateList()
          } else {
            this.$alert('删除失败')
          }
        }).catch(err => {
          console.log('删除模板', err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    transDataToIds (data) {
      var idArr = []
      if (data.constructor !== Array) {
        return idArr.join(',')
      }
      data.forEach(item => {
        if (item.id) {
          idArr.push(item.id)
        }
      })
      var ids = idArr.join(',')
      return ids
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.template-container {
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
