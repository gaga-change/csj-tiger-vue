<template>
   <div class="entryInvoice-detail">
      <sticky  :className="'sub-navbar published'" style="margin-bottom: 8px">
        <template >
          <el-button   style="margin-left: 10px;"  size="small" type="success" >提交
          </el-button>
          <el-button   style="margin-left: 10px;"  size="small"  type="success" >审核
          </el-button>
           <el-button   style="margin-left: 10px;"  size="small" type="success" >驳回
          </el-button>
          <el-button   style="margin-left: 10px;"  size="small"  type="success" >作废申请
          </el-button>
        </template> 
      </sticky>
      <item-title text="基本信息"/>
       <item-card :config="listDetailConfig" :loading="loading"   :cardData="cardData"  />   
       <item-title text="相关明细"/>
       <web-pagination-table 
       :loading="loading"
       :config="listDetailTableConfig" 
       :allTableData="tableData"/>
   </div>
</template>

<script>
import { listDetailConfig,listDetailTableConfig } from './components/config';
import webPaginationTable from '@/components/Table/webPaginationTable'
import Sticky from '@/components/Sticky' 
export default {
  components: { webPaginationTable,Sticky},
  data(){
    return {
      loading:false,
      listDetailConfig,
      cardData:{},
      listDetailTableConfig,
      tableData:[]

    }
  }
}
</script>


<style>
 .entryInvoice-detail{

 }

</style>

