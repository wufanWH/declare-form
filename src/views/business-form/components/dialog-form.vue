<template>
  <el-form ref="form" :model="form" label-width="180px">
    <el-form-item label="表单名称">
      <el-input v-model="form.formName"></el-input>
    </el-form-item>
    <el-form-item label="是否启用">
      <el-radio-group v-model="form.isOpen">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="2">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button v-if="!isEdit" type="primary" @click="onSubmit('add')">添加</el-button>
      <el-button v-else type="primary" @click="onSubmit('edit')">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      form: {
        formName: '',
        isOpen: 1
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
    if (this.isEdit && this.dialogId) {
      this.getBusinessFormById(this.dialogId)
    }
  },
  methods: {
    getBusinessFormById (id) {
      this.$api.businessform.getBusinessFormById(id).then(res => {
        if (res.code === 0 && res.success) {
          this.form = res.data
        }
      })
    },
    onSubmit (type) {
      let resData = {
        serviceFk: this.$route.query.businessId || ''
      }
      if (this.form.formName) {
        resData.formName = this.form.formName
      }
      if (this.form.isOpen) {
        resData.isOpen = this.form.isOpen
      }
      if (type === 'edit') {
        resData.id = this.dialogId
        this.$api.businessform.businessFormEdit(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('修改成功')
            this.$emit('refreshList')
            this.$emit('cancel')
          } else {
            this.$alert('修改失败')
          }
        })
      } else {
        this.$api.businessform.businessFormAdd(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('添加成功')
            this.$emit('refreshList')
            this.$emit('cancel')
          } else {
            this.$alert('添加失败')
          }
        })
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    // 对象转级联数组
    changeToArr (obj) {
      let objArr = []
      for (let key in obj) {
        objArr.push({
          id: key,
          name: this.fieldClasic(key),
          children: obj[key]
        })
      }
      return objArr
    },
    // 字段分类
    fieldClasic (code) {
      switch (code) {
        case 'BASE_INFO':
          return '基础信息'
        case 'HONOUR':
          return '获奖情况'
        case 'EDUCATION':
          return '教育经历'
        case 'WORK':
          return '工作经历'
        case 'ACHIEVEMENT':
          return '业绩'
        case 'THESIS':
          return '论文'
        default:
          return '动态字段'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form{
  width: 80%;
  box-shadow: none !important;
  .el-select,.el-cascader{
    width: 100%;
  }
}
</style>
