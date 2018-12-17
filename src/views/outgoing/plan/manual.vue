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
           <item-card :config="manualBaseInfoConfigRight" :loading="loading"   :cardData="cardData"  />
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
  </div>
</template>

<script>
 import { manualBaseInfoConfigLeft,manualBaseInfoConfigRight,manualBaseInfoTableConfig,matchingTableConfig } from './config';
 import webPaginationTable from '@/components/Table/webPaginationTable'
 export default {
    components: { webPaginationTable},
    data() {
      return {
        loading:false,
        cardData:{},
        manualBaseInfoConfigLeft,
        manualBaseInfoConfigRight,
        manualBaseInfoTableConfig,
        matchingTableConfig
      }
    },

    created(){
      this.matchingTableConfig.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return <div>
                  { 
                    <span>匹配</span>
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

  }
</style>