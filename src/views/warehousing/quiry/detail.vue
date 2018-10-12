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
 import {inOrderDetail} from '@/api/warehousing';
 import webPaginationTable from '@/components/Table/webPaginationTable'

 export default {
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        infoConfig:[],
        tableData:[],
        tableConfig:[],
        busiBillTypeConfig:[]
      }
    },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',width:"50",fixed:true,type:'index'},
          { label:'SKU名称',prop:'skuName',width:"150",fixed:false,},
          { label:'规格型号',prop:'skuFormat',width:"150",fixed:false,},
          { label:'生产厂家',prop:'productFactory',width:"150",fixed:false,},
          { label:'商品分类',prop:'skuCategoryno',width:"150",fixed:false,},
          { label:'品牌名',prop:'skuBrandName',width:"150",fixed:false,},
          { label:'单位',prop:'skuUnitName',width:"50",fixed:false},
          { label:'转换比',prop:'skuUnitConvert',width:"100",fixed:false},
          { label:'入库单价',prop:'inPrice',width:"150",fixed:false},
          { label:'入库数量(单位)',prop:'inStoreQty',width:"150",fixed:false},
      ];

      this.infoConfig=[
        {title:'入库单号',value:'warehouseExeCode',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'入库日期',type:'time',value:'inWarehouseTime',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'计划单号',value:'planCode',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'入库类型',type:'busiBillType',value:'busiBillType',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'业务单号',value:'busiBillNo',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'供应商编号',value:'providerCode',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'供应商名称',value:'providerName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'联系电话',value:'providerLinkTel',style:'minWidth:310px;marginBottom:16px',span:8},
      ]
    },
    mounted(){
      let { id,busiBillTypeConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];

      inOrderDetail({orderId:id}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.iwOrderDetailList)?data.iwOrderDetailList:[]
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
            case 'time': return moment(value).format('YYYY-MM-DD');
            case 'boolean': return Number(value)?'是':'否';
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'暂无数据';
            default :return  value;
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
