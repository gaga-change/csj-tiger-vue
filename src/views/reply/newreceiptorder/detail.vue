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
  </div>
  </div>
</template>

<script>
 import Sticky from '@/components/Sticky' 
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import {Prompt} from '@/utils/prompt'
 import { signDetail } from '@/api/reply'
 import { tableConfig,infoConfig} from './config';
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
        query:{modify:true,id:this.signId}
      })
     }
   }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .transfermanagement-container{
    padding-top: 12px;
  }
</style>
