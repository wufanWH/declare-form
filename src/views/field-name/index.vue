<template>
  <div class="template-container" style="min-height: calc(100vh - 64px); background: #f0f2f5">
    <div style="background-color: #fff; padding-top: 10px">
      <el-button type="primary" style="margin-left: 20px" @click="addDynamicForm">新增字段</el-button>
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
        <el-input slot="card-search" placeholder="请输入字段名称" v-model="sizerForm.searchContent">
          <el-button slot="append" size="mini" @click="searchByTitle">搜  索</el-button>
        </el-input>
        <!-- <div slot="self-definition">
          <radio-button class="sizer-column" title="性别" :sortList="sizerForm.authorType.sortList" emitFuncName="authorType"
            @authorType="handleAuthorType" :sortSelected="sizerForm.authorType.sortSelected"></radio-button>
        </div> -->
        <div slot="card-bottom" class="card-bottom">当前数据总量：<span style="color: #1890ff">{{ pageForm.total }}</span>条</div>
      </sizer>
      <pagination-table ref="author-list-id" style="padding: 10px" :loading="pageForm.loading" checkedCondition="isstatic" :checkedAble="2"
        :tableData="pageForm.tableData" :columns="columns" :total="pageForm.total" :page.sync="pageForm.page"
        :limit.sync="pageForm.limit" @paginationTable="getFeildList" @handleSelectionChange="handleSelectionChange">
        <span slot="cell-text-content-0" slot-scope="props" class="no-wrap-text">
          {{ props.scope.name }}
        </span>
        <span slot="cell-text-content-1" slot-scope="props" class="no-wrap-text">
          {{ props.scope.code }}
        </span>
        <span slot="cell-text-content-2" slot-scope="props">
          {{ props.scope.isstatic==1?'是':'否' }}
        </span>
        <span slot="cell-text-content-3" slot-scope="props">
          {{ getFieldTypeName (props.scope.fieldType) }}
        </span>
        <template slot="cell-content-4" slot-scope="props">
          <div v-if="props.scope.isstatic===2">
            <el-button @click="handleEditClick(props.scope.id)" type="text">编辑</el-button>
            <span style="font-size: 9px; color: #999">|</span>
            <el-button @click="handleDeleteClick(props.scope.id)" type="text">删除</el-button>
          </div>
          <div v-else>
            <el-button @click="handleInfoClick(props.scope.id)" type="text">查看</el-button>
          </div>
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
          text: '字段名称'
        },
        {
          text: '字段编码'
        },
        {
          text: '静态字段'
        },
        {
          text: '字段类型'
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
    this.getFeildList()
  },
  methods: {
    addDynamicForm () {
      this.$router.push({
        path: '/field-name/field-add'
      })
    },
    handleEditClick (id) {
      this.$router.push({
        path: '/field-name/field-edit',
        query: {
          fieldId: id
        }
      })
    },
    handleInfoClick (id) {
      this.$router.push({
        path: '/field-name/field-info',
        query: {
          fieldId: id
        }
      })
    },
    handleDeleteClick (id) {
      const resData = {
        ids: id
      }
      this.$confirm('确定删除该字段？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.field.fieldDeleteCondition(resData).then(res => {
          if (res.code === 0) {
            this.deleteField(resData)
          } else {
            this.$alert('该字段已绑定模板不可删除')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    searchByTitle () {
      this.pageForm.page = 1
      this.getFeildList()
    },
    handleAuthorType (val) {
      this.pageForm.page = 1
      this.sizerForm.authorType.sortSelected = val.currentIdx
      this.sizerForm.authorTypeIdx = val.currentIdx - 1 < 0 ? null : val.currentIdx - 1
      this.getFeildList()
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
            this.$api.field.fieldDeleteCondition(resData).then(res => {
              if (res.code === 0) {
                this.deleteField(resData)
              } else {
                this.$alert('该字段已绑定模板不可删除')
              }
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
    // 删除字段
    deleteField (resData) {
      this.$api.field.fieldDelete(resData).then(res => {
        if (res.code === 0 && res.success) {
          this.$alert('删除成功')
          this.getFeildList()
        } else {
          this.$alert('删除失败')
        }
      }).catch(err => {
        console.log('删除字段', err)
      })
    },
    getFeildList (val) {
      if (val) {
        this.pageForm.page = val.page
        this.pageForm.limit = val.limit
      } else {
        this.pageForm.page = 1
        this.pageForm.limit = 10
      }

      const feildRequestData = {
        page: this.pageForm.page,
        pageSize: this.pageForm.limit
      }
      this.loading = true
      console.log(feildRequestData)
      this.$api.field.getFieldList(feildRequestData).then(res => {
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
    getFieldTypeName (code) {
      switch (code) {
        case 1:
          return '文本输入框'
        case 2:
          return '密码输入框'
        case 3:
          return '日期输入框'
        case 4:
          return '整数输入框'
        case 5:
          return '浮点输入框'
        case 6:
          return '文本域'
        case 7:
          return '附件上传'
        case 8:
          return '单选框'
        case 9:
          return '复选框'
        case 10:
          return '下拉框-非级联模式-一次性全查模式'
        case 11:
          return '下拉框-非级联模式-ajax动态加载模式'
        case 12:
          return '下拉框-级联模式-一次性全查模式'
        case 13:
          return '下拉框-级联模式-ajax动态加载模式'
      }
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
