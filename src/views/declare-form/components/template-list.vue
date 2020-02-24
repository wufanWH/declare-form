<template>
  <div class="template-list-container">
    <el-menu default-active="1" id="patent" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">{{ templateObj.templateName }}</el-menu-item>
      <el-button class="add-button" type="primary" size="mini" @click="openDialog">增加</el-button>
    </el-menu>
    <div class="line"></div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column v-for="(item,index) in templateObj.serviceFormFieldModels" v-if="item.jsDformTmpTmpfield.isOpen==1" :label="item.fieldName" :prop="item.fieldId" :key="'list-'+index"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  props: {
    templateObj: {
      type: Object,
      default: function () {
        return {}
      }
    },
    dataVal: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created () {
    this.tableData = this.getListData()
  },
  methods: {
    openDialog () {},
    // 列表字段数据处理
    getListData () {
      const valArr = this.dataVal.jsDformTmpFieldvalues
      let targetArr = []
      let obj = {}
      for (let i = 0, len = valArr.length; i < len; i++) {
        obj[valArr[i].objGroup] = {}
      }
      for (let key in obj) {
        for (let j = 0, len1 = valArr.length; j < len1; j++) {
          if (valArr[j].objGroup === key) {
            obj[key][valArr[j].fieldFk] = valArr[j].commonValue
          }
        }
        targetArr.push(obj[key])
      }
      console.log(targetArr)
      return targetArr
    },
    getUserVal () {
      let userVal = {
        templateId: this.templateObj.templateId,
        jsDformTmpFieldvalues: []
      }
      return userVal
    }
  }
}
</script>
<style lang="scss">
.template-list-container{
  margin: 0 60px;
}
.el-menu-demo {
  margin-top: 20px;
  margin-bottom: 30px;
  .el-menu-item {
    font-size: 18px;
  }
}
.add-button {
  float: right;
  margin-top: 20px;
  margin-right: 2%;
}
.el-table {
  width: 96% !important;
  margin: 0px 2%;
  th {
    background: #d3dce6 !important;
  }
  .el-select{
    .el-input{
      width: 100% !important;
    }
  }
}
</style>
