<template>
  <div class="outgoing-manual-container">
    
       <item-title text="基本信息"/>
       <div class="manualBaseInfo">

         <div class="manualBaseInfo-left">
           <item-title text="出库计划"/>
           <item-card :config="manualBaseInfoConfigLeft" :loading="loading"   :cardData="cardData"  />
         </div>

          <div class="manualBaseInfo-right">
          <item-title text="入库业务"/>
             <web-pagination-table 
              :loading="loading"
              :config="manualBaseInfoTableConfig" 
              :allTableData="[]"/> 
         </div>

       </div>

       <item-title text="出库匹配详情"/>
        <web-pagination-table 
          :loading="loading"
          :config="matchingTableConfig" 
          :allTableData="[
             {
               id:1,
               name:'测试'
             },
             {
               id:1,
               name:'测试'
             }
          ]"/> 

      <el-dialog
        title="商品匹配"
        custom-class="shouDetailsDialog"
        :visible.sync="alertDisplay"
        top="6vh"
        width="70%"
        :before-close="()=>alertDisplay=false">
          <div class="alertContainer">
             <item-title text="出库商品"/>
             <div class="alertInfoContainer">
                <div class="alertInfoContainer-top">
                    <item-card :config="alertTopConfig"   :cardData="row"  />
                </div>

                <div class="add-buttom" >
                  <item-title text="已匹配商品"/> 
                  <el-button type="primary" size="mini"  >取消匹配</el-button>
               </div> 
                 
                 <div class="alertInfoContainer-bottom">
                    <item-card :config="alertBottomConfig"   :loading="false"  :cardData="row"  />
                </div>

                <item-title text="采购单明细"/>
                <web-pagination-table 
                :loading="false"
                :config="detailsConfig" 
                :allTableData="[]"/> 

                <div class="sure-btn" >
                  <el-button type="primary" size="mini">确定</el-button>
               </div> 
             </div>
          </div>
      </el-dialog>
  </div>
</template>

<script>
 import { manualBaseInfoConfigLeft,manualBaseInfoTableConfig,matchingTableConfig,alertTopConfig, alertBottomConfig,detailsConfig} from './config';
 import webPaginationTable from '@/components/Table/webPaginationTable'
 export default {
    components: { webPaginationTable},
    data() {
      return {
        loading:false,
        cardData:{},
        manualBaseInfoConfigLeft,
        manualBaseInfoTableConfig,
        matchingTableConfig,
        alertTopConfig,
        alertBottomConfig,
        detailsConfig,
        row:{},
        alertDisplay:false,
      }
    },

    created(){
      this.matchingTableConfig.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return <div>
                  { 
                    <span class="operationBtn"  onClick={this.alertMethods.bind(this,row)}>匹配</span>
                  }
              </div>
            }
        }
      })
    },

    mounted(){
     
    },

    computed: {

    },

    methods:{

      alertMethods(row){
        this.row=row;
        this.alertDisplay=true;
        console.log({...row})
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
     .alertInfoContainer{
        .alertInfoContainer-top,.alertInfoContainer-bottom{
           border: 1px solid #ebeef5;
           margin-bottom: 12px;
        }
        .alertInfoContainer-bottom{
          padding-bottom: 12px;
        }
     }
   }

    .add-buttom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .sure-btn{
      display: flex;
      justify-content: flex-end;
      padding-top: 12px;
    }

  }
</style>