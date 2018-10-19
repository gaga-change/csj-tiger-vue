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
      <item-title text="相关业务单明细"/>
      <web-pagination-table 
      :loading="loading"
      :config="tableConfig" 
      :allTableData="tableData"/>   
  </div>
</template>

<script>
 import moment from 'moment';
 import { outBillDetail} from '@/api/outgoing';
 import webPaginationTable from '@/components/Table/webPaginationTable'


 const tableConfig=[
    { label:'序号',fixed:true,type:'index'},
    { label:'商品分类',prop:'skuSort',fixed:false,},
    { label:'SKU名称',prop:'skuName',fixed:false,},
    { label:'规格型号',prop:'skuFormat',fixed:false,},
    { label:'生产厂家',prop:'productFactory',fixed:false,},
    { label:'品牌名',prop:'skuBrandName',fixed:false,},
    { label:'单位',prop:'skuUnitName',fixed:false,},
    { label:'出单价格',prop:'outStorePrice',fixed:false,},
    { label:'已出/应出(单位)',fixed:false,dom:(row, column, cellValue, index)=>{
        return `${row.realOutQty}/${row.planOutQty}(${row.skuUnitName})`
    }},
    { label:'转换比',prop:'skuUnitConvert',width:"80",fixed:false},
 ];

 const infoConfig=[
   {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'业务类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'来源系统',value:'fromSysCode',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'制单时间',type:'time',value:'busiBillCreateTime',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'制单人',value:'busiBillCreater',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'状态',type:'busiBillState',value:'billState',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'是否越库',type:'boolean',value:'isCross',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'是否可分批',type:'boolean',value:'isBatch',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'客户编号',value:'arrivalCode',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'客户名称',value:'arrivalName',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'客户地址',value:'arrivalAddress',style:'minWidth:310px;marginBottom:16px',span:12},
   {title:'其他信息',value:'otherInfo',style:'minWidth:310px',span:12},
 ]


 export default {
    components: { webPaginationTable},
    data() {
      return {
        config:{},
        infoConfig,
        tableData:[],
        tableConfig:tableConfig,
        busiBillTypeConfig:[],
        busiBillStateConfig:[],
        loading:false
       
      }
    },

    mounted(){
      let { busiBillNo,busiBillTypeConfig,busiBillStateConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.busiBillStateConfig=busiBillStateConfig||[];
      this.loading=true;
      outBillDetail({busiBillNo}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=data.busiBillDetails;
          this.loading=false;
        } 
      }).catch(err=>{
          this.loading=false;
      })
    },

    methods:{
      formatter(type,value){
        if(value!=undefined){
          switch(type){
            case 'time': return moment(value).format('YYYY-MM-DD HH:mm:ss');
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'';
            case 'busiBillState': return this.busiBillStateConfig.find(v=>v.key==value)&&this.busiBillStateConfig.find(v=>v.key==value).value||'';
            case 'boolean': return Number(value)?'是':'否';
            default : return value
          }
        } else{
          return ''
        }
      }
    }
 }

</script>


