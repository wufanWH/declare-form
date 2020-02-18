<template>
  <div class="field-form-container">
    <el-form ref="fieldForm" :model="fieldConfig" label-width="180px">
      <el-form-item label="字段名称">
        <el-input v-model="fieldConfig.name"></el-input>
      </el-form-item>
      <el-form-item label="字段编码">
        <el-input v-model="fieldConfig.code"></el-input>
      </el-form-item>
      <el-form-item label="字段类型">
        <el-select v-model="fieldConfig.fieldType" placeholder="请选择字段类型" @change="changeType">
          <el-option v-for="(item,index) in typeArr" :label="item.name" :value="item.code" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="fieldConfig.fieldType===6" label="是否是大文本">
        <el-radio-group v-model="fieldConfig.isBigText">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="fieldConfig.fieldType>7" label="关联字典表">
        <el-select v-model="fieldConfig.dicId" placeholder="请选择字段类型">
          <el-option v-for="(item,index) in allDictArr" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="goback">取消</el-button>
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
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if (this.isEdit) {
      this.currentFieldId = this.$route.query.fieldId || ''
      if (this.currentFieldId) {
        this.getFieldById(this.currentFieldId)
      } else {
        console.log('id丢失')
      }
    }
  },
  methods: {
    // 获取所有字典
    getAllDict () {
      this.$api.field.getAllDict().then(res => {
        if (res.code === 0 && res.success) {
          this.allDictArr = res.data
          console.log(this.allDictArr)
        } else {
          console.log(res)
        }
      }).catch(err => {
        console.log(err)
      })
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
    changeType () {
      if (this.allDictArr.length <= 0 && this.fieldConfig.fieldType > 7) {
        this.getAllDict()
      }
    },
    onSubmit () {
      const resData = {
        name: this.fieldConfig.name,
        code: this.fieldConfig.code,
        fieldType: this.fieldConfig.fieldType,
        isstatic: this.fieldConfig.isstatic,
        isBigText: this.fieldConfig.isBigText,
        dicId: this.fieldConfig.dicId,
        tableCode: this.fieldConfig.tableCode
      }
      if (this.isEdit) {
        resData.id = this.currentFieldId
        this.$api.field.fieldEdit(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('修改成功')
            this.$router.go(-1)
          } else {
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$api.field.fieldAdd(resData).then(res => {
          if (res.code === 0 && res.success) {
            this.$alert('新增成功')
            this.$router.go(-1)
          } else {
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    goback () {
      this.$router.go(-1)
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
