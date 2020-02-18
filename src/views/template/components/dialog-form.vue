<template>
  <div class="template-form-container">
    <el-form ref="templateForm" :model="templateConfig" label-width="180px">
      <el-form-item label="模板名称">
        <el-input v-model="templateConfig.name"></el-input>
      </el-form-item>
      <el-form-item label="模板编码">
        <el-input v-model="templateConfig.code"></el-input>
      </el-form-item>
      <el-form-item label="是否列表模板">
        <el-radio-group v-model="templateConfig.isList">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      templateConfig: {
        code: '',
        name: '',
        isList: 2
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    dialogId: {
      type: String,
      default: ''
    }
  },
  created () {
    if (this.isEdit) {
      if (this.dialogId) {
        this.getTemplateById(this.dialogId)
      } else {
        console.log('id丢失')
      }
    }
  },
  methods: {
    getTemplateById (id) {
      this.$api.template.getTemplateById(id).then(res => {
        if (res.code === 0 && res.success) {
          this.templateConfig = res.data
        } else {
          console.log(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit () {
      let resData = {
        name: this.templateConfig.name,
        code: this.templateConfig.code,
        isList: this.templateConfig.isList
      }
      if (this.isEdit) {
        resData.id = this.dialogId
        this.$api.template.templateEdit(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('修改成功')
            this.$emit('refreshList')
            this.$emit('cancel')
          } else {
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$api.template.templateAdd(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('新增成功')
            this.$emit('refreshList')
            this.$emit('cancel')
          } else {
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
  .template-form-container{
    width: 80%;
  }
</style>
