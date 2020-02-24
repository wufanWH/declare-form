<template>
  <div class="declear-form-container">
    <declare-step :step-data="declareBigJson" :current-step="currentStep"></declare-step>
    <div v-for="(item,index) in declareBigJson" :key="'group-'+index">
      <group v-if="index===currentStep" :is-first="index===0" :is-last="index===(declareBigJson.length-1)" :group-data="item" :data-val="declareValueJson[index]" :group-index="index" @changeGroup="changeIndex"></group>
    </div>
    <back-top></back-top>
  </div>
</template>
<script>
import backTop from '@/components/backToTop'
import declareStep from '@/views/declare-form/components/declare-step'
import group from '@/views/declare-form/components/group'
export default {
  components: { backTop, declareStep, group },
  data () {
    return {
      declareBigJson: [],
      declareValueJson: [],
      declareId: '',
      currentStep: 0,
      fullscreenLoading: false
    }
  },
  created () {
    this.declareId = this.$route.query.declareId || ''
    if (this.declareId) {
      this.formInit(this.declareId)
    } else {
      console.log('declareId为空')
      this.$router.push({
        path: '/declare-index'
      })
    }
  },
  methods: {
    formInit (id) {
      let _this = this
      const reqData = {
        id: this.declareId
      }
      _this.fullscreenLoading = true
      Promise.all([this.$api.declare.declareInit(reqData), this.$api.declare.declareInitValue(reqData)]).then(function ([resModel, resValue]) {
        // 这里写等这两个ajax都成功返回数据才执行的业务逻辑
        _this.fullscreenLoading = false
        _this.declareBigJson = resModel.data.serviceFormGroupModels
        _this.declareValueJson = resValue.data.groupModels
      }).catch(() => {
        _this.fullscreenLoading = false
      })
    },
    changeIndex (data) {
      this.currentStep = data.page
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
