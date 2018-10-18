<template>
  <div class="outgoing-quiry-container">
    <el-row :gutter="16" >
        <el-form :inline="true" :model="ruleForm"  size="small"  :rules="rules" ref="ruleForm"   class="demo-form-inline">
          <el-col :span="6" style="minWidth:310px">
            <el-form-item label="业务类型"   prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.busiBillType" style="width:210px"  placeholder="请选择业务类型">
                <el-option   v-for="item in busiBillTypeConfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="minWidth:310px">
            <el-form-item label="业务单号" prop="busiBillNo">
              <el-input v-model.lazy.trim="ruleForm.busiBillNo" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入业务单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="minWidth:310px">
              <el-form-item label="单据状态" prop="billState" >
                <el-select v-model="ruleForm.billState"  @change="submitForm('ruleForm')"  style="width:210px"  placeholder="请选择单据状态">
                  <el-option  v-for="item in busiBillStateConfig"  :key="item.key"  :label="item.value"   :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          <el-col :span="6" style="minWidth:310px">
            <el-form-item label="货主名称" prop="ownerName">
              <el-input v-model.lazy.trim="ruleForm.ownerName" style="width:210px"  @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="minWidth:310px">
            <el-form-item label="货主电话" prop="linkTel">
              <el-input v-model.lazy.trim="ruleForm.linkTel" style="width:210px"  @keyup.enter.native="submitForm('ruleForm')"  placeholder="请输入货主电话"></el-input>
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
    import {outBillSelect} from '@/api/outgoing'
    import {getBillType,outbusibillstate}  from '@/api/map'
    import BaseTable from '@/components/Table'
    
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
          billState: '',
          ownerName: '',
          linkTel: '',
          pageNum: 1,
          pageSize:7,
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
         tableData: [],
         tableConfig:[],
      }
    },

    beforeMount(){

     this.tableConfig=[
        { label:'业务单号',prop:'busiBillNo',dom:this.formatter('linkTo')},
        { label:'货主编号',prop:'ownerCode'},
        { label:'货主名称',prop:'ownerName'},
        { label:'制单人',prop:'busiBillCreater'},
        { label:'制单时间',prop:'busiBillCreateTime',type:'time'},
        { label:'是否越库',prop:'isCross',type:'Boolean'},
        { label:'操作',dom:this.formatter('linkTo','查看')},
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
      formatter(type,value){
            switch(type){
              case 'linkTo' :return  (row, column, cellValue, index)=>{
                let query={
                  busiBillNo:row.busiBillNo,
                  busiBillTypeConfig:this.busiBillTypeConfig,
                  busiBillStateConfig:this.busiBillStateConfig,
                }
                let linkTo={
                  path:'/outgoing/businessorder-detail',
                  query:{data:JSON.stringify(query)}
                }
                return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
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
       outBillSelect(data).then(res=>{
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
    padding: 12px;
  }
</style>

