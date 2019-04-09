<template lang="html">
  <div class="addCarrier">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
       <template >
           <el-button @click="submit('save')" type="primary">保存</el-button>
       </template>
    </sticky>

    <el-card shadow="hover">
      <el-form ref="searchForm" labelWidth="90px" :model="searchForm">
        <el-row>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="承运商名称:"  prop="consoildatorName"  :rules="[{ required: true, message: '该项为必填'}]" >
                <el-input v-model="searchForm.consoildatorName" @change="querySearchAsync" placeholder="请输入承运商名称" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6" v-if="expressConfig.length">
              <el-form-item label="快递编码:"  prop="companyCode"  :rules="[{ required: true, message: '该项为必填'}]" >
                  <el-select v-model="searchForm.companyCode" filterable  size="small" class="formitem" placeholder="请选择快递编码"  >
                    <el-option 
                      value="" v-if="expressConfig.length" :disabled="true">
                      <div class="providerList"> 
                        <span>快递编码</span> 
                        <span>快递名称</span> 
                      </div>
                    </el-option>
                    <el-option
                      v-for="item in expressConfig" :key="item.companyCode" :label="item.companyName" :value="item.companyCode">
                        <div class="providerList">
                          <span >{{ item.companyCode }}</span>
                          <span >{{ item.companyName }}</span>
                        </div>
                    </el-option>
                  </el-select>  
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="承运商状态" >
                <el-select  v-model="searchForm.consoildatorState" clearable  placeholder="请选择承运商状态：" size="small" class="formitem">
                  <el-option v-for="item in  mapConfig['getConsoildator']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>  

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="结算区分" >
                <el-select  v-model="searchForm.settlementWay" clearable  placeholder="请选择承结算区分：" size="small" class="formitem">
                  <el-option v-for="item in mapConfig['getSettlementType']" :label="item.value" :key="item.key"  :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>  

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="联系电话:"  prop="linkTel"  :rules="[{ required: false, message:'请输入正确格式的手机号',pattern:/^1[34578]\d{9}$/ }]" >
                <el-input v-model="searchForm.linkTel" placeholder="请输入联系电话" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
              <el-form-item label="联系人:">
                <el-input v-model="searchForm.linkUser" placeholder="请输入联系人" size="small" class="formitem"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="合作起始日期"  label-width="100px">
                  <el-date-picker v-model="searchForm.cooperateStartDate" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>

             <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="合同起始日期"  label-width="100px">
                  <el-date-picker v-model="searchForm.contractStartDate" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="合同结束日期"  label-width="100px">
                  <el-date-picker v-model="searchForm.contractEndDate" type="date" placeholder="选择日期"></el-date-picker>
               </el-form-item>
            </el-col>

            <el-col :sm="12" :md="8" :lg="8" :xl="6">
               <el-form-item label="支付约定"  label-width="100px">
                   <el-input type="textarea" :rows="2" placeholder="请输入支付约定内容" v-model="searchForm.payPromise"></el-input>
               </el-form-item>
            </el-col>

      </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { mapGetters } from 'vuex'
import { consoilInfoSave,consoilInfoDetail,consoilInfoUpdate,infoAllCompany} from '@/api/carrier'
export default {
  name:'carrierAdd',
  components: { Sticky},
  data(){
    return {
      searchForm:{

      },
      expressConfig:[]
    }
  },

  computed: {
      ...mapGetters({
        'mapConfig':'mapConfig',
         visitedViews: 'visitedViews'
      })
  },

  mounted(){
   if(this.$route.query.type==='modify'){
      consoilInfoDetail({
        consoildatorCode:this.$route.query.consoildatorCode
      }).then(res=>{
        if(res.success){
          this.searchForm=res.data;
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },

  methods: {
     querySearchAsync(queryString) {
       infoAllCompany({
         companyName:queryString
       }).then(res=>{
          if(res.success){
            this.expressConfig=res.data
          }
       }).catch(err=>{
         console.log(err)
       })
     },
     submit(type){
       const view = this.visitedViews.filter(v => v.path === this.$route.path)
       this.$refs['searchForm'].validate((valid) => {
          if (valid) {
            let api=consoilInfoSave;
            if(this.$route.query.type==='modify'){
              api=consoilInfoUpdate;
              this.searchForm.id=this.$route.query.id
              this.searchForm.consoildatorCode=this.$route.query.consoildatorCode
            } else {
              delete this.searchForm.id
              delete this.searchForm.consoildatorCode
            }
            api(this.searchForm).then(res=>{
              if(res.success){
                this.$message({
                  type:'success', 
                  message:'操作成功,即将跳转到详情页！' ,
                  duration:1500,
                  onClose:()=>{
                    this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                      this.$router.push({
                        path:`/carrier/detail?consoildatorCode=${this.$route.query.consoildatorCode||res.data}`,
                      })
                    }).catch(err=>{
                      console.log(err)
                    })  
                  }
                })
              } else{
                this.$message.error('操作失败')
              }
            }).catch(err=>{
              this.$message.error('操作失败')
              console.log(err)
            })
          }
       })
    },

  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
  .addCarrier{
    .operationitem{
      display: flex;
      justify-content: flex-end;
      margin: 16px 0;
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
