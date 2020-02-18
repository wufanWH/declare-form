<template>
  <div class="base-component-container">
    <div class="fixed-header">
      <div v-if="!isEdit" class="header-left">
        新增动态模版
        <el-dropdown :hide-on-click="true" trigger="click" class="add-more">
          <span class="icon-more">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dropNew">放弃新增</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else class="header-left">
        编辑动态模版
      </div>
      <div class="header-right">
        <el-button class="right-save" type="primary" @click="saveForm">保存</el-button>
      </div>
    </div>
    <el-container>
      <el-aside>
        <div class="toolbar-container">
          <div class="toolbar-header">
            侧边栏
          </div>
          <div class="tool-model">
            页面
          </div>
          <ul class="step-list" style="overflow:auto"
           infinite-scroll-immediate>
            <li v-for="(item, index) in toolbarForm.pageList" class="step-list-item" :key="index">{{ item.name }}</li>
            <li><div class="tool-page-add-font"><i class="el-icon-plus"></i></div></li>
          </ul>
          <div class="tool-model">
            元件库
          </div>
          <ul class="step-list step-list-row" v-infinite-scroll style="overflow:auto">
            <li v-for="(item, index) in toolbarForm.componentList" class="step-list-item" :key="index">
              <div class="dynamic-icon" @click="selectComponent(item, index)">
                <svg-icon style="font-size: 36px" :icon-class="item.icon || 'form'"></svg-icon>
                {{ item.name }}
              </div>
            </li>
          </ul>
          <div class="tool-model">
            模版
          </div>
          <ul class="step-list" style="overflow:auto">
            <li v-for="(item, index) in toolbarForm.templateList" class="step-list-item" :key="index">{{ item.name }}</li>
          </ul>
          <div class="tool-model" v-show="false">
            示例
          </div>
          <ul class="step-list" v-show="false" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="i in count" class="step-list-item" :key="i">{{ i }}</li>
          </ul>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <div class="el-main-container">
            <el-form ref="dynamicForm" label-position="left" :model="dynamicForm" :rules="dynamicRules" auto-complete="on">
              <div v-for="(item, index) in templateForm" :key="index">
                <el-form-item :label-width="(item.keyDescribe.length * 16 + 10) + 'px'" :label="item.keyDescribe" v-if="item.lineNum === 1"
                  :prop="item.keyName">
                  <component v-bind:is="item.element"></component>
                </el-form-item>
                <el-form-item v-else>
                  <el-col :span="24 / item.lineNum" v-for="(cItem, index) in item.children" :key="index">
                    <el-form-item :label-width="(cItem.keyDescribe.length * 16 + 10) + 'px'" :label="cItem.keyDescribe" :prop="cItem.keyName">
                      <component v-bind:is="cItem.element"></component>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <com-params ref="comParaDialog" :title.sync="dialogForm.title" :showDialog="dialogForm.visible" @closeDialog="dialogForm.visible = false"
      @cancel="dialogForm.visible = false" @sure="addComponent"></com-params>
  </div>
</template>

<script>
import comParams from '@/views/dynamic-form/components/ComParams'
import textArea from '@/components/BaseComponents/TextArea'

export default {
  components: { comParams, textArea },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      count: 0,
      toolbarForm: {
        pageList: [
          {
            name: '个人信息及工作经历',
            step: 1
          },
          {
            name: '主要作品及成就',
            step: 2
          }
        ],
        componentList: [
          {
            name: '输入框',
            icon: 'input',
            type: 'el-input'
          },
          {
            name: '文本框',
            icon: 'textarea',
            type: 'text-area'
          },
          {
            name: '单选框',
            icon: 'radio',
            type: 'el-radio'
          },
          {
            name: '复选框',
            icon: 'checkbox',
            type: 'el-checkbox'
          },
          {
            name: '选择器',
            icon: 'select',
            type: 'el-select'
          },
          {
            name: '级联选择器',
            icon: 'cascader',
            type: 'el-cascader'
          },
          {
            name: '时间选择器',
            icon: 'datepicker',
            type: 'el-date-picker'
          },
          {
            name: '上传',
            icon: 'upload',
            type: 'el-upload'
          },
          {
            name: '评分',
            icon: 'rate',
            type: 'el-rate'
          },
          {
            name: '表格',
            icon: 'table',
            type: 'el-table'
          }
        ],
        templateList: [
          {
            name: '个人信息'
          },
          {
            name: '学习经历'
          },
          {
            name: '主要成就'
          }
        ]
      },
      templateForm: [],
      dynamicForm: {},
      dynamicRules: {},
      dialogForm: {
        title: '组件',
        visible: false,
        compDetail: {}
      }
    }
  },
  methods: {
    dropNew () {
      this.$confirm('确定放弃新增？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '继续新增'
        })
      })
    },
    saveForm () {},
    load () {
      this.count += 2
    },
    selectComponent (item, index) {
      this.dialogForm.visible = true
      this.dialogForm.title = item.name
      this.dialogForm.compDetail['element'] = item.type
    },
    addComponent (val) {
      this.dialogForm.visible = false
      this.dialogForm.compDetail['keyName'] = val.data.keyName
      this.dialogForm.compDetail['keyDescribe'] = val.data.keyDescribe
      this.dialogForm.compDetail['placeholder'] = val.data.placeholder
      this.dialogForm.compDetail['lineNum'] = val.data.lineNum
      if (val.data.lineNum === 1) {
        let data = Object.assign({}, this.dialogForm.compDetail)
        this.templateForm.push(data)
      } else {
        if (this.templateForm.length > 0 && this.templateForm[this.templateForm.length - 1].lineNum > 1 &&
        this.templateForm[this.templateForm.length - 1].lineNum > this.templateForm[this.templateForm.length - 1].children.length &&
        val.data.lineNum === this.templateForm[this.templateForm.length - 1].lineNum) {
          this.templateForm[this.templateForm.length - 1]['children'].push(Object.assign({}, this.dialogForm.compDetail))
        } else {
          let data = {}
          data['lineNum'] = val.data.lineNum
          data['children'] = [Object.assign({}, this.dialogForm.compDetail)]
          this.templateForm.push(data)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.base-component-container {
  min-height: calc(100vh - 64px);
  background: #f0f2f5;
  .el-input__inner {
    border-width: 0 0 1px 0;
    border-radius: 0;
    border-style: none none solid none
  }
  aside {
    margin: 0;
    padding: 20px;
    line-height: 100%;
  }
  .el-main {
    padding: 20px 20px 20px 0;
  }
  .fixed-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
    background: #fff;
    .add-more {
      margin-left: 20px;
      font-size: 20px;
      color: #ccc;
    }
    .header-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 0 10px 20px;
      font-size: 20px;
      font-weight: bold;
      width: 40%;
    }
    .icon-more {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .header-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 10px 20px 10px 0px;
      width: 60%;
    }
    .right-save {
      font-size: 16px;
    }
  }
  .toolbar-container {
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 5px;
    .toolbar-header {
      display: flex;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      justify-content: center;
      padding: 8px 0;
    }
    .tool-model {
      background: #d8d8d8;
      display: flex;
      font-size: 14px;
      justify-content: center;
      padding: 8px 0;
    }
    .step-list {
      display: flex;
      flex-direction: column;
      height: 200px;
      padding: 0;
      .tool-page-add-font {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #009ddd;
        font-size: 20px;
        height: 35px;
      }
    }
    .step-list-row {
      flex-direction: row;
      flex-wrap: wrap;
      padding-bottom: 10px;
      .dynamic-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 12px;
      }
    }
    .step-list li{
      font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
      border: 0px solid #dcdfe6;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.647058823529412);
      border-radius: 3px;
      cursor: pointer;
      list-style: none;
      display: inline-block;
      line-height: 35px;
      padding: 0px 12px;
    }
    .step-list-row li{
      font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
      border: 0px solid #dcdfe6;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.647058823529412);
      border-radius: 3px;
      cursor: pointer;
      list-style: none;
      display: inline-block;
      line-height: 35px;
      width: 130px;
      text-align: center;
    }
    .step-list li:hover {
      background: #c6ecf9;
    }
    .step-list-row li:hover {
      background: #c6ecf9;
      border: 0.5px solid #009edb;
    }
  }
  .el-main-container {
    min-height: 824px;
    padding: 20px;
    background: #fff;
    font-size: 14px;
    border-radius: 5px;
  }
}
</style>
