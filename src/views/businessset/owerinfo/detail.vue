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
        warehouseTypeConfig:[]
      }
    },

    beforeMount(){
      this.tableConfig=[
          { label:'序号',width:"50",fixed:true,type:'index'},
          { label:'仓库编号',prop:'warehouseNo',width:"150",fixed:false,},
          { label:'仓库名称',prop:'warehouseName',width:"180",fixed:false,},
          { label:'仓库类型',prop:'warehouseType',width:"150",fixed:false,dom:(row, column, cellValue, index)=>this.formatter(cellValue,'warehouseType')},
          { label:'负责人',prop:'warehouseLinkUser',width:"150",fixed:false,},
          { label:'联系电话',prop:'warehouseLinkUserTel',width:"150",fixed:false,},
      ];

      this.infoConfig=[
        {title:'货主名称',value:'ownerName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'负责人',value:'ownerLinkUser',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'联系电话',value:'ownerLinkUserTel',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'地址',value:'ownerAddress',style:'minWidth:310px;marginBottom:16px',span:24},
      ]
    },
    mounted(){
      let { ownerCode,busiBillTypeConfig,warehouseTypeConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.warehouseTypeConfig=warehouseTypeConfig||[];
      owerInfoDetail({ownerCode}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.warehouseOwnerDetailList)?data.warehouseOwnerDetailList:[]
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
            case 'index':return (row, column, cellValue, index)=>index+1
            case 'time': return moment(value).format('YYYY-MM-DD');
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'暂无数据';
            case 'warehouseType': return this.warehouseTypeConfig.find(v=>v.key==value)&&this.warehouseTypeConfig.find(v=>v.key==value).value||'暂无数据';
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
