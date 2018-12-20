<template>
  <div class="outgoing-manual-container">
    
       <item-title text="基本信息"/>
       <div class="manualBaseInfo" >

         <div class="manualBaseInfo-left">
           <item-title text="出库计划"/>
           <item-card :config="manualBaseInfoConfigLeft" :loading="planLoading"   :cardData="planCardData"  />
         </div>

          <div class="manualBaseInfo-right">
          <item-title text="入库业务"/>
             <web-pagination-table 
              :loading="outBillNoLoading"
              :config="manualBaseInfoTableConfig" 
              :allTableData="outBillNoTableData"/> 
         </div>

       </div>

       <item-title text="出库匹配详情"/>
        <web-pagination-table 
          :loading="matchLoading"
          :config="matchingTableConfig" 
          :allTableData="matchTable"/> 

      <el-dialog
        title="商品匹配"
        custom-class="shouDetailsDialog"
        :visible.sync="alertDisplay"
        top="6vh"
        width="70%"
        :before-close="()=>alertDisplay=false">
          <div class="alertContainer">
                <div class="alertInfoContainer-top">
                    <div class="alertInfoContainer-left">
                        <item-title text="出库商品"/>
                        <item-card :config="alertTopConfig"  bodyStyle="padding:0"  :cardData="row"  />
                    </div>

                    <div class="alertInfoContainer-right" >
                        <div class="alertInfoContainer-right-title">
                            <item-title 
                             :text="row.isAuto?`已匹配商品`:`已匹配商品${(row.matchSkuName||row.matchSkuCode||row.matchSkuFormat||row.planInQty||row.realInQty)&&!isClick?'(该匹配属于自动匹配)':''}`"
                             boxStyle="width:250px;float:left"/> 
                            <el-button type="primary" size="mini" style="float:right"  v-if="row.isAuto" >取消匹配</el-button>
                        </div>
                        <div  class="alertInfoContainer-card">
                             <item-card :config="alertBottomConfig" 
                              v-if="row.matchSkuName||row.matchSkuCode||row.matchSkuFormat||row.planInQty||row.realInQty" 
                              bodyStyle="padding:0"  :loading="false"  :cardData="row"  />
                              <div class="noData" v-else>
                                  暂未匹配商品,你可以点击采购单明细某一列进行手工匹配
                              </div>
                        </div>
                    </div> 
                </div> 

                <item-title text="采购单明细"/>
                <web-pagination-table 
                :loading="false"
                :highlightCurrentRow="true"
                @currentRedioChange="currentRedioChange"
                :config="detailsConfig" 
                :allTableData="outBillNoTableData"/> 

                <div class="sure-btn" >
                  <el-button type="primary" size="mini" :loding="sureLoding"  @click="matchSku">确定</el-button>
               </div> 

             </div>
      </el-dialog>
  </div>
</template>

<script>
 import { manualBaseInfoConfigLeft,manualBaseInfoTableConfig,matchingTableConfig,alertTopConfig, alertBottomConfig,detailsConfig} from './config';
 import { outPlanDetail,planGetBill,planAutoMatch,planHandMatch} from '@/api/outgoing'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import _  from 'lodash';
 export default {
    components: { webPaginationTable},
    data() {
      return {
        planLoading:false,
        planCardData:{},

        outBillNoLoading:false,
        outBillNoTableData:[],

        matchLoading:false,
        matchTable:[],


        manualBaseInfoConfigLeft,
        manualBaseInfoTableConfig,
        matchingTableConfig,
        alertTopConfig,
        alertBottomConfig,
        detailsConfig,
        row:{},
        alertDisplay:false,
        isClick:false,

        sureLoding:false,
      }
    },

    created(){
      this.matchingTableConfig.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return <div>
                  {
                     row.isAuto?
                    <span class="operationBtn"  onClick={this.alertMethods.bind(this,row,row.isAuto)}>重新匹配</span>
                    :<span class="operationBtn"  onClick={this.alertMethods.bind(this,row,row.isAuto)}>匹配</span>
                  }
              </div>
            }
        }
      })
    },

    mounted(){
      this.getOutPlanDetail()
    },

    computed: {

    },

    methods:{

      matchSku(){
         this.sureLoding=true;
         planHandMatch(this.row).then(res=>{
            this.sureLoding=false;
            if(res.success){
              this.alertDisplay=false;
              this.$message({
                type: 'success',
                message: '操作成功',
              })
            }
         }).catch(err=>{
           console.log(err)
            this.sureLoding=false;
            this.$message({
              type: 'error',
              message:'操作失败'
            })
         })
      },


      currentRedioChange(currentRow, oldCurrentRow){
        let row= _.cloneDeep(this.row);
        row.matchSkuName=currentRow.providerName;//名称
        row.matchSkuCode=currentRow.providerCode;//编号
        row.matchSkuFormat=currentRow.skuFormat;//规格
        row.planInQty=currentRow.planInQty;//计划采购量
        row.realInQty=currentRow.realInQty;//入库量
        this.row=row;
        this.isClick=true;
      },

      getOutPlanDetail(){
         this.planLoading=true;
         outPlanDetail({
           planCode:this.$route.query.planCode 
         }).then(res=>{
             this.planLoading=false;
            if(res.success){ 
              this.planCardData=res.data;
              if(res.data&&res.data.busiBillNo){
                 this.getPlanGetBill(res.data.busiBillNo);
                 this.getPlanAutoMatch(this.$route.query.planCode,res.data.busiBillNo)
              }
            }
         }).catch(err=>{
            console.log(err)
            this.planLoading=false;
         })
      },

      getPlanGetBill(outBillNo){
        this.outBillNoLoading=true;
         planGetBill({
           outBillNo:outBillNo
         }).then(res=>{
           this.outBillNoLoading=false;
           if(res.success){
              this.outBillNoTableData=res.data&&res.data.purchaseItemAndSalesItemList||[];
            }
         }).catch(err=>{
            this.outBillNoLoading=false;
           console.log(err)
         })
      },

      getPlanAutoMatch(planCode,outBillNo){
        this.matchLoading=true;
        planAutoMatch({
          planCode:planCode,
          outBillNo:outBillNo
        }).then(res=>{
          this.matchLoading=false;
          if(res.success){
             this.matchTable=res.data||[]
          }
        }).catch(err=>{
          console.log(err)
          this.matchLoading=false;
        })
      },


      alertMethods(row,type){
        this.row=row;
        this.alertDisplay=true;
      }


    },
 }

</script>

<style rel="stylesheet/scss" lang="scss">
  .outgoing-manual-container{
    .el-card{
      border:0;
    }
    .manualBaseInfo{
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      margin-bottom: 12px;
      .manualBaseInfo-left{
        flex-grow: 1;
        border: 1px solid #ebeef5;
        border-right: 0;
        padding: 12px;
      }
      .manualBaseInfo-right{
         width: 60%;
         flex-grow: 0;
         border: 1px solid #ebeef5;
         padding: 12px;
      }
    }
    .operationBtn{
      padding: 5px;
      font-size: 12px;
      cursor: pointer;
      color: rgb(51, 153, 234);
      white-space: nowrap;
    }
   .alertContainer{
        .alertInfoContainer-top{
           display: flex;
           justify-content: space-between;
           margin-bottom: 12px;
           .alertInfoContainer-left,.alertInfoContainer-right{
             width: 50%;
             padding: 12px;
             padding-bottom: 0;
           }
          .alertInfoContainer-left{
             border: 1px solid #ebeef5;
             border-right: 0;
          }
          .alertInfoContainer-right{
             border: 1px solid #ebeef5;
          }
        }
   }

    .sure-btn{
      display: flex;
      justify-content: flex-end;
      padding-top: 12px;
    }

    .alertInfoContainer-card::after,.alertInfoContainer-card::before{
      clear: both;
      content: '';
      display: block;
    }

    .alertInfoContainer-card{
      .noData{
        line-height: 30px;
        text-align: center;
      }
    }

  }
</style>