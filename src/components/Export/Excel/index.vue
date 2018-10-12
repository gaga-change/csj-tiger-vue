<template>
  <el-button style="margin-left: 10px;" type="primary"
  :loading = "downloadLoading"
  :disabled = "downloadLoading"
  @click="clickIt"
  >导出列表</el-button>
  <!-- <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    导出列表<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">导出当前页</el-dropdown-item>
    <el-dropdown-item command="b">导出所有</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown> -->
</template>
<script>
import { exportExcel } from '@/utils/exportexcel'
export default {
  name:'ExportExecl',
  props:{
    excelHeaderKeyValue: Object,
    tableExcelData: Array,
    handleMethod: Object,
    currentPostData: Object
  },
  data(){
      return {
        downloadLoading:false,
        demo: 123
      }
  },
  methods:{
    exportExcels(){
      exportExcel({
            list: this.tableExcelData,
            tHeader: Object.keys(this.excelHeaderKeyValue),
            filterVal: Object.values(this.excelHeaderKeyValue)
          })
    },
    clickIt(){
      // this.handleMethod.bind(this)
    }
  },
  mounted(){
    console.log(this.excelHeaderKeyValue,1);
    console.log(this.tableExcelData,2);
    console.log(this.handleMethod,3);
    console.log(this.currentPostData,4);
    
  }
}
</script>
