<template>
  <dict-detail :is-edit="true"></dict-detail>
</template>

<script>
import dictDetail from '@/views/dictionary/components/DictDetail'

export default {
  name: 'EditDictionary',
  components: { dictDetail },
  data () {
    return {}
  }
}
</script>
