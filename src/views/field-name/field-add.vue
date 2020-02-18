<template>
  <field-form :is-edit="false"></field-form>
</template>

<script>
import fieldForm from '@/views/field-name/components/fieldForm'

export default {
  name: 'AddField',
  components: { fieldForm },
  data () {
    return {}
  }
}
</script>
