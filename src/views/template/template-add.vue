<template>
  <template-form :is-edit="false"></template-form>
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
