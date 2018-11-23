<template>
  <div  class="abnormalGoods">
      <add-search  :searchForm="searchForm"   @submit="this.submit"  ></add-search >
      <div class="add-buttom" >
        <item-title text="商品明细" />
        <el-button type="primary" size="mini"  @click="displayAlert"  >增加商品明细</el-button>
     </div>
     <edit-table 
       :tableData="editTableData"
       @goeditrow="goeditrow"
       @handleDelete="handleDelete"/>

     <el-dialog
      title="选择商品明细"
      custom-class="shouDetailsDialog"
      :visible.sync="dialogVisible"
      top="6vh"
      width="70%"
      :before-close="()=>dialogVisible=false">

       <web-pagination-table 
        @SelectionChange="handleSelectionChange"
        :loading="alertLoading"
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
import AddSearch from './components/addSearch'
import EditTable from './components/table'
import { addAlertTableConfig } from './components/config';
import webPaginationTable from '@/components/Table/webPaginationTable'
import _  from 'lodash';
export default {
  components: { AddSearch,EditTable,webPaginationTable },
   data() {
    return {
      searchForm:{

      },
      editTableData:[],
      addAlertTableConfig,
      dialogVisible:false,
      alertLoading:false,
      alertTableData:[],
      alertTableDataSelect:[]
    }
  },

  mounted(){
  
  },

  created(){

  },

  methods:{

    displayAlert(){
      this.dialogVisible=true;
    },

    handleSuccess(){
      this.dialogVisible=false;
      this.editTableData=this.alertTableDataSelect;
    },

    handleSelectionChange(value){
      this.alertTableDataSelect=value;
    },

    submit(value,type){
      console.log({...value},type,[...this.editTableData])
    },

    goeditrow(index,type){
      let data= _.cloneDeep(this.editTableData);
      data[index].edit=!data[index].edit;
      this.editTableData=data;
    },

    handleDelete(index,row){
     let data= _.cloneDeep(this.editTableData);
     data.splice(index,1);
     this.editTableData=data;
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
    .add-buttom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
</style>

