<template>
  <div class="outgoing-quirydetail-container">

      <item-title text="基本信息"/>
      <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

     <item-title text="相关明细"/>
     <el-tabs v-model="tabActive" type="card" @tab-click="activeChange">
        <el-tab-pane label="相关计划单" name="plan">
          <web-pagination-table 
            :loading="loading"
            :config="tableConfig" 
            :allTableData="tableData"/>
          </el-tab-pane>
        <el-tab-pane label="相关出库单" name="outgoing">
             <web-pagination-table 
            :loading="outgoingLoding"
            :config="outgoingTableConfig" 
            :allTableData="outgoingTableData"/> 
        </el-tab-pane>
     </el-tabs>
  </div>
</template>

<script>
 import {outPlanDetail,outOrderSelect} from '@/api/outgoing';
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import {tableConfig,infoConfig,outgoingTableConfig } from './config';

 export default {
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        infoConfig,
        busiBillNo:'',

        tableConfig,
        tableData:[],

        outgoingLoding:false, 
        outgoingTableConfig,
        outgoingTableData:[],

        loading:false,
        tabActive:'plan'
      }
    },

    mounted(){
      let {planCode}=this.$route.query||{};
      this.loading=true;
      outPlanDetail({planCode}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.planCode=data.planCode;
          this.tableData=Array.isArray(data.itemList)?data.itemList:[];
        }
        this.loading=false;

      }).catch(err=>{
         this.loading=false;
      })
    },

    methods:{
      activeChange(tab){
        if(tab.name=='outgoing'){
            if(!this.outgoingTableData.length){
              this.outgoingLoding=true;
              outOrderSelect({
                  planCode:this.planCode,
                  pageSize:500,
                  pageNum:1
                }).then(res=>{
                if(res.success){
                   this.outgoingTableData=res.data&&res.data.list||[]
                }
                 this.outgoingLoding=false;
              }).catch(err=>{

              })
            }
        }
      }
    },
 }

</script>
