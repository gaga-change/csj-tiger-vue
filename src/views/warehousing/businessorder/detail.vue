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
      :config="tableConfig" 
      :allTableData="tableData"/>
  </div>
</template>

<script>
 import moment from 'moment';
 import { inBillDetail} from '@/api/warehousing';
 import webPaginationTable from '@/components/Table/webPaginationTable'

 const tableConfig=[
    { label:'序号',width:"50",fixed:true,type:'index'},
    { label:'SKU名称',prop:'skuName',width:"150",fixed:false,},
    { label:'规格型号',prop:'skuFormat',width:"180",fixed:false,},
    { label:'生产厂家',prop:'productFactory',width:"150",fixed:false,},
    { label:'商品分类',prop:'skuCategoryno',width:"150",fixed:false,},
    { label:'品牌名',prop:'skuBrandName',width:"150",fixed:false,},
    { label:'转换比',prop:'skuUnitConvert',width:"80",fixed:false},
    { label:'出单价格',prop:'inPrice',width:"150",fixed:false,},
    { label:'已出/应出(单位)',width:"150",fixed:false,dom:(row, column, cellValue, index)=>{
        return `${row.realInQty}/${row.planInQty}(${row.skuUnitName})`
    }},
   
 ];

 const infoConfig=[
   {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'业务类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'来源系统',value:'fromSystemId',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'制单时间',type:'time',value:'gmtCreate',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'制单人',value:'createrName',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'状态',type:'busiBillState',value:'billState',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'产品线',value:'productLine',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'业务模式',value:'businessModel',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'供应商编号',value:'providerCode',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'供应商名称',value:'providerName',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'联系电话',value:'providerLinkTel',style:'minWidth:310px;marginBottom:16px',span:16},
   {title:'其他信息',value:'otherInfo',style:'minWidth:310px;marginBottom:16px',span:24},
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
        busiBillStateConfig:[],
        loading:false
       
      }
    },

    mounted(){
      let { id,busiBillTypeConfig,busiBillStateConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.busiBillStateConfig=busiBillStateConfig||[];
      this.loading=true;
      inBillDetail({id}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=data.items;
          this.loading=false;
        } else{
           console.log('busibill/select/detail',res)
            this.loading=false;
            this.$message({
              showClose: true,
              message: '数据请求出错',
              type: 'error'
           });
        }
      }).catch(err=>{
         console.log('busibill/select/detail',err)
          this.loading=false;
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
      })
    },

    methods:{
      formatter(type,value,){
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
