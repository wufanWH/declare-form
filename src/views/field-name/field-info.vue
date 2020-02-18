<template>
  <div class="field-form-container">
    <el-form ref="fieldForm" :model="fieldConfig" label-width="180px">
      <el-form-item label="字段名称">
        <span>{{ fieldConfig.name }}</span>
      </el-form-item>
      <el-form-item label="字段编码">
        <span>{{ fieldConfig.code }}</span>
      </el-form-item>
      <el-form-item label="字段类型">
        <span>{{ getFieldTypeName(fieldConfig.fieldType) }}</span>
      </el-form-item>
      <el-form-item v-if="fieldConfig.fieldType===6" label="是否是大文本">
        <span>{{ props.scope.isBigText==1?'是':'否' }}</span>
      </el-form-item>
      <el-form-item v-if="fieldConfig.fieldType>7" label="关联字典表" disabled>
        <el-select v-model="fieldConfig.dicId" placeholder="请选择字段类型">
          <el-option v-for="(item,index) in allDictArr" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fieldConfig: {
        code: '',
        name: '',
        fieldType: 1,
        isBigText: 2,
        isstatic: 2,
        tableCode: 'OTHER',
        dicId: ''
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
      allDictArr: [],
      currentFieldId: ''
    }
  },
  created () {
    this.currentFieldId = this.$route.query.fieldId || ''
    if (this.currentFieldId) {
      this.getFieldById(this.currentFieldId)
    } else {
      console.log('id丢失')
    }
  },
  methods: {
    // 获取所有字典
    getAllDict () {
      this.$api.field.getAllDict().then(res => {
        if (res.code === 0 && res.success) {
          this.allDictArr = res.data
        } else {
          console.log(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeType () {
      if (this.allDictArr.length <= 0 && this.fieldConfig.fieldType > 7) {
        this.getAllDict()
      }
    },
    getFieldById (id) {
      this.$api.field.getFieldById(id).then(res => {
        if (res.code === 0 && res.success) {
          this.fieldConfig = res.data
          this.changeType()
        } else {
          console.log(res)
        }
      }).catch(err => {
        console.log(err)
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
    }
  }

}
</script>
<style lang="scss" scoped>
  .field-form-container{
    min-height: calc(100vh - 64px);
    padding: 30px;
    background-color: #f2f2f2;
    .el-form{
      padding: 30px;
      background-color:#ffffff;
      box-shadow: 0 0 5px #cccccc;
      .el-input,.el-select,.el-textarea{
        width: 50%;
      }
    }
  }
</style>
