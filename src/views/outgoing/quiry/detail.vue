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
      }
    },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',width:"50",fixed:true,type:'index'},
          { label:'SKU名称',prop:'skuName',width:"150",fixed:false,},
          { label:'规格型号',prop:'skuFormat',width:"150",fixed:false,},
          { label:'生产厂家',prop:'productFactory',width:"150",fixed:false,},
          { label:'商品分类',prop:'skuCskuCategoryno',width:"150",fixed:false,},
          { label:'品牌名',prop:'skuBrandName',width:"150",fixed:false,},
          { label:'单位',prop:'skuUnitName',width:"80",fixed:false},
          { label:'转换比',prop:'skuUnitConvert',width:"80",fixed:false},
          { label:'出库单价',prop:'skuOutPrice',width:"150",fixed:false},
          { label:'出库数量',prop:'outStoreQty',width:"150",fixed:false},
      ];

      this.infoConfig=[
        {title:'出库单号',value:'warehouseExeCode',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'出库日期',type:'time',value:'outStoreTime',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'计划单号',value:'planCode',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'出库类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'客户编号',value:'arrivalCode',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'客户名称',value:'arrivalName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'联系电话',value:'arrivalLinkTel',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'客户地址',value:'arrivalAddress',style:'minWidth:310px;marginBottom:16px',span:24},
      ]
    },
    mounted(){
      let { id,busiBillTypeConfig,}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];


      outOrderDetail({orderId:id}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.owOrderDetailList)?data.owOrderDetailList:[]
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .outgoing-quirydetail-container{
    padding: 24px;
    span{
      color:#666;
    }
  }

</style>
