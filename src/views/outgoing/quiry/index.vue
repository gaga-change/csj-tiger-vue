<template>
  <div class="outgoing-quiry-container">
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="70px">
          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="出库类型"  prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType" style="width:210px"  placeholder="请选择出库类型">
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
            <el-form-item label="计划单号" prop="planCode">
              <el-input v-model.lazy.trim="ruleForm.planCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入计划单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="出库单号" prop="warehouseExeCode">
              <el-input v-model.lazy.trim="ruleForm.warehouseExeCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入出库单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="16" style="minWidth:340px" >
            <el-form-item label="出库日期" prop="time">
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
    import { outOrderSelect} from '@/api/outgoing'
    import { getBillType }  from '@/api/map'
    import BaseTable from '@/components/Table'
    
    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {

            busiBillType: '',
            busiBillNo: '',
            planCode:'',
            warehouseExeCode:'',
            time:'',
            pageNum: 1,
            pageSize:7,
         },
        total:0,
        busiBillTypeConfig:[],
        tableConfig:[],
        rules: {
         
        },
         loading:false,
         tableData: []
      }
    },

    beforeMount(){
      this.tableConfig=[
        { label:'出库单号',prop:'warehouseExeCode',width:'180px',fixed:true,dom:this.formatter('linkTo')},
        { label:'业务单号',prop:'busiBillNo',width:'150px' },
        { label:'货主',prop:'ownerName',width:'180px'},
        { label:'计划单号',prop:'planCode',width:'150px'},
        { label:'出库仓库名称',prop:'warehouseName',width:'180px'},
        { label:'出库仓库编号',prop:'warehouseCode',width:'150px'},
        { label:'是否越库',prop:'isCross',width:'150px',type:'Boolean',},
        { label:'出库日期',prop:'outStoreTime',type:'time',width:'160px'},
        { label:'操作',width:'150px',fixed:'right',dom:this.formatter('linkTo','查看') },
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

    this.getCurrentTableData();
     
    },

    methods: {
        formatter(type,value){
            switch(type){
              case 'linkTo' :return  (row, column, cellValue, index)=>{
                  let query={
                    id:row.id,
                    busiBillTypeConfig:this.busiBillTypeConfig,
                  }
                  let linkTo={
                    path:'/outgoing/quiry-detail',
                    query:{data:JSON.stringify(query)}
                  }
                  return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
              };
            }
       },

      timeChange(value){
        this.ruleForm={...this.ruleForm, time:value};
        this.getCurrentTableData()
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
               let arr=this.ruleForm[i].map(v=>moment(v).format('YYYY-MM-DD hh:mm:ss'));
               if(arr.every(v=>v)){
                 json['outStoreBeginDate']=arr[0];
                 json['outStoreEndDate']=arr[1];
               } 
            } else{
               json[i]=this.ruleForm[i]
            }
            
          }
        }
        let data={...json}
        this.$router.replace({
          path:'/outgoing/quiry',
          query:{data:JSON.stringify(data)}
        })
       outOrderSelect(data).then(res=>{
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

