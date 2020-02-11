<template>
  <dynamic-form :is-edit="false"></dynamic-form>
</template>

<script>
import dynamicForm from '@/views/dynamic-form/components/DynamicForm'

export default {
  name: 'CreateDynamicForm',
  components: { dynamicForm },
  data () {
    return {}
  }
}
</script>
