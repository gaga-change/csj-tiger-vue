<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
    <sticky :className="'sub-navbar published'">
      <template >
         <el-button type="success"  size="small" ><router-link :to="{path:'/abnormalGoods/add'}" >创建异常签收商品登记单</router-link></el-button>
      </template>
    </sticky>
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm"  size="small" :rules="rules" ref="ruleForm"   class="demo-form-inline"  label-width="50px"  label-position="left">
            <el-col :span="6"  style="min-width:300px"   >
            <el-form-item label="回单号" prop="signNo">
              <el-input v-model.lazy.trim="ruleForm.signNo" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入回单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6"  style="min-width:300px" >
            <el-form-item label="出库计划单号" label-width="90px" prop="outPlanCode">
              <el-input v-model.lazy.trim="ruleForm.outPlanCode" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入出库计划单号"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6"  style="min-width:300px" >
            <el-form-item label="货主"  prop="ownerCode">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.ownerCode"  placeholder="请选择货主">
                <el-option   v-for="item in mapConfig['ownerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="签收人" prop="signName">
              <el-input v-model.lazy.trim="ruleForm.signName" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入签收人"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6"  >
            <el-form-item label="制单人" prop="createrName">
              <el-input v-model.lazy.trim="ruleForm.createrName" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入制单人"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px" >
            <el-form-item label="单据状态" label-width="60px"  prop="approveStatus">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.approveStatus"   placeholder="请选择审核状态">
                <el-option   v-for="item in mapConfig['getApproveStatusMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12"   >
            <el-form-item label="签收日期" label-width="60px" prop="time">
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
              <el-button type="primary"  size="small"  @click="resetForm('ruleForm')">重置</el-button>
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
    import {signList} from '@/api/reply'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import { tableConfig} from './config';
    import Sticky from '@/components/Sticky'
    export default {
      components: { BaseTable,Sticky },
      data() {
      return {
        ruleForm: {
            signNo:'',
            outPlanCode:'',
            ownerCode:'',
            signName:'',
            createrName:'',
            approveStatus:'',

            time:'',
            pageNum: 1,
            pageSize:10,
         },
        total:0,
        rules: {
         
        },
        loading:false,
        tableData: [],
        tableConfig,
      }
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
      ])
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
          path:'/reply/query',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
        if(this.ruleForm[i]!==undefined&&this.ruleForm[i]!==''){
            if(i==='time'){
               let arr=this.ruleForm[i].map(v=>moment(v).valueOf());
               if(arr.every(v=>v)){
                 json['signBeginDate']=arr[0];
                 json['signEndDate']=arr[1];
               } 
            } else{
               json[i]=this.ruleForm[i]
            }
            
          }
        }
        let data={...json}
       signList(data).then(res=>{
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


<style lang="scss">
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>