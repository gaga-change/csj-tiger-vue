<template>
  <div class="warehousing-quirydetail-container">

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
        <el-tab-pane label="相关入库单" name="warehousing">
             <web-pagination-table 
            :loading="warehousingLoding"
            :config="warehousingTableConfig" 
            :allTableData="warehousingTableData"/> 
        </el-tab-pane>
     </el-tabs>
  </div>
</template>

<script>
 import {inPlanDetail,inOrderSelect} from '@/api/warehousing'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import { tableConfig,infoConfig,warehousingTableConfig } from './config';

 export default {
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        infoConfig,

        tableData:[],
        tableConfig,
        loading:false,

        warehousingLoding:false,
        warehousingTableConfig,
        warehousingTableData:[],

        planCode:'',
        tabActive:'plan',

      }
    },

    mounted(){
      let { planCode}=this.$route.query||{};
      this.planCode=planCode;
      this.loading=true
      inPlanDetail({
        planCode,
        pageSize:500
        }).then(res=>{
        this.loading=false
        if(res.success){
          let data=res.data;
          this.config=data;
          if(this.config.busiBillNo.slice(0,2)=='SO'){
              this.infoConfig.find(v=>v.prop==='busiBillNo').linkTo = '/outgoing/businessorder-detail'
          } 
          let list=data.skuDetails&&data.skuDetails.list||[]
          this.tableData=list||[]
        } 
      }).catch(err=>{
         this.loading=false
      })
    },

    methods:{
       activeChange(tab){
        if(tab.name=='warehousing'){
            if(!this.warehousingTableData.length){
              this.warehousingLoding=true;
              inOrderSelect({
                  planCode:this.planCode,
                  pageSize:500,
                  pageNum:1
                }).then(res=>{
                if(res.success){
                   this.warehousingTableData=res.data&&res.data.list||[]
                }
                 this.warehousingLoding=false;
              }).catch(err=>{

              })
            }
        }
      }
    }
 }

</script>
