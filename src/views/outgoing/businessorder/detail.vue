<template>
  <div class="outgoing-quirydetail-container">
     <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button   size="small" v-if="$route.query.busiBillNo" @click="operation({id:$route.query.id,busiBillNo:$route.query.busiBillNo},'outBillClose','确定要关闭吗?')">关闭</el-button>
         <el-button   v-if="[0,2,4].includes(infoData.billStatus)" size="small" @click="operation({id:$route.query.id,busiBillNo:$route.query.busiBillNo},'outBillDelete','确定要删除吗?')">删除</el-button>
         <router-link v-if="[0,2].includes(infoData.billStatus)"  :to="`/outgoing/businessorderadd?type=modify&id=${$route.query.id}&time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small">修改</el-button>
         </router-link>
          <router-link v-if="[1].includes(infoData.billStatus)" :to="`/outgoing/businessorderadd?type=revision&id=${$route.query.id}&time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small">调整</el-button>
         </router-link>
         <el-button v-if="[0,2].includes(infoData.billStatus)"  type="success" size="small" @click="operation({id:$route.query.id,busiBillNo:$route.query.busiBillNo},'outBillCheck','请输入审核意见 !')">审核</el-button>
         <router-link v-if="[1].includes(infoData.billStatus)" :to="`/outgoing/businessorderAddPlanOrder?time=${moment().valueOf()}`"  class="tableLink">
            <el-button  type="success" size="small">创建计划单</el-button>
         </router-link>
      </template>
    </sticky>
  
     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading"   :cardData="infoData"  />

     <item-title text="相关明细"/>
     <edit-Table 
      :loading="loading"
      :config="detailTableConfig" 
      :allTableData="tableData"/>



  </div>
</template>

<script>

 import { tableConfig,infoConfig} from './config';
 import editTable from '@/components/Table/editTable';
 import Sticky from '@/components/Sticky'
 import moment from 'moment';
 import { outBillDetail } from '@/api/outgoing'
 import { operation } from './conpoments/lib';
 import _  from 'lodash';

 export default {
    components: { editTable,Sticky},
    data() {
      return {
        loading:false,
        infoData:{},
        infoConfig,

        tableData:[],
        detailTableConfig:tableConfig
      }
    },

    created(){
      this.getCurrentTableData()
    },

    methods:{
       moment,
       operation,
       getCurrentTableData(){
          let detailTableConfig= _.cloneDeep(this.detailTableConfig);
          let index=detailTableConfig.findIndex(v=>['客户销价','进货价'].includes(v.label));
          outBillDetail(this.$route.query.id).then(res=>{
            if(res.success){
              let data= _.cloneDeep(res.data);
              if(data&&data.busiBillType===21){
                detailTableConfig[index]= { label:'客户销价',prop:'outStorePrice'}
              } else {
                detailTableConfig[index]= { label:'进货价',prop:'outStorePrice'}
              }
              this.detailTableConfig=detailTableConfig;
              this.infoData=res.data;
              this.tableData=data&&Array.isArray(data.busiBillDetails)&&data.busiBillDetails||[];
            }
          }).catch(err=>{
            console.log(err)
          })
       }
    }
 }

</script>

<style rel="stylesheet/scss" lang="scss">
  .el-dialog__body{
    padding-top: 12px;
  }
</style>

