<template lang="html">
   <div class="entryInvoice-form">
  
    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
      
          <el-col :span="6" style="min-width:300px">
            <el-form-item label="客户名称" label-width="80px" style="width:300px" >
              <el-input type="text" size="small"  @keyup.enter.native="submit"    placeholder="请输入客户名称"    v-model="searchForm.客户名称" ></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="6" style="min-width:300px">
            <el-form-item label="销售合同编号" label-width="90px" style="width:300px" >
              <el-input type="text" size="small"   @keyup.enter.native="submit"  placeholder="请输入合同编号"    v-model="searchForm.销售合同编号" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px">
            <el-form-item label="出库计划单"  label-width="80px" style="width:300px">
              <el-input type="text" size="small"  @keyup.enter.native="submit"  placeholder="请输入计划单号"    v-model="searchForm.出库计划单" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:300px">
             <el-form-item label="单据状态"  label-width="80px" style="width:300px" >
              <el-select v-model="searchForm.单据状态" 
              size="small"  filterable clearable placeholder="请选择单据状态" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          
           <el-col :span="6" style="min-width:500px">
            <el-form-item label="收货日期" label-width="80px"  >
              <el-date-picker
                v-model="searchForm.ReceivTime "
                type="daterange"
                align="right"
                style="width:400px" 
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:500px">
            <el-form-item label="创建日期" label-width="80px"  >
              <el-date-picker
                v-model="searchForm.establishTime"
                type="daterange"
                align="right"
                style="width:400px" 
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label-width="0">
              <el-button type="primary"  size="small"  @click="submit">查询</el-button>
              <el-button type="primary"  size="small" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>  
    </el-form>
   </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    }
  },

  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
  },
  
  mounted(){

  },

  methods:{

    submit(){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
             this.$emit('submit',this.searchForm)
          } else{
            return false;
          }
       })
    },

    resetForm(){
      let data = _.cloneDeep(this.searchForm);
      let json={};
      for(let i in data){
        if(Array.isArray(data[i])){
          json[i]=[]
        } else{
          json[i]=''
        } 
      }
      this.$emit('submit',json)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .entryInvoice-form{
     .el-form-item{
       height:30px;
       margin-bottom: 36px
     }
  }
    .providerList{
      display: flex;
      justify-content: space-between;
      >span{
        &:first-child{
          min-width: 150px;
        }
        &:nth-child(2){
          min-width: 100px;
        }
      }
    }

</style>
