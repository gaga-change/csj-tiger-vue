<template>
  <div class="outgoing-quirydetail-container">
  
     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading"   :cardData="infoData"  />

     <item-title text="相关明细"/>
     <web-pagination-table 
      :loading="loading"
      :config="addPlanOrder_config" 
      :allTableData="tableData"/>

      <el-dialog
        title="编辑计划出库数量并选择仓库"
        :visible.sync="addVisible"
         width="800px"
        :before-close="handleClose">
          <edit-Table
            @currentRedioChange="handleCurrentRedioChange"
            :highlightCurrentRow="true"
            :config="alertTable_config" 
            :allTableData="alertTableData"/> 
              <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="sureWarehouse">确 定</el-button>
              </span>
      </el-dialog>

  </div>
</template>

<script>

 import { addPlanOrder_config,infoConfig,alertTable_config} from './config';
 import webPaginationTable from '@/components/Table/webPaginationTable';
 import editTable from '@/components/Table/editTable';
 import moment from 'moment';
 import _  from 'lodash';

 export default {
    name: 'businessorderAddPlanOrder',
    components: { webPaginationTable,editTable},
    data() {
      return {
        //基本信息项
        loading:false,
        infoData:{},
        infoConfig,

        //table项
        tableData:[{id:1},{id:2}], //需要id
        addPlanOrder_config,

        //弹框项
        addVisible:false,
        originalTableData:[{id:1,num:1,edit:true},{id:2,num:1,edit:true}],//原始数据  需要id
        alertTableData:[{id:1,num:1,edit:true},{id:2,num:1,edit:true}], //需要id
        alertTable_config,

        currentRow:{},//弹框中当前点中的项
        editRow:{}//当前正在编辑的行 并非弹框


      }
    },

    created(){
      this.addPlanOrder_config.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {
                       <span class="tableLink"  onClick={this.operation.bind(this,'delete',row)}>删除</span>
                     }

                     {
                       <span class="tableLink"  onClick={this.operation.bind(this,'edit',row)}>编辑</span>
                     }
                    
                </div> 
              )
            }
        }
      })
    },

    mounted(){

    },

    methods:{
      moment,
      //关闭弹框
      handleClose(){
        this.addVisible=false;
      },

      //点击某一行的回调
      handleCurrentRedioChange(currentRow, oldCurrentRow){
        this.currentRow=currentRow;
      },

      //展示弹框
      operation(type,row){
        if(type==='delete'){
          let tableData=_.cloneDeep(this.tableData);
          let index=tableData.findIndex(v=>v.id===row.id);
          tableData.splice(index,1);
          this.tableData=tableData;
        } else if(type==='edit'){
           if(row.id!==this.editRow.id){
             this.editRow=row;
             this.currentRow={};
             this.alertTableData=_.cloneDeep(this.originalTableData)
           }
           this.addVisible=true;
        }
      },

      //点击确定
      sureWarehouse(){
        if(!this.currentRow||!Object.keys(this.currentRow).length){
          this.$message.error('请选择数据');
          return 
        }
        let tableData=_.cloneDeep(this.tableData);
        let index=tableData.findIndex(v=>v.id===this.editRow.id);
        if(index!==-1){
          let currentRow=_.cloneDeep(this.currentRow);
          delete currentRow.id;
          tableData[index]={...tableData[index],...currentRow}
        }
        this.tableData=tableData;
         this.addVisible=false;
      }
    }
 }

</script>

<style rel="stylesheet/scss" lang="scss">
    .tableLink{
      cursor: pointer;
      color:#3399ea;
      margin-right:12px;
      &:last-child{
        margin-right: 0;
      }
    }

    .el-table__body tr.current-row>td{
      background: green !important;
      color: #fff;
    }
    .el-table__row{
      cursor: pointer;
    }
</style>
