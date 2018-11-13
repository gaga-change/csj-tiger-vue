<template>
  <div class="entryInvoice-list">
     <search-invoice   :searchForm="searchForm"   @submit="this.submit"   :isDisplaySubmit="false"  ></search-invoice>
     <div class="add-buttom" >
        <item-title text="商品发票明细" />
        <el-button type="primary" size="mini"  :disabled="searchForm.invoiceNature===2" @click="dialogVisible=true"  >选择签收单下商品明细</el-button>
     </div>

     <edit-table 
     :tableData="editTableData"
     :labelMak="searchForm.invoiceNature===2"
     @goeditrow="goeditrow"
     @handleDelete="handleDelete"/>

     <el-dialog
      title="选择签收明细"
      custom-class="shouDetailsDialog"
      :visible.sync="dialogVisible"
      top="6vh"
      width="70%"
      :before-close="()=>dialogVisible=false">
        
       <web-pagination-table 
        @SelectionChange="handleSelectionChange"
        :loading="false"
        :config="addAlertTableConfig" 
        :allTableData="alertTableData"/>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="handleSuccess">确 定</el-button>
        </span>
     </el-dialog>
     

  </div> 
</template>

<script>
import SearchInvoice from './components/search'
import EditTable from './components/table'
import webPaginationTable from '@/components/Table/webPaginationTable'
import { addAlertTableConfig } from './components/config';
import _  from 'lodash';
export default {
  components: { SearchInvoice,webPaginationTable,EditTable},
   data() {
    return {
      searchForm:{
        providerName:'',
        busiBillNo:'',
        invoiceType:'',
        invoiceNature:'',
        invoiceNo:'',
        invoiceAmt:'',
        invoiceTaxAmt:'',
        makeDate:'',
        arriveDate:'',
        oldInvoiceId:''
      },
      dialogVisible:false,
      alertTableData:[],
      editTableData:[],
      addAlertTableConfig
    }
  },

  methods:{
    handleSelectionChange(value){
     console.log(value)
    },
    handleSuccess(){
      this.dialogVisible=false;
    },
    submit(type){
      let json={};
      for(let i in this.searchForm){
        if(this.searchForm[i]!==''){
          json[i]=this.searchForm[i]
        }
      }
      console.log(type,json)
    },

    goeditrow(index){
      let data= _.cloneDeep(this.editTableData);
      data[index].edit=!data[index].edit;
      this.editTableData=data;
      console.log(this.editTableData)
    },
    handleDelete(index,row){
     let data= _.cloneDeep(this.editTableData);
     data.splice(index,1);
     this.editTableData=data;
     console.log(this.editTableData)
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .entryInvoice-list{
    .add-buttom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  .shouDetailsDialog{
     .el-dialog__body{
      padding: 0 20px;
    }
  }

</style>

