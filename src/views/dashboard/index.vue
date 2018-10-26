<template>
  <div class="dashboard-container">
     欢迎 {{userInfo.truename}} 进入交付中心管理平台
     <!-- <el-row :gutter="24">
      <el-col :span="15">
        <work-flow-node></work-flow-node>
      </el-col>
      <el-col :span="9">
        <watch-message></watch-message>
      </el-col>
    </el-row>  -->
  </div>
</template>

<script>
 import { mapGetters } from 'vuex'
 import WorkFlowNode from './components/WorkFlowNode' // 待办事项

 export default {
    name:'dashboard',
    components:{
      WorkFlowNode
    },
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
