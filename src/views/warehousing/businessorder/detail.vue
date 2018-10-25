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
 import { inBillDetail,inOrderSelect,inPlanSelect} from '@/api/warehousing';
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import { tableConfig,infoConfig,warehousingTableConfig ,planTableConfig} from './config';

 export default {
    components: { webPaginationTable },
    data() {
      return {
        loading:false,

        config:{},
        infoConfig,
        
        tableData:[],
        tableConfig,
        
        warehousingLoding:false,
        warehousingTableConfig,
        warehousingTableData:[],

        planLoading:false,
        planTableConfig,
        planTableData:[],

        busiBillNo:'',
        tabActive:'businessorder',

      }
    },


    mounted(){
      let { id}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.loading=true;
      inBillDetail({id}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.busiBillNo=data.busiBillNo
          this.tableData=data.items||[];
        } 
          this.loading=false;
      }).catch(err=>{
          this.loading=false;
      })
    },

    methods:{
      activeChange(tab){
        if(tab.name=='warehousing'){
            if(!this.warehousingTableData.length){
              this.warehousingLoding=true;
              inOrderSelect({
                  busiBillNo:this.busiBillNo,
                  pageSize:500,
                  pageNum:1
                }).then(res=>{
                if(res.success){
                   this.warehousingTableData=res.data&&res.data.list||[]
                }
                 this.warehousingLoding=false;
              }).catch(err=>{
                 this.warehousingLoding=false;
              })
            }
        } else if(tab.name=='plan'){
            if(!this.planTableData.length){
                this.planLoading=true;
                inPlanSelect({
                  busiBillNo:this.busiBillNo,
                  pageSize:500,
                  pageNum:1
                }).then(res=>{
                  this.planLoading=false;
                  if(res.success){
                   this.planTableData=res.data&&res.data.list||[]
                  }
                }).catch(err=>{
                  this.planLoading=false;
                })
            }
        }
      }
    }
 }

</script>
