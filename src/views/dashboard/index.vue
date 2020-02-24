<template>
  <div class="dashboard-container">
    <div class="user-info">
      <span class="login-out" @click="loginOut">退出</span>
      <span class="user-name">用户名asads</span>
    </div>
    <router-view/>
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
  },
  methods: {
    loginOut () {
      this.$store.dispatch('user/resetToken').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    // margin: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .user-info{
      background-color: #ffffff;
      margin-bottom: 30px;
      box-shadow: 0 0 5px #cccccc;
      .user-name{
        padding: 10px 0;
        text-align: center;
        display: block;
        float: right;
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .login-out{
        padding: 10px 0;
        text-align: center;
        display: block;
        float: right;
        width: 60px;
        color: blue;
        cursor: pointer;
      }
    }
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
