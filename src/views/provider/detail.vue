<template>
  <div  class="abnormalGoods">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success"
          size="small"  
          @click="edit" 
          v-if="[0,2].includes(detailBaseInfoData.receiveStatus)" >
            修改
          </el-button>

         <el-button  type="success"
          size="small"  
          :loading="subLoding"
          @click="Modify({ 
            prompt:'确定要提交吗?',
            successTips:'操作成功',
            errorTips:'操作失败',
            api:'registerCommit'})"  
            v-if="[0,2].includes(detailBaseInfoData.receiveStatus)" >
            提交
          </el-button>

         <el-button  type="success"
          size="small"  
          :loading="examineLoding"
          @click="Modify({ 
          flag:0,
          prompt:'请输入审核意见！',
          successTips:'操作成功',
          errorTips:'操作失败',
          api:'registerApprove'})" 
          v-if="[1].includes(detailBaseInfoData.receiveStatus)" >
             审核
          </el-button>

         <el-button  type="success" 
         size="small" 
          :loading="rejectLoding"
          @click="Modify({ 
          flag:1,
          prompt:'请输入驳回意见！',
          successTips:'操作成功',
          errorTips:'操作失败',
          api:'registerApprove'})"  
         v-if="[1].includes(detailBaseInfoData.receiveStatus)" >
           驳回
         </el-button>

         <el-button  size="small" 
          :loading="deletLoding"
          @click="Modify({ 
            prompt:'确定要删除吗?',
            successTips:'操作成功',
            errorTips:'操作失败',
            api:'registerDrop'})"  
            v-if="[0,2].includes(detailBaseInfoData.receiveStatus)">
            删除
          </el-button>

      </template>
    </sticky>
     
     <div>
       <item-title text="基本信息"/>
       <item-card :config="detailBaseInfoConfig" :loading="loading"   :cardData="detailBaseInfoData"  />
     </div>
   
    <div style="margin-bottom:12px">
      <item-title text="相关明细" />  
      <nesting-table 
        :loading="loading"
        :useEditExpand="true"
        :defaultExpandAll="true"
        childTableDataKey="detailList"
        :config="detailTableConfig" 
        :childConfig="addChildTableConfig"
        :allTableData="detailTableData"/>
    </div>


  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import Modify from './components/modify'
import NestingTable from '@/components/Table/nestingTable'
import { detailBaseInfoConfig,detailTableConfig,addChildTableConfig } from './components/config';
import { registerDetail } from '@/api/provider'
import { mapGetters } from 'vuex'
import moment from 'moment';
import _  from 'lodash';
export default {
  components: { Sticky,NestingTable},
   data() {
    return {
      detailBaseInfoConfig,
      loading:false,
      detailBaseInfoData:{},

      detailTableConfig,
      detailTableData:[],
      addChildTableConfig,

      subLoding:false,
      examineLoding:false,
      rejectLoding:false,
      deletLoding:false,
    }
  },

  mounted(){
    this.getCurrentTableData();
  },

  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews',
    })
  },

  methods:{
    Modify,
    getCurrentTableData(){
      this.loading=true;
      registerDetail({
        id:this.$route.query.id
      }).then(res=>{
        if(res.success){
           this.detailBaseInfoData=res.data;
           this.detailTableData=res.data&&res.data.itemList||[];
        }
         this.loading=false;
      }).catch(err=>{
        console.error(err)
         this.loading=false;
      })
    },

    edit(){
       this.$router.push({
          path:'/provider/add', 
          query:{id:this.$route.query.id,planCode:this.$route.query.planCode,edit:true,time:moment().valueOf()}
        })
    }
   
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .abnormalGoods{
    .tableTotal{
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

