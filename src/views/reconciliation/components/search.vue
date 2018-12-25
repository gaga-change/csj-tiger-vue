<template lang="html">
   <div class="entryInvoice-form">
  
    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
    
           <el-col :span="6" style="min-width:300px">
             <el-form-item label="交易主体"  label-width="80px" style="width:300px" >
              <el-select v-model="searchForm.ownerCode" 
               @change="submit" 
               size="small"  placeholder="请选择交易主体" prefix-icon="el-icon-search">
                <el-option
                   v-for="item in mapConfig['ownerInfoMap']" 
                   :label="item.value"   
                   :key="item.key"  
                   :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:500px">
            <el-form-item label="对账日期" label-width="80px"  >
              <el-date-picker
                v-model="searchForm.time"
                type="daterange"
                align="right"
                style="width:400px" 
                unlink-panels
                 @change="submit" 
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
import { mapGetters } from 'vuex'
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

  computed: {
    ...mapGetters([
      'mapConfig',
  ])},

  props:{
     searchForm:{
       type:Object,
       default:()=>{}
     },
  },
  
  mounted(){
   console.log({...this.mapConfig})
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
