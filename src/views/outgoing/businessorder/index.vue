<template>
  <div class="outgoing-quiry-container">
    <div style="marginBottom:12px">
      <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
      <el-row :gutter="16" >
          <el-form :inline="true" :model="ruleForm"  size="small" label-width="70px"  label-position="left"  :rules="rules" ref="ruleForm"   class="demo-form-inline">
            <el-col :span="6" >
              <el-form-item label="业务类型"   prop="busiBillType">
                <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.busiBillType"   placeholder="请选择业务类型">
                  <el-option   v-for="item in mapConfig['getBillType'].filter(v=>v.value.includes('出库'))" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务单号" prop="busiBillNo">
                <el-input v-model.lazy.trim="ruleForm.busiBillNo" @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入业务单号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" >
                <el-form-item label="单据状态" prop="billState" >
                  <el-select v-model="ruleForm.billState"  @change="submitForm('ruleForm')"    placeholder="请选择单据状态">
                    <el-option  v-for="item in mapConfig['outbusibillstate']"  :key="item.key"  :label="item.value"  :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            <el-col :span="6" >
              <el-form-item label="货主名称" prop="ownerName">
                <el-input v-model.lazy.trim="ruleForm.ownerName"   @keyup.enter.native="submitForm('ruleForm')"   placeholder="请输入货主名称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" >
              <el-form-item label="货主电话" prop="linkTel">
                <el-input v-model.lazy.trim="ruleForm.linkTel"   @keyup.enter.native="submitForm('ruleForm')"  placeholder="请输入货主电话"></el-input>
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
    import { outBillSelect } from '@/api/outgoing'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import { indexTableConfig } from './config';
    
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
          pageSize:10,
        },
        total:0,
        tableConfig:indexTableConfig,
        rules: {
          linkTel: [
            {  required: false, validator:validatorLinkTel,  message: '请输入正确的号码格式', trigger: 'blur' }
          ],
        },
         loading:false,
         tableData: [],
      }
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
        outBillSelect(data).then(res=>{
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


