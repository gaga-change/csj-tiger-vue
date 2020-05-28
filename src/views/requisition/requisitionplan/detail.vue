<template>
  <div class="outgoing-quirydetail-container">
     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading"   :cardData="infoData"  />

     <item-title text="相关明细"/>
     <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="调拨单" name="business">
        <edit-Table
        :loading="loading"
        :config="detailTableConfig"
        :allTableData="tableData"/>
      </el-tab-pane>
      <el-tab-pane label="计划单" name="plan">
        <edit-Table
        :loading="loading"
        :config="detail_planTableConfig"
        :allTableData="detail_planTableData"/>
      </el-tab-pane>
      <el-tab-pane label="出/入库单" name="outgonging">
        <edit-Table
        :loading="loading"
        :config="detail_outGoingTableConfig"
        :allTableData="detail_outGoingTableData"/>
      </el-tab-pane>
     </el-tabs>
  </div>
</template>

<script>

 import { tableConfig,infoConfig,detail_planTableConfig,detail_outGoingTableConfig} from './config';
 import editTable from '@/components/Table/editTable';
 import Sticky from '@/components/Sticky'
 import moment from 'moment';
 import { mapGetters } from 'vuex'
 import { requisitiondetail, queryPlandetail, queryOrderdetail } from '@/api/requisition'
 // import { operation } from './conpoments/lib';
 import _  from 'lodash';

 export default {
    components: { editTable,Sticky},
    data() {
      return {
        loading:false,
        infoData:{},
        infoConfig,

        tableData:[],
        detailTableConfig:tableConfig,
        activeName:'business',

        detail_planTableConfig,
        detail_planTableData:[],

        detail_outGoingTableConfig,
        detail_outGoingTableData:[],
      }
    },

    created(){
      this.getCurrentTableData()
    },

    computed: {
      ...mapGetters({
         visitedViews: 'visitedViews'
      })
    },

    methods:{
       moment,
       // operation,
       getCurrentTableData(){
          requisitiondetail({id:this.$route.query.id}).then(res=>{
            if(res.success){
              let data=res.data
              this.infoData=res.data
              this.infoData.area=data.warehouseProvince?(data.warehouseProvince+data.warehouseCity+data.warehouseArea):null
              this.tableData=(res.data.transferBillDetailDOList && res.data.transferBillDetailDOList.length>0)?res.data.transferBillDetailDOList:[]
              // 查询相关出入库计划单
              queryPlandetail({transferNo:data.transferNo,}).then(res=>{
                if(res.success){
                  this.detail_planTableData=(res.data && res.data.length>0)?res.data:[]
                }
              }).catch(err=>{
                console.error(err)
              })
              //查询相关出入库单
              queryOrderdetail({transferNo:data.transferNo,}).then(res=>{
                if(res.success){
                  this.detail_outGoingTableData=(res.data && res.data.length>0)?res.data:[]
                }
              }).catch(err=>{
                console.error(err)
              })
            }
          }).catch(err=>{
            console.error(err)
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
