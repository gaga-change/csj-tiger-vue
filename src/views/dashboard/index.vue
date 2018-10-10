<template>
  <div class="dashboard-container">
     欢迎 {{userInfo.truename}} 进入交付中心管理平台
  </div>
</template>

<script>
 import { mapGetters } from 'vuex'
 export default {
     computed: {
     ...mapGetters([
      'userInfo'
    ])
  },
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container{
    padding: 24px;
  }
</style>
