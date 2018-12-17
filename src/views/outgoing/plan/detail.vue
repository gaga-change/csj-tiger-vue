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
 import editTable from '@/components/Table/editTable'
 import {tableConfig,infoConfig,outgoingTableConfig } from './config';
 import Sticky from '@/components/Sticky' 
 import moment from 'moment';
 import _  from 'lodash';
 import { mapGetters } from 'vuex'
 export default {
    components: { webPaginationTable,editTable,Sticky},
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
        tabActive:'plan',
      }
    },

    mounted(){
      this.getCurrentTableData()
    },

    computed: {
    ...mapGetters([,
      'userInfo'
    ])
  },

    methods:{
      getCurrentTableData(){
        this.loading=true;
        outPlanDetail({planCode:this.$route.query.planCode}).then(res=>{
          if(res.success){
            let data=res.data;
            this.config=data;
            this.planCode=data.planCode;
            let tableData=Array.isArray(data.itemList)?data.itemList:[];
               this.tableData=tableData.map(v=>{
                 let json=v;
                 json.qty=v.handOutQty;
                 return json;
               })
          }
          this.loading=false;

        }).catch(err=>{
          this.loading=false;
        })
      },

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
      },

    },
 }

</script>
