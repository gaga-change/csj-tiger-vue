<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="70px" size="small"  label-position="left">
          <el-col :span="8">
            <el-form-item label="入库类型"  prop="busiBillType">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.busiBillType"   placeholder="请选择入库类型">
                <el-option   v-for="item in busiBillTypeConfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="业务单号" prop="busiBillNo">
              <el-input v-model.lazy.trim="ruleForm.busiBillNo" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入业务单号"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8" >
            <el-form-item label="计划单号" prop="planCode">
              <el-input v-model.lazy.trim="ruleForm.planCode" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入计划单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" >
            <el-form-item label="入库单号" prop="warehouseExeCode">
              <el-input v-model.lazy.trim="ruleForm.warehouseExeCode" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入入库单号"></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="8" >
             <el-form-item label="仓库"  prop="warehouseCode">
              <el-select   @change="submitForm('ruleForm')"   v-model="ruleForm.warehouseCode"   placeholder="请选择入库类型">
                <el-option   v-for="item in warehouseTypeConfig" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="16" >
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
    import {inOrderSelect} from '@/api/warehousing'
    import {getBillType,getWarehouse} from '@/api/map'
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
            warehouseCode:'',
            time:'',
            pageNum: 1,
            pageSize:10,
         },
        total:0,
        busiBillTypeConfig:[],
        warehouseTypeConfig:[],
        tableConfig:[],
        rules: {
         
        },
         loading:false,
         tableData: []
      }
    },

    beforeMount(){
      this.tableConfig=[
        { label:'入库单号',fixed:true,prop:'warehouseExeCode',dom:this.formatter('linkTo')},
        { label:'业务单号',prop:'busiBillNo' },
        { label:'货主',prop:'ownerName'},
        { label:'计划单号',prop:'planCode'},
        { label:'仓库',prop:'warehouseName'},
        { label:'入库日期',prop:'inWarehouseTime',type:'time'},
        { label:'操作',fixed:'right',dom:this.formatter('linkTo','查看') },
      ]
    },

     mounted(){

       if(this.$route.query.data){
          this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }

        getWarehouse().then(res=>{
        if(res.success){
          this.warehouseTypeConfig=res.data;
        } 
       }).catch(err=>{
       })

       getBillType().then(res=>{
         if(res.success){
           this.busiBillTypeConfig=res.data.filter(v=>v.value.includes('入库'))
         } 
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
                    busiBillTypeConfig:this.busiBillTypeConfig,
                  }
                  let linkTo={
                    path:'/warehousing/quiry-detail',
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
          path:'/warehousing/quiry',
          query:{data:JSON.stringify(this.ruleForm)}
        })
        this.loading=true;
        let json={};
        for(let i in this.ruleForm){
        if(this.ruleForm[i]!==undefined&&this.ruleForm[i]!==''){
            if(i==='time'){
               let arr=this.ruleForm[i].map(v=>moment(v).format('YYYY-MM-DD HH:mm:ss'));
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

