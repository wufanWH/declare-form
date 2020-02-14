<template>
  <el-form-item :label="label">
    <el-input type="textarea"
      :name="name"
      :value="currentValue"
      @input="onInputEvent"
      :placeholder="placeholder">
    </el-input>
  </el-form-item>
</template>

<script>
import formMixins from './mixin/index'
export default {
  name: 'TextArea',
  props: ['placeholder', 'label', 'name', 'value'],
  mixins: [formMixins],
  data () {
    return {
      currentValue: this.value
    }
  }
}
</script>

<style scoped>
</style>
