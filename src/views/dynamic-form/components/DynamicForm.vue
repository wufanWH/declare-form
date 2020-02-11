<template>
  <div class="base-component-container">
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
            <li v-for="(item, index) in toolbarForm.pageList" class="step-list-item" :key="index">{{ item }}</li>
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
            <li v-for="(item, index) in toolbarForm.templateList" class="step-list-item" :key="index">{{ item }}</li>
          </ul>
          <div class="tool-model">
            示例
          </div>
          <ul class="step-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="i in count" class="step-list-item" :key="i">{{ i }}</li>
          </ul>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <div class="el-main-container">
            <el-form ref="dynamicForm" label-position="left" :model="dynamicForm" :rules="dynamicRules" auto-complete="on">
              <div class="info-container">
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

export default {
  components: { comParams },
  data () {
    return {
      count: 0,
      toolbarForm: {
        pageList: [],
        componentList: [
          {
            name: '输入框',
            icon: 'input',
            type: 'el-input'
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
        templateList: []
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
        console.log('********', this.templateForm)
        this.templateForm.push(data)
      } else {
        let data = {}
        data['lineNum'] = val.data.lineNum
        if (data['children']) {
          data['children'].push(Object.assign({}, this.dialogForm.compDetail))
        } else {
          data['children'] = [Object.assign({}, this.dialogForm.compDetail)]
        }
        this.templateForm.push(data)
      }
    }
  }
}
</script>

<style lang="scss">
.base-component-container {
  min-height: calc(100vh - 64px);
  background: #f0f2f5;
  aside {
    margin: 0;
    padding: 20px;
    line-height: 100%;
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
    .step-list-row li:hover {
      background: #c6ecf9;
      border: 0.5px solid #009edb;
    }
  }
  .el-main-container {
    .info-container {
      padding: 20px;
      background: #fff;
      margin: 0 0 20px 0;
      font-size: 14px
    }
  }
}
</style>
