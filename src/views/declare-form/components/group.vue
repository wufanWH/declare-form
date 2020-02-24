<template>
   <div class="group-container">
     <div class="biaot">
        <div class="paper">
          <span>{{ groupData.groupName }}</span>
        </div>
      </div>
      <div v-for="(item, index) in groupData.serviceFormTemplateModels" :key="index">
         <dc-template ref="templateModel" v-if="item.isList==2" :template-obj="item" :data-val="dataVal.templateModels[index]" @getVal="getVal"></dc-template>
         <template-list ref="templateModel" v-if="item.isList==1" :template-obj="item" :data-val="dataVal.templateModels[index]" @getVal="getVal"></template-list>
      </div>
      <div class="button-box">
        <el-button v-if="!isFirst" type="primary" @click="goPrevious">上一步</el-button>
        <el-button v-if="!isLast" type="primary" @click="goNext">下一步</el-button>
        <el-button v-if="isLast" type="primary" @click="onSubmit">提交</el-button>
      </div>
   </div>
</template>
<script>
import dcTemplate from '@/views/declare-form/components/template'
import templateList from '@/views/declare-form/components/template-list'
export default {
  components: { dcTemplate, templateList },
  data () {
    return {
      groupVal: {},
      dataJson: {}
    }
  },
  props: {
    groupData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    dataVal: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    isLast: {
      type: Boolean,
      default: false
    },
    groupIndex: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.dataJson = this.getUserData()
  },
  methods: {
    getVal (data) {
      this.dataJson[data.templateId] = data
    },
    getUserData () {
      let templateData = {}
      const modelData = this.groupData.serviceFormTemplateModels
      for (let i = 0; i < modelData.length; i++) {
        templateData[modelData[i].templateId] = {}
      }
      return templateData
    },
    getGroupData () {
      this.groupVal = {
        groupId: this.groupData.groupId,
        templateModels: []
      }
      for (let key in this.dataJson) {
        this.groupVal.templateModels.push(this.dataJson[key])
      }
      console.log(this.groupVal)
    },
    goPrevious () {
      this.$emit('changeGroup', { page: (this.groupIndex - 1) })
    },
    goNext () {
      this.getGroupData()
      this.$emit('changeGroup', { page: (this.groupIndex + 1) })
    }
  }
}
</script>
<style lang="scss" scoped>
.group-container{
  width: 1200px;
  margin: auto;
  background-color: #fff;
  min-height: 500px;
  border-radius: 5px;
  box-shadow: 0 0 8px #cccccc;
  margin-bottom: 60px;
  .button-box{
    padding: 60px 0;
    text-align: center;
    width: 100%;
  }
}
.biaot {
  width: 100%;
  height: 50px;
  // border-top: 2px solid #409eff;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  position: relative;
  .btitle {
    position: absolute;
    z-index: 9;
  }
  .paper {
    width: 294px;
    height: 50px;
    line-height: 50px;
    position: relative;
    background: #409EFF;
    margin-top: 2px;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .paper:after {
    content: '';
    position: absolute;
    right: -20px;
    top: 0;
    display: block;
    border: 20px solid;
    border-color: #fff transparent transparent;
  }
  .paper:before {
    background: #409EFF;
    width: 294px;
    height: 41px;
    line-height: 41px;
    position: absolute;
    bottom: -2px;
    left: 0;
  }
}
</style>
