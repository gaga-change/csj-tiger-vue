<template>
  <div class="outgoing-quirydetail-container">
  
     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

     <item-title text="相关明细"/>
     <el-tabs v-model="tabActive" type="card" @tab-click="activeChange">
         <el-tab-pane label="相关业务单" name="businessorder">
          <web-pagination-table 
            :loading="loading"
            :config="tableConfig" 
            :allTableData="tableData"/>
          </el-tab-pane>
        <el-tab-pane label="相关计划单" name="plan">
          <web-pagination-table 
            :loading="planLoading"
            :config="planTableConfig" 
            :allTableData="planTableData"/>
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

 import { outBillDetail,outOrderSelect,outPlanSelect} from '@/api/outgoing';
 import { tableConfig,infoConfig,outgoingTableConfig ,planTableConfig} from './config';
 import webPaginationTable from '@/components/Table/webPaginationTable';

 export default {
    components: { webPaginationTable},
    data() {
      return {
        config:{},
        infoConfig,

        tableData:[],
        tableConfig,

        loading:false,
        tabActive:'businessorder',
        busiBillNo:'',

        outgoingLoding:false,
        outgoingTableData:[],
        outgoingTableConfig,

        planLoading:false,
        planTableData:[],
        planTableConfig,
      }
    },

    mounted(){
      let { busiBillNo}=this.$route.query||{};
      this.busiBillNo=busiBillNo;

      this.loading=true;
      outBillDetail({busiBillNo}).then(res=>{
        this.loading=false;
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=data.busiBillDetails||[];
        } 
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
                  busiBillNo:this.busiBillNo,
                  pageSize:500,
                }).then(res=>{
                if(res.success){
                   this.outgoingTableData=res.data&&res.data.list||[]
                }
                 this.outgoingLoding=false;
              }).catch(err=>{

              })
            }
        } else if(tab.name=='plan'){
          if(!this.planTableData.length){
            this.planLoading=true;
            outPlanSelect({
              busiBillNo:this.busiBillNo,
              pageSize:500,
            }).then(res=>{
              if(res.success){
                 this.planTableData=res.data&&res.data.list||[]
              }
              this.planLoading=false;
            }).catch(err=>{
              this.planLoading=false;
            })
          }
        }
      }
    }
 }

</script>


