<template>
  <div  class="abnormalGoods">
    <search-from :searchForm="searchForm" @submit="submit" ref="searchForm" :buttonLoding="buttonLoding" ></search-from>
    <div style="margin-bottom:12px">
      <div style="display: flex;line-height: 24px;">
          <item-title text="对账单明细" boxStyle="width:100px" /> 
          <span style="font-size: 12px;color:rgb(51, 153, 234);cursor: pointer;" @click="pullout">拉取对账单明细</span>
      </div>
      
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
import { mapGetters } from 'vuex'
import SearchFrom from './components/addSearch'
import { detailTableConfig } from './components/config';
import { getInvoiceAmmount,saveAccountBill,queryAccountBill } from '@/api/reconciliation.js'; 
import moment from 'moment';
import webPaginationTable from '@/components/Table/webPaginationTable'; 
export default {
  name:'reconciliationAdd',
  components: {webPaginationTable,SearchFrom},
   data() {
    return {
      searchForm:{
         startTime:'',
         endTime:'',
         ownerCode:'',
         ownerName:'',
         serviceRate:5
      },
      tableLoading:false,
      detailTableConfig,
      detailTableData:[],

      totalData:{},
      buttonLoding:false,

      oldJson:{},

    }
  },

  computed: {
    ...mapGetters([
        'visitedViews',
        'userInfo'
      ])
  },

  mounted(){
   this.onLoad()
  },


  // activated(){
  //   this.onLoad()
  // },

  methods:{
     
    onLoad(){
      if(this.$route.query.id){
      queryAccountBill({
        id:this.$route.query.id
      }).then(res=>{
        if(res.success){
          if(res.data&&res.data[0]){
            for(let i in this.searchForm){
               if(i==='serviceRate'){
                 this.searchForm['serviceRate']=res.data[0]['serviceRate']*100
              } else{
                this.searchForm[i]=res.data[0][i]
              }
            }
           this.$refs['searchForm'].submit('pull')
          }
        }
      }).catch(err=>{
        console.err(err)
      })
     }
    },

    submit(value,type){
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.searchForm=value;
      let {startTime,endTime,ownerName,ownerCode ,serviceRate}=value;
      if(isNaN(serviceRate)||serviceRate<0||serviceRate>100){
        this.$message.error('费百分比应为1-100之间的数值');
        return ''
      }
      serviceRate=serviceRate/100;
      startTime=moment(startTime).valueOf();
      endTime=moment(endTime).valueOf();
      let json={
        startTime,
        endTime,
        ownerName,
        ownerCode,
        serviceRate
      }
      if(this.$route.query.id){
        json.id=this.$route.query.id;
      }
      if(type==='pull'){
        this.getCurrentTableData(json);
        this.oldJson=json;
      } else if(type==='submit'){
          if(JSON.stringify(this.oldJson)!==JSON.stringify(json)){
            this.$message.error('请先拉取对账单');
            return ;
          }
          if(this.totalData.billAmt!==undefined&&this.totalData.serviceCharge!==undefined){
              if(!this.detailTableData.length){
                 this.$message.error('操作失败,明细不能为空');
                 return ''
              }
              this.buttonLoding=true;
              saveAccountBill({
                ...json,
                billAmt:this.totalData.billAmt,
                serviceChargeAmt:this.totalData.serviceCharge,
                operatorName:this.userInfo.truename,
                operator:this.userInfo.id,
                fromSystemCode:'TIGER'
              }).then(res=>{
                this.buttonLoding=false;
                if(res.success){
                this.$message({
                  type:'success',
                  message:'操作成功,1.5s后跳往详情页',
                  duration:1500,
                  onClose:()=>{
                    this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                        this.$router.push({
                          path:'/reconciliation/detail',
                          query:{id:this.$route.query.id||res.data }
                        })
                    }).catch(err=>{ 
                      console.err(err)
                    })  
                  }
                  })
                }
              }).catch(err=>{
                this.buttonLoding=false;
                this.$message.error('操作失败');
                console.err(err)
              })
          } else{
             this.$message.error('操作失败,请尝试重新拉取对账单');
          }
      }
    },

    pullout(){
      this.$refs['searchForm'].submit('pull')
    },


    getCurrentTableData(json){
      this.tableLoading=true;
        getInvoiceAmmount(json).then(res=>{
          this.tableLoading=false;
          if(res.success){
              this.totalData=res.data;
              if(res.data&&Array.isArray(res.data.items)){
                this.detailTableData=res.data.items.filter(v=>v!==null)
              }
          }
        }).catch(err=>{
          console.err(err)
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

