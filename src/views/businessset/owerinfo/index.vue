<template>
  <div class="outgoing-quiry-container">
    <el-row :gutter="16" >
       
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline">
          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="货主编号" prop="ownerCode">
              <el-input v-model.lazy.trim="ruleForm.ownerCode" style="width:210px"  @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主编号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="货主名称" prop="ownerName">
              <el-input v-model.lazy.trim="ruleForm.ownerName" style="width:210px"  @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主名称"></el-input>
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

      <base-table 
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        :loading="loading"
        :config="tableConfig"  
        :total="total" 
        :maxTotal="7"
        :pageSize="ruleForm.pageSize"
        :currentPage="ruleForm.pageNum"
        :tableData="tableData"/>
    </el-row>
  </div>
</template>

<script>

    import moment from 'moment';
    import { owerInfo} from '@/api/owerinfo'
    import { getWarehouseType } from '@/api/map';
    import BaseTable from '@/components/Table'
    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
          ownerCode:'',
          ownerName: '',
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
      { label:'货主编号',prop:'ownerCode',dom:this.formatter('linkTo')},
      { label:'货主名称',prop:'ownerName'},
      { label:'所在省/市',prop:'ownerAddress'},
      { label:'负责人',prop:'ownerLinkUser',type:'time'},
      { label:'联系电话',prop:'ownerLinkUserTel',type:'boolean'},
      { label:'操作',dom:this.formatter('linkTo','查看')},
     ]
    },

     mounted(){
       if(this.$route.query.data){
         this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
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
      formatter(type,value){
            switch(type){
              case 'linkTo' :return (row, column, cellValue, index)=>{
                let query={
                  ownerCode:row.ownerCode,
                  warehouseTypeConfig:this.warehouseTypeConfig
                }
                let linkTo={
                  path:'/businessset/owerinfo-detail',
                  query:{data:JSON.stringify(query)}
                }
                return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
                };
              default:return value
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
         this.$router.replace({
          path:'/businessset/owerinfo',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
          if(this.ruleForm[i]!=undefined&&this.ruleForm[i]!=''){
            json[i]=this.ruleForm[i]
          }
        }
        let data={...json}
       owerInfo(data).then(res=>{
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

