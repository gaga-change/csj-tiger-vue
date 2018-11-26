<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm"  size="small" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="70px">
          <el-col :span="6"  style="min-width:300px" >
            <el-form-item label="出库类型"  prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType"  placeholder="请选择出库类型">
                <el-option   v-for="item in mapConfig['getBillType'].filter(v=>v.value.includes('出库'))" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="业务单号" prop="busiBillNo">
              <el-input v-model.lazy.trim="ruleForm.busiBillNo" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入业务单号"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6" style="minWidth:310px">
            <el-form-item label="计划单号" prop="planCode">
              <el-input v-model.lazy.trim="ruleForm.planCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入计划单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="minWidth:310px">
            <el-form-item label="出库单号" prop="warehouseExeCode">
              <el-input v-model.lazy.trim="ruleForm.warehouseExeCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入出库单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="minWidth:310px">
            <el-form-item label="客户名称" prop="arrivalName">
              <el-input v-model.lazy.trim="ruleForm.arrivalName" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入客户名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="16" style="minWidth:340px" >
            <el-form-item label="出库日期" prop="time">
                 <el-date-picker
                    v-model="ruleForm.time"
                    @change="timeChange"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                 </el-date-picker>
              </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button type="primary"  size="small"  @click="submitForm('ruleForm')">查询</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary"  size="small" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
      </el-form>
    </el-row>
    </el-card>
   </div>
    <base-table 
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
          :loading="loading"
          :config="tableConfig"  
          :total="total" 
          :maxTotal="10"
          :pageSize="ruleForm.pageSize"
          :currentPage="ruleForm.pageNum"
          :tableData="tableData"/>
 </div>
</template>

<script>
    import moment from 'moment';
    import { outOrderSelect} from '@/api/outgoing'
    import BaseTable from '@/components/Table'
    import {indexTableConfig } from './config';
    import { mapGetters } from 'vuex'
    
    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
            busiBillType: '',
            busiBillNo: '',
            arrivalName:'',
            planCode:'',
            warehouseExeCode:'',
            time:'',
            pageNum: 1,
            pageSize:10,
         },
        total:0,
        tableConfig:indexTableConfig,
        rules: {
         
        },
         loading:false,
         tableData: []
      }
    },

    computed: {
      ...mapGetters([
        'mapConfig',
      ])
    },

     mounted(){

      if(this.$route.query.data){
        this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
      }
      this.getCurrentTableData();
    },

    methods: {
      timeChange(value){
        this.ruleForm={...this.ruleForm, time:value};
        this.getCurrentTableData()
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

      getCurrentTableData(){
         this.$router.replace({
          path:'/outgoing/quiry',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
        if(this.ruleForm[i]!==undefined&&this.ruleForm[i]!==''){
            if(i==='time'){
               let arr=this.ruleForm[i].map(v=>moment(v).format('YYYY-MM-DD'));
               if(arr.every(v=>v)&&arr.length>1){
                 json['outStoreBeginDate']=arr[0];
                 json['outStoreEndDate']=arr[1];
               } 
            } else{
               json[i]=this.ruleForm[i]
            }
            
          }
        }
        let data={...json}
       outOrderSelect(data).then(res=>{
       if(res.success){
          let data=res.data;
          this.tableData=data.list||[];
          this.total=data.total;
       } 
        this.loading=false;

     }).catch(err=>{
          this.loading=false;
        })
      }
    }
 }
</script>


