<template>
  <div class="outgoing-quirydetail-container">
     <h3 style="text-align: center;">发货清单</h3>
     <div>
       <div style="margin-bottom: 12px;">
          <span style="font-size: 12px;font-weight: 600;">客户编码 :</span><span style="font-size: 12px;"></span>
       </div>
       <div style="margin-bottom: 12px;display: flex;justify-content: space-between;padding-right: 150px;">
           <div><span style="font-size: 12px;font-weight: 600;">客户名称 : </span><span style="font-size: 12px;"></span></div>
           <div><span style="font-size: 12px;font-weight: 600;">联系电话 : </span><span style="font-size: 12px;"></span> </div>
           <div><span style="font-size: 12px;font-weight: 600;">通知单号 : </span><span style="font-size: 12px;"></span></div>
       </div>
       <div style="margin-bottom: 12px;">
          <span style="font-size: 12px;font-weight: 600;">客户地址 :</span><span style="font-size: 12px;"></span>
       </div>
     </div>
     <div style="min-height:200px">
       <web-pagination-table :loading="false" :config="config" :allTableData="data"/>
     </div>
     <div style="margin-bottom: 12px;display: flex;justify-content: space-between;padding-right: 150px;">
        <div><span style="font-size: 12px;font-weight: 600;">制单人 : </span><div style="font-size: 12px; width: 100px;height: 30px; border-bottom: 1px solid #000;display: inline-block"></div></div>
        <div><span style="font-size: 12px;font-weight: 600;">收货签收 : </span><div style="font-size: 12px; width: 100px;height: 30px; border-bottom: 1px solid #000;display: inline-block"></div> </div>
        <div><span style="font-size: 12px;font-weight: 600;">日期 : </span><div  style="font-size: 12px;padding-top:20px; display: inline-block">{{moment().format('YYYY-MM-DD HH:mm:ss')}}</div></div>
     </div>
  </div>
</template>

<script>

 import moment from 'moment';
 import webPaginationTable from '@/components/Table/webPaginationTable';

 export default {
   components: { webPaginationTable },
   props:{
     data:{
       type:Array,
       default:()=>[]
     },
     config:{
       type:Array,
       default:()=>[]
     },
   },
  methods:{
      moment
  }
 }

</script>

