<template>
  <div class="outgoing-quiry-container">
    <div style="marginBottom:12px">
      <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
      <el-row :gutter="16" >
          <el-form :inline="true" ref="ruleForm" :model="ruleForm"  size="small" label-width="70px"  label-position="left"  class="demo-form-inline">
            <el-col :span="6" style="min-width:300px" >
              <el-form-item label="业务类型"  prop="busiBillType" >
                <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.busiBillType"   placeholder="请选择业务类型">
                  <el-option   v-for="item in mapConfig['getBillType']&&mapConfig['getBillType'].filter(v=>v.value.includes('出库'))" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6"  style="min-width:300px" >
              <el-form-item label="业务单号" prop="billNo">
                <el-input v-model.lazy.trim="ruleForm.billNo" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入业务单号"></el-input>
              </el-form-item>
            </el-col>

          <el-col :span="6" style="min-width:300px">
            <el-form-item label="合同编号" prop="contractNo">
              <el-input v-model.lazy.trim="ruleForm.contractNo" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>

            <el-col :span="6" style="min-width:300px"  >
              <el-form-item label="货主" prop="ownerCode" >
                <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.ownerCode"   placeholder="请选择货主">
                  <el-option   v-for="item in mapConfig['billOwnerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="min-width:300px"  >
              <el-form-item label="客户名称" prop="arrivalName">
                <el-input v-model.lazy.trim="ruleForm.arrivalName"   @keyup.enter.native="submitForm('ruleForm')"  placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="min-width:300px" >
              <el-form-item label="单据状态" prop="billStatus" >
                <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.billStatus"   placeholder="请选择单据状态">
                  <el-option   v-for="item in outBillStatusEnum" :label="item.name"   :key="item.value"  :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="min-width:300px" >
              <el-form-item label="执行状态" prop="billState">
                <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.billState"   placeholder="请选择执行状态">
                  <el-option   v-for="item in outBillStateEnum" :label="item.name"   :key="item.value"  :value="item.value"></el-option>
                </el-select>
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
        <router-link :to="`/outgoing/businessorderadd?type=add&time=${moment().valueOf()}`">
            <el-button type="primary" size="small">新建出库业务单</el-button>
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
    import { outBillList,outBillCheck,outBillDelete,outBillClose } from '@/api/outgoing'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import { indexTableConfig } from './config';
    import { operation } from './conpoments/lib';
    import moment from 'moment';
    import {outBillStatusEnum,outBillStateEnum} from "@/utils/enum.js";
    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
          busiBillType: '',
          busiBillNo: '',
          ownerCode:'',
          arrivalName: '',
          contractNo:'',
          pageNum: 1,
          pageSize:10,
        },
        total:0,
        tableConfig:indexTableConfig,
        loading:false,
        tableData: [{}],
        outBillStatusEnum,
        outBillStateEnum

      }
    },

    created(){
      this.tableConfig.forEach(item=>{
        if(item.useLink){
            item.dom=(row, column, cellValue, index)=>{
              return(
                <div class="tableLinkBox">
                     {  
                        <router-link to={`/outgoing/businessorder-detail?id=${row.id}&busiBillNo=${row.busiBillNo}`}  class="tableLink">查看</router-link>
                     }

                     {  
                        [0,2].includes(row.billStatus)&& 
                        <router-link to={`/outgoing/businessorderadd?type=modify&id=${row.id}&time=${moment().valueOf()}`}  class="tableLink">修改</router-link>
                     }

                     {
                        [1].includes(row.billStatus)&& 
                        <router-link to={`/outgoing/businessorderadd?type=revision&id=${row.id}&time=${moment().valueOf()}`}  class="tableLink">调整</router-link>
                     }

                     { 
                        [1].includes(row.billStatus)&& 
                        <router-link to={`/outgoing/businessorderAddPlanOrder?id=${row.id}&time=${moment().valueOf()}`}  class="tableLink">创建计划单</router-link>
                     }

                     {
                       [0,2].includes(row.billStatus)&& 
                       <span class="tableLink" onClick={this.operation.bind(this,row,'outBillCheck','请输入审核意见 !')}>审核</span>
                     }

                     {
                       [0,2,4].includes(row.billStatus)&& 
                       <span class="tableLink" onClick={this.operation.bind(this,row,'outBillDelete','确定要删除吗?')}>删除</span>
                     }

                     {
                       [0,1,2].includes(row.billStatus)&& 
                       <span class="tableLink" onClick={this.operation.bind(this,row,'outBillClose','确定要关闭吗?')}>关闭</span>
                     }
                     
                    
                </div> 
              )
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
       moment,
       operation,
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
          path:'/outgoing/businessorder',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        this.loading=true;
        let json={};

        for(let i in this.ruleForm){
          if(this.ruleForm[i]!==undefined&&this.ruleForm[i]!==''){
            json[i]=this.ruleForm[i]
          }
        }
        let data={...json}
        outBillList(data).then(res=>{
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

