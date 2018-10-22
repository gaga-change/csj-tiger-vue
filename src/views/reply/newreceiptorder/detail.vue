<template>
  <div>
     <sticky :className="'sub-navbar published'">
    <template v-if="fetchSuccess">
      <template v-if="approveStatus == 2">
        <el-button  style="margin-left: 10px;"  size="small"  type="warning" @click="Prompt('delete')" >删除</el-button>
        <el-button  style="margin-left: 10px;"  size="small"  type="primary" @click="Edit" >修改</el-button>
      </template>
      <template v-else-if="approveStatus == 0">
        <el-button  style="margin-left: 10px;"   size="small" type="primary"   @click="Prompt('examine')" >审核</el-button>
        <el-button  style="margin-left: 10px;"   size="small"  type="error"  @click="Prompt('reject')"  >驳回</el-button>
      </template>
      <template v-else>
        <el-tag v-show="false">详情</el-tag>
      </template>
    </template>
  </sticky>

  <div class="transfermanagement-container">
   <div style="margin:8px 0 12px">
     <item-title text="基本信息"/>
     <el-card class="box-card" v-loading="loading"  element-loading-text="加载中..." shadow="never" body-style="padding:12px" >
      <el-row>
        <el-col  v-for="item in infoConfig"  :key="item.value"  :span="item.span" :style="item.style">
           <span class="card-title">{{item.title}}</span> : <span class="card-text">{{formatter(config[item.value],item.type)}}</span>
        </el-col>
      </el-row>
      </el-card>
    </div>

    <item-title text="相关明细"/>
    <web-pagination-table 
     :loading="loading"
     :config="tableConfig" 
     :allTableData="tableData"/>
  </div>
  </div>
</template>

<script>
 import Sticky from '@/components/Sticky' 
 import webPaginationTable from '@/components/Table/webPaginationTable'
 import {Prompt} from '@/utils/prompt'
 import { signDetail} from '@/api/reply'
 import moment from 'moment'
 export default {
  components: { 
    Sticky,
    webPaginationTable 
  },
   data(){
     return {
       fetchSuccess:true,
        approveStatus:1,
        tableConfig:[],
        tableData:[],

        infoConfig:[],
        config:[],
        rules:{},
        loading:false
     }
   },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',fixed:true,type:'index'},
          { label:'商品编码',prop:'skuCode',fixed:false,},
          { label:'商品名称',prop:'skuName',fixed:false,},
          { label:'品牌',prop:'skuBrandName',fixed:false,},
          { label:'规格',prop:'skuFormat',fixed:false,},
          { label:'单位',prop:'skuUnitName',fixed:false,},
          { label:'单价',prop:'skuPrice',fixed:false},
          { label:'转换率',prop:'skuUnitConvert',fixed:false},
          { label:'签收数量',prop:'signQty',fixed:false},
          { label:'拒收数量',prop:'rejectQty',fixed:false},
      ];

     this.infoConfig=[
        {title:'回单号',value:'signNo',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'出库计划单号',value:'outPlanCode',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'货主',value:'ownerName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'发货仓库',value:'planWarehouseName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'签收人',value:'signName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'签收人电话',value:'signTel',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'签收日期',value:'signCreateTime', type:'time',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'审核人',value:'approveName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'审核日期',value:'approveCreateTime', type:'time',style:'minWidth:310px;marginBottom:16px',span:6},
      ];
     },

   mounted(){
      let { id,approveStatus}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.signId=id;
      this.approveStatus=approveStatus;
      this.loading=true;

      signDetail({signId:id}).then(res=>{
        this.loading=false;
        if(res.data){
          this.config=res.data;
          if(!this.config.signNo){
            let index=this.infoConfig.findIndex(v=>v.value=='signNo');
            this.infoConfig.splice(index,1)
          }
          this.tableData=res.data.itemList
        }
      }).catch(err=>{
           this.loading=false;
       })
   },

   methods:{
     Prompt,
     Edit(){
      this.$router.push({
        path: '/reply/newreceiptorder',
        query:{data:JSON.stringify({modify:true,id:this.signId})}
      })
     },

     formatter(value,type='default'){
       if(!value){
         return ''
       }
       switch(type){
         case 'time': return moment(value).format('YYYY-MM-DD HH:mm:ss');
         default : return value;
       }
     }
   }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item{
    margin-bottom: 0;
  }
</style>
