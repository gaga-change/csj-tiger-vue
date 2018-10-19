<template>
  <div class="outgoing-quirydetail-container">
    <div style="marginBottom:12px">
     <item-title text="基本信息"/>
      <el-card class="box-card" v-loading="loading"  element-loading-text="加载中..." shadow="never" body-style="padding:12px" >
      <el-row>
        <el-col  v-for="item in infoConfig"  :key="item.value"  :span="item.span" :style="item.style">
          <span class="card-title">{{item.title}}</span> : <span class="card-text">{{formatter(config[item.value],item.type)}}</span>
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
 import { warehouseDetail} from '@/api/customerconfiguration'
 import webPaginationTable from '@/components/Table/webPaginationTable'

 export default {
    components: { webPaginationTable },
    data() {
      return {
        config:{},
        infoConfig:[],
        tableData:[],
        tableConfig:[],
        warehouseTypeConfig:[],
        loading:false
      }
    },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',fixed:true,type:'index'},
          { label:'客户编号',prop:'customerCode',fixed:false,},
          { label:'客户名称',prop:'customerName',fixed:false,},
          { label:'联系人',prop:'customerLinkUser',fixed:false,formatter:(row, column, cellValue, index)=>this.formatter(cellValue,'warehouseType')},
          { label:'联系电话',prop:'customerLinkuserTel',fixed:false,},
          { label:'主营品种说明',prop:'mainSkuName',fixed:false,},
      ];

      this.infoConfig=[
        {title:'仓库名称',value:'warehouseName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'开通日期',value:'warehouseOpenDate',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'仓库类型',value:'warehouseType',type:'warehouseType',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'负责人',value:'warehouseLinkName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'联系电话',value:'linkTel',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'仓库地址',value:'warehouseAddress',style:'minWidth:310px;marginBottom:16px',span:6},
      ]
    },
    mounted(){
      let { warehouseNo,warehouseTypeConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.warehouseTypeConfig=warehouseTypeConfig||[];
      this.loading=true;
      warehouseDetail({warehouseNo}).then(res=>{
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
      formatter(value,type){
        if(value!=undefined){
          switch(type){
            case 'index':return (row, column, cellValue, index)=>index+1
            case 'time': return moment(value).format('YYYY-MM-DD HH:mm:ss');
            case 'warehouseType': return this.warehouseTypeConfig.find(v=>v.key==value)&&this.warehouseTypeConfig.find(v=>v.key==value).value||'';
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

