<template>
  <div class="outgoing-quiry-container">
    <el-row :gutter="16" >
       
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline">
          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="仓库编号" prop="warehouseNo">
              <el-input v-model.lazy.trim="ruleForm.warehouseNo" style="width:210px"  @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主编号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="仓库名称" prop="warehouseName">
              <el-input v-model.lazy.trim="ruleForm.warehouseName" style="width:210px"  @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="服务客户名称" prop="customerName">
              <el-input v-model.lazy.trim="ruleForm.customerName" style="width:210px"  @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" size="medium"  @click="submitForm('ruleForm')">查询</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="medium" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
      </el-form>

          <el-table
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-background="rgba(255, 255, 255, 0.5)"
            :data="tableData"
            border
            style="width: 100%">

            <el-table-column
              v-for="item in tableConfig"
              :formatter="item.formatter"
              :key="item.lable"
              :prop="item.prop"
              :label="item.label">
            </el-table-column>

          </el-table>

          <el-pagination
            style="marginTop:16px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="ruleForm.pageNum"
            :page-sizes="[7,10, 15, 20, 30]"
            :page-size="ruleForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            v-if="total>7"
            :total="total">
          </el-pagination>
    </el-row>
  </div>
</template>

<script>

    import moment from 'moment';
    import { warehouseSelect} from '@/api/customerconfiguration'
    import { getWarehouseType } from '@/api/map';

    export default {
      data() {
      return {
        ruleForm: {
          warehouseNo:'',
          warehouseName: '',
          customerName:'',
          pageNum: 1,
          pageSize:7,
        },
        total:0,
        warehouseTypeConfig:[],
        tableConfig:[],
        rules: {
        
        },
         loading:false,
         tableData: []
      }
    },

    beforeMount(){
      this.tableConfig=[
      { label:'仓库编号',prop:'warehouseNo',formatter:this.formatter(1,'linkTo')},
      { label:'仓库名称',prop:'warehouseName'},
      { label:'所在省/市',width:"150",fixed:false,formatter:(row, column, cellValue, index)=>{
        return `${row.warehouseProvince}/${row.warehouseCity}`
     }},
      { label:'仓库类型',prop:'warehouseType',formatter:this.formatter(1,'time')},
      { label:'负责人',prop:'warehouseLinkName',formatter:this.formatter(1,'Boolean')},
      { label:'联系电话',prop:'linkTel',formatter:this.formatter(1,'Boolean')},
      { label:'操作',formatter:this.formatter(1,'linkTo','查看')},
     ]
    },

     mounted(){
       if(this.$route.query.data){
         this.ruleForm=JSON.parse(this.$route.query.data)
       }

       getWarehouseType().then(res=>{
        if(res.success){
          this.warehouseTypeConfig=res.data;
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
  

    this.getCurrentTableData();
     
    },

    methods: { 
      formatter(value,type,text){
         if(value!=undefined){
            switch(type){
              case 'Boolean': return (row, column, cellValue, index)=>Number(cellValue)?'是':'否';
              case 'linkTo' :return  (row, column, cellValue, index)=>{
                let query={
                  warehouseNo:row.warehouseNo,
                  warehouseTypeConfig:this.warehouseTypeConfig
                }
                let linkTo={
                  path:'/businessset/customerconfiguration-detail',
                  query:{data:JSON.stringify(query)}
                }
                return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{text?text:cellValue}</router-link>
                };
              case 'time': return (row, column, cellValue, index)=>cellValue?moment(cellValue).format('YYYY-MM-DD hh:mm:ss'):'未记录'
              default:return value
            }
         } else{
           return '无'
         }
       },

       submitForm(formName) {
        this.ruleForm={...this.ruleForm,pageSize:7,pageNum:1}
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getCurrentTableData();
          } else {
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm={...this.ruleForm,pageSize:7,pageNum:1}
        this.getCurrentTableData()
      },

      handleSizeChange(val) {
        this.ruleForm={...this.ruleForm,pageSize:val,pageNum:1}
        this.getCurrentTableData()
      },

      handleCurrentChange(val) {
        this.ruleForm={...this.ruleForm,pageNum:val}
        this.getCurrentTableData()
      },

      getCurrentTableData(){
        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
          if(this.ruleForm[i]!=undefined&&this.ruleForm[i]!=''){
            json[i]=this.ruleForm[i]
          }
        }
        let data={...json}
        this.$router.replace({
          path:'/businessset/customerconfiguration',
          query:{data:JSON.stringify(data)}
        })
       warehouseSelect(data).then(res=>{
       if(res.success){
          let data=res.data;
          this.tableData=data.list;
          this.total=data.total;
       } else{
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
       }
        this.loading=false;

     }).catch(err=>{
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
           this.loading=false;
        })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .outgoing-quiry-container{
    padding: 24px;
  }
</style>

