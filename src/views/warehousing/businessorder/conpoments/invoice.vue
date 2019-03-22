<template>
  <div class="outgoing-quirydetail-container">
     <div style="display:flex;justify-content: space-between;font-size:12px;">
        <div style="width:200px;">
           <div style="width:200px;">
               <bar-code code="SO20190304000766"/>
           </div>
           <div>SO20190304000766</div>
        </div>
        <div>
          <div style="margin-bottom:6px">
            <span style="font-weight:600;">采购订单 : </span>
            <span>SO20190304000766</span>
          </div>
          <div>
            <span style="font-weight:600;">合同单号 : </span>
            <span>SO20190304000766</span>
          </div>
        </div>
     </div>
     <h4 style="text-align: center;">采购订单</h4>
     <div style="display:flex;font-size:12px;margin-bottom:12px">
       <div style="margin-right:20px"> <span style="font-weight:600;">供应商编码 ：</span><span style="border-bottom:1px solid #000;"> SO20190304000766 </span></div>
       <div style="margin-right:20px"><span style="font-weight:600;">供应商名称 ：</span><span style="border-bottom:1px solid #000;"> SO20190304000766 </span> </div>
       <div style="margin-right:20px"><span style="font-weight:600;">订货日期 ：</span><span style="border-bottom:1px solid #000;"> {{moment().format('YYYY-MM-DD HH:mm:ss')}} </span></div>
     </div>
     <div style="display:flex;font-size:12px;margin-bottom:20px">
        <div style="margin-right:20px"><span style="font-weight:600;">到货有效日 ：</span><span style="border-bottom:1px solid #000;"> {{moment().format('YYYY-MM-DD HH:mm:ss')}} </span></div>
        <div style="margin-right:20px"><span style="font-weight:600;">电话 ：</span><span style="border-bottom:1px solid #000;"> 1991559873 </span> </div>
        <div style="margin-right:20px"><span style="font-weight: 600;">送货地址 : </span><div style="font-size: 12px; width: 280px;border-bottom: 1px solid #000;display: inline-block"></div></div>
     </div>
     <div style="min-height:200px;margin-bottom:12px">
       <web-pagination-table :loading="false" :config="config" :allTableData="data"/>
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

