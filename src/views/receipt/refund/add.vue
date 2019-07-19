<template>
  <div  class="refundDetail">
    <sticky :className="'sub-navbar published'" style="margin-bottom:12px">
      <template >
         <el-button  type="success"
          @click="submitSure('save')"
          v-loading="saveLoding"
          :disabled="saveDisabled"
          size="small">
            {{this.$route.query.modify?'保存修改':'保存'}}
          </el-button>
 
          <el-button 
           type="success"
           v-loading="submitLoding"
           :disabled="submitDisabled"
          @click="submitSure('submit')"
          size="small">
            {{this.$route.query.modify?'提交修改':'提交'}}
          </el-button>
      </template>
    </sticky>

      <el-card class="simpleCard"  shadow="never"  body-style="padding:12px">
        <search-invoice  :searchForm="searchForm" @propChange="propChange" :useRules="true"  :useDisplay="true" :useType="'add'"  @submit="submit"  ref="addSearchFormDom" ></search-invoice>
     </el-card>

  </div> 
</template>

<script>
import Sticky from '@/components/Sticky'
import SearchInvoice from '../components/refundSearch'
import _  from 'lodash';
import { refundSave,refundDetail,refundEdit,refundApplyAmt,refundGetOrder } from '@/api/refund.js'
import moment from 'moment';
import { mapGetters } from 'vuex'
export default {
  name:'refundAdd',
  components: { Sticky,SearchInvoice},
   data() {
    return {
      searchForm:{
        customerCode:'',
        customerName:'',
        ownerCode:'',
        ownerName:'',
        refundType:'',
        refundReason:'',
        moneyState:'',
        sourceOrderNo:'',
        busiBillNo:'',
        contractNo:'',
        busiPlate:'',
        applyRefundAmt:'',
       
      },

      sourceJson:{},
      sumApplyAmt:0,

      saveLoding:false,
      submitLoding:false,
      saveDisabled:false,
      submitDisabled:false,
    }
  },

  mounted(){

    this.navFormat()   
    if(this.$route.query.modify){
      refundDetail({
        refundNo:this.$route.query.refundNo
      }).then(res=>{
        if(res.success){
          for(let i in this.searchForm){
            this.searchForm[i]=res.data[i]
          }
          if(res.data&&res.data.customerCode){
            refundGetOrder({
              customerCode:res.data.customerCode
            }).then(result=>{
              if(result.success){
                let busiBillNoArr=result.data||[];
                this.sourceJson=busiBillNoArr.find(v=>v.busiBillNo===res.data.busiBillNo)||{};
                if(this.sourceJson.sourceOrderNo){
                   this.refundApplyAmtApi(this.sourceJson.sourceOrderNo);
                }
              }
            }).catch(err=>{
              console.error(err)
            }) 
          }
        }
      }).catch(err=>{
          console.error(err)
      })
    }



  },

  updated(){
    this.navFormat()   
  },

  computed: {
    ...mapGetters({
      visitedViews: 'visitedViews',
    }),
  },

  methods:{
    
    navFormat(){
      let dom=[...document.querySelectorAll('span.no-redirect')];
      if(this.$route.query.modify){
        dom.forEach(item=>{
           if(item.innerHTML==='新建退款'){
              item.innerHTML='修改退款单'
           }
        })
      }
    },

    propChange(type,json){
        let searchForm= _.cloneDeep(this.searchForm);
        if(type==='busiBillNoChange'){
          ['sourceOrderNo','contractNo','busiPlate','ownerCode','ownerName','refundType'].forEach(i=>{
              searchForm[i]=json[i]
          })
          this.sourceJson=json;
          //查询已审核退款金额
          refundApplyAmt({
            sourceOrderNo:json.sourceOrderNo
          }).then(res=>{
              if(res.success){
                this.sumApplyAmt=res.data&&res.data.sumApplyAmt||0;
                searchForm['applyRefundAmt']=json['sumRefundAmt']-(json['sumRealAmt']||0)-this.sumApplyAmt;
                if(searchForm['applyRefundAmt']<=0){
                  searchForm['applyRefundAmt']=null
                }
              }
          }).catch(err=>{
            console.error(err)
          })  
        } else if(type==='customerChange'){
           searchForm.customerName=json.entName;
           ['busiBillNo','sourceOrderNo','contractNo','busiPlate','ownerCode','ownerName','refundType'].forEach(i=>{
              searchForm[i]=''
           })
        }
        this.searchForm=searchForm;
        
    },

    refundApplyAmtApi(sourceOrderNo){
      refundApplyAmt({
        sourceOrderNo
      }).then(res=>{
          if(res.success){
            this.sumApplyAmt=res.data&&res.data.sumApplyAmt||0;
            searchForm['applyRefundAmt']=json['sumRefundAmt']-(json['sumRealAmt']||0)-this.sumApplyAmt;
            if(searchForm['applyRefundAmt']<=0){
              searchForm['applyRefundAmt']=null
            }
          }
      }).catch(err=>{
        console.error(err)
      })   
    },

    submitSure(type){
      this.$refs['addSearchFormDom'].submit(type)
    },

    request(value,type){
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.searchForm=value;
      let Api=this.$route.query.modify?refundEdit:refundSave;
      let json= _.cloneDeep(this.searchForm);
      json.refundStatus=type==='submit'?1:0;
      if(this.$route.query.modify){
        json.refundNo=this.$route.query.refundNo;
      }
      if(type==='submit'){
        this.saveDisabled=true;
        this.submitLoding=true;
      } else{
        this.submitDisabled=true;
        this.saveLoding=true;
      }
      Api(json).then(res=>{
        this.saveDisabled=false;
        this.submitLoding=false;
        this.submitDisabled=false;
        this.saveLoding=false;
        if(res.success){
          this.$message({
            type:'success',
            message:'操作成功,1.5s后跳往列表页',
            duration:1500,
            onClose:()=>{
              this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                  this.$router.push({
                    path:'/receipt/refundDetail',
                    query:{refundNo:res.data&&res.data.refundNo||this.$route.query.refundNo,id:res.data&&res.data.id||this.$route.query.id}
                  })
              }).catch(err=>{ 
                console.error(err)
              })  
            }
          })
        } else{
           this.$message.error('操作失败');
        }
      }).catch(err=>{
        this.saveDisabled=false;
        this.submitLoding=false;
        this.submitDisabled=false;
        this.saveLoding=false;
        console.error(err)
        this.$message.error('操作失败');
      })
    },

    submit(value,type){
      value.applyRefundAmt=Number(value.applyRefundAmt)
      const json=this.sourceJson;
      let maxApplyRefundAmt=json['sumRefundAmt']-(json['sumRealAmt']||0)-this.sumApplyAmt;
      if(maxApplyRefundAmt<0){
        maxApplyRefundAmt=0;
      }
      if(isNaN(maxApplyRefundAmt)){
        maxApplyRefundAmt=Infinity;
      } 
      if(value.applyRefundAmt>maxApplyRefundAmt){
        this.$confirm(`您填写金额为${value.applyRefundAmt}元,大于可申请退款金额${maxApplyRefundAmt}元。退货申请单合计可退金额为${json.sumRefundAmt}元，当前已退${json.sumRealAmt||0}元，已审待退金额${this.sumApplyAmt}元，实际可申请金额仅剩${maxApplyRefundAmt}元。确定要继续提交吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(()=>{
           this.request(value,type) 
        }).catch(err=>{
          console.error(err)
        })
      } else{
        this.request(value,type) 
      }
    },


  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .refundDetail{
   .tableTotal{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
      span{
         font-size: 12px;
         color:#606266;
         &:nth-child(2n-1){
          font-weight: 600;
         }
         &:nth-child(2n){
          padding-right: 20px; 
         }
      }
    }
  }
</style>

