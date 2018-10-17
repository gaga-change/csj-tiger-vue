<template>
  <div class="outgoing-quirydetail-container">
      <el-row>

        <el-col  v-for="item in infoConfig"  :key="item.value"  :span="item.span" :style="item.style">
            {{item.title}}: <span>{{formatter(config[item.value],item.type)}}</span>
        </el-col>

          <web-pagination-table 
          :config="tableConfig" 
          :allTableData="tableData"/>

    </el-row>
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
        warehouseTypeConfig:[]
      }
    },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',width:"50",fixed:true,type:'index'},
          { label:'客户编号',prop:'customerCode',width:"150",fixed:false,},
          { label:'客户名称',prop:'customerName',width:"150",fixed:false,},
          { label:'联系人',prop:'customerLinkUser',width:"150",fixed:false,formatter:(row, column, cellValue, index)=>this.formatter(cellValue,'warehouseType')},
          { label:'联系电话',prop:'customerLinkuserTel',width:"150",fixed:false,},
          { label:'主营品种说明',prop:'mainSkuName',width:"150",fixed:false,},
      ];

      this.infoConfig=[
        {title:'仓库名称',value:'warehouseName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'开通日期',value:'warehouseOpenDate',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'仓库类型',value:'warehouseType',type:'warehouseType',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'负责人',value:'warehouseLinkName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'联系电话',value:'linkTel',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'仓库地址',value:'warehouseAddress',style:'minWidth:310px;marginBottom:16px',span:24},
      ]
    },
    mounted(){
      let { warehouseNo,warehouseTypeConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.warehouseTypeConfig=warehouseTypeConfig||[];
      warehouseDetail({warehouseNo}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.items)?data.items:[]
        } else{
            this.$message({
              showClose: true,
              message: '数据请求出错',
              type: 'error'
           });
        }
      }).catch(err=>{
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .outgoing-quirydetail-container{
    padding: 24px;
    span{
      color:#666;
    }
  }

</style>
