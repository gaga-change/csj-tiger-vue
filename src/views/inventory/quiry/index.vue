<template>
  <div class="outgoing-quiry-container">
    <el-row :gutter="16"  >
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm"   class="demo-form-inline" label-width="70px">

          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="商品编号" prop="skuCode">
              <el-input v-model.lazy.trim="ruleForm.skuCode" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入商品编号"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8" style="minWidth:310px">
            <el-form-item label="商品名称" prop="skuName">
              <el-input v-model.lazy.trim="ruleForm.skuName" @keyup.enter.native="submitForm('ruleForm')"  style="width:210px"  placeholder="请输入商品名称"></el-input>
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
    import { stockSelect} from '@/api/inventory'
    


    export default {
      data() {
      return {
        ruleForm: {

            skuCode:'',
            skuName:'',
            hasLock:'',
            warehouseCode:'',


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
        { label:'商品编号',prop:'skuCode',width:'180px',fixed:true,formatter:this.formatter(1,'linkTo')},
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
        { label:'操作',width:'150px',fixed:'right',formatter:this.formatter(1,'linkTo','查看') },
      ]
    },

     mounted(){

       if(this.$route.query.data){
         this.ruleForm=JSON.parse(this.$route.query.data)
       }

     this.getCurrentTableData();
     
    },

    methods: {
        formatter(value,type,text){
         if(value!=undefined){
            switch(type){
              case 'Boolean': return (row, column, cellValue, index)=>Number(cellValue)?'是':'否';
              case 'linkTo' :return  (row, column, cellValue, index)=>{
                  let query={
                    warehouseCode:row.warehouseCode,
                    skuCode:row.skuCode,
                    busiBillTypeConfig:this.busiBillTypeConfig,
                  }
                  let linkTo={
                    path:'/inventory/quiry-detail',
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
            json[i]=this.ruleForm[i]
          }
        }
        let data={...json}
        this.$router.replace({
          path:'/inventory/quiry',
          query:{data:JSON.stringify(data)}
        })
       stockSelect(data).then(res=>{
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

