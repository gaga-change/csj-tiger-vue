<template>
  <div class="outgoing-quiry-container">
  <div style="marginBottom:12px">
   <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
    <el-row :gutter="16" >
        <el-form :inline="true" :model="ruleForm"  size="small" :rules="rules" ref="ruleForm"   class="demo-form-inline">
          <el-col :span="6" style="min-width:300px"  >
            <el-form-item label="货主"   prop="ownerCode">
              <el-select   @change="submitForm('ruleForm')"  v-model="ruleForm.ownerCode"   placeholder="请选择货主">
                <el-option   v-for="item in mapConfig['ownerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button type="primary"  size="small"  @click="submitForm('ruleForm')">查询</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary"  size="small" @click="resetForm('ruleForm')">重置</el-button>
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
    import { owerInfo} from '@/api/owerinfo'
    import BaseTable from '@/components/Table'
    import { indexTableConfig} from './config';
    import { mapGetters } from 'vuex'
    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
          ownerCode:'',
          pageNum: 1,
          pageSize:10,
        },
        total:0,
        rules: {
        
        },
        loading:false,
        tableData: [],
        tableConfig:indexTableConfig,
      }
    },

    computed: {
      ...mapGetters([
        'mapConfig',
      ])
    },

     mounted(){
       if(this.$route.query.data){
         this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }

       this.getCurrentTableData();
      },

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
          path:'/businessset/owerinfo',
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
       owerInfo(data).then(res=>{
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


