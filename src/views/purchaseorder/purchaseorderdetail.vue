<template lang="html">
<div class="app-container">
<sticky :className="'sub-navbar published'">
    <template >
      <el-button type="success"  :loading="loading" :disabled="!$haspermission('purchaseorderExamine')"   v-show="shouBtn" @click="submit(1,'请输入审核意见!')" size="small">审核</el-button>
      <el-button :loading="loading"  v-show="shouBtn" :disabled="!$haspermission('purchaseorderReject')"  @click="submit(0,'请输入驳回意见!')" size="small">驳回</el-button>
    </template>
</sticky>

  <div style="padding-top:12px">
    <item-title text="订单详情"/>
      <item-card :config="baseInfoConfig" :loading="false"   :cardData="purchorder"  />
  </div>
 

  <item-title text="采购单物品明细"/>
  <web-pagination-table 
    :loading="false"
    :config="tabbelConfig" 
    :allTableData="purchorderItems"/> 
</div>
</template>

<script>
import { selectPurchaseBillDetailFromSCM ,billAudit} from '@/api/todoApi'
import { baseInfoConfig,tabbelConfig} from './config';
import webPaginationTable from '@/components/Table/webPaginationTable'
import Sticky from '@/components/Sticky'
import { mapGetters } from 'vuex'
export default {
  components: { Sticky,webPaginationTable },
  data() {
    return {

      baseInfoConfig,
      purchorder:{},

      purchorderItems:[],
      tabbelConfig,

      loading:false,
      shouBtn:true
     
    }
  },

  mounted(){
    this.selectPurchaseBillDetailFromSCMApi()
    this.fomatDom()
  },

  updated(){
    this.fomatDom()
  },

 computed: {
    ...mapGetters([
      'userInfo'
    ])
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
          console.log(err)
        })
       
     }).catch(err=>{
       
     })

    },

    selectPurchaseBillDetailFromSCMApi(){
      selectPurchaseBillDetailFromSCM({
        businessKey:this.$route.query.title
      }).then(res=>{
        if(res.success){
           let data=JSON.parse(res.data);
           if(data.code==='200'){
               this.purchorder=data.data&&data.data.purchorder;
               if(Array.isArray(JSON.parse(this.purchorder.orgenclosure))){
                this.purchorder.orgenclosure=JSON.parse(this.purchorder.orgenclosure).map(v=>{
                  return {
                    name:v.fileName,
                    path:v.filePath
                  }
                })
               }
               this.purchorderItems=data.data&&data.data.purchorderItems||[]
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
