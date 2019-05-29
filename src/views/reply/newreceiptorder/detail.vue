<template>
  <div>
     <sticky :className="'sub-navbar published'"  >
    <template v-if="fetchSuccess">
      <template v-if="approveStatus == 2">
        <el-button  style="margin-left: 10px;"  size="small"  type="warning" @click="Prompt('delete')" >删除</el-button>
        <el-button  style="margin-left: 10px;"  size="small"  type="primary" @click="Edit" >修改</el-button>
      </template>
      <template v-else-if="approveStatus == 0">
        <el-button  style="margin-left: 10px;"   size="small" type="primary"   @click="Prompt('examine')" >审核</el-button>
        <el-button  style="margin-left: 10px;"   size="small"  type="error"  @click="Prompt('reject')"  >驳回</el-button>
      </template>
      <template v-else>
        <el-tag v-show="false">详情</el-tag>
      </template>
    </template>
  </sticky>

  <div class="transfermanagement-container" >

     <item-title text="基本信息" />
     <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

    <item-title text="相关明细"/>
    <web-pagination-table
     :loading="loading"
     :config="tableConfig"
     :allTableData="tableData"/>

    <div class="tableTotal">
       <span>签收总量</span> : <span>{{config.allSignQty&&Number(config.allSignQty).toFixed(2)||0}}</span>
       <span>签收金额</span> : <span>{{config.allSignAmount&&Number(config.allSignAmount).toFixed(2)||0}}</span>
       <span>开票总量</span> : <span>{{config.allInvoiceQty&&Number(config.allInvoiceQty).toFixed(2)||0}}</span>
    </div>

  </div>
  </div>
</template>

<script>
 import Sticky from '@/components/Sticky'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import {Prompt} from './prompt'
 import { signDetail } from '@/api/reply'
 import { tableConfig,infoConfig } from './config';
 import { NatureInvoice } from '@/utils/enum'
 import moment from 'moment';
 export default {
  components: {
    Sticky,
    webPaginationTable
  },
   data(){
     return {
        fetchSuccess:true,
        approveStatus:1,
        tableConfig,
        tableData:[],

        loading:false,
        infoConfig,
        config:{},

     }
   },


  created(){
    this.tableConfig.forEach(item=>{
       if(item.useList){
          item.dom=(row, column, cellValue, index)=>{
            let arr=row.invoiceList||[]
            return  <el-card class="box-card" shadow="never" body-style="padding:0" >
                     {
                       arr.map(v=><div>{`${v.invoiceCode||''}( ${NatureInvoice.find(item=>item.value===Number(v.invoiceNature))&&NatureInvoice.find(item=>item.value===v.invoiceNature).name||''})`}</div>)
                     }
                    </el-card>
          }
       }
    })
  },


   mounted(){
      let { id,approveStatus}=this.$route.query||{};
      this.signId=id;
      this.approveStatus=approveStatus;
      this.loading=true;

      signDetail({signId:id}).then(res=>{
        this.loading=false;
        if(res.data){
          this.config=res.data;
          if(!this.config.signNo){
            let index=this.infoConfig.findIndex(v=>v.value=='signNo');
            this.infoConfig.splice(index,1)
          }
          this.tableData=res.data.itemList||[]
        }
      }).catch(err=>{
           this.loading=false;
       })
   },

   methods:{
     Prompt,
     Edit(){
      this.$router.push({
        path: '/reply/newreceiptorder',
        query:{modify:true,id:this.signId,time:moment().valueOf()}
      })
     }
   },
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .transfermanagement-container{
    padding-top: 12px;
    .el-card{
      border: 0;
    }

     .tableTotal{
      padding-top:8px;
      span{
         font-size: 12px;
         color:#606266;
         &:nth-child(2n-1){
          font-weight: 600;
         }
         &:nth-child(2n){
          padding-right: 20px;
         }
      }

    }
  }
</style>
