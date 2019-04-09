<template>
  <div class="outgoing-quirydetail-container">
     <div style="display:flex;justify-content: space-between;font-size:12px;">
        <div style="width:200px;">
           <div style="width:200px;">
               <bar-code code="SO20190304000766"/>
           </div>
           <div>{{baseData.billNo}}</div>
        </div>
        <div>
          <div style="margin-bottom:6px">
            <span style="font-weight:600;">采购订单 : </span>
            <span>{{baseData.busiBillNo}}</span>
          </div>
          <div>
            <span style="font-weight:600;">合同单号 : </span>
            <span>{{baseData.contractNo}}</span>
          </div>
        </div>
     </div>
     <h4 style="text-align: center;">采购订单</h4>
     <div style="display:flex;font-size:12px;margin-bottom:12px">
       <div style="margin-right:20px"><span style="font-weight: 600;">供应商编码 : </span><div style="font-size: 12px; minWidth: 150px;border-bottom: 1px solid #000;display: inline-block">{{baseData.providerCode||null}}</div></div>
       <div style="margin-right:20px"><span style="font-weight: 600;">供应商名称 : </span><div style="font-size: 12px; minWidth: 150px;border-bottom: 1px solid #000;display: inline-block">{{baseData.providerName||null}}</div></div>
       <div style="margin-right:20px"><span style="font-weight: 600;">订货日期 : </span><div style="font-size: 12px; minWidth: 150px;border-bottom: 1px solid #000;display: inline-block">{{baseData.orderTime&&moment(baseData.orderTime).format('YYYY-MM-DD HH:mm:ss')||null}}</div></div>
     </div>
     <div style="display:flex;font-size:12px;margin-bottom:20px">
        <div style="margin-right:20px"><span style="font-weight: 600;">到货有效日 : </span><div style="font-size: 12px; minWidth: 150px;border-bottom: 1px solid #000;display: inline-block">{{baseData.planInWarehouseTime&&moment(baseData.planInWarehouseTime).format('YYYY-MM-DD HH:mm:ss')||null}}</div></div>
        <div style="margin-right:20px"><span style="font-weight: 600;">电话 : </span><div style="font-size: 12px; minWidth: 150px;border-bottom: 1px solid #000;display: inline-block">{{baseData.linkTel||null}}</div></div>
        <div style="margin-right:20px"><span style="font-weight: 600;">送货地址 : </span><div style="font-size: 12px; minWidth: 150px;border-bottom: 1px solid #000;display: inline-block">{{baseData.linkAddress||null}}</div></div>
     </div>
     <div style="min-height:200px;margin-bottom:12px">
       <web-pagination-table :loading="false" :config="config" :allTableData="baseData.inBillDetailVOList"/>
     </div>
    
     <div style="font-size:12px;margin-bottom:24px">
       <span style="font-weight:600">注意事项 : </span><span>自2015年12月1日起,发票邮寄地址为嘉兴市秀洲区王店镇(蚂桥)吉蚂西路183号,邮编314000,联系电话05730-89990088-8011,请在发 <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票备注栏注明供应商编号,采购合同号和收货单号</span>
     </div>

     <div style="font-size:12px;display:flex;margin-bottom:24px">
         <div style="margin-right:20px"><span style="font-weight: 600;">发票抬头 : </span><div style="font-size: 12px; width: 200px;border-bottom: 1px solid #000;display: inline-block"></div></div>
        <div style="margin-right:50px"><span style="font-weight: 600;">发票抬头 : </span><div style="font-size: 12px; width: 200px;border-bottom: 1px solid #000;display: inline-block"></div></div>

        <div style="margin-right:20px"><span style="font-weight: 600;">(签章) :</span></div>
     </div>

      <div style="font-size:12px;display:flex;margin-bottom:24px">
         <div style="margin-right:44px"><span style="font-weight: 600;">银行名称 : </span><div style="font-size: 12px; width: 200px;border-bottom: 1px solid #000;display: inline-block"></div></div>
        <div style="margin-right:20px"><span style="font-weight: 600;">账号 : </span><div style="font-size: 12px; width: 200px;border-bottom: 1px solid #000;display: inline-block"></div></div>
     </div>
    


  </div>
</template>

<script>

 import moment from 'moment';
 import webPaginationTable from '@/components/Table/webPaginationTable';

 export default {
   components: { webPaginationTable },
   props:{
     baseData:{
       type:Object,
       default:()=>{
         inBillDetailVOList:[]
       }
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

