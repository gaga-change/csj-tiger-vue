<template>
  <div class="outgoing-manual-container">
    
       <item-title text="基本信息"/>
       <div class="manualBaseInfo" >

         <div class="manualBaseInfo-left">
           <item-title text="出库计划"/>
           <item-card :config="manualBaseInfoConfigLeft" :loading="planLoading" boxStyle="padding-bottom: 0;"  :cardData="planCardData" />
           <div style="display:flex;justify-content: flex-end">
              <el-button type="primary" v-loading="pushLoding"  v-if="[2,7].includes(planCardData.issuedState)"    size="mini" @click="onPlanPush(planCardData.id)" >推送</el-button>  
          </div>
         
         </div>

          <div class="manualBaseInfo-right">
          <item-title text="入库业务"/>
             <web-pagination-table 
              :loading="outBillNoLoading"
              :maxHeight="300"
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
                             :text="'已匹配商品'"
                             boxStyle="width:250px;float:left"/> 
                            <el-button type="primary" size="mini" style="float:right"  v-if="row.matchSkuName||row.matchSkuCode||row.matchSkuFormat||row.planInQty||row.realInQty" :loading="cancelLoding"  @click="cancelMatch">取消匹配</el-button>
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
                 :maxHeight="300"
                @currentRedioChange="currentRedioChange"
                :config="detailsConfig" 
                :allTableData="alertTableData"/> 

                <div class="sure-btn"  style="padding-bottom:20px;">
                  <el-button type="primary" size="mini" :loding="sureLoding"  @click="matchSku">确定</el-button>
               </div> 

             </div>
      </el-dialog>
  </div>
</template>

<script>
 import { manualBaseInfoConfigLeft,manualBaseInfoTableConfig,matchingTableConfig,alertTopConfig, alertBottomConfig,detailsConfig} from './config';
 import { outPlanDetail,planGetBill,planAutoMatch,planHandMatch,planCancelMatch,getBillDetail,planPush} from '@/api/outgoing'
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import { mapGetters } from 'vuex'
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
        clickId:'',
        alertDisplay:false,
        isClick:false,

        sureLoding:false,
        cancelLoding:false,

        alertTableData:[],

        pushLoding:false
        
      }
    },

    created(){

      this.matchingTableConfig.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
             if(row.matchSkuCode){
                if(row.skuCode!==row.matchSkuCode){
                   return   <span class="operationBtn"  onClick={this.alertMethods.bind(this,row)}>重新匹配</span>
                }
             } else{
                return  <span class="operationBtn"  onClick={this.alertMethods.bind(this,row)}>匹配</span>
             }
            }
        }
      }),

      this.detailsConfig.forEach(item=>{
        if(item.useIcon){
            item.dom=(row, column, cellValue, index)=>{
              if(row.isIcon){
                return <div>
                  <i class="el-icon-success"></i>
                </div>
              } else{
                return ''
              }
       
            }
           }
        })
    },

    mounted(){
      this.getOutPlanDetail()
    },

   computed: {
    ...mapGetters([
      'userInfo'
    ])
  },

    methods:{

      onPlanPush(id){
        this.pushLoding=true;
        planPush({
          id:id
        }).then(res=>{
          this.pushLoding=false;
          if(res.success){
            this.$message({
              type: 'success',
              message: '操作成功',
            })
             this.getOutPlanDetail()
          } else{
            this.$message({
              type: 'error',
              message:'操作失败'
            })
          }
        }).catch(err=>{
           this.pushLoding=false;
          console.log(err)
        })
      },

      match(){
          this.matchingTableConfig.forEach(item=>{
            if(item.useLink){
                item.dom=(row, column, cellValue, index)=>{
                if(row.matchSkuCode){
                  console.log(row.matchSkuCode)
                    if(row.skuCode!==row.matchSkuCode){
                      return   <span class="operationBtn"  onClick={this.alertMethods.bind(this,row)}>重新匹配</span>
                    }
                } else{
                    return  <span class="operationBtn"  onClick={this.alertMethods.bind(this,row)}>匹配</span>
                }
                }
            }
          })
      },

      matchSku(){
         this.sureLoding=true;
         let row=this.row;
         if(row.matchSkuName||row.matchSkuCode||row.matchSkuFormat||row.planInQty||row.realInQty){
           console.log({
              ...this.row,
              modifierId:this.userInfo.id,
              modifierName:this.userInfo.truename,
            })
          planHandMatch({
              ...this.row,
              modifierId:this.userInfo.id,
              modifierName:this.userInfo.truename,
            }).then(res=>{
              this.sureLoding=false;
              if(res.success){
                this.alertDisplay=false;
                this.$message({
                  type: 'success',
                  message: '操作成功',
                })
                this.getOutPlanDetail()
              }
          }).catch(err=>{
            console.log(err)
              this.sureLoding=false;
              this.$message({
                type: 'error',
                message:'操作失败'
              })
          })
        } else{
           this.$message({
             type: 'error',
             message:'请先选择要匹配的商品'
           })
        }
      },


      cancelMatch(){
        this.cancelLoding=true;
        planCancelMatch({
          id:this.row.id,
          modifierId:this.userInfo.id,
          modifierName:this.userInfo.truename,
        }).then(res=>{
          this.cancelLoding=false;
          if(res.success){
            this.$message({
              type: 'success',
              message: '操作成功',
            })
            this.clickId=new Date();
            this.getOutPlanDetail()
            this.match()
          }
        }).catch(err=>{
          console.log(err)
          this.cancelLoding=false;
          this.$message({
            type: 'error',
            message:'操作失败'
          })
        })
    },


      currentRedioChange(currentRow, oldCurrentRow){
        let row= _.cloneDeep(this.row);
        if(currentRow){
          row.matchSkuName=currentRow.skuName;//商品名称
          row.matchSkuCode=currentRow.skuCode;//编号
          row.matchSkuFormat=currentRow.skuFormat;//规格
          row.planInQty=currentRow.planInQty;//计划采购量
          row.realInQty=currentRow.realInQty;//入库量
          row.matchBusiIndex=currentRow.busiIndex;
          row.matchSkuUnitName=currentRow.skuUnit;
          row.matchPurNo=currentRow.purcticketno;
          this.row=row;
          this.isClick=true; 
          this.clickId=currentRow.id;
          this.foamatAlert()
        }
        
      },


      getOutPlanDetail(){
         this.planLoading=true;
         outPlanDetail({
           planCode:this.$route.query.planCode 
         }).then(res=>{
             this.planLoading=false;
            if(res.success){ 
              this.planCardData=res.data;
              if(res.data&&res.data.contractNo){
                 this.getPlanGetBill(res.data.contractNo);
                 this.getBillDetailApi(res.data.contractNo)
                 this.getPlanAutoMatch(this.$route.query.planCode,res.data.contractNo)
              }
            }
         }).catch(err=>{
            console.log(err)
            this.planLoading=false;
         })
      },

      foamatAlert(){
         let data= _.cloneDeep(this.alertTableData);
          data.forEach(item=>{
            if(item.id===this.clickId){
              item.isIcon=true;
            } else{
              item.isIcon=false;
            }
          })
        this.alertTableData=data;
      },

      getBillDetailApi(contractNo){
        getBillDetail({
          contractNo:contractNo
        }).then(res=>{
          if(res.success){
            if(res.data&&res.data.length){
               this.alertTableData=res.data.map((v,i)=>{
                 let json=v;
                 json.id=i;
                 return json;
               });
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },

      getPlanGetBill(contractNo){
        this.outBillNoLoading=true;
         planGetBill({
           contractNo:contractNo
         }).then(res=>{
           this.outBillNoLoading=false;
           if(res.success){
              this.outBillNoTableData=res.data||[];
              this.foamatAlert()
            }
         }).catch(err=>{
            this.outBillNoLoading=false;
           console.log(err)
         })
      },

      getPlanAutoMatch(planCode,contractNo){
        this.matchLoading=true;
        planAutoMatch({
          planCode:planCode,
          contractNo:contractNo
        }).then(res=>{
          this.matchLoading=false;
          if(res.success){
              let matchTable=res.data||[]; 
              this.matchTable=matchTable.map(item=>{
                let json=item;
                json.planWarehouseCode=this.planCardData.planWarehouseCode;
              })
              let row= _.cloneDeep(this.row);
              row=this.matchTable.find(v=>v.id===row.id)||{};
              this.row=row;
              this.isClick=false;
              console.log({...this.row})
          }
        }).catch(err=>{
          console.log(err)
          this.matchLoading=false;
        })
      },


      alertMethods(row){
        let outBillNoTableData= _.cloneDeep(this.outBillNoTableData);
        this.outBillNoTableData=outBillNoTableData;
        this.row=row;
        this.clickId=new Date();
        this.foamatAlert();
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

     .el-table__body tr.current-row>td, {
        background-color: #b3d4fc;
     }

  }
</style>