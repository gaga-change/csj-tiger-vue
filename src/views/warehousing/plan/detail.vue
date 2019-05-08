<template>
  <div class="warehousing-quirydetail-container">

    <sticky :className="'sub-navbar published'" style="margin-bottom:12px" v-if="this.$route.query.history">
      <template >
        <el-button type="success"  size="small" @click="sureQty"  :loading="sureQtyLoding">确认并生成入库单</el-button>
      </template>
    </sticky>


     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading"   :cardData="config"  />

     <item-title text="相关明细"/>
     <el-tabs v-model="tabActive" type="card" @tab-click="activeChange">
        <el-tab-pane label="相关计划单" name="plan">
          <edit-table
            :loading="loading"
            :useRowColorKey="this.$route.query.history?'handInQty':null"
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
 import {inPlanDetail,inOrderSelect,orderSave} from '@/api/warehousing'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import editTable from '@/components/Table/editTable'
 import Sticky from '@/components/Sticky'
 import _  from 'lodash';
 import { mapGetters } from 'vuex'
 import { tableConfig,infoConfig,warehousingTableConfig } from './config';
 export default {
    components: { editTable,webPaginationTable,Sticky },
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
        sureQtyLoding:false

      }
    },

    computed: {
      ...mapGetters([,
        'userInfo'
      ])
    },

    mounted(){
      this.getCurrentTableData()
    },

    methods:{

      getCurrentTableData(){
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
            if(this.config.busiBillNo&&this.config.busiBillNo.slice(0,2)=='SO'){
                this.infoConfig.find(v=>v.prop==='busiBillNo').linkTo = '/outgoing/businessorder-detail'
            }
            let list=data.skuDetails&&data.skuDetails.list||[]

            this.tableData=list.map(v=>{
              if(this.$route.query.history){
                if(v.planInQty-v.realInQty>0){
                  //  v.handInQty=(v.planInQty-v.realInQty)||0;
                  v.handInQty=v.handInQty||0;
                } else{
                  v.handInQty=0
                }
                v.edit=true;
              }
              return v
            })
          }
        }).catch(err=>{
          this.loading=false
        })
      },

      sureQty(){
        let json={};
        json.remarkInfo='手动入库';
        json.fromSystemCode='CSJSCM';
        json.operator=this.userInfo.id;
        json.operatorName=this.userInfo.truename;
        json.ownerCode=this.config.ownerCode;
        json.planCode=this.config.planCode;
        json.items=_.cloneDeep(this.tableData).map(v=>{
          v.realInQty=v.handInQty;
          return v
        })
        orderSave(json).then(res=>{
          if(res.success){
            this.$message({
              type:'success',
              message:'操作成功,1.5s后跳往详情页',
              duration:1500,
              onClose:()=>{
                this.$router.replace({
                  path:`/warehousing/plan-detail?planCode=${this.$route.query.planCode}`,
                })
                this.getCurrentTableData()
              }
            })
          }
        }).catch(err=>{
          console.log(err)
        })
      },
       activeChange(tab){
        if(tab.name=='warehousing'){
            if(!this.warehousingTableData.length){
              this.warehousingLoding=true;
              inOrderSelect({
                  planCode:this.planCode,
                  pageSize:500,
                  pageNum:1,
                  ownerCode: this.config.ownerCode
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
