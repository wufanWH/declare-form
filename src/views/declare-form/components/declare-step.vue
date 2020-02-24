<template>
  <el-steps :active="currentStep" align-center>
    <el-step v-for="(item, index) in stepData" :title="item.groupName" :key="index"></el-step>
  </el-steps>
</template>
<script>
export default {
  name: 'declareStep',
  props: {
    stepData: {
      type: Array,
      default: function () {
        return []
      }
    },
    currentStep: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-steps{
    width: 60%;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 50px;
  }
</style>
