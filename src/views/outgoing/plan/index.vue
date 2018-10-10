<template>
  <div class="outgoing-quiry-container">
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="100px">
          <el-col :span="8" style="minWidth:340px">
            <el-form-item label="业务类型"  prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType" style="width:210px"  placeholder="请选择业务类型">
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

          <el-table
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-background="rgba(255, 255, 255, 0.5)"
            :data="tableData"
            border
            style="width: 100%">

            <el-table-column
              v-for="item in tableConfig"
              :formatter="item.formatter"
              :width="item.width"
              :fixed="item.fixed"
              :key="item.lable"
              :prop="item.prop"
              :label="item.label">
            </el-table-column>

          </el-table>

          <el-pagination
            style="marginTop:16px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="ruleForm.pageNum"
            :page-sizes="[7,10, 15, 20, 30]"
            :page-size="ruleForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            v-if="total>7"
            :total="total">
          </el-pagination>

    </el-row>
  </div>
</template>

<script>
    import moment from 'moment';
    import { outPlanSelect} from '@/api/outgoing'
    import {getBillType,outbusibillstate,getIssuedState}  from '@/api/map'
    export default {
      data() {
      return {
        ruleForm: {
          busiBillType: '',
          busiBillNo: '',
          createrName:'',
           planCode:'',
           planWarehouseName:'',
           time:'',
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
      { label:'计划单号',prop:'planCode',width:'150px',fixed:true,formatter:this.formatter(1,'linkTo')},
      { label:'业务单号',prop:'busiBillNo',width:'150px' },
      { label:'货主',prop:'ownerName',width:'180px'},
      { label:'计划出库仓库',prop:'planWarehouseName',width:'180px'},
      { label:'制定时间',prop:'gmtCreate',formatter:this.formatter(1,'time'),width:'160px'},
      { label:'计划出库日期',prop:'planOutTime',formatter:this.formatter(1,'time'),width:'160px'},
      { label:'最晚出库日期',prop:'lastOutTime',formatter:this.formatter(1,'time'),width:'160px'},
      { label:'下推状态',prop:'issuedState',formatter:(row, column, cellValue, index)=>this.formatter(cellValue,'issuedState'),width:'180px',},
      { label:'执行状态',prop:'execStatus',formatter:(row, column, cellValue, index)=>this.formatter(cellValue,'execStatus'),width:'150px'},
      { label:'操作',width:'150px',fixed:'right',formatter:this.formatter(1,'linkTo','查看') },
    ]
    },

     mounted(){
       if(this.$route.query.data){
         this.ruleForm=JSON.parse(this.$route.query.data)
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
       formatter(value,type,text){
         if(value!=undefined){
            switch(type){
              case 'issuedState': return this.issuedStateConfig.find(v=>v.key==value)?this.issuedStateConfig.find(v=>v.key==value).value:value;
              case 'execStatus': return this.execStatuConfig.find(v=>v.key==value)?this.execStatuConfig.find(v=>v.key==value).value:value;
              case 'linkTo' :return  (row, column, cellValue, index)=>{
                  let query={
                    id:row.id,
                    busiBillTypeConfig:this.busiBillTypeConfig,
                    issuedStateConfig:this.issuedStateConfig,
                    execStatuConfig:this.execStatuConfig
                  }
                  let linkTo={
                    path:'/outgoing/plan-detail',
                    query:{data:JSON.stringify(query)}
                  }
                  return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{text?text:cellValue}</router-link>
              };
              case 'time': return (row, column, cellValue, index)=>cellValue?moment(cellValue).format('YYYY-MM-DD hh:mm:ss'):'未记录'
              default:return value
            }
         } else{
           return '无'
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
        this.$router.replace({
          path:'/outgoing/plan',
          query:{data:JSON.stringify(data)}
        })
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

