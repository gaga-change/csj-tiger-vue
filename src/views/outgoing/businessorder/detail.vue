<template>
  <div class="outgoing-quirydetail-container">
      <el-row>
        <el-col  v-for="item in infoConfig"  :key="item.value"  :span="item.span" :style="item.style">
            {{item.title}}: <span>{{formatter(config[item.value],item.type)}}</span>
        </el-col>

        <el-table
        :data="tableData"
        border
        style="width: 100%">
          <el-table-column
            v-for="item in tableConfig"
            :key="item.prop"
            :fixed="item.fixed"
            :formatter="item.formatter"
            :width="item.width"
            :prop="item.prop"
            :label="item.label">
          </el-table-column>
        </el-table>
    </el-row>
  </div>
</template>

<script>
 import moment from 'moment';
 import { outBillDetail} from '@/api/outgoing';

 const tableConfig=[
    { label:'序号',width:"150",fixed:true,formatter:(row, column, cellValue, index)=>index+1},
    { label:'SKU名称',prop:'skuName',width:"150",fixed:false,},
    { label:'规格型号',prop:'skuFormat',width:"150",fixed:false,},
    { label:'生产厂家',prop:'productFactory',width:"150",fixed:false,},
    { label:'商品分类',prop:'skuSort',width:"150",fixed:false,},
    { label:'品牌名',prop:'skuBrandName',width:"150",fixed:false,},
    { label:'单位',prop:'skuUnitName',width:"150",fixed:false,},
    { label:'出单价格',prop:'outStorePrice',width:"150",fixed:false,},
    { label:'已出/应出(单位)',width:"150",fixed:false,formatter:(row, column, cellValue, index)=>{
        return `${row.realOutQty}/${row.planOutQty}(${row.skuUnitName})`
    }},
    { label:'转换比',prop:'skuUnitConvert',width:"150",fixed:false},
 ];

 const infoConfig=[
   {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'业务类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'来源系统',value:'fromSysCode',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'制单时间',type:'time',value:'busiBillCreateTime',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'制单人',value:'busiBillCreater',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'状态',type:'busiBillState',value:'billState',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'是否越库',type:'boolean',value:'isCross',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'是否可分批',type:'boolean',value:'isBatch',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'客户编号',value:'arrivalCode',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'客户名称',value:'arrivalName',style:'minWidth:310px;marginBottom:16px',span:8},
   {title:'客户地址',value:'arrivalAddress',style:'minWidth:310px;marginBottom:16px',span:16},
   {title:'其他信息',value:'otherInfo',style:'minWidth:310px;marginBottom:16px',span:24},
 ]


 export default {
    data() {
      return {
        config:{},
        infoConfig,
        
        tableData:[],
        tableConfig:tableConfig,
        
        busiBillTypeConfig:[],
        busiBillStateConfig:[],
       
      }
    },

    mounted(){
      let { busiBillNo,busiBillTypeConfig,busiBillStateConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.busiBillStateConfig=busiBillStateConfig||[];
      outBillDetail({busiBillNo}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=data.busiBillDetails;
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
      formatter(value,type){
        if(value!=undefined){
          switch(type){
            case 'time': return moment(value).format('YYYY-MM-DD');
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'---';
            case 'busiBillState': return this.busiBillStateConfig.find(v=>v.key==value)&&this.busiBillStateConfig.find(v=>v.key==value).value||'---';
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .outgoing-quirydetail-container{
    padding: 24px;
    span{
      color:#666;
    }
  }

</style>
