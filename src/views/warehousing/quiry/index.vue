<template>
  <div class="outgoing-quiry-container">
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="70px">
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
            <el-form-item label="计划单号" prop="planCode">
              <el-input v-model.lazy.trim="ruleForm.planCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入计划单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="入库单号" prop="warehouseExeCode">
              <el-input v-model.lazy.trim="ruleForm.warehouseExeCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入入库单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="仓库"  prop="warehouseCode">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.warehouseCode" style="width:210px"  placeholder="请选择仓库">
                <el-option   v-for="item in warehouseNameComfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="16" style="minWidth:340px" >
            <el-form-item label="入库日期" prop="time">
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
    import {inOrderSelect} from '@/api/warehousing'
     import {getBillType,getWarehouseType} from '@/api/map'
    export default {
      data() {
      return {
        ruleForm: {

            busiBillType: '',
            busiBillNo: '',
            planCode:'',
            warehouseExeCode:'',
            warehouseCode:'',
            time:'',
            pageNum: 1,
            pageSize:7,
         },
        total:0,
        busiBillTypeConfig:[],
        warehouseNameComfig:[],
        tableConfig:[],
        rules: {
         
        },
         loading:false,
         tableData: []
      }
    },

    beforeMount(){
      this.tableConfig=[
        { label:'入库单号',prop:'warehouseExeCode',width:'200px',formatter:this.formatter(1,'linkTo')},
        { label:'业务单号',prop:'busiBillNo',width:'200px' },
        { label:'货主',prop:'ownerName',width:'200px'},
        { label:'计划单号',prop:'planCode',width:'200px'},
        { label:'仓库',prop:'warehouseName',width:'200px'},
        { label:'入库日期',prop:'inWarehouseTime',formatter:this.formatter(1,'time'),width:'200px'},
        { label:'操作',width:'150px',fixed:'right',formatter:this.formatter(1,'linkTo','查看') },
      ]
    },

     mounted(){

       if(this.$route.query.data){
         this.ruleForm=JSON.parse(this.$route.query.data)
       }

       getWarehouseType().then(res=>{
          if(res.success){
           this.warehouseNameComfig=res.data||[];
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

    this.getCurrentTableData();
     
    },

    methods: {
        formatter(value,type,text){
         if(value!=undefined){
            switch(type){
              case 'Boolean': return (row, column, cellValue, index)=>Number(cellValue)?'是':'否';
              case 'linkTo' :return  (row, column, cellValue, index)=>{
                  let query={
                    id:row.id,
                    busiBillTypeConfig:this.busiBillTypeConfig,
                  }
                  let linkTo={
                    path:'/warehousing/quiry-detail',
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
                 json['inStoreBeginDate']=arr[0];
                 json['inStoreEndDate']=arr[1];
               } 
            } else{
               json[i]=this.ruleForm[i]
            }
            
          }
        }
        let data={...json}
        this.$router.replace({
          path:'/warehousing/quiry',
          query:{data:JSON.stringify(data)}
        })
       inOrderSelect(data).then(res=>{
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

