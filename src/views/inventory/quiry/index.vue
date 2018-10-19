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
    import moment from 'moment';
    import { stockSelect} from '@/api/inventory'
    import BaseTable from '@/components/Table'
    import {getBillType,getStockDirectType}  from '@/api/map'
    export default {
      components: { BaseTable },
      data() {
      return {
        ruleForm: {

            skuCode:'',
            skuName:'',
            hasLock:'',
            warehouseCode:'',
            pageNum: 1,
            pageSize:10,
         },
        total:0,
        busiBillTypeConfig:[],
        stockDirectTypeConfig:[],
        tableConfig:[],
        rules: {
         
        },
         loading:false,
         tableData: []
      }
    },

    beforeMount(){
      this.tableConfig=[
        { label:'商品编号',prop:'skuCode',width:'180px',fixed:true,dom:this.formatter('linkTo')},
        { label:'商品名称',prop:'skuName',width:'150px' },
        { label:'仓库名称',prop:'warehouseName',width:'180px'},
        { label:'规格型号',prop:'skuFormat',width:'180px'},
        { label:'品牌',prop:'brandName',width:'180px'},
        { label:'单位',prop:'skuUnitName',width:'150px'},
        { label:'转换比',prop:'skuUnitConvert',width:'150px',},
        { label:'商品分类',prop:'skuType',width:'150px',},
        { label:'成本价',prop:'costPrice',width:'150px',},
        { label:'总数量',prop:'skuQty',width:'150px',},
        { label:'锁定数量',prop:'lockQty',width:'150px',},
        { label:'操作',width:'150px',fixed:'right',dom:this.formatter('linkTo','查看') },
      ]
    },

     mounted(){

       if(this.$route.query.data){
         this.ruleForm={...this.ruleForm,...JSON.parse(this.$route.query.data)}
       }

        getBillType().then(res=>{
         if(res.success){
           this.busiBillTypeConfig=res.data;
         }
       }).catch(err=>{
     
      })

       getStockDirectType().then(res=>{
         if(res.success){
           this.stockDirectTypeConfig=res.data;
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
                    warehouseCode:row.warehouseCode,
                    skuCode:row.skuCode,
                    busiBillTypeConfig:this.busiBillTypeConfig,
                    stockDirectTypeConfig:this.stockDirectTypeConfig
                  }
                  let linkTo={
                    path:'/inventory/quiry-detail',
                    query:{data:JSON.stringify(query)}
                  }
                  return  <router-link  to={linkTo} style={{color:'#3399ea'}}>{value?value:cellValue}</router-link>
              };
              default:return value
            }
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
          this.tableData=data.list;
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

