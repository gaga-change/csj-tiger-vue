<template>
  <div class="outgoing-quiry-container">
    <el-row :gutter="16" >
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline">
          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="业务类型"  prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType" style="width:210px"  placeholder="请选择业务类型">
                <el-option   v-for="item in busiBillTypeConfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="业务单号" prop="busiBillNo">
              <el-input v-model.lazy.trim="ruleForm.busiBillNo" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入业务单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:310px">
              <el-form-item label="单据状态" prop="billState" >
                <el-select v-model="ruleForm.billState"  @change="submitForm('ruleForm')"  style="width:210px"  placeholder="请选择单据状态">
                  <el-option  v-for="item in busiBillStateConfig"  :key="item.key"  :label="item.value"   :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>


          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="货主名称" prop="ownerName">
              <el-input v-model.lazy.trim="ruleForm.ownerName" style="width:210px"  @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="16" style="minWidth:340px" >
            <el-form-item label="制单日期" prop="time">
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

          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="货主电话" prop="linkTel">
              <el-input v-model.lazy.trim="ruleForm.linkTel" style="width:210px"  @keyup.enter.native="submitForm('ruleForm')"  placeholder="请输入货主电话"></el-input>
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
    import {inBillSelect} from '@/api/warehousing'
    import {getBillType,outbusibillstate} from '@/api/map'
    
    const validatorLinkTel = (rule, value, callback) => {
      if (value==undefined||value==''||/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确格式的号码'));
      }
    };

    export default {
      data() {
      return {
        ruleForm: {
          busiBillType: '',
          busiBillNo: '',
          billState: '',
          ownerName: '',
          linkTel: '',
          pageNum: 1,
          pageSize:7,
          time:''
        },
        total:0,
        busiBillTypeConfig:[],
        busiBillStateConfig:[],
        tableConfig:[],
        rules: {
          linkTel: [
            {  required: false, validator:validatorLinkTel,  message: '请输入正确的号码格式', trigger: 'blur' }
          ],
        },
         loading:false,
         tableData: []
      }
    },

    beforeMount(){
      this.tableConfig=[
      { label:'业务单号',prop:'busiBillNo',formatter:this.formatter(1,'linkTo') },
      { label:'货主编号',prop:'ownerCode'},
      { label:'货主名称',prop:'ownerName'},
      { label:'制单人',prop:'createrName'},
      { label:'制单时间',prop:'gmtCreate',formatter:this.formatter(1,'time')},
      { label:'状态',prop:'billState',formatter:(row, column, cellValue, index)=>this.formatter(cellValue,'billState')},
      { label:'操作',formatter:this.formatter(1,'linkTo','查看')},
     ]
    },

     mounted(){
       if(this.$route.query.data){
         this.ruleForm=JSON.parse(this.$route.query.data)
       }
       getBillType().then(res=>{
         if(res.success){
           this.busiBillTypeConfig=res.data.filter(v=>v.value.includes('入库'))
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
         this.busiBillStateConfig=arr;
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
     }),

    this.getCurrentTableData();
     
    },

    methods: { 
      timeChange(value){
        this.ruleForm={...this.ruleForm, time:value};
        this.getCurrentTableData()
      },

      formatter(value,type,text){
         if(value!=undefined){
            switch(type){
              case 'Boolean': return (row, column, cellValue, index)=>Number(cellValue)?'是':'否';
              case 'billState': return this.busiBillStateConfig.find(v=>v.key==value)?this.busiBillStateConfig.find(v=>v.key==value).value:value;
              case 'linkTo' :return  (row, column, cellValue, index)=>{
                let query={
                  id:row.id,
                  busiBillTypeConfig:this.busiBillTypeConfig,
                  busiBillStateConfig:this.busiBillStateConfig,
                }
                let linkTo={
                  path:'/warehousing/businessorder-detail',
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
                 json['createTimeFrom']=arr[0];
                 json['createTimeTo']=arr[1];
               } 
            } else{
               json[i]=this.ruleForm[i]
            }
          }
        }
        let data={...json}
        this.$router.replace({
          path:'/warehousing/businessorder',
          query:{data:JSON.stringify(data)}
        })
       inBillSelect(data).then(res=>{
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

