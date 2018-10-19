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

     <item-title text="相关出库单明细"/>
      <web-pagination-table 
      :loading="loading"
      :config="tableConfig" 
      :allTableData="tableData"/>
  </div>
</template>

<script>
 import moment from 'moment';
 import {outOrderDetail} from '@/api/outgoing';
 import webPaginationTable from '@/components/Table/webPaginationTable'

 export default {
     components: { webPaginationTable },
    data() {
      return {
        config:{},
        infoConfig:[],
        tableData:[],
        tableConfig:[],
        busiBillTypeConfig:[],
        loading:false
      }
    },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',fixed:true,type:'index'},
          { label:'SKU名称',prop:'skuName',fixed:false,},
          { label:'规格型号',prop:'skuFormat',fixed:false,},
          { label:'生产厂家',prop:'productFactory',fixed:false,},
          { label:'商品分类',prop:'skuCskuCategoryno',fixed:false,},
          { label:'品牌名',prop:'skuBrandName',fixed:false,},
          { label:'单位',prop:'skuUnitName',fixed:false},
          { label:'转换比',prop:'skuUnitConvert',fixed:false},
          { label:'出库单价',prop:'skuOutPrice',fixed:false},
          { label:'出库数量',prop:'outStoreQty',fixed:false},
      ];

      this.infoConfig=[
        {title:'出库单号',value:'warehouseExeCode',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'出库日期',type:'time',value:'outStoreTime',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'计划单号',value:'planCode',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'出库类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'客户编号',value:'arrivalCode',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'客户名称',value:'arrivalName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'联系电话',value:'arrivalLinkTel',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'客户地址',value:'arrivalAddress',style:'minWidth:310px;marginBottom:16px',span:6},
      ]
    },
    mounted(){
      let { id,busiBillTypeConfig,}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.loading=true;
      outOrderDetail({orderId:id}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.owOrderDetailList)?data.owOrderDetailList:[];
          this.loading=false;
        } 
        this.loading=false;
      }).catch(err=>{
          this.loading=false;
      })
    },

    methods:{
      formatter(type,value){
        if(value!=undefined){
          switch(type){
            case 'index':return (row, column, cellValue, index)=>index+1
            case 'time': return moment(value).format('YYYY-MM-DD HH:mm:ss');
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'';
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
