<template lang="html">
   <div class="entryInvoice-form">
  
    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
      
          <el-col :span="6" style="min-width:300px">
            <el-form-item label="客户名称" label-width="80px"  >
              <el-input type="text" size="small"  @keyup.enter.native="submit"    placeholder="请输入客户名称"    v-model="searchForm.paymenterName" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6"  style="min-width:300px">
            <el-form-item label="订单编号"  label-width="80px" >
              <el-input type="text" size="small"  @keyup.enter.native="submit"  placeholder="请输入订单编号"    v-model="searchForm.busiBillNo" ></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="6"  style="min-width:300px">
            <el-form-item label="合同编号" label-width="80px"  >
              <el-input type="text" size="small"   @keyup.enter.native="submit"  placeholder="请输入合同编号"    v-model="searchForm.contractNo" ></el-input>
            </el-form-item>
          </el-col>

          

          <el-col :span="6"  style="min-width:300px">
             <el-form-item label="业务板块"  label-width="80px"  >
              <el-select v-model="searchForm.busiPlate" 
              size="small"  filterable clearable placeholder="请选择业务板块" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in busiPlateConfig"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
           
          <el-col :span="6" style="min-width:300px"  >
            <el-form-item label="货主"  >
              <el-select  size="small"    v-model="searchForm.ownerCode"   placeholder="请选择货主">
                <el-option   v-for="item in mapConfig['ownerInfoMap']" :label="item.value"   :key="item.key"  :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

            <el-col :span="6"  style="min-width:300px">
             <el-form-item label="款项性质"  label-width="80px"  >
              <el-select v-model="searchForm.moneyState" 
              size="small"  filterable clearable placeholder="请选择款项性质" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in MoneyStateEnum"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
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
import { busiPlateConfig,MoneyStateEnum } from '@/utils/enum'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      busiPlateConfig,
      MoneyStateEnum,
    }
  },

  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
  },
  
  computed: {
    ...mapGetters([
      'mapConfig',
  ])},


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
        json[i]=''
      }
      this.$emit('submit',{...json})
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
