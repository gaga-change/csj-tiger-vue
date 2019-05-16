<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="70px" size="small"  label-position="left">
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


          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="计划单号" prop="planCode">
              <el-input v-model.lazy.trim="ruleForm.planCode" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入计划单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="入库单号" prop="warehouseExeCode">
              <el-input v-model.lazy.trim="ruleForm.warehouseExeCode" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入入库单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="合同编号" prop="contractNo">
              <el-input v-model.lazy.trim="ruleForm.contractNo" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>

           <el-col :sm="12" :md="8" :lg="8" :xl="6" >
             <el-form-item label="仓库" label-width="40px"  prop="warehouseCode">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.warehouseCode"   placeholder="请选择仓库">
                <el-option   v-for="(item, index) in mapConfig['getWarehouse']" :label="item.value"   :key="item.key+item.value+index"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6" >
            <el-form-item label="供应商名称" prop="providerName"   label-width="78px">
              <el-input v-model.lazy.trim="ruleForm.providerName" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入供应商名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="货主"   prop="ownerCode">
              <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.ownerCode" clearable  placeholder="请选择货主">
                <el-option   v-for="item in mapConfig['billOwnerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        <el-col :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="业务板块"  prop="busiPlate">
            <el-select v-model="ruleForm.busiPlate"  @change="submitForm('ruleForm')" placeholder="请选择业务板块">
              <el-option
                v-for="item in busiPlateConfig"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

          <el-col :span="12" >
            <el-form-item label="入库日期" prop="time">
                 <el-date-picker
                    v-model="ruleForm.time"
                    @change="timeChange"
                    :picker-options="$pickerOptions"
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
      <a :href="`/webApi/in/order/export?${stringify(this.linkData)}`" >
        <el-button type="primary" size="small" >导出Excel</el-button>
      </a>
  </div>

  <!-- <div class="tableTotal" v-if="inTotal&&inTotal.totInAmt!==undefined&&inTotal.totInQty!==undefined">
      <span>入库总金额</span> : <span>{{inTotal&&inTotal.totInAmt&&Number(inTotal.totInAmt).toFixed(2)}}</span>
      <span>入库总数量</span> : <span>{{inTotal&&inTotal.totInQty&&Number(inTotal.totInQty).toFixed(2)}}</span>
  </div> -->

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
    import {inOrderSelect,selectSumNo} from '@/api/warehousing'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import { indexTableConfig } from './config';
    import {stringify} from 'qs';
    import {busiPlateConfig} from '@/utils/enum'

    export default {
      name: 'warehousing-quiry-index',
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
            busiBillType: '',
            busiBillNo: '',
            planCode:'',
            warehouseExeCode:'',
            warehouseName:'',
            ownerCode:'',
            warehouseCode:'',
            providerName:'',
            contractNo:'',
            busiPlate:'',
            time:'',
            pageNum: 1,
            pageSize:10,
         },
        total:0,
        rules: {

        },
        loading:false,
        tableData: [],
        linkData:'',
        inTotal:{},
        busiPlateConfig
      }
    },

    computed: {
      tableConfig() {
        const config = [...indexTableConfig]
        const oprateColumn = config.find(item => item.prop === 'oprate') || {}
        oprateColumn.dom = (row, column, cellValue, index) => {
          let view = <router-link to={{path:'/warehousing/quiry-detail',query:{warehouseExeCode: row.warehouseExeCode} }} style={{color:'#3399ea'}}>查看</router-link>
          if (row.settleUnit === 2) {
            view = <span><router-link to={{path:'/warehousing/quiry-detail',query:{warehouseExeCode: row.warehouseExeCode} }} style={{color:'#3399ea'}}>查看</router-link>
              <router-link to={{path:'/warehousing/quiry-detail',query:{warehouseExeCode: row.warehouseExeCode, settleUnit: 2} }} style={{color:'#3399ea',marginLeft:'10px'}}>维护重量</router-link></span>
          }
          return view
        }
        return config
      },
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

        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
        if(this.ruleForm[i]!==undefined&&this.ruleForm[i]!==''){
            if(i==='time'){
              const timeArr = this.ruleForm[i] || []
               let arr=timeArr.map(v=>moment(v).format('YYYY-MM-DD'));
              if(arr.every(v=>v)&&arr.length>1){
                 json['inStoreBeginDate']=arr[0];
                 json['inStoreEndDate']=arr[1];
               }
            } else{
               json[i]=this.ruleForm[i]
            }
          }
        }

        let data={...json}
        this.linkData=data;

       // selectSumNo(data).then(res=>{
       //    if(res.success){
       //      this.inTotal=res.data;
       //    }
       //  }).catch(err=>{
       //    console.log(err)
       //  })


       inOrderSelect(data).then(res=>{
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
