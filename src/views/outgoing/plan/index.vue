<template>
  <div class="outgoing-quiry-container">
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="100px">
          <el-col :span="8" style="minWidth:340px">
            <el-form-item label="出库类型"  prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType" style="width:210px"  placeholder="请选择出库类型">
                <el-option   v-for="item in busiBillTypeConfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:340px">
            <el-form-item label="业务单号" prop="busiBillNo">
              <el-input v-model.lazy.trim="ruleForm.busiBillNo" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入业务单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:340px">
            <el-form-item label="制单人" prop="createrName">
              <el-input v-model.lazy.trim="ruleForm.createrName" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入制单人"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8" style="minWidth:340px">
            <el-form-item label="计划单号" prop="planCode">
              <el-input v-model.lazy.trim="ruleForm.planCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入计划单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:340px">
            <el-form-item label="计划仓库" prop="planWarehouseName">
              <el-input v-model.lazy.trim="ruleForm.planWarehouseName" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请选择计划仓库"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:340px">
            <el-form-item label="下推状态"  prop="issuedState">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.issuedState" style="width:210px"  placeholder="请选择下推状态">
                <el-option   v-for="item in issuedStateConfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:340px">
            <el-form-item label="执行状态"  prop="execStatus">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.execStatus" style="width:210px"  placeholder="请选择执行状态">
                <el-option   v-for="item in execStatuConfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
 

          <el-col :span="16" style="minWidth:340px" >
            <el-form-item label="计划出库日期" prop="time">
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


          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" size="medium"  @click="submitForm('ruleForm')">查询</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="medium" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
      </el-form>
        <base-table 
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
          :loading="loading"
          :config="tableConfig"  
          :total="total" 
          :maxTotal="7"
          :pageSize="ruleForm.pageSize"
          :currentPage="ruleForm.pageNum"
          :tableData="tableData"/>
    </el-row>
  </div>
</template>

<script>
    import moment from 'moment';
    import { outPlanSelect} from '@/api/outgoing'
    import {getBillType,outbusibillstate,getIssuedState}  from '@/api/map'
    import BaseTable from '@/components/Table'

    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
          busiBillType: '',
          busiBillNo: '',
          createrName:'',
           planCode:'',
           planWarehouseName:'',
           time:[],
           issuedState:'',
           execStatus: '',
           pageNum: 1,
           pageSize:7,
        },
        total:0,
        busiBillTypeConfig:[],
        issuedStateConfig:[],
        execStatuConfig:[],
        
        tableConfig:[],
        rules: {
         
        },
         loading:false,
         tableData: []
      }
    },

    beforeMount(){
      this.tableConfig=[
      { label:'计划单号',prop:'planCode',width:'150px',fixed:true,dom:this.formatter('linkTo') },
      { label:'业务单号',prop:'busiBillNo',width:'150px' },
      { label:'货主',prop:'ownerName',width:'180px'},
      { label:'计划出库仓库',prop:'planWarehouseName',width:'180px'},
      { label:'制定时间',prop:'gmtCreate',type:'time',width:'160px'},
      { label:'计划出库日期',prop:'planOutTime',type:'time',width:'160px'},
      { label:'最晚出库日期',prop:'lastOutTime',type:'time',width:'160px'},
      { label:'下推状态',prop:'issuedState',dom:(row, column, cellValue, index)=>this.formatter('issuedState',cellValue),width:'180px',},
      { label:'执行状态',prop:'execStatus',dom:(row, column, cellValue, index)=>this.formatter('execStatus',cellValue),width:'150px'},
      { label:'操作',width:'150px',fixed:'right',dom:this.formatter('linkTo','查看') },
    ]
    },

     mounted(){
       if(this.$route.query.data){
         this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }

       getBillType().then(res=>{
         if(res.success){
           this.busiBillTypeConfig=res.data.filter(v=>v.value.includes('出库'));
         } else{
            this.$message({
              showClose: true,
              message: '数据请求出错',
              type: 'error'
            });
         }
       }).catch(err=>{
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
      })


      getIssuedState().then(res=>{
         if(res.success){
           this.issuedStateConfig=res.data;
         } else{
            this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
         }
      }).catch(err=>{
        this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
      })


      outbusibillstate().then(res=>{
        if(res.success){
          let data=res.data;
          const arr=[];
          for(let i in data){
              arr.push({key:i,value:data[i]})
          }
          this.execStatuConfig=arr;
        } else{
            this.$message({
              showClose: true,
              message: '数据请求出错',
              type: 'error'
            });
        }
      }).catch(err=>{
         this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
      })

      this.getCurrentTableData();
     
    },

    methods: {
       formatter(type,value){
            switch(type){
              case 'issuedState': return this.issuedStateConfig.find(v=>v.key==value)?this.issuedStateConfig.find(v=>v.key==value).value:value;
              case 'execStatus': return this.execStatuConfig.find(v=>v.key==value)?this.execStatuConfig.find(v=>v.key==value).value:value;
              case 'linkTo' :return  (row, column, cellValue, index)=>{
                 
                 let query={
                    id:row.id,
                    busiBillTypeConfig:this.busiBillTypeConfig,
                    issuedStateConfig:this.issuedStateConfig,
                    execStatuConfig:this.execStatuConfig,
                    row:row
                  };

                  let linkTo={
                    path:'/outgoing/plan-detail',
                    query:{data:JSON.stringify(query)}
                  }
                  
                  let operationLink={
                    path:'/reply/newreceiptorder',
                    query:{data:JSON.stringify({id:row.id})}
                  }

                  if(value){
                    if(row.isCreate){
                      return <div>
                       <router-link  to={linkTo} style={{color:'#3399ea',margin:'0 10px'}}>{value}</router-link>
                       <router-link  to={operationLink} style={{color:'#3399ea'}}>创建回单</router-link>
                     </div>
                    } else{
                       return <div>
                       <router-link  to={linkTo} style={{color:'#3399ea',margin:'0 10px'}}>{value}</router-link>
                     </div>
                    }
                  
                  } else {
                     return  <div>
                       <router-link  to={linkTo} style={{color:'#3399ea'}}>{cellValue}</router-link>
                   </div>
                  }
              };
            }
       },
       submitForm(formName) {
        this.ruleForm={...this.ruleForm,pageSize:7,pageNum:1}
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
        this.ruleForm={...this.ruleForm,pageSize:7,pageNum:1}
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
          if(this.ruleForm[i]!=undefined&&this.ruleForm[i]!=''){
            if(i=='time'){
               let arr=this.ruleForm[i].map(v=>moment(v).valueOf());
               if(arr.every(v=>v)){
                 json['planTimeFrom']=arr[0];
                 json['planTimeTo']=arr[1];
               } 
            } else{
               json[i]=this.ruleForm[i]
            }
            
          }
        }
        let data={...json}
       outPlanSelect(data).then(res=>{
       if(res.success){
          let data=res.data;
          this.tableData=data.list;
          this.total=data.total;
       } else{
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
       }
        this.loading=false;

     }).catch(err=>{
          this.$message({
            showClose: true,
            message: '数据请求出错',
            type: 'error'
          });
           this.loading=false;
        })
      }
    }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .outgoing-quiry-container{
    padding: 24px;
  }
</style>

