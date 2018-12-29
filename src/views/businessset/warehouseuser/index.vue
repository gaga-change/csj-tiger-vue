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
            <el-form-item label="用户名" prop="warehouseName">
              <el-input v-model.lazy.trim="ruleForm.warehouseName"   @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入用户名"></el-input>
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
              <el-button type="primary" size="small" :disabled="buttonDisabled||!$haspermission('warehouseuserAdd')" @click="addWarehouseuser">新增
              </el-button>
            </el-form-item>

            <el-form-item> 
              <el-button type="primary" size="small"  :disabled="buttonDisabled||!$haspermission('warehouseuserDelete')" @click="deleteWarehouseuser">删除
              </el-button>
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
      :showMul="showMul"
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
        <el-form-item label="仓库名称" label-width="80px" prop="warehouseNo" :rules="[
              { required: true, message: '该项为必选'},
             ]">
           <el-select v-model="addWarehouseForm.warehouseNo" 
             placeholder="请选择仓库名称" >
              <el-option
                v-for="item in warehouseAll"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="80px"  :rules="[
              { required: true, message: '该项为必选'},
             ]">
          <el-select v-model="addWarehouseForm.operatorName" 
             placeholder="请选择用户名" >
              <el-option
                v-for="item in userAll"
                :key="item.id"
                :label="item.operatorName"
                :value="item.operatorName">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:right">
        <el-button @click="addWarehouseVisble = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

    import moment from 'moment';
    import { getWarehouseUser, getUserByTid, makeWarehouseAdd, makeWarehouseDelete } from '@/api/customerconfiguration'
    import { getWarehouse } from '@/api/map'
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
        buttonDisabled:false,
        loading:false,
        tableData: [],
        tableConfig:indexTableConfig,
        multiselect:[],
        addWarehouseForm:{},
        userAll:[],
        warehouseAll:[],
        showMul:true,
        addWarehouseVisble:false,
      }
    },
     mounted(){
       if(this.$route.query.data){
          this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }
       this.getCurrentTableData();
       this.initInfo()
    },

    methods: { 
      deleteWarehouseuser(){
        if(!this.$haspermission('warehouseuserDelete')){
          this.$message({type:'info',message:'您没有权限删除'})
          return false
        }
        if(this.multiselect.length>0){
            this.$confirm('是否确定删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var paramsIds = []
              
              this.multiselect.map(item => {
                paramsIds.push(item.id)
              })
              
              makeWarehouseDelete({ids:paramsIds}).then(res => {
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
            }).catch(err=>{
              
            })
        }else{
          this.$message({
                  type:'info',
                  message:'请选择要刪除的'
                })
        }
      },
      addWarehouseuser(){
        if(!this.$haspermission('warehouseuserAdd')){
          this.$message({type:'info',message:'您没有权限新增'})
          return false
        }
        if(this.userAll.length>0&&this.warehouseAll.length>0){
          // this.addWarehouseVisble = true
        }else{
          this.initInfo()
        }
        this.addWarehouseVisble = true
      },
      addConfirm(){
        this.$refs['warehouseForm'].validate((valid) => {
          if (valid) {
            var params = {}
            this.userAll.map(item=>{
              if(item.operatorName == this.addWarehouseForm.operatorName){
                params = item
              }
            })
            makeWarehouseAdd({ warehouseNo:this.addWarehouseForm.warehouseNo,...params}).then(res => {
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
      initInfo(){
        if(!this.userAll.length>0){
          getUserByTid().then(res =>{
            if(res.success){
              var temp = res.data
              this.userAll = temp.map(item => {return {operatorAccount:item.email,operatorName:item.name,linkTel:item.phone,id:item.id}})
            }else{
              this.userAll = []
            }
          }).catch(err=>{
            this.userAll = []
          })
        }
       if(!this.warehouseAll.length>0){
          getWarehouse().then(res=>{
            if(res.success){
              this.warehouseAll = res.data
            }else{
              this.warehouseAll = []
            }
          }).catch(err=>{
            this.warehouseAll = []
          })
       }
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
          path:'/businessset/warehouseuser',
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
       getWarehouseUser(data).then(res=>{
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


