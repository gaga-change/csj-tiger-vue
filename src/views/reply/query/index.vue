<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm"  size="small" :rules="rules" ref="ruleForm"   class="demo-form-inline"  label-width="70px"  label-position="left">
            <el-col :span="6" >
            <el-form-item label="回单号" prop="signNo">
              <el-input v-model.lazy.trim="ruleForm.signNo" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入回单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="出库计划单号" label-width="100px" prop="outPlanCode">
              <el-input v-model.lazy.trim="ruleForm.outPlanCode" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入出库计划单号"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6" >
            <el-form-item label="货主"  prop="ownerCode">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.ownerCode"  placeholder="请选择货主">
                <el-option   v-for="item in ownerInfoConfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="签收人" prop="signName">
              <el-input v-model.lazy.trim="ruleForm.signName" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入签收人"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="制单人" prop="createrName">
              <el-input v-model.lazy.trim="ruleForm.createrName" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入制单人"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="审核状态"  prop="approveStatus">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.approveStatus"   placeholder="请选择审核状态">
                <el-option   v-for="item in approveStatusConfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="10"  >
            <el-form-item label="签收日期" prop="time">
                 <el-date-picker
                    v-model="ruleForm.time"
                    @change="timeChange"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00']">
                 </el-date-picker>
              </el-form-item>
          </el-col>


          <el-col :span="10"  >
            <el-form-item label="制单时间" prop="makeTime">
                 <el-date-picker
                    v-model="ruleForm.makeTime"
                    @change="makeTimeChange"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00']">
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
    import {ownerInfoMap,getApproveStatusMap} from '@/api/map'
    import BaseTable from '@/components/Table'
    export default {
      components: { BaseTable },
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
            makeTime:'',
            pageNum: 1,
            pageSize:10,
         },
        total:0,
        tableConfig:[],
        rules: {
         
        },
         loading:false,
         tableData: [],
         ownerInfoConfig:[],
         approveStatusConfig:[],
      }
    },

    beforeMount(){
      this.tableConfig=[
        { label:'回单号',fixed:true,prop:'signNo',width:'200px',dom:this.formatter('linkTo')},
        { label:'出库计划单号',prop:'outPlanCode',width:'180px' },
        { label:'回单状态',prop:'approveStatus',width:'180px',dom:(row, column, cellValue, index)=>this.formatter('approveStatus',cellValue)},
        // { label:'签收数量合计',prop:'planCode',width:'150px'},
        // { label:'签收金额合计',prop:'warehouseName',width:'180px'},
        { label:'货主',prop:'ownerName',width:'180px'},
        { label:'发货仓库',prop:'planWarehouseName',width:'180px'},
        { label:'签收人',prop:'signName',width:'180px'},
        { label:'签收人电话',prop:'signTel',width:'180px'},
        { label:'签收日期',prop:'signCreateTime',type:'time',width:'180px'},
        // { label:'附件',prop:'warehouseName',width:'180px'},
        { label:'制单人',prop:'createrName',width:'180px'},
        { label:'制单时间',prop:'gmtCreate',type:'time',width:'180px'},
        { label:'审核人',prop:'approveName',width:'180px'},
        { label:'审核时间',prop:'approveCreateTime',type:'time',width:'180px'},
        { label:'备注',prop:'remarkInfo',width:'180px'},
        { label:'操作',fixed:'right',dom:this.formatter('linkTo','查看')},
      ]
    },

     mounted(){

       if(this.$route.query.data){
          this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }

       ownerInfoMap().then(res=>{
         this.ownerInfoConfig=res.data;
       }).catch(err=>{
   
       })

       getApproveStatusMap().then(res=>{
         this.approveStatusConfig=res.data;
       }).catch(err=>{
  
       })

       this.getCurrentTableData();
     
    },

    methods: {
        formatter(type,value){
            switch(type){
              case 'linkTo' :return  (row, column, cellValue, index)=>{
                  let query={
                    id:row.id,
                    approveStatus:row.approveStatus
                  }
                  let linkTo={
                    path:'/reply/newreceiptorder-detail',
                    query:{data:JSON.stringify(query)}
                  }
                  return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
              };

              case 'approveStatus': return this.approveStatusConfig.find(v=>v.key===value)?this.approveStatusConfig.find(v=>v.key===value).value:value;

             
            }
       },

      timeChange(value){
        this.ruleForm={...this.ruleForm, time:value};
        this.getCurrentTableData()
      },
      makeTimeChange(value){
        this.ruleForm={...this.ruleForm, makeTime:value};
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
            } else if(i==='makeTime'){
               let arr=this.ruleForm[i].map(v=>moment(v).valueOf());
               if(arr.every(v=>v)){
                 json['createBeginDate']=arr[0];
                 json['createEndDate']=arr[1];
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
          this.tableData=data.list;
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


