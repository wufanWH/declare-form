<template>
  <div class="business-form-container">
    <el-form ref="templateForm" :model="businessConfig" label-width="180px">
      <el-form-item label="业务名称">
        <el-input v-model="businessConfig.name"></el-input>
      </el-form-item>
      <el-form-item label="业务编码">
        <el-input v-model="businessConfig.code"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="businessConfig.isOpen">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker type="date" v-model="businessConfig.beginDate" placeholder="选择开始时间" :picker-options="pickerOptions0"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker type="date" v-model="businessConfig.endDate" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
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
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.businessConfig.endDate !== '') {
            return time.getTime() < Date.now() || time.getTime() > this.businessConfig.endDate
          } else {
            return time.getTime() < Date.now()
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < this.businessConfig.beginDate || time.getTime() < Date.now()
        }
      },
      businessConfig: {
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
        this.getBusinessById(this.dialogId)
      } else {
        console.log('id丢失')
      }
    }
  },
  methods: {
    getBusinessById (id) {
      this.$api.businessform.getBusinessById(id).then(res => {
        if (res.code === 0 && res.success) {
          this.businessConfig = res.data
        } else {
          console.log(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit () {
      let resData = {
        name: this.businessConfig.name,
        code: this.businessConfig.code,
        isOpen: this.businessConfig.isOpen,
        beginDate: this.businessConfig.beginDate,
        endDate: this.businessConfig.endDate
      }
      if (this.isEdit) {
        resData.id = this.dialogId
        this.$api.businessform.businessEdit(resData).then(res => {
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
        this.$api.businessform.businessAdd(resData).then(res => {
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
  .business-form-container{
    width: 80%;
  }
</style>
