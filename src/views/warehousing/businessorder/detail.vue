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
 import { inBillDetail,inOrderSelect,inPlanSelect} from '@/api/warehousing';
 import webPaginationTable from '@/components/Table/webPaginationTable'

 const tableConfig=[
    { label:'序号',fixed:true,type:'index',width:'50px'},
    { label:'SKU名称',prop:'skuName',fixed:false,},
    { label:'规格型号',prop:'skuFormat',fixed:false,},
    { label:'生产厂家',prop:'productFactory',fixed:false,},
    { label:'商品分类',prop:'skuCategoryno',fixed:false,},
    { label:'品牌名',prop:'skuBrandName',fixed:false,},
    { label:'转换比',prop:'skuUnitConvert',fixed:false},
    { label:'出单价格',prop:'inPrice',fixed:false,},
    { label:'已出/应出(单位)',fixed:false,dom:(row, column, cellValue, index)=>{
        return `${row.realInQty}/${row.planInQty}(${row.skuUnitName})`
    }},
   
 ];

 const infoConfig=[
   {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'业务类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'来源系统',value:'fromSystemId',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'制单时间',type:'time',value:'gmtCreate',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'制单人',value:'createrName',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'状态',type:'busiBillState',value:'billState',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'产品线',value:'productLine',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'业务模式',value:'businessModel',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'供应商编号',value:'providerCode',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'供应商名称',value:'providerName',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'联系电话',value:'providerLinkTel',style:'minWidth:310px;marginBottom:16px',span:6},
   {title:'其他信息',value:'otherInfo',style:'minWidth:310px;marginBottom:16px',span:6},
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
        loading:false,

        warehousingLoding:false,
        warehousingTableConfig:[],
        warehousingTableData:[],
        busiBillNo:'',
        tabActive:'businessorder',


        planLoading:false,
        planTableConfig:[],
        planTableData:[],

      }
    },

    beforeMount(){
      this.warehousingTableConfig=[
        { label:'序号',fixed:true,type:'index',width:'50px'},
        { label:'入库单号',fixed:true,prop:'warehouseExeCode'},
        { label:'货主',prop:'ownerName'},
        { label:'计划单号',prop:'planCode'},
        { label:'仓库',prop:'warehouseName'},
        { label:'入库日期',prop:'inWarehouseTime',type:'time'},
      ];

      this.planTableConfig=[
        { label:'序号',fixed:true,type:'index',width:'50px'},
        { label:'计划单号',prop:'planCode',width:'150',fixed:true},
        { label:'货主',prop:'ownerName',width:'150'},
        { label:'制单人',prop:'createrName',width:'150'},
        { label:'计划入库仓库',prop:'planWarehouseName',width:'150'},
        { label:'制定时间',prop:'gmtCreate',type:'time',width:'150'},
        { label:'计划入库日期',prop:'planTime',type:'time',width:'150'},
        { label:'下推状态',prop:'issuedState',width:'150'},
        { label:'执行状态',prop:'execStatus',width:'150'},
     ]
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
          this.busiBillNo=data.busiBillNo
          this.tableData=data.items||[];
        } 
          this.loading=false;
      }).catch(err=>{
          this.loading=false;
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
      },

      activeChange(tab){
        if(tab.name=='warehousing'){
            if(!this.warehousingTableData.length){
              this.warehousingLoding=true;
              inOrderSelect({
                  busiBillNo:this.busiBillNo,
                  pageSize:500,
                  pageNum:1
                }).then(res=>{
                if(res.success){
                   this.warehousingTableData=res.data&&res.data.list||[]
                }
                 this.warehousingLoding=false;
              }).catch(err=>{
                 this.warehousingLoding=false;
              })
            }
        } else if(tab.name=='plan'){
            if(!this.planTableData.length){
                this.planLoading=true;
                inPlanSelect({
                  busiBillNo:this.busiBillNo,
                  pageSize:500,
                  pageNum:1
                }).then(res=>{
                  this.planLoading=false;
                  if(res.success){
                   this.planTableData=res.data&&res.data.list||[]
                  }
                }).catch(err=>{
                  this.planLoading=false;
                })
            }
        }
      }
    }
 }

</script>
