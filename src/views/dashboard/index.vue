<template>
  <div class="dashboard-container">
     <!-- 欢迎 {{userInfo.truename}} 进入交付中心管理平台s -->
     <el-row :gutter="24">
      <el-col :span="24">
        <item-title text="待办事项"/>
        <work-flow-node style="height:300px"></work-flow-node>
      </el-col>
      <!-- <el-col :span="9">
        <watch-message></watch-message>
      </el-col> -->
    </el-row>

  <!-- <template>
  <div>
    <el-table :data="tableData6" :span-method="objectSpanMethod" border
    align="center" style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）" :formatter="addTotal">
      </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）">
      </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）">
      </el-table-column>
    </el-table>
  </div>
</template> -->


  </div>
</template>

<script>
 import { mapGetters } from 'vuex'
 import WorkFlowNode from './components/WorkFlowNode' // 待办事项
let count = 0
 export default {
    name:'dashboard',
    components:{
      WorkFlowNode
    },
     data() {
      return {
        curId:'12987122',
      };
    },
    created(){
      count = 0
    },
     methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {


        let tableData6 = this.tableData6
        let equalRow = 0,total=0
        tableData6.map(item=>{
          if(item.id == row.id){
            ++equalRow
            total += Number(item.amount1)
          }
        })

        if (/0|1/.test(columnIndex)) {
          if (rowIndex-count === 0) {

            return {
              rowspan: equalRow,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if(columnIndex==2){
          if (rowIndex-count === 0) {
               count += equalRow
            return {
              rowspan: equalRow,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      addTotal({...params}) {
        let total=0
        this.tableData6.map(item=>{
          if(item.id == params.id){
            total += Number(item.amount1)
          }
        })
        return total
      }

      },

  computed: {
     ...mapGetters([
      'userInfo'
    ])
  },
 }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
