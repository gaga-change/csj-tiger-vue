<template>
  <div class="warehousing-quirydetail-container">
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
     <item-title text="相关明细"/>
     <el-tabs v-model="tabActive" type="card" @tab-click="activeChange">
        <el-tab-pane label="相关计划单" name="plan">
          <web-pagination-table 
            :loading="loading"
            :config="tableConfig" 
            :allTableData="tableData"/>
          </el-tab-pane>
        <el-tab-pane label="相关入库单" name="warehousing">
             <web-pagination-table 
            :loading="warehousingLoding"
            :config="warehousingTableConfig" 
            :allTableData="warehousingTableData"/> 
        </el-tab-pane>
     </el-tabs>
  </div>
</template>

<script>
 import moment from 'moment';
 import {inPlanDetail,inOrderSelect} from '@/api/warehousing'
 import _  from 'lodash';
 import webPaginationTable from '@/components/Table/webPaginationTable'

 const tableConfig=[
    { label:'序号',fixed:true,type:'index',width:'50px'},
    { label:'SKU名称',prop:'skuName',fixed:false,},
    { label:'规格型号',prop:'skuFormat',fixed:false,},
    { label:'品牌',prop:'skuBrandName',fixed:false,},
    { label:'转换比',prop:'skuUnitConvert',fixed:false},
    { label:'入库单价',prop:'inPrice',fixed:false,type:'toFixed'},

    { label:'已入/总数(单位)',fixed:false,dom:(row, column, cellValue, index)=>{
        return `${row.realInQty&&Math.round(row.realInQty)}/${row.planInQty&&Math.round(row.planInQty)}(${row.skuUnitName})`
    }},

    { label:'还应入',fixed:false,dom:(row, column, cellValue, index)=>{
        return `${row.planInQty-row.realInQty}(${row.skuUnitName})`
    }},
   
 ];

 const infoConfig=[
   {title:'计划单号',value:'planCode',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'入库类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'计划制定时间',type:'time',value:'busiBillCreaterTime',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'计划人',value:'busiBillCreater',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'计划仓库',value:'planWarehouseName',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'货主编号',value:'ownerCode',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'货主名称',value:'ownerName',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'供应商名称',value:'providerName',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'供应商编号',value:'providerCode',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'联系电话',value:'linkTel',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'下推状态',value:'issuedState', type:'issuedState',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'执行状态',value:'execStatus', type:'execStatus',style:'minWidth:310px;marginBottom:16px',span:6},
 ];

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
        loading:false,

        tabActive:'plan',
        warehousingLoding:false,
        warehousingTableConfig:[],
        warehousingTableData:[],
        planCode:''

      }
    },

    beforeMount(){
      this.warehousingTableConfig=[
        { label:'序号',fixed:true,type:'index',width:'50px'},
        { label:'入库单号',fixed:true,prop:'warehouseExeCode'},
        { label:'业务单号',prop:'busiBillNo' },
        { label:'货主',prop:'ownerName'},
        { label:'计划单号',prop:'planCode'},
        { label:'仓库',prop:'warehouseName'},
        { label:'入库日期',prop:'inWarehouseTime',type:'time'},
      ]
    },

    mounted(){
      let { planCode,busiBillTypeConfig,issuedStateConfig,execStatuConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.issuedStateConfig=issuedStateConfig||[];
      this.execStatuConfig=execStatuConfig||[];
      this.planCode=planCode;
      this.loading=true
      inPlanDetail({
        planCode,
        pageSize:500
        }).then(res=>{
        this.loading=false
        if(res.success){
          let data=res.data;
          this.config=data;
          let list=data.skuDetails&&data.skuDetails.list||[]
          this.tableData=list||[]
        } 
      }).catch(err=>{
         this.loading=false
      })
    },

    methods:{
      formatter(type,value,){
        if(value!=undefined){
          switch(type){
            case 'time': return moment(value).format('YYYY-MM-DD HH:mm:ss');
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'';
            case 'issuedState': return this.issuedStateConfig.find(v=>v.key==value)&&this.issuedStateConfig.find(v=>v.key==value).value||'';
            case 'execStatus': return this.execStatuConfig.find(v=>v.key==value)&&this.execStatuConfig.find(v=>v.key==value).value||'';
            case 'boolean': return Number(value)?'是':'否';
            default : return value
          }
        } else{
          return ''
        }
      },

       activeChange(tab){
        if(tab.name=='warehousing'){
            if(!this.warehousingTableData.length){
              this.warehousingLoding=true;
              inOrderSelect({
                  planCode:this.planCode,
                  pageSize:500,
                  pageNum:1
                }).then(res=>{
                if(res.success){
                   this.warehousingTableData=res.data&&res.data.list||[]
                }
                 this.warehousingLoding=false;
              }).catch(err=>{

              })
            }
        }
      }
    }
 }

</script>
