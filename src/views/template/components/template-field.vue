<template>
  <el-form ref="form" :model="form" label-width="180px">
    <el-form-item label="字段类型">
      <el-select v-model="form.fieldType" placeholder="请选择字段类型" @change="getField">
        <el-option v-for="(item, index) in typeArr" :label="item.name" :value="item.code" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="字段" :disabled="isEdit">
      <el-cascader v-model="form.id" placeholder="请选择字段" :options="fieldArr" filterable :show-all-levels="false" :props="fieldProps" @change="handleSelection"></el-cascader>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-radio-group v-model="form.isNecessary">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="2">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="字段排序">
      <el-input type="number" v-model.number="form.sort"></el-input>
    </el-form-item>
    <el-form-item label="字段校验">
      <el-input v-model="form.regular"></el-input>
    </el-form-item>
    <el-form-item label="字段长度限制">
      <el-input v-model="form.length"></el-input>
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
        id: [],
        fieldType: 1,
        fieldId: '',
        sort: '',
        isNecessary: 1,
        length: '',
        regular: ''
      },
      typeArr: [
        {
          code: 1,
          name: '文本输入框'
        }, {
          code: 2,
          name: '密码输入框'
        }, {
          code: 3,
          name: '日期输入框'
        }, {
          code: 4,
          name: '整数输入框'
        }, {
          code: 5,
          name: '浮点输入框'
        }, {
          code: 6,
          name: '文本域'
        }, {
          code: 7,
          name: '附件上传'
        }, {
          code: 8,
          name: '单选框'
        }, {
          code: 9,
          name: '复选框'
        }, {
          code: 10,
          name: '下拉框-非级联模式-一次性全查模式'
        }, {
          code: 11,
          name: '下拉框-非级联模式-ajax动态加载模式'
        }, {
          code: 12,
          name: '下拉框-级联模式-一次性全查模式'
        }, {
          code: 13,
          name: '下拉框-级联模式-ajax动态加载模式'
        }
      ],
      fieldArr: [],
      fieldProps: {
        value: 'id',
        label: 'name'
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    templateId: {
      type: String,
      default: ''
    },
    fieldConfig: {
      type: Object
    }
  },
  created () {
    if (this.fieldConfig) {
      this.form.fieldType = this.fieldConfig.fieldType
      this.form.fieldId = this.fieldConfig.fieldFk
      this.form.sort = this.fieldConfig.sort
      this.form.isNecessary = this.fieldConfig.isNecessary
      this.form.length = this.fieldConfig.length || ''
      this.form.regular = this.fieldConfig.regular || ''
      this.form.id = [this.fieldConfig.tableCode, this.fieldConfig.fieldFk]
    }
    this.getField()
  },
  methods: {
    getField () {
      const resData = {
        fieldType: this.form.fieldType
      }
      if (this.form.fieldType) {
        this.$api.template.templateField(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.fieldArr = this.changeToArr(res.data)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleSelection (val) {
      // console.log(val)
      this.form.fieldId = val[1]
    },
    onSubmit (type) {
      let resData = {
        templateFk: this.templateId
      }
      if (this.form.fieldId) {
        resData.fieldFk = this.form.fieldId
      }
      if (this.form.sort) {
        resData.sort = this.form.sort
      }
      if (this.form.isNecessary) {
        resData.isNecessary = this.form.isNecessary
      }
      if (this.form.length) {
        resData.length = this.form.length
      }
      if (this.form.regular) {
        resData.regular = this.form.regular
      }
      if (type === 'edit') {
        this.$api.template.templateFieldEdit(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('修改成功')
            this.$emit('reloadField')
            this.$emit('cancel')
          } else {
            this.$alert('修改失败')
          }
        })
      } else {
        this.$api.template.templateFieldAdd(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('添加成功')
            this.$emit('reloadField')
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
