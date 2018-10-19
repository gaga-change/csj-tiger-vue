<template>
  <div class="outgoing-quirydetail-container">
    <div style="marginBottom:12px">
     <item-title text="基本信息"/>
      <el-card class="box-card" v-loading="loading"  element-loading-text="加载中..." shadow="never" body-style="padding:12px" >
        <el-row>
          <el-col  v-for="item in infoConfig"  :key="item.value"  :span="item.span" :style="item.style">
              <span class="card-title">{{item.title}}</span> : <span class="card-text">{{formatter(item.type,config[item.value])}}</span>
          </el-col>
       </el-row>
      </el-card>
    </div>
     <item-title text="相关计划单明细"/>
      <web-pagination-table 
        :config="tableConfig" 
        :allTableData="tableData"/>
  </div>
</template>

<script>
 import moment from 'moment';
 import {outPlanDetail} from '@/api/outgoing';
 import webPaginationTable from '@/components/Table/webPaginationTable'

 const tableConfig=[
    { label:'序号',fixed:true,type:'index'},
    { label:'SKU名称',prop:'skuName',fixed:false,},
    { label:'规格型号',prop:'skuFormat',fixed:false,},
    { label:'生产厂家',prop:'productFactory',fixed:false,},
    { label:'商品分类',prop:'skuCategoryName',fixed:false,},
    { label:'品牌名',prop:'skuBrandName',fixed:false,},
    { label:'转换比',prop:'skuUnitConvert',fixed:false},
    { label:'已出/应出(单位)',fixed:false,dom:(row, column, cellValue, index)=>{
        return `${row.realOutQty}/${row.planOutQty}(${row.skuUnitName})`
    }},
 ];

 const infoConfig=[
   {title:'计划单号',value:'planCode',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'出库类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'计划制定时间',type:'time',value:'planTime',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'计划人',value:'planName',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'计划仓库',value:'planWarehouseName',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'下推状态',type:'issuedState',value:'issuedState',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'执行状态',type:'execStatus',value:'execStatus',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'客户编号',value:'arrivalCode',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'客户名称',value:'arrivalName',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'联系电话',value:'arrivalLinkTel',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'客户地址',value:'arrivalAddress',style:'minWidth:310px;marginBottom:16px',span:24},
 ]


 export default {
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        infoConfig,
        tableData:[],
        tableConfig:tableConfig,
        busiBillTypeConfig:[],
        issuedStateConfig:[],
        execStatuConfig:[],
        loading:false
      }
    },

    mounted(){
      let { id,busiBillTypeConfig,issuedStateConfig,execStatuConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.issuedStateConfig=issuedStateConfig||[];
      this.execStatuConfig=execStatuConfig||[];
      this.loading=true;
      outPlanDetail({id}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.itemList)?data.itemList:[];
          this.loading=false;
        } else{
           this.loading=false;
           console.log('busibill/select/detail',res)
            this.$message({
              showClose: true,
              message: '数据请求出错',
              type: 'error'
           });
        }
      }).catch(err=>{
         this.loading=false;
         console.log('busibill/select/detail',err)
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
      })
    },

    methods:{
      formatter(type,value){
        if(value!=undefined){
          switch(type){
            case 'time': return moment(value).format('YYYY-MM-DD HH:mm:ss');
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'暂无数据';
            case 'issuedState': return this.issuedStateConfig.find(v=>v.key==value)&&this.issuedStateConfig.find(v=>v.key==value).value||'暂无数据';
            case 'execStatus': return this.execStatuConfig.find(v=>v.key==value)&&this.execStatuConfig.find(v=>v.key==value).value||'暂无数据';
            case 'boolean': return Number(value)?'是':'否';
            default : return value
          }
        } else{
          return '---'
        }
      }
    }
 }

</script>
