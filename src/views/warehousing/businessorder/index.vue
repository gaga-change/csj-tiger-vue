<template>
  <div class="outgoing-quiry-container">
   <div style="marginBottom:12px">
    <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16" >
        <el-form :inline="true" :model="ruleForm" size="small"  :rules="rules" ref="ruleForm"   class="demo-form-inline">
          <el-col :span="6"   style="min-width:300px" >
            <el-form-item label="业务类型"  prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType"   placeholder="请选择业务类型">
                <el-option   v-for="item in mapConfig['getBillType']&&mapConfig['getBillType'].filter(v=>v.value.includes('入库'))" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px" >
            <el-form-item label="业务单号" prop="billNo">
              <el-input v-model.lazy.trim="ruleForm.billNo" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入业务单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px" >
            <el-form-item label="合同编号" prop="contractNo">
              <el-input v-model.lazy.trim="ruleForm.contractNo" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px"  >
            <el-form-item label="货主"   prop="ownerCode">
              <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.ownerCode"   placeholder="请选择货主">
                <el-option   v-for="item in mapConfig['billOwnerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


           <el-col :span="6"   style="min-width:300px" >
            <el-form-item label="供应商名称" label-width="72px" prop="providerName">
              <el-input v-model.lazy.trim="ruleForm.providerName" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入供应商名称"></el-input>
            </el-form-item>
          </el-col>

         
          <el-col :span="6">
            <el-form-item label="货主电话" prop="linkTel">
              <el-input v-model.lazy.trim="ruleForm.linkTel" @keyup.enter.native="submitForm('ruleForm')"  placeholder="请输入货主电话"></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="6" style="min-width:300px"  >
            <el-form-item label="单据状态" >
              <el-select   v-model="ruleForm.billStatus"  placeholder="请选择单据状态">
                <el-option   v-for="item in misWarehousingBillStatusEnum" :label="item.name"   :key="item.value"  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px"  >
            <el-form-item label="执行状态" >
              <el-select   v-model="ruleForm.billState"  placeholder="请选择执行状态">
                <el-option   v-for="item in misWarehousingBillStateEnum" :label="item.name"   :key="item.value"  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

           <el-col :span="16">
            <el-form-item label="制单日期" prop="time">
                 <el-date-picker
                    v-model="ruleForm.time"
                    @change="timeChange"
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

    <div class="operationitem">
      <router-link :to="`/warehousing/businessorderadd?type=add&time=${moment().valueOf()}`">
          <el-button type="primary" size="small">新建入库业务单</el-button>
      </router-link>
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
    import {inBillSelect,inBillUpdateStatus} from '@/api/warehousing'
    import  { misWarehousingBillStatusEnum,misWarehousingBillStateEnum } from "@/utils/enum.js";
    import {getBillType,getExecState} from '@/api/map'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import {indexTableConfig } from './config';
    
    const validatorLinkTel = (rule, value, callback) => {
      if (value==undefined||value==''||/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确格式的号码'));
      }
    };

    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
          busiBillType: '',
          busiBillNo: '',
          ownerCode:'',
          providerName:'',
          contractNo:'',
          linkTel: '',
          pageNum: 1,
          pageSize:10,
          time:''
        },
        total:0,
        rules: {
          linkTel: [
            {  required: false, validator:validatorLinkTel,  message: '请输入正确的号码格式', trigger: 'blur' }
          ],
        },
        loading:false,
        tableData: [],
        tableConfig:indexTableConfig,
        misWarehousingBillStatusEnum,
        misWarehousingBillStateEnum

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

    created(){
      this.tableConfig.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {
                        <router-link to={`/warehousing/businessorder-detail?id=${row.id}`}  class="tableLink">查看</router-link>
                     }

                     { 
                       [0,2].includes(row.billStatus)&&
                       <span class="tableLink"  onClick={this.operation.bind(this,'examine',row)}>审核</span>
                     }

                     {
                       [0,2].includes(row.billStatus)&&
                       <span class="tableLink" onClick={this.operation.bind(this,'close',row)}>关闭</span>
                     }


                     {
                       [0,2].includes(row.billStatus)&&
                       <span class="tableLink" onClick={this.operation.bind(this,'delete',row)}>删除</span>
                     }

                     {  
                        [0,2].includes(row.billStatus)&&
                        <router-link to={`/warehousing/businessorderadd?id=${row.id}&time=${moment().valueOf()}`}  class="tableLink">修改</router-link>
                     }

                     { 
                        [1].includes(row.billStatus)&&
                        <router-link to={`/warehousing/warehousingAddPlanOrder?id=${row.id}&time=${moment().valueOf()}`}  class="tableLink">创建计划单</router-link>
                     }
                </div> 
              )
            }
        }
      })
    },


    methods: {
      moment, 
      operation(type,row){
        let tip='';
        let statusFlag=null;
        if(type==='examine'){
          tip='确定要审核通过吗?'
          statusFlag=1
        } else if(type==='close'){
          tip='确定要关闭吗?';
          statusFlag=4
        } else if(type==='delete'){
          tip='确定要删除吗?';
          statusFlag=9
        }

        //请求配置
        let submit=()=>inBillUpdateStatus({
           inWarehouseBillId:row.id,
           statusFlag,
        }).then(res=>{
          if(res.success){
            this.$message({type:'success', message:'操作成功' });
            this.getCurrentTableData()
          } else{
            this.$message.error('操作失败')
          }
        }).catch(err=>{
          this.$message.error('操作失败')
          console.log(err)
        })

        //对话配置
        this.$confirm(tip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          submit()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },

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
          path:'/warehousing/businessorder',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
          if(this.ruleForm[i]!==undefined&&this.ruleForm[i]!==''){
            if(i==='time'){
               let arr=this.ruleForm[i].map(v=>moment(v).valueOf());
               if(arr.every(v=>v)&&arr.length>1){
                 json['createTimeFrom']=arr[0];
                 json['createTimeTo']=arr[1];
               } 
            } else{
               json[i]=this.ruleForm[i]
            }
          }
        }
        let data={...json}
       inBillSelect(data).then(res=>{
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
    .tableLinkBox{
       display: flex;
      .tableLink{
        cursor: pointer;
        color:#3399ea;
        margin-right:12px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
    .operationitem{
      display: flex;
      justify-content: flex-end;
      margin: 16px 0;
    }
</style>

