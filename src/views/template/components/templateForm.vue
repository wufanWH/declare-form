<template>
  <div class="template-form-container">
    <div class="title">
      <span>模板字段配置</span>
      <el-button type="primary" @click="addField">添加模板字段</el-button>
      <el-button @click="clearField">清空模板字段</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column type="index" width="55"></el-table-column> -->
      <el-table-column prop="name" label="字段名称"></el-table-column>
      <el-table-column prop="code" label="字段编码"></el-table-column>
      <el-table-column prop="sort" label="字段排序"></el-table-column>
      <el-table-column prop="isNecessary" label="是否必填">
        <template slot-scope="scope">
          {{ scope.row.isNecessary===1? '是':'否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否必填">
        <template slot-scope="scope">
          <el-button @click="editField(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.row.fieldFk)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="模板字段配置" :visible.sync="dialogVisible" width="60%" center>
      <template-field v-if="dialogVisible" :is-edit="fieldStatus" :template-id="currentTemplateId" :fieldConfig="fieldConfig" @cancel="cancel" @reloadField="getTemplateById"></template-field>
    </el-dialog>
  </div>
</template>
<script>
import templateField from '@/views/template/components/template-field'
export default {
  components: { templateField },
  data () {
    return {
      fieldStatus: false,
      dialogVisible: false,
      currentTemplateId: '',
      tableData: [],
      fieldConfig: {}
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if (this.isEdit) {
      this.currentTemplateId = this.$route.query.templateId || ''
      if (this.currentTemplateId) {
        this.getTemplateById()
      } else {
        console.log('id丢失')
      }
    }
  },
  methods: {
    getTemplateById () {
      this.$api.template.getTemplateFieldList(this.currentTemplateId).then(res => {
        if (res.code === 0 && res.success) {
          this.tableData = this.dataFilter(res.data)
          console.log(this.tableData)
        } else {
          console.log(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addField () {
      this.dialogVisible = true
      this.fieldStatus = false
    },
    editField (row) {
      this.dialogVisible = true
      this.fieldStatus = true
      this.fieldConfig = row
    },
    dialogCancel () {
      this.dialogVisible = false
    },
    deleteClick (id) {
      const resData = {
        templateFk: this.currentTemplateId,
        fieldFk: id
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.template.templateFieldDelete(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('删除成功')
            this.getTemplateById()
          } else {
            this.$alert('删除失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 清空模板字段
    clearField () {
      const resData = {
        templateFk: this.currentTemplateId
      }
      this.$confirm('此操作将清空该模板下所有字段, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.template.templateFieldClear(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('清除成功')
            this.getTemplateById()
          } else {
            this.$alert('清除失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    cancel () {
      this.dialogVisible = false
    },
    dataFilter (data) {
      return data.map(function (e) {
        const obj1 = e.jsDformTmpField
        delete e.jsDformTmpField
        console.log(e)
        return Object.assign(e, obj1)
      })
    }
  }

}
</script>
<style lang="scss" scoped>
  .template-form-container{
    min-height: calc(100vh - 64px);
    padding: 30px;
    background-color: #f2f2f2;
    .title{
      span{
        font-size: 20px;
        font-weight: bold;
        padding-right: 30px;
      }
      .el-button{
        margin: 0 20px;
      }
      padding: 30px;
      background-color:#ffffff;
      box-shadow: 0 0 5px #cccccc;
    }
    .el-table{
      padding: 30px;
      background-color:#ffffff;
      box-shadow: 0 0 5px #cccccc;
      .el-input,.el-select,.el-textarea{
        width: 50%;
      }
      .template-field-list{
        label{
          font-size: 20px;
          font-weight: bold;
        }
        .field-name-add{
          margin-left: 30px
        }
      }
    }
  }
</style>
