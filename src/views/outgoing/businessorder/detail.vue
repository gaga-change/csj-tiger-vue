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
     <el-tabs v-model="tabActive" type="card" @tab-click="activeChange">
         <el-tab-pane label="相关业务单" name="businessorder">
          <web-pagination-table 
            :loading="loading"
            :config="tableConfig" 
            :allTableData="tableData"/>
          </el-tab-pane>
        <el-tab-pane label="相关计划单" name="plan">
          <web-pagination-table 
            :loading="planLoading"
            :config="planTableConfig" 
            :allTableData="planTableData"/>
          </el-tab-pane>
        <el-tab-pane label="相关出库单" name="outgoing">
          <web-pagination-table 
          :loading="outgoingLoding"
          :config="outgoingTableConfig" 
          :allTableData="outgoingTableData"/> 
        </el-tab-pane>
     </el-tabs> 

  </div>
</template>

<script>
 import moment from 'moment';
 import { outBillDetail,outOrderSelect,outPlanSelect} from '@/api/outgoing';
 import webPaginationTable from '@/components/Table/webPaginationTable'


 const tableConfig=[
    { label:'序号',fixed:true,type:'index',width:50},
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
        loading:false,
        tabActive:'businessorder',
        busiBillNo:'',

        outgoingTableData:[],
        outgoingTableConfig:[],
        
        planTableData:[],
        planTableConfig:[],
        planLoading:false
        
      }
    },

    beforeMount(){
      this.outgoingTableConfig=[
        { label:'序号',fixed:true,type:'index',width:'50px'},
        { label:'出库单号',prop:'warehouseExeCode',width:'180px',fixed:true},
        { label:'货主',prop:'ownerName',width:'180px'},
        { label:'计划单号',prop:'planCode',width:'150px'},
        { label:'出库仓库名称',prop:'warehouseName',width:'180px'},
        { label:'出库仓库编号',prop:'warehouseCode',width:'150px'},
        { label:'是否越库',prop:'isCross',width:'150px',type:'Boolean',},
        { label:'出库日期',prop:'outStoreTime',type:'time',width:'160px'},
      ],

      this.planTableConfig=[
        { label:'序号',fixed:true,type:'index',width:'50px'},
        { label:'计划单号',prop:'planCode',width:'150px'},
        { label:'货主',prop:'ownerName',width:'150px'},
        { label:'计划出库仓库',prop:'planWarehouseName',width:'150px'},
        { label:'制定时间',prop:'gmtCreate',type:'time',width:'150px'},
        { label:'计划出库日期',prop:'planOutTime',type:'time',width:'150px'},
        { label:'最晚出库日期',prop:'lastOutTime',type:'time',width:'150px'},
        { label:'下推状态',prop:'issuedState',width:'150px',},
        { label:'执行状态',prop:'execStatus',width:'150px'},
      ]
    },

    mounted(){
      let { busiBillNo,busiBillTypeConfig,busiBillStateConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.busiBillStateConfig=busiBillStateConfig||[];
      this.busiBillNo=busiBillNo;
      this.loading=true;
      outBillDetail({busiBillNo}).then(res=>{
        this.loading=false;
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=data.busiBillDetails||[];
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
      },
      activeChange(tab){
          if(tab.name=='outgoing'){
            if(!this.outgoingTableData.length){
              this.outgoingLoding=true;
              outOrderSelect({
                  busiBillNo:this.busiBillNo,
                  pageSize:500,
                }).then(res=>{
                if(res.success){
                   this.outgoingTableData=res.data&&res.data.list||[]
                }
                 this.outgoingLoding=false;
              }).catch(err=>{

              })
            }
        } else if(tab.name=='plan'){
          if(!this.planTableData.length){
            this.planLoading=true;
            outPlanSelect({
              busiBillNo:this.busiBillNo,
              pageSize:500,
            }).then(res=>{
              if(res.success){
                 this.planTableData=res.data&&res.data.list||[]
              }
              this.planLoading=false;
            }).catch(err=>{
              this.planLoading=false;
            })
          }
        }
      }
    }
 }

</script>


