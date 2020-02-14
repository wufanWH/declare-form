<template>
  <dict-detail :is-edit="false"></dict-detail>
</template>

<script>
import dictDetail from '@/views/dictionary/components/DictDetail'

export default {
  name: 'CreateDictionary',
  components: { dictDetail },
  data () {
    return {}
  }
}
</script>
