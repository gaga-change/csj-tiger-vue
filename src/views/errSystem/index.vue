<template>
  <div>
     <search-invoice  :searchForm="searchForm"   @submit="this.submit"  @reset="this.reset"  ></search-invoice>
     
      <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :loading="loading"
      :config="listIndexConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="pageSize"
      :currentPage="pageNum"
      :tableData="tableData"/>

      <el-dialog
      title="错误详情"
      custom-class="shouDetailsDialog"
      :visible.sync="dialogVisible"
      top="6vh"
      width="70%"
      :before-close="()=>dialogVisible=false">

      <item-card :config="listDetailConfig" :loading="cardLoading"   :cardData="cardData"/> 

     </el-dialog>
  </div> 
</template>

<script>
import { listIndexConfig,listDetailConfig } from './config';
import SearchInvoice from './search'
import BaseTable from '@/components/Table'
import { interactiveErrorDataSelect,interactiveErrorDataGet,interactiveErrorDataReset } from '@/api/errSystem/err'
export default {
  components: { SearchInvoice,BaseTable },
   data() {
    return {
      searchForm:{
        busiType:'',
        subType:'',
        busiKey:'',
        successFlag:''
      },
      listIndexConfig,
      listDetailConfig,
      pageSize:10,
      pageNum:1,
      total:0,
      loading:false,
      dialogVisible:false,
      cardLoading:false,
      cardData:{

      },
      tableData:[
        {
          "id": "int",
          "busiType": "string",
          "subType": "string",
          "busiKey": "string",
          "resetCount": "int ",
          "paramData": "string",
          "errorMes": "string",
          "successFlag": "int"
        } 
      ]

    }
  },

  mounted(){
    this.getCurrentTableData();
  },

  created(){
    this.listIndexConfig.forEach(item=>{
       if(item.useLink){
          item.dom=(row, column, cellValue, index)=>{
            return <span onClick={this.selectbyId.bind(this,row)} class="tableSelectbyId">查看</span>
          };
       }
    })
  },

  methods:{

    selectbyId(row){
      this.dialogVisible=true;
      console.log(row)
    },

    submit(value){
      this.searchForm=value;
      this.getCurrentTableData();
    },

    reset(){
      let data = _.cloneDeep(this.searchForm);
      let json={};
      for(let i in data){
        json[i]=''
      }
      this.searchForm=json;
      this.submit({})
    },

    handleSizeChange(val) {
      this.pageSize=val;
      this.pageNum=1;
      this.getCurrentTableData();
    },

    handleCurrentChange(val) {
     this.pageNum=val;
     this.getCurrentTableData();
    },

    getCurrentTableData(){
      this.loading=true;
      let json={};
      for(let i in this.searchForm){
        if(this.searchForm[i]!==''){
          json[i]=this.searchForm[i]
        }
      }
      interactiveErrorDataSelect({...json,pageSize:this.pageSize,pageNum:this.pageNum}).then(res=>{
        if(res.success){
          this.total=res.data&&res.data.total;
          // this.tableData=res.data&&res.data.list||[]    
        }
        this.loading=false;
      }).catch(err=>{
        this.loading=false;
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tableSelectbyId{
    color: rgb(51, 153, 234);
    cursor: pointer;
  }

</style>

