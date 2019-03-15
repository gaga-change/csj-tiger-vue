<template>
  <div class="outgoing-quirydetail-container">
     <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button   size="small">关闭</el-button>
         <el-button   size="small">删除</el-button>
         <el-button  type="success" size="small">修改</el-button>
         <el-button  type="success" size="small">审核</el-button>
         <el-button  type="success" size="small">打印</el-button>
         <el-button  type="success" size="small">创建计划单</el-button>
      </template>
    </sticky>
  
     <item-title text="基本信息"/>
     <item-card :config="infoConfig" :loading="loading"   :cardData="infoData"  />

     <item-title text="相关明细"/>
     <web-pagination-table 
      :loading="loading"
      :config="tableConfig" 
      :allTableData="tableData"/>

  </div>
</template>

<script>

 import { tableConfig,infoConfig } from './config';
 import webPaginationTable from '@/components/Table/webPaginationTable';
 import Sticky from '@/components/Sticky'

 export default {
    components: { webPaginationTable,Sticky},
    data() {
      return {
        loading:false,
        infoData:{},
        infoConfig,

        tableData:[],
        tableConfig,
      }
    },

    mounted(){

    },

    methods:{

    }
 }

</script>


