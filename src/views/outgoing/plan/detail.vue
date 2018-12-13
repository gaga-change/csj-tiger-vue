<template>
  <div class="outgoing-quirydetail-container">

      <sticky :className="'sub-navbar published'" style="margin-bottom:12px" v-if="this.$route.query.history">
        <template >
          <el-button type="success"  size="small" @click="sureQty"  :loading="sureQtyLoding">确认并生成出库单</el-button>
        </template>
      </sticky>

      <item-title text="基本信息"/>
      <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

     <item-title text="相关明细"/>
     <el-tabs v-model="tabActive" type="card" @tab-click="activeChange">
        <el-tab-pane label="相关计划单" name="plan">
          <edit-table 
            :loading="loading"
            :config="tableConfig" 
            :allTableData="tableData"
            @goeditrow="goeditrow"
            @handleDelete="handleDelete"/>
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
 import {outPlanDetail,outOrderSelect,orderSave} from '@/api/outgoing';
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
        sureQtyLoding:false
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
            if(this.$route.query.history){
               this.tableData=tableData.map(v=>{
                 let json=v;
                 json.qty=v.planOutQty-v.realOutQty;
                 json.edit=true;
                 return json;
               })
            } else{
               this.tableData=tableData.map(v=>{
                 let json=v;
                 json.qty=v.handOutQty;
                 return json;
               })
            }
           
          }
          this.loading=false;

        }).catch(err=>{
          this.loading=false;
        })
      },

      sureQty(){
        let json={};
        json.planCode=this.$route.query.planCode;
        json.outDate=moment().valueOf();
        json.madeTime=moment().valueOf();
        json.remarkInfo='手动出库';
        json.fromSystemCode='CSJSCM';
        json.operator=this.userInfo.id;
        json.operatorName=this.userInfo.truename;
        if(this.tableData.some(v=>v.qty!==0&&!v.qty)){
          this.$message.error('手工出库必填');
          return ''
        }
        json.items=this.tableData;
        this.sureQtyLoding=true;
        orderSave(json).then(res=>{
          this.sureQtyLoding=false;
          if(res.success){
             this.$message({
              type:'success',
              message:'操作成功,1.5s后跳往详情页',
              duration:1500,
              onClose:()=>{
                this.$router.replace({
                  path:`/outgoing/plan-detail?planCode=${this.$route.query.planCode}`,
                })
                this.getCurrentTableData()
              }
            })
          } else{
             this.$message.error('操作失败');
          }
        }).catch(err=>{
          this.$message.error('操作失败');
          this.sureQtyLoding=false;
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

      goeditrow(index) {
        let tableData=_.cloneDeep(this.tableData)
        tableData[index]['edit']=!tableData[index]['edit'];
        this.tableData=tableData;
      },

      handleDelete(index, row) {
        let tableData=_.cloneDeep(this.tableData)
        tableData.splice(index,1)
        this.tableData=tableData;
      },

    },
 }

</script>
