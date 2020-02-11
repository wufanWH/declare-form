<template>
  <el-dialog class="component-container" :visible.sync="dialogVisible" width="80%" @close="dialogClose"
    :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialog">
    <div class="dialog-header" slot="title">{{title}}</div>
    <div class="dialog-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" class="dialog-ruleForm">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="字段名称" prop="keyName" label-width="100px">
              <el-input v-model="ruleForm.keyName" placeholder="例如：name、age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段描述" prop="keyDescribe" label-width="100px">
              <el-input v-model="ruleForm.keyDescribe" placeholder="例如：姓名、年龄"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="占位文字" prop="placeholder" label-width="100px">
          <el-input v-model="ruleForm.placeholder" placeholder="例如：请填写姓名、年龄"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="单行条数" prop="lineNum" label-width="100px">
              <el-input v-model="ruleForm.lineNum" placeholder="例如：1、2"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="medium">取 消</el-button>
      <el-button type="primary" @click="sure" size="medium">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: '提示'
    }
  },
  data () {
    return {
      ruleForm: {
        keyName: '',
        keyDescribe: '',
        placeholder: '',
        lineNum: 1
      },
      rules: {
        keyName: [
          { required: true, message: '请输入字段名', trigger: 'blur' }
        ],
        keyDescribe: [
          { required: true, message: '请输入字段描述', trigger: 'blur' }
        ],
        placeholder: [
          { required: false, message: '请输入占位描述', trigger: 'blur' }
        ],
        lineNum: [
          { required: true, message: '请输入单行展示数量', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.showDialog
      },
      set (val) {
        this.$emit('update:showDialog', val)
      }
    }
  },
  methods: {
    dialogClose () {
      this.$emit('closeDialog')
    },
    closeDialog (done) {
      this.$refs.ruleForm.resetFields()
      done()
    },
    cancel () {
      this.$refs.ruleForm.resetFields()
      this.$emit('cancel')
    },
    sure () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('sure', { data: this.ruleForm })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.component-container {
  .el-input__inner {
    border-width: 0 0 1px 0;
    border-radius: 0;
    border-style: none none solid none
  }
  .dialog-header {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 20px;
    border-bottom: #eee;
    border-bottom-width: 1px;
    border-style: none none dashed none
  }
  .dialog-content {
    display: flex;
    justify-content: center;
    align-items: center;
    .dialog-ruleForm {
      width: 80%;
    }
  }
  .dialog-footer {
    padding-top: 20px;
    border-top: #eee;
    border-top-width: 1px;
    border-style: dashed none none none
  }
}
</style>
