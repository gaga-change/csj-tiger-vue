<template>
  <div class="outgoing-quirydetail-container">

    <item-title text="基本信息"/>
    <item-card :config="recordDetailConfig" :loading="loading"   :cardData="infoData"  />

     <item-title text="相关出库单明细"/>
      <edit-table
      :loading="loading"
      :config="recordDetailTable_config" 
      :allTableData="tableData"/>
  </div>
</template>

<script>
 import _  from 'lodash';
 import editTable from '@/components/Table/editTable';
 import { outImproveDetail } from '@/api/outgoing'
 import { recordDetailConfig,recordDetailTable_config } from './config';

 export default {
     components: { editTable },
    data() {
      return {
        recordDetailConfig,
        infoData:{},

        recordDetailTable_config,
        tableData:[],
        loading:false
      }
    },

    mounted(){
      this.getCurrentTableData()
    },
    methods:{
      getCurrentTableData(){
        let recordDetailTable_config= _.cloneDeep(this.recordDetailTable_config);
        let index=recordDetailTable_config.findIndex(v=>['客户销价','进货价'].includes(v.label));
        outImproveDetail(this.$route.query.id).then(res=>{
          if(res.success){
            let data= _.cloneDeep(res.data);
            if(data&&data.busiBillType===21){
              recordDetailTable_config[index]= { label:'客户销价',prop:'outStorePrice'}
            } else {
              recordDetailTable_config[index]= { label:'进货价',prop:'outStorePrice'}
            }
            this.recordDetailTable_config=recordDetailTable_config;
            this.infoData=res.data;
            this.tableData=data&&Array.isArray(data.busiBillDetails)&&data.busiBillDetails||[];
          }
        }).catch(err=>{
          console.error(err)
        })
      }
    }
 }

</script>
