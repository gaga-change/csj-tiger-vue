<template>
  <div  class="abnormalGoods">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >

         <el-button  type="success"
          size="small">
            修改
          </el-button>

          <el-button  type="success"
          size="small">
            生成付款申请
          </el-button>

          <el-button  type="success"
          size="small">
            修改确认
          </el-button>
      </template>
    </sticky>
     
     <div>
       <item-title text="基本信息"/>
       <item-card :config="detailBaseInfoConfig" :loading="loading"   :cardData="detailBaseInfoData"  />
     </div>
   
    <div style="margin-bottom:12px">
      <item-title text="对账单明细" /> 
      <div class="tableTotal" v-if="totalData&&totalData.billAmt!==undefined||totalData.serviceCharge!==undefined">
       <span>该段时间内销售发票金额</span> : <span>{{totalData&&totalData.billAmt&&Number(totalData.billAmt).toFixed(2)}}</span>
       <span>服务费金额</span> : <span>{{totalData&&totalData.serviceCharge&&Number(totalData.serviceCharge).toFixed(2)}}</span>
      </div>
      <web-pagination-table 
       :loading="tableLoading"
       :config="detailTableConfig" 
       :allTableData="detailTableData"/> 
    </div>


  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import { detailBaseInfoConfig,detailTableConfig } from './components/config';
import { queryAccountBill,getInvoiceAmmount } from '@/api/reconciliation.js'; 
import webPaginationTable from '@/components/Table/webPaginationTable'; 
export default {
  components: { Sticky,webPaginationTable},
   data() {
    return {
      detailBaseInfoConfig,
      loading:false,
      detailBaseInfoData:{},

      tableLoading:false,
      detailTableConfig,
      detailTableData:[],

      totalData:{}

    }
  },

  mounted(){
    this.getCurrentTableData();
    let dom=document.querySelectorAll('.sub-navbar >div');
    [...dom].forEach(item=>{
      if(item.innerHTML==='sticky'){
         item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
      }
    });
  },

  updated(){
     let dom=document.querySelectorAll('.sub-navbar >div');
     [...dom].forEach(item=>{
      if(item.innerHTML==='sticky'){
         item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
      }
    })
  },


  methods:{
    getCurrentTableData(){
      this.loading=true;
      this.tableLoading=true;
      queryAccountBill({
        id:this.$route.query.id
      }).then(res=>{
         this.loading=false;
         if(res.success){
           if(res.data&&res.data[0]){
              this.detailBaseInfoData=res.data[0];
              let {startTime,endTime,ownerName,ownerCode,serviceRate}=this.detailBaseInfoData;
              getInvoiceAmmount({
                 startTime,
                 endTime,
                 ownerCode,
                 ownerName,
                 serviceRate
              }).then(res=>{
                this.tableLoading=false;
                if(res.success){
                  this.totalData=res.data;
                  if(res.data&&Array.isArray(res.data.items)){
                     this.detailTableData=res.data.items.filter(v=>v!==null)
                  }
                }
              }).catch(err=>{
                console.log(err)
                this.tableLoading=false;
              })

           }
         }
      }).catch(err=>{
        console.log(err)
        this.loading=false;
        this.tableLoading=false;
      })

    },


  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
   .tableTotal{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
      span{
         font-size: 12px;
         color:#606266;
         &:nth-child(2n-1){
          font-weight: 600;
         }
         &:nth-child(2n){
          padding-right: 20px; 
         }
      }
     
    }
  }
</style>

