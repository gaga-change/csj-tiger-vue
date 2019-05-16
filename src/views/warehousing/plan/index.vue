<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm" size="small" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="70px"  label-position="left">
          <el-col :sm="12" :md="8" :lg="8" :xl="6" >
            <el-form-item label="入库类型"  prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType"   placeholder="请选择入库类型">
                <el-option   v-for="item in mapConfig['getBillType']&&mapConfig['getBillType'].filter(v=>v.value.includes('入库'))" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" >
            <el-form-item label="业务单号" prop="billNo">
              <el-input v-model.lazy.trim="ruleForm.billNo" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入业务单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" >
            <el-form-item label="制单人" prop="busiBillCreater">
              <el-input v-model.lazy.trim="ruleForm.busiBillCreater" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入制单人"></el-input>
            </el-form-item>
          </el-col>


          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="计划单号" prop="planCode">
              <el-input v-model.lazy.trim="ruleForm.planCode" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入计划单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" >
            <el-form-item label="入库仓库"  prop="planWarehouseCode">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.planWarehouseCode"  placeholder="请选择入库仓库">
                <el-option   v-for="(item,index) in mapConfig['getWarehouse']" :label="item.value"   :key="index"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" >
            <el-form-item label="单据状态" >
              <el-select   v-model="ruleForm.planState"  placeholder="请选择单据状态">
                <el-option   v-for="item in warehousingPlanBillStatus" :label="item.name"   :key="item.value"  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" >
            <el-form-item label="执行状态"  prop="execStatus">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.execStatus"  placeholder="请选择执行状态">
                <el-option   v-for="item in mapConfig['getExecState']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="供应商名称" label-width="78px" prop="providerName">
              <el-input v-model.lazy.trim="ruleForm.providerName" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入供应商名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" >
            <el-form-item label="货主"   prop="ownerCode">
              <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.ownerCode" clearable  placeholder="请选择货主">
                <el-option   v-for="item in mapConfig['billOwnerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
           <el-form-item label="外部订单号" prop="busiBillNo" labelWidth="85px">
             <el-input v-model.lazy.trim="ruleForm.busiBillNo" @keyup.enter.native="submitForm('ruleForm')" placeholder="请输入外部订单号"></el-input>
           </el-form-item>
         </el-col>


          <el-col :span="16" >
            <el-form-item label="计划入库日期" label-width="100px" prop="time">
                 <el-date-picker
                    :clearable="true"
                    v-model="ruleForm.time"
                    @change="timeChange"
                    :picker-options="$pickerOptions"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
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
         <a :href="`/webApi/in/plan/export?${stringify(this.linkData)}`">
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
    import {inPlanSelect} from '@/api/warehousing'
    import BaseTable from '@/components/Table'
    import { indexTableConfig } from './config';
    import  { warehousingPlanBillStatus } from "@/utils/enum.js";
    import editTable from '@/components/Table/editTable';
    import { mapGetters } from 'vuex'
    import {stringify} from 'qs';
    export default {
      name: 'warehousing-plan-index',
      components: { BaseTable,editTable },
      data() {
      return {
        ruleForm: {
           busiBillType: '',
           busiBillNo: '',
           busiBillCreater:'',
           planCode:'',
           planWarehouseCode:'',
           providerName:'',
           ownerCode:'',
           time:'',
           execStatus: '',
           pageNum: 1,
           pageSize:10,
        },
        total:0,
        tableConfig:indexTableConfig,
        warehousingPlanBillStatus,
        rules: {

        },
         loading:false,
         tableData: [],
         linkData:''
      }
    },

    computed: {
      ...mapGetters([
        'mapConfig',
      ])
    },

     mounted(){
       const end = new Date();
       const start = new Date();
       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
       this.$set(this.ruleForm, 'time', [start, end])
       this.getCurrentTableData();

    },

     created(){
        this.tableConfig.forEach(item=>{
          if(item.useLink){
              item.dom=(row, column, cellValue, index)=>{
                let queryPath=`/warehousing/plan-detail?planCode=${row.planCode}`;
                let handOutPath=`/warehousing/plan-detail?planCode=${row.planCode}&history=${true}`
                return <div style={{display:'flex',flexWrap: 'nowrap'}}>
                    <router-link  to={queryPath}  class="routerLink">查看</router-link>
                    {
                       [1].includes(Number(row.operator))&&
                      <router-link to={handOutPath}  class="routerLink">手工入库</router-link>
                    }
                </div>
              }
          }
        })
      },

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
        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
          if(this.ruleForm[i]!==undefined&&this.ruleForm[i]!==''&&this.ruleForm[i]!==null){
            if(i==='time'){
              const timeArr = this.ruleForm[i] || []
               let arr=timeArr.map(v=>moment(v).valueOf());
               if(arr.every(v=>v)&&arr.length>1){
                 json['planInTimeStart']=arr[0];
                 json['planInTimeEnd']=arr[1];
               }
            } else{
               json[i]=this.ruleForm[i]
            }
          }
        }
        let data={...json}
        this.linkData=data;
       inPlanSelect(data).then(res=>{
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

<style rel="stylesheet/scss" lang="scss">
  .outgoing-quiry-container{
    .routerLink{
      color:#3399ea;
      white-space:nowrap;
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>
