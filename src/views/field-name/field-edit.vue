<template>
  <field-form :is-edit="true"></field-form>
</template>

<script>
import fieldForm from '@/views/field-name/components/fieldForm'

export default {
  name: 'EditField',
  components: { fieldForm },
  data () {
    return {}
  }
}
</script>
