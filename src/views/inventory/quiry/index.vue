<template>
  <div class="outgoing-quiry-container">
    <div style="marginBottom:12px">
      <el-card class="box-card"  shadow="never" body-style="padding:12px 12px 0" >
      <el-row :gutter="16"  >
          <el-form :inline="true" :model="ruleForm"  size="small"  :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="70px"  label-position="left">

            <el-col :span="6">
              <el-form-item label="商品编号" prop="skuCode">
                <el-input v-model.lazy.trim="ruleForm.skuCode" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入商品编号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="商品名称" prop="skuName">
                <el-input v-model.lazy.trim="ruleForm.skuName" @keyup.enter.native="submitForm('ruleForm')"    placeholder="请输入商品名称"></el-input>
              </el-form-item>
            </el-col>
            
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
    <div style="display: flex;justify-content: flex-end;margin-bottom: 12px;font-size:12px;color:#606266">
        <span v-for="info in infoConfig" :key="info.title" style="margin-right:12px;"><span style="font-weight: 600">{{info.title}}：</span><span>{{(totalInfo[info.prop]||0).toFixed(2)}}</span></span>
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
    import { stockSelect} from '@/api/inventory'
    import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    
    import { indexTableConfig } from './config';
    
    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {
            skuCode:'',
            skuName:'',
            ownerCode:'',
            hasLock:'',
            warehouseCode:'',
            pageNum: 1,
            pageSize:10,
         },
        total:0,
        rules: {
         
        },
        totalInfo:{},
        loading:false,
        tableData: [],
        tableConfig:indexTableConfig,
        providerConfig:[],
        infoConfig:[ 
          { title:'库存总数量合计', prop:'totalInventoryTotal' },
          { title:'库存锁定数量合计', prop:'totalInventoryLockQuantity' },
        ],
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
      ])
    },

    methods: {
      
      propsChange(){
        this.submitForm('ruleForm')
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
          path:'/inventory/quiry',
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
       stockSelect(data).then(res=>{
       if(res.success){
          let data=res.data;
          this.tableData=data.list||[];
          this.totalInfo={...(data.list[0]||{})}
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

