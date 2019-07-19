<template lang="html">
<div class="app-container">
  <sticky :className="'sub-navbar published'">
    <template >
        <el-button type="success"  :loading="loading"  :disabled="!$haspermission('saleorderExamine')"   v-show="shouBtn" @click="submit(1,'请输入审核意见!')" size="small">审核</el-button>
       <el-button :loading="loading"  v-show="shouBtn" :disabled="!$haspermission('saleorderReject')"  @click="submit(0,'请输入驳回意见!')" size="small">驳回</el-button>
    </template>
  </sticky>

   <div style="padding-top:12px">
    <item-title text="订单详情"/>
      <item-card :config="baseInfoConfig" :loading="false"   :cardData="saleOrder"  />
  </div>
 
  <item-title text="销售单物品明细"/>
  <web-pagination-table 
    :loading="false"
    :config="tabbelConfig" 
    :allTableData="saleOrderItems"/> 
</div>
</template>

<script>
import { selectSaleBillDetailFromSCM,billAudit } from '@/api/todoApi'
import { baseInfoConfig,tabbelConfig} from './config';
import webPaginationTable from '@/components/Table/webPaginationTable'
import Sticky from '@/components/Sticky'
import { mapGetters } from 'vuex'
export default {
  components: {  Sticky,webPaginationTable },
  data() {
    return {

      baseInfoConfig,
      saleOrder: {},
      
      tabbelConfig,
      saleOrderItems: [],

      loading:false,
      shouBtn:true
    }
  },

computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted(){
      this.selectSaleBillDetailFromSCMApi();
    },
  methods: {
  
    submit(state,tips){
      this.$prompt(tips, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
     }).then(({ value }) => {
       if(state===0&&!value){
         this.$message.error('操作失败,驳回意见必填');
         return ''
       }
        this.loading=true;
        billAudit({
          checkAdvice:value,
          checkFlag:state,
          businessKey:this.$route.query.title,
          userId:this.userInfo.id
        }).then(res=>{
          this.loading=false;
          if(res.success){
            this.shouBtn=false
          }
        }).catch(err=>{
          this.loading=false;
          console.error(err)
        })
       
     }).catch(err=>{

     })

    },

    selectSaleBillDetailFromSCMApi(){
      selectSaleBillDetailFromSCM({
        businessKey:this.$route.query.title
      }).then(res=>{
        if(res.success){
           let data=JSON.parse(res.data);
           if(data.code==='200'){
             this.saleOrder=data.data&&data.data.saleOrder;
             if(Array.isArray(JSON.parse(this.saleOrder.orgenclosure))){
                this.saleOrder.orgenclosure=JSON.parse(this.saleOrder.orgenclosure).map(v=>{
                  return {
                    name:v.fileName,
                    path:v.filePath
                  }
                })
             }
             this.saleOrderItems=data.data&&data.data.saleOrderItems||[]
           }
          
        }
      }).catch(err=>{
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.dlink {
  color: #409EFF;
}
h3 {
  font-size: 14px;
  font-weight: normal;
}
</style>
