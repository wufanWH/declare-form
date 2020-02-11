<template>
  <div class="dashboard-container">
    <div class="dashboard-container">
      <div class="dashboard-welcome"><img src="~@/assets/img/welcome.png"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created () {
    console.log('router内容：', this.$route)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-welcome {
    width: 903px;
    height: 564px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
