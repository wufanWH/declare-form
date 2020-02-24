<template>
  <div class="template-container">
    <el-menu default-active="1" id="unitInfo" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" class="font_size">{{ templateObj.templateName }}</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <div class="form-content" v-for="(item, index) in templateObj.serviceFormFieldModels" :key="'template-'+index">
        <dc-input v-if="item.fieldType == 1 && item.jsDformTmpTmpfield && item.jsDformTmpTmpfield.isOpen == 1" :field="item" :data-val="dataVal.jsDformTmpFieldvalues[index]" @getVal="getVal"></dc-input>
    </div>
  </div>
</template>
<script>
import dcInput from '@/views/declare-form/field-components/dc-input'
export default {
  components: { dcInput },
  data () {
    return {
      dataJson: {}
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
    this.dataJson = this.getUserData()
  },
  methods: {
    getVal (data) {
      this.dataJson[data.fieldFk] = data
      this.$emit('getVal', this.getUserVal())
    },
    getUserData () {
      let templateData = {}
      const modelData = this.templateObj.serviceFormFieldModels
      for (let i = 0; i < modelData.length; i++) {
        templateData[modelData[i].fieldId] = {
          commonValue: this.dataVal.jsDformTmpFieldvalues[i].commonValue,
          fieldFk: modelData[i].fieldId,
          id: ''
        }
      }
      return templateData
    },
    getUserVal () {
      let userVal = {
        templateId: this.templateObj.templateId,
        jsDformTmpFieldvalues: this.objToArr(this.dataJson)
      }
      return userVal
    },
    objToArr (obj) {
      let arrObj = []
      for (let key in obj) {
        arrObj.push(obj[key])
      }
      return arrObj
    }
  }
}
</script>
<style lang="scss" scoped>
.template-container{
  margin: 0 60px;
}
.el-menu-demo {
  margin-top: 20px;
  margin-bottom: 30px;
  .el-menu-item {
    font-size: 18px;
  }
}
</style>
