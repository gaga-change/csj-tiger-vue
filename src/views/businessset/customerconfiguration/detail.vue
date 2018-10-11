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
 import { warehouseDetail} from '@/api/customerconfiguration'

 export default {
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
          { label:'序号',width:"150",fixed:true,formatter:this.formatter(1,'index')},
          { label:'客户编号',prop:'warehouseNo',width:"150",fixed:false,},
          { label:'客户名称',prop:'warehouseName',width:"150",fixed:false,},
          { label:'联系人',prop:'warehouseType',width:"150",fixed:false,formatter:(row, column, cellValue, index)=>this.formatter(cellValue,'warehouseType')},
          { label:'联系电话',prop:'warehouseLinkUser',width:"150",fixed:false,},
          { label:'主营品种说明',prop:'warehouseLinkUserTel',width:"150",fixed:false,},
      ];

      this.infoConfig=[
        {title:'仓库名称',value:'ownerName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'开通日期',value:'ownerLinkUser',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'仓库类型',value:'ownerLinkUserTel',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'负责人',value:'ownerAddress',style:'minWidth:310px;marginBottom:16px',span:24},
        {title:'联系电话',value:'ownerAddress',style:'minWidth:310px;marginBottom:16px',span:24},
        {title:'仓库地址',value:'ownerAddress',style:'minWidth:310px;marginBottom:16px',span:24},
      ]
    },
    mounted(){
      let { warehouseNo,busiBillTypeConfig,warehouseTypeConfig}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];
      this.warehouseTypeConfig=warehouseTypeConfig||[];
      warehouseDetail({warehouseNo}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.warehouseOwnerDetailList)?data.warehouseOwnerDetailList:[]
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
