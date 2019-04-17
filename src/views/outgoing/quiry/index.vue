<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm"  size="small" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="70px">
          <el-col :span="6"  style="min-width:300px" >
            <el-form-item label="出库类型"  prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType"  placeholder="请选择出库类型">
                <el-option   v-for="item in mapConfig['getBillType']&&mapConfig['getBillType'].filter(v=>v.value.includes('出库'))" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px"  >
            <el-form-item label="业务单号" prop="billNo">
              <el-input v-model.lazy.trim="ruleForm.billNo" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入业务单号"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6" style="min-width:320px">
            <el-form-item label="计划单号" prop="planCode">
              <el-input v-model.lazy.trim="ruleForm.planCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入计划单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:320px">
            <el-form-item label="出库单号" prop="warehouseExeCode">
              <el-input v-model.lazy.trim="ruleForm.warehouseExeCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入出库单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:320px">
            <el-form-item label="合同编号" prop="contractNo">
              <el-input v-model.lazy.trim="ruleForm.contractNo" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:320px">
            <el-form-item label="客户名称" prop="arrivalName">
              <el-input v-model.lazy.trim="ruleForm.arrivalName" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入客户名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px"  >
            <el-form-item label="货主"   prop="ownerCode">
              <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.ownerCode"   placeholder="请选择货主">
                <el-option   v-for="item in mapConfig['billOwnerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


        <el-col :span="6" style="min-width:320px" >
          <el-form-item label="业务板块"  prop="busiPlate">
            <el-select v-model="ruleForm.busiPlate" @change="submitForm('ruleForm')"  placeholder="请选择业务板块">
              <el-option
                v-for="item in busiPlateConfig"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

          <el-col :span="12" style="minWidth:400px" >
            <el-form-item label="出库日期" prop="time">
                 <el-date-picker
                    style="minWidth:340px" 
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

  <div style="display: flex;justify-content: flex-end;margin-bottom:12px">
      <a :href="`/webApi/out/order/export?${stringify(this.linkData)}`" >
        <el-button type="primary" size="small" >导出Excel</el-button> 
      </a>
  </div>

    <div class="tableTotal" v-if="outTotal&&outTotal.totalOutStoreQty!==undefined&&outTotal.totalOutStoreAmt!==undefined">
       <span>出库总金额</span> : <span>{{outTotal&&outTotal.totalOutStoreAmt&&Number(outTotal.totalOutStoreAmt).toFixed(2)}}</span>
       <span>出库总数量</span> : <span>{{outTotal&&outTotal.totalOutStoreQty&&Number(outTotal.totalOutStoreQty).toFixed(2)}}</span>
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
    import { outOrderSelect,selectTotal} from '@/api/outgoing'
    import BaseTable from '@/components/Table'
    import {indexTableConfig } from './config';
    import { mapGetters } from 'vuex'
    import {stringify} from 'qs';
    import {busiPlateConfig} from '@/utils/enum'
    
    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
            busiBillType: '',
            busiBillNo: '',
            arrivalName:'',
            ownerCode:'',
            planCode:'',
            warehouseExeCode:'',
            contractNo:'',
            busiPlate:'',
            time:'',
            pageNum: 1,
            pageSize:10,
         },
        total:0,
        tableConfig:indexTableConfig,
        rules: {
         
        },
        busiPlateConfig,
         loading:false,
         tableData: [],
         linkData:'',
         outTotal:{}
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
      stringify,
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
        this.linkData=data;

        selectTotal(data).then(res=>{
          if(res.success){
            this.outTotal=res.data;
          }
        }).catch(err=>{
          console.log(err)
        })

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


<style rel="stylesheet/scss" lang="scss">
  .outgoing-quiry-container{
    .tableTotal{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
      span{
         font-size: 12px;
         color:#606266;
         &:nth-child(2n-1){
          font-weight: 600;
         }
         &:nth-child(2n){
          padding-right: 20px; 
         }
      }
     
    }
  }
</style>