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
 import {owerInfoDetail} from '@/api/owerinfo';
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
        warehouseTypeConfig:[],
        loading:false
      }
    },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',fixed:true,type:'index'},
          { label:'仓库编号',prop:'warehouseNo',fixed:false,},
          { label:'仓库名称',prop:'warehouseName',fixed:false,},
          { label:'仓库类型',prop:'warehouseType',fixed:false,dom:(row, column, cellValue, index)=>this.formatter(cellValue,'warehouseType')},
          { label:'负责人',prop:'warehouseLinkUser',fixed:false,},
          { label:'联系电话',prop:'warehouseLinkUserTel',fixed:false,},
      ];

      this.infoConfig=[
        {title:'货主名称',value:'ownerName',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'负责人',value:'ownerLinkUser',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'联系电话',value:'ownerLinkUserTel',style:'minWidth:310px;marginBottom:16px',span:6},
        {title:'地址',value:'ownerAddress',style:'minWidth:310px;marginBottom:16px',span:6},
      ]
    },
    mounted(){
      let { ownerCode,busiBillTypeConfig,warehouseTypeConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.warehouseTypeConfig=warehouseTypeConfig||[];
      this.loading=true;
      owerInfoDetail({ownerCode}).then(res=>{
        this.loading=false;
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.warehouseOwnerDetailList)?data.warehouseOwnerDetailList:[]
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
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'';
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
