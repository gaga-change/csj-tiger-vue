<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16" >
        <el-form :inline="true" :model="ruleForm" size="small" :rules="rules" ref="ruleForm"   class="demo-form-inline">
          <el-col :span="6" >
            <el-form-item label="仓库编号" prop="warehouseNo">
              <el-input v-model.lazy.trim="ruleForm.warehouseNo"   @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主编号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="仓库名称" prop="warehouseName">
              <el-input v-model.lazy.trim="ruleForm.warehouseName"   @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6"  style="min-width:300px">
            <el-form-item label="服务客户名称" prop="customerName">
              <el-input v-model.lazy.trim="ruleForm.customerName"   @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" size="small"  @click="submitForm('ruleForm')">查询</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
      </el-form>
    </el-row>
    </el-card>
  </div>
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16" >
        <el-form :inline="true"  size="small"  class="demo-form-inline">
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" size="small" :disabled="buttonDisabled||!$haspermission('warehouseuserAdd')" @click="addWarehouseuser">新增</el-button>
            </el-form-item>

            <el-form-item> 
              <el-button type="primary" size="small" :disabled="buttonDisabled||!$haspermission('warehouseuserDelete')" @click="deleteWarehouseuser">删除</el-button>
            </el-form-item>
          </el-col>
      </el-form>
    </el-row>
    </el-card>
  </div>
    <base-table 
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      @selectionPartentChange="selectionPartentChange"
      :loading="loading"
      :config="tableConfig"  
      :total="total" 
      :maxTotal="10"
      :pageSize="ruleForm.pageSize"
      :currentPage="ruleForm.pageNum"
      :tableData="tableData"/>
      <el-dialog
      title="仓库用户配置"
      :visible.sync="addWarehouseVisble"
      append-to-body
      center
      width="450px">
      <el-form :model="addWarehouseForm" ref="warehouseForm" >
        <el-form-item label="仓库名称" label-width="80px" prop="warehouseNo">
           <el-select v-model="addWarehouseForm.warehouseNo" 
             placeholder="请选择仓库名称" :rules="[
              { required: true, message: '该项为必选'},
             ]">
              <el-option
                v-for="item in warehouseAll"
                :key="item.warehouseNo"
                :label="item.warehouseName"
                :value="item.warehouseNo">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="80px" prop="newpassword">
          <el-select v-model="addWarehouseForm.userNo" 
             placeholder="请选择用户名" :rules="[
              { required: true, message: '该项为必选'},
             ]">
              <el-option
                v-for="item in userAll"
                :key="item.userNo"
                :label="item.userName"
                :value="item.userNo">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addWarehouseVisble = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

    import moment from 'moment';
    import { warehouseSelect} from '@/api/customerconfiguration'
    import BaseTable from '@/components/Table'
    import {indexTableConfig} from './config';

    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
          warehouseNo:'',
          warehouseName: '',
          customerName:'',
          pageNum: 1,
          pageSize:10,
        },
        total:0,
        rules: {
        
        },
        loading:false,
        tableData: [],
        tableConfig:indexTableConfig,
        multiselect:[],
        addWarehouseForm:{},
        userAll:[],
        warehouseAll:[]

      }
    },
     mounted(){
       if(this.$route.query.data){
          this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }
       this.getCurrentTableData();
    },

    methods: { 
      deleteWarehouseuser(){
        if(this.multiselect.length>0){
            makeWarehouseDelete().then(res => {
              if(res.success){
                this.$message({
                  type:'success',
                  message:'删除成功'
                })
                this.getCurrentTableData()
              }else{
                this.$message({
                  type:'error',
                  message:'删除失败'
                })
              }
            }).catch(err => {
               this.$message({
                  type:'error',
                  message:'删除失败'
                })
            })
        }else{
          this.$message({
                  type:'info',
                  message:'请选择仓库'
                })
        }
      },
      addWarehouseuser(){
        this.addWarehouseVisble = true
      },
      addConfirm(){
        this.$refs['warehouseForm'].validate((valid) => {
          if (valid) {
            makeWarehouseAdd({...this.addWarehouseForm}).then(res => {
              if(res.success){
                this.$message({
                  type:'success',
                  message:'新增成功'
                })
                this.getCurrentTableData()
                this.addWarehouseVisble = false
              }else{
                this.$message({
                  type:'error',
                  message:'新增失败'
                })
              }
            }).catch(err => {
               this.$message({
                  type:'error',
                  message:'新增失败'
                })
            });
          } else {
            return false;
          }
        });
      },
       submitForm(formName) {
        this.ruleForm={...this.ruleForm,pageSize:10,pageNum:1}
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
        this.ruleForm={...this.ruleForm,pageSize:10,pageNum:1}
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
      selectionPartentChange(val){
        this.multiselect = [...val]
      },

      getCurrentTableData(){
        this.$router.replace({
          path:'/businessset/customerconfiguration',
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
       warehouseSelect(data).then(res=>{
       if(res.success){
          let data=res.data;
          this.tableData=data.list||[];
          this.total=data.total;
       } 
        this.loading=false;

        }).catch(err=>{
          this.loading=false;
        })
      },
      
    }
 }
</script>


