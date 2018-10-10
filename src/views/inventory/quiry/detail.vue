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
 import {stockRecord} from '@/api/inventory';

 export default {
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
          { label:'序号',width:"150",fixed:true,formatter:this.formatter(1,'index')},
          { label:'变动日期',prop:'changeTime',width:"150",fixed:false,},
          { label:'出入库类型',prop:'direcType',width:"150",fixed:false,},
          { label:'业务类型',prop:'busiBillType',width:"150",fixed:false,},
          { label:'出入库方',prop:'warehouseName',width:"150",fixed:false,},
          { label:'变动前数量',prop:'beforeQty',width:"150",fixed:false,},
          { label:'变动数量',prop:'changeQty',width:"150",fixed:false},
          { label:'变动后数量',prop:'afterQty',width:"150",fixed:false},
          { label:'所属库存周期',prop:'pertainStoreCycle',width:"150",fixed:false},
        
      ];

      this.infoConfig=[
        {title:'商品名称',value:'skuName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'商品规格',value:'skuFormat',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'品牌',value:'brandName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'商品分类',value:'skuType',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'最小单位',value:'skuUnitName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'最小单位转换比',value:'skuUnitConvert',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'库存成本价',value:'costPrice',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'仓库',value:'warehouseName',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'总数量',value:'skuQty',style:'minWidth:310px;marginBottom:16px',span:8},
        {title:'锁定数量',value:'lockQty',style:'minWidth:310px;marginBottom:16px',span:8},
      ]
    },
    mounted(){
      let { warehouseCode,skuCode,busiBillTypeConfig,}=this.$route.query.data&&JSON.parse(this.$route.query.data)||{};
      this.busiBillTypeConfig=busiBillTypeConfig||[];


      stockRecord({warehouseCode,skuCode}).then(res=>{
        if(res.success){
          let data=res.data;
          this.config=data;
          this.tableData=Array.isArray(data.items)?data.items:[]
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
            case 'busiBillType': return this.busiBillTypeConfig.find(v=>v.key==value)&&this.busiBillTypeConfig.find(v=>v.key==value).value||'---';
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
