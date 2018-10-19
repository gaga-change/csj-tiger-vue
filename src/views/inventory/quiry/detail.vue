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

 <item-title text="相关明细"/>
  <web-pagination-table 
    :loading="loading"
    :config="tableConfig" 
    :allTableData="tableData"/> 
  </div>
</template>

<script>
 import moment from 'moment';
 import {stockRecord} from '@/api/inventory';
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
        stockDirectTypeConfig:[],
        loading:false
      }
    },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',fixed:true,type:'index'},
          { label:'变动日期',prop:'changeTime',fixed:false,},
          { label:'出入库类型',prop:'direcType',fixed:false,dom:(row, column, cellValue, index)=>this.formatter('direcType',cellValue)},
          { label:'业务类型',prop:'busiBillType',fixed:false,dom:(row, column, cellValue, index)=>this.formatter('busiBillType',cellValue)},
          { label:'出入库方',prop:'warehouseName',fixed:false,},
          { label:'变动前数量',prop:'beforeQty',fixed:false,},
          { label:'变动数量',prop:'changeQty',fixed:false},
          { label:'变动后数量',prop:'afterQty',fixed:false},
          { label:'所属库存周期',prop:'pertainStoreCycle',fixed:false},
        
      ];

      this.infoConfig=[
        {title:'商品名称',value:'skuName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'商品规格',value:'skuFormat',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'品牌',value:'brandName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'商品分类',value:'skuType',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'最小单位',value:'skuUnitName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'最小单位转换比',value:'skuUnitConvert',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'库存成本价',value:'costPrice',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'仓库',value:'warehouseName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'总数量',value:'skuQty',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'锁定数量',value:'lockQty',style:'minWidth:310px;marginBottom:16px',span:6},
      ]
    },
    mounted(){
      let { warehouseCode,skuCode,busiBillTypeConfig,stockDirectTypeConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.stockDirectTypeConfig=stockDirectTypeConfig||[];
      this.loading=true;
      stockRecord({warehouseCode,skuCode}).then(res=>{
        this.loading=false;
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.items)?data.items:[]
        } 
      }).catch(err=>{
          this.loading=false;
      })
    },

    methods:{
      formatter(type,value){
          switch(type){
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'';
            case 'direcType': return this.stockDirectTypeConfig.find(v=>v.key==value)&&this.stockDirectTypeConfig.find(v=>v.key==value).value||'';
            default : return value
          }
      }
    }
 }

</script>
