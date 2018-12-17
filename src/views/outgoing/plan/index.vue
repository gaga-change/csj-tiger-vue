<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm"  size="small" :rules="rules" ref="ruleForm"   class="demo-form-inline"  label-width="70px"  label-position="left">
          <el-col :span="6" style="min-width:300px" >
            <el-form-item label="出库类型"   prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType"  placeholder="请选择出库类型">
                <el-option   v-for="item in mapConfig['getBillType']&&mapConfig['getBillType'].filter(v=>v.value.includes('出库'))" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="业务单号" prop="busiBillNo">
              <el-input v-model.lazy.trim="ruleForm.busiBillNo" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入业务单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="计划单号" prop="planCode">
              <el-input v-model.lazy.trim="ruleForm.planCode" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入计划单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="计划仓库" prop="planWarehouseName">
              <el-input v-model.lazy.trim="ruleForm.planWarehouseName" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请选择计划仓库"></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="6" >
            <el-form-item label="客户名称" prop="arrivalName">
              <el-input v-model.lazy.trim="ruleForm.arrivalName" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入客户名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px" >
            <el-form-item label="执行状态"  prop="execStatus">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.execStatus"   placeholder="请选择执行状态">
                <el-option   v-for="item in mapConfig['outbusibillstate']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
 
          <el-col :span="16" >
            <el-form-item label="计划出库日期" prop="time" label-width="100px" >
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

   <div style="display: flex;justify-content: flex-end;margin-bottom:12px">
      <a :href="`/webApi/out/plan/export?${stringify(this.linkData)}`" >
        <el-button type="primary" size="small" >导出Excel</el-button> 
      </a>
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
    import { outPlanSelect} from '@/api/outgoing'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import {indexTableConfig } from './config';
    import {stringify} from 'qs';
    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
          busiBillType: '',
          busiBillNo: '',
          planCode:'',
          arrivalName:'',
          planWarehouseName:'',
          time:[],
          execStatus: '',
          pageNum: 1,
          pageSize:10,
        },
        total:0,
        rules: {},
        loading:false,
        tableData: [],
        tableConfig:indexTableConfig,
        linkData:''
      }
    },

      created(){
        this.tableConfig.forEach(item=>{
          if(item.useLink){
              item.dom=(row, column, cellValue, index)=>{
                return <div style={{display:'flex'}}>
                    <router-link  to={{path:'/outgoing/plan-detail',query:{planCode:row.planCode}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>查看</router-link>
                    { row.isCreate&&
                      <router-link  to={{path:'/reply/newreceiptorder',query:{id:row.id}}} style={{color:'#3399ea',whiteSpace:'nowrap',margin:'0 10px 0 0'}}>创建回单</router-link>
                    }
                    { row.isHandOut&&
                      <router-link  to={{path:'/outgoing/manual',query:{planCode:row.planCode}}} style={{color:'#3399ea',whiteSpace:'nowrap'}}>手工出库</router-link>
                    }
                </div>
              }
          }
        })
      },

     mounted(){
       if(this.$route.query.data){
         this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }

      this.getCurrentTableData();
     
    },

    computed: {
    ...mapGetters([
      'mapConfig',
    ])},

    methods: {
       stringify,
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

      timeChange(value){
        this.ruleForm={...this.ruleForm, time:value};
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
          path:'/outgoing/plan',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
          if(this.ruleForm[i]!==undefined&&this.ruleForm[i]!==''){
            if(i==='time'){
               let arr=this.ruleForm[i].map(v=>moment(v).valueOf());
               if(arr.every(v=>v)&&arr.length>1){
                 json['planTimeFrom']=arr[0];
                 json['planTimeTo']=arr[1];
               } 
            } else{
               json[i]=this.ruleForm[i]
            }
            
          }
        }
        let data={...json}
        this.linkData=data;
       outPlanSelect(data).then(res=>{
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

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

