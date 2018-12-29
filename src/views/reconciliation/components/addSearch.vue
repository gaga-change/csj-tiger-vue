<template lang="html">
   <div class="entryInvoice-form">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success"size="small" :loading="buttonLoding"  v-if="this.$route.query.id===undefined"  @click="submit('submit')">生成对账单 </el-button>
         <el-button  type="success"size="small" :loading="buttonLoding" v-if="this.$route.query.id!==undefined"  @click="submit('submit')">确认修改 </el-button>
      </template>
    </sticky>

    <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
      <el-form  :model="searchForm"  ref="searchForm" label-width="70px" label-position="left">
  
          <el-col :span="12" style="min-width:300px" >
            <el-form-item
             label="对账日期" 
             prop="time"
             :rules="[
               { required: true, message: '该项为必填'},
             ]">
              <el-date-picker
                v-model="searchForm.time"
                type="daterange"
                unlink-panels
                size="small" 
                style="width:400px"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width:330px">
             <el-form-item label="交易主体" 
             prop="ownerCode"
             :rules="[
               { required: true, message: '该项为必填'},
             ]">
              <el-select v-model="searchForm.ownerCode" 
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

          <el-col :span="6" style="min-width:300px">
            <el-form-item label="服务百分比" 
             label-width="90px" 
             prop="serviceRate"
             :rules="[
               { required: true, message: '该项为必填'},
             ]">
               <el-input type="text" size="small"
                 placeholder="输入服务百分比" v-model.number="searchForm.serviceRate" >
                 <template  slot="append">
                     <span>%</span>
                  </template>
               </el-input>
            </el-form-item>
          </el-col> 


        </el-row>  
    </el-form>
   </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sticky from '@/components/Sticky'
export default {
  components: { Sticky},
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

     buttonLoding:{
       type:Boolean,
       default:false
     }
  },

  mounted(){
    this.fomatDom()
  },

  updated(){
    this.fomatDom()
  },
  

  methods:{

    fomatDom(){
      let dom=document.querySelectorAll('.sub-navbar >div');
      [...dom].forEach(item=>{
        if(item.innerHTML==='sticky'){
          item.innerHTML= '<button type="button" class="el-button  el-button--small" style="margin-left: 10px;"><span>暂无操作</span></button>'
        }
      })
    },
  
    submit(type){
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
             let ownerName=this.mapConfig['ownerInfoMap'].find(v=>v.key===this.searchForm.ownerCode).value
             this.$emit('submit',{...this.searchForm,ownerName},type)
          } else{
            return false;
          }
       })
    },
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
