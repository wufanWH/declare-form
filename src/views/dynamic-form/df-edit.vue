<template>
  <dynamic-form :is-edit="true"></dynamic-form>
</template>

<script>
import dynamicForm from '@/views/dynamic-form/components/DynamicForm'

export default {
  name: 'EditDynamicForm',
  components: { dynamicForm },
  data () {
    return {}
  }
}
</script>
