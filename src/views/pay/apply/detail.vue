<template>
  <div>
  <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
    <template v-if="dataSuccess">
       <template  v-if="cardData.paymentStatus == 0">
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
            @click="linkToCreate">编辑
        </el-button>
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
            @click="saveOrder">提交
        </el-button>
      </template> 
      <template  v-else-if="cardData.paymentStatus == 9">
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
            @click="linkToCreate">编辑
        </el-button>
      </template> 
      <template v-else-if="$route.query.from=='needWork'">
         <template v-if="/(1|2|3)/.test(cardData.paymentStatus)">
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentCheck')" v-loading="buttonDisabled" type="primary"
            @click="Modify('payCheck')">审核
          </el-button>
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentCheck')" v-loading="buttonDisabled" type="primary"
              @click="Modify('payReject')">驳回
          </el-button>  
        </template>
      </template>
      <el-tag v-else>
        暂无操作
      </el-tag>
    </template>	
     
      <el-tag v-else>
        暂无操作
      </el-tag>
  </sticky>
   <invoice-detail :cardData="cardData" 
    :tableData="tableData"  :name="name">
    <el-card class="box-card" v-loading="loading"  element-loading-text="加载中..." shadow="never" style="margin-bottom:14px" v-if="dataSuccess">
   <el-row>
     <el-col  class="card-list"     :span="24" >
        <span class="card-title">付款相关信息</span> : 
      
        <div class="card-text" style="display:inline-block">
          <router-link :to="{ path: `/purchasecontract/purchasecontractdetail/${this.cardData.contractNo}/${this.cardData.taskId}` }" style="color:#3399ea">
                  合同信息查看
          </router-link>&nbsp;&nbsp;
          <router-link :to="{ path: `/payment/apply/inOrder`, query:{id:this.cardData.id,busiBillNo:this.cardData.busiBillNo}}" style="color:#3399ea">
                  订单入库信息查看
          </router-link>&nbsp;&nbsp;
          <router-link :to="{ path: `/payment/apply/invoice`,query:{id:this.cardData.id,busiBillNo:this.cardData.busiBillNo} }" style="color:#3399ea">
                  订单发票信息查看
          </router-link>
        </div>
      </el-col>
   </el-row>
  </el-card>   
  <template v-if="cardData.paymentStatus>4">
    <item-title text="实付信息"/>
    <item-card :config="cardConfig" :loading="loading"   :cardData="cardData"  />
  </template>

    </invoice-detail>
    </div>
</template>

<script>
    import moment from 'moment';
    import { getPaymentListAndDetail,paymentSubmit, paymentRecord } from '@/api/pay'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { realPayInfoConfig } from '../components/config';
    import { MoneyStateEnum, MoneyTypeEnum } from '@/utils/enum'
    const name = "apply"
   
    let searchForm = {
      busiBillNo:'',
      contractNo:''
    }
    
    import InvoiceDetail from '../components/detail'
    import Modify from '../components/modify'
    export default {
      components: { InvoiceDetail, Sticky },
      data() {
        return {
          total:0,
          rules: {},
          loading:false,
          buttonDisabled:false,
          tableData: [],
          cardConfig:[],
          dataSuccess:false,
          cardData:{},
          editable:true,//区分提交和编辑
          name,
          searchForm,
          realPayInfoConfig,
        }
      },

     created(){
       let cardConfig =[], paymentInfoConfigFilter=[];
      realPayInfoConfig.map(item=>{
        if(item.prop=='realPay'){
          item.dom = this.formatter('realPay')
        }
        cardConfig.push(item)
      })
      this.cardConfig = cardConfig
      this.getCurrentTableData();  
      
    },

    computed: {
    ...mapGetters([
      'mapConfig',
      'userInfo'
    ])},

    methods: {
      Modify,
        formatter(type,value){
            switch(type){
              case 'realPay': return  (row, column, cellValue, index)=>{
                
                return ((row.realPaymentAmt||0)-(row.realInterestAmt||0)).toFixed(2)
              };
              default:return value
            }
         
       },
      linkToCreate(){
          this.$confirm('去新建付款单页编辑?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
                this.$router.push({
                path: '/payment/newPayment',
                query: {
                  id: this.cardData.id,
                  from:'rebuild'
                }
              })
            }).catch(err => {
              console.log(err)
            })
      },
      saveOrder(){
        
        let params = {
          id:this.cardData.id,
          operator:this.userInfo.id,
          operatorName:this.userInfo.truename,
          fromSystemCode: 'CSJSCM',
          flag:false
        }
          paymentSubmit(params).then(res=>{
            console.log(res);
            if(res.success){
               this.$message({type:'success',message:'提交成功', })
            }else{
              this.$message({type:'success',message:'提交失败', })
            }
            this.needfresh()
          }).catch(err=>{
            console.log(err);
             this.$message({type:'success',message:'提交失败', })
             this.needfresh()
          })
      },
      needfresh() {
        this.buttonDisabled = false
        this.getCurrentTableData()
      },
    
      getCurrentTableData(){
        this.loading=true;
         let params = {}
        if(this.$route.query.id){
          params.id = this.$route.query.id
        }
         if(this.$route.query.processInstanceId){
          params.processInstanceId = this.$route.query.processInstanceId
        }
        getPaymentListAndDetail(params).then(res=>{
          if(res.success){
           this.dataSuccess = true
              this.cardData = res.list[0]
            
              let fileInfos = res.list[0].filePathList || []
              
              fileInfos.map(item=>{
                if(item.filePath){
                  item.path = item.filePath//itemCard组件，文件下载的参数为path
                  item.name = item.fileName
                }
                
              })
              this.cardData.filePathList = fileInfos
              
              if(this.cardData.id&&this.cardData.processInstanceId){
                paymentRecord({id:this.cardData.id,processInstanceId:this.cardData.processInstanceId}).then(res=>{
                      this.tableData = res.data            
                })
              }else{
                this.tableData = []
              }
              
          }else{
            this.dataSuccess = false
          }
          this.loading=false;
          this.buttonDisabled = false
        }).catch(err=>{
          this.dataSuccess = false
            this.loading=false;
            this.buttonDisabled = false
        })
        
       
      
      }
    }
 }
</script>


