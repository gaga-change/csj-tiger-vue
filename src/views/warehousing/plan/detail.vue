<template>
  <div class="outgoing-quirydetail-container">
      <el-row>

        <el-col  v-for="item in infoConfig"  :key="item.value"  :span="item.span" :style="item.style">
            {{item.title}}: <span>{{formatter(item.type,config[item.value])}}</span>
        </el-col>

        <web-pagination-table 
        :config="tableConfig" 
        :allTableData="tableData"/>
    </el-row>
  </div>
</template>

<script>
 import moment from 'moment';
 import {inPlanDetail} from '@/api/warehousing'
 import webPaginationTable from '@/components/Table/webPaginationTable'

 const tableConfig=[
    { label:'序号',width:"50",fixed:true,type:'index'},
    { label:'SKU名称',prop:'skuName',width:"150",fixed:false,},
    { label:'规格型号',prop:'skuFormat',width:"150",fixed:false,},
    { label:'品牌',prop:'skuBrandName',width:"150",fixed:false,},
    { label:'转换比',prop:'skuUnitConvert',width:"80",fixed:false},
    { label:'入库单价',prop:'inPrice',width:"150",fixed:false},

    { label:'已入/总数(单位)',width:"150",fixed:false,dom:(row, column, cellValue, index)=>{
        return `${row.realInQty}/${row.planInQty}(${row.skuUnitName})`
    }},

    { label:'还应入',width:"150",fixed:false,dom:(row, column, cellValue, index)=>{
        return `${row.planInQty-row.realInQty}(${row.skuUnitName})`
    }},
   
 ];

 const infoConfig=[
   {title:'计划单号',value:'planCode',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'入库类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'计划制定时间',type:'time',value:'busiBillCreaterTime',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'计划人',value:'busiBillCreater',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'计划仓库',value:'planWarehouseName',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'货主编号',value:'ownerCode',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'货主名称',value:'ownerName',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'联系电话',value:'linkTel',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'下推状态',value:'issuedState', type:'issuedState',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'执行状态',value:'execStatus', type:'execStatus',style:'minWidth:310px;marginBottom:16px',span:8},
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
      }
    },

    mounted(){
      let { planCode,busiBillTypeConfig,issuedStateConfig,execStatuConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.issuedStateConfig=issuedStateConfig||[];
      this.execStatuConfig=execStatuConfig||[];

      inPlanDetail({planCode}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          let list=data.skuDetails&&data.skuDetails.list||[]
          this.tableData=list
        } else{
           console.log('busibill/select/detail',res)
            this.$message({
              showClose: true,
              message: '数据请求出错',
              type: 'error'
           });
        }
      }).catch(err=>{
         console.log('busibill/select/detail',err)
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
            case 'time': return moment(value).format('YYYY-MM-DD');
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'暂无数据';
            case 'issuedState': return this.issuedStateConfig.find(v=>v.key==value)&&this.issuedStateConfig.find(v=>v.key==value).value||'暂无数据';
            case 'execStatus': return this.execStatuConfig.find(v=>v.key==value)&&this.execStatuConfig.find(v=>v.key==value).value||'暂无数据';
            case 'boolean': return Number(value)?'是':'否';
            default : return value
          }
        } else{
          return '暂无数据'
        }
      }
    }
 }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .outgoing-quirydetail-container{
    padding: 24px;
    span{
      color:#666;
    }
  }

</style>
