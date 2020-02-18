<template>
  <template-form :is-edit="true"></template-form>
</template>

<script>
import templateForm from '@/views/template/components/templateForm'

export default {
  name: 'EditTemplate',
  components: { templateForm },
  data () {
    return {}
  }
}
</script>
