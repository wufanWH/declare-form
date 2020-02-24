<template>
  <div class="field-container">
    <el-form :model="form" label-position="right" :rules="formValidate" label-width="220px">
      <el-form-item :label="title" prop="value">
        <el-radio-group v-model="form.value">
          <el-radio :label="1">备选项</el-radio>
          <el-radio :label="2">备选项</el-radio>
        </el-radio-group>
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
    }
  },
  created () {
    this.title = this.field.fieldName
    if (this.field.jsDformTmpTmpfield && this.field.jsDformTmpTmpfield.isNecessary === 1) {
      this.formValidate.value.push({required: true, message: '该字段必填'})
    }
  },
  methods: {

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
