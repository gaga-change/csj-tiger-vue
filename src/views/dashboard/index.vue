<template>
  <div class="dashboard-container">
     <!-- 欢迎 {{userInfo.truename}} 进入交付中心管理平台s -->
     <el-row :gutter="24">
      <el-col :span="24">
        <item-title text="待办事项"/>
        <work-flow-node></work-flow-node>
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
      <el-table-column prop="amount1" label="数值 1（元）">
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

        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987122',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987122',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      };
    },
    created(){
      count = 0
    },
    //  methods: {
      // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //   console.log(row, column, rowIndex, columnIndex);
      //   let tableData6 = this.tableData6
      //   let equalRow = 0
      //   tableData6.map(item=>{
      //     if(item.id == row.id){
      //       ++equalRow
      //     }
      //   })
      //   count += equalRow
      //   if (/0|1/.test(columnIndex)) {
      //     if ((rowIndex-count) % equalRow === 0) {
      //       return {
      //         rowspan: equalRow,
      //         colspan: 1
      //       };
      //     } else {
      //       return {
      //         rowspan: 0,
      //         colspan: 0
      //       };
      //     }
      //   }
        
        
      // },
  
  computed: {
     ...mapGetters([
      'userInfo'
    ])
  },
 }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
