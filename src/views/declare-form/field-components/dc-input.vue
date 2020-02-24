<template>
  <div class="field-container">
    <el-form :model="form" label-position="right" :rules="formValidate" label-width="220px">
      <el-form-item :label="title" prop="value">
        <el-input v-model="form.value" type="text" @change="changeVal"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        value: ''
      },
      formValidate: {
        value: []
      },
      title: ''
    }
  },
  props: {
    field: {
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
    this.title = this.field.fieldName
    this.form.value = this.dataVal.commonValue
    if (this.field.jsDformTmpTmpfield && this.field.jsDformTmpTmpfield.isNecessary === 1) {
      this.formValidate.value.push({required: true, message: '该字段必填'})
    }
  },
  methods: {
    changeVal (val) {
      console.log(val)
      let fieldVal = {}
      fieldVal = {
        commonValue: this.form.value,
        fieldFk: this.field.fieldId,
        id: ''
      }
      this.$emit('getVal', fieldVal)
    }
  }
}
</script>
<style lang="scss" scoped>
.field-container{
  .el-form{
    width: 70%;
  }
}
</style>
