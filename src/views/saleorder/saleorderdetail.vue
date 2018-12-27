<template lang="html">
<div class="app-container">
  <sticky :className="'sub-navbar published'">
    <template >
        <el-button type="success"  :loading="loading"  v-show="shouBtn" @click="submit(1,'请输入审核意见!')" size="small">审核</el-button>
       <el-button :loading="loading"  v-show="shouBtn" @click="submit(2,'请输入驳回意见!')" size="small">驳回</el-button>
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
      this.fomatDom()
    },


  updated(){
    this.fomatDom()
  },
  
  methods: {
    
    fomatDom(){
     let dom=document.querySelectorAll('.sub-navbar >div');
     [...dom].forEach(item=>{
      if(item.innerHTML==='sticky'){
         item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
      }
     })
    },

    submit(state,tips){
      this.$prompt(tips, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
     }).then(({ value }) => {
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
          console.log(err)
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
             console.log(JSON.parse(data.data.saleOrder.orgenclosure))
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
        console.log(err)
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
