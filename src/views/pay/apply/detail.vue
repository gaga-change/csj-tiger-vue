<template>
  <div>
  <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
    
    <template v-if="dataSuccess">
      <template  v-if="(userInfo.roles.includes('superAdmin')||userInfo.roles.includes('buyer_cars')||userInfo.roles.includes('buyer_steel'))&&cardData.paymentStatus == 0">
        <!-- 采购员 -->
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="linkToCreate">编辑
          </el-button>
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="saveOrder">提交
          </el-button>
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="deleteIt">删除
          </el-button>
        </template> 
         <template  v-else-if="(userInfo.roles.includes('superAdmin')||userInfo.roles.includes('buyer_cars')||userInfo.roles.includes('buyer_steel'))&&cardData.paymentStatus == 9">
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="linkToCreate">编辑
          </el-button>
            <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="saveOrder">提交
          </el-button>
           <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="deleteIt">删除
          </el-button>
      </template>	

      <template v-else-if="cardData.moneyState==0">
        <!-- 货款，且走工作流 -->
        <template v-if="(userInfo.roles.includes('superAdmin')||userInfo.roles.includes('buyer_leader'))&&cardData.paymentStatus == 1">
          <!-- 采购负责人审核 -->
         <check-button :buttonDisabled='buttonDisabled' :Modify="Modify"></check-button>
        </template>

         <template v-else-if="(userInfo.roles.includes('superAdmin')||userInfo.roles.includes('finance_leader')||userInfo.roles.includes('finance_TIGER'))&&cardData.paymentStatus==2">
           <!-- 财务 -->
          <check-button :buttonDisabled='buttonDisabled' :Modify="Modify"></check-button>
        </template>

         <template v-else-if="(userInfo.roles.includes('superAdmin')||userInfo.roles.includes('leader_TIGER'))&&cardData.paymentStatus==3">
           <!-- 财务 -->
         <check-button :buttonDisabled='buttonDisabled' :Modify="Modify"></check-button>
        </template>
        
        <el-tag v-else>
        暂无操作
        </el-tag>
        
      </template> 
      <template v-else-if="cardData.moneyState==2">
        <!-- 服务费 -->

         <template v-if="(userInfo.roles.includes('superAdmin')||userInfo.roles.includes('finance_leader')||userInfo.roles.includes('finance_TIGER'))&&cardData.paymentStatus==1">
           <!-- 财务 -->
          <check-button :buttonDisabled='buttonDisabled' :Modify="Modify"></check-button>
        </template>

        
        <el-tag v-else>
        暂无操作
        </el-tag>
        
      </template>
      <el-tag v-else>
        暂无操作
      </el-tag>
    </template>	
     
      <el-tag v-else>
        暂无操作
      </el-tag>
  </sticky>
   <invoice-detail :cardData="cardData" :payment-info-config="paymentInfoConfig"
    :tableData="tableData"  :name="name">
    <template v-if="cardData.moneyState == 0">
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
    </template>
    <template v-else>
       <el-card class="box-card" v-loading="loading"  element-loading-text="加载中..." shadow="never" style="margin-bottom:10px">
        <el-row>
          <el-col  class="card-list" :span="18" >
              <span class="card-title">对账区间</span> ：
              <a class="card-text" @click="showDetail" style="color:#409EFF" v-if="dataSuccess">
                 {{formatTime(cardData.startTime)}} 至 {{formatTime(cardData.endTime)}}
              </a>
            </el-col>
        </el-row>
      </el-card>   
       <!-- 对账单 -->
      <pay-bill :serviceCharge="paybillData.serviceCharge" :table-data="paybillData.tableData" ref="payBills" :dialog-visible-pay="dialogVisiblePay" :time-usable="timeUsable" :pay-duration-start="payDurationStart" :pay-duration-end="payDurationEnd">
      </pay-bill>
    </template>
   

    </invoice-detail>
    </div>
</template>

<script>
    import moment from 'moment';
    import { getPaymentListAndDetail,paymentSubmit, paymentRecord, dropPayment, infoInvoiceAmmount, getContractFiles } from '@/api/pay'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { realPayInfoConfig, paymentInfoConfig } from '../components/config';
    import { MoneyStateEnum, MoneyTypeEnum } from '@/utils/enum'
    const name = "apply"
   
    let searchForm = {
      busiBillNo:'',
      contractNo:''
    }
    
    import InvoiceDetail from '../components/detail'
    import Modify from '../components/modify'
    import CheckButton from '../components/checkButton'
    import PayBill from '../components/PayBill'

    export default {
      components: { InvoiceDetail, Sticky, CheckButton, PayBill },
      data() {
        return {
          total:0,
          rules: {},
          loading:false,
          buttonDisabled:false,
          tableData: [],
          cardConfig:realPayInfoConfig,
          paymentInfoConfig:[],
          dataSuccess:false,
          cardData:{},
          editable:true,//区分提交和编辑
          name,
          searchForm,

          //对账单相关参数
          paybillData:{},
          disableButton:false,
          dialogVisiblePay:false,
          payDurationStart:'',
          payDurationEnd:'',
          timeUsable:{
            start:true,
            end:true
          },
        }
      },

     created(){
 
      this.getCurrentTableData();  
      
    },
   
    computed: {
    ...mapGetters([
      'mapConfig',
      'userInfo'
    ])},

    methods: {
      Modify,
      formatTime(value){
        return moment(value).format('YYYY-MM-DD')
      },
      showDetail(){
        //显示对账区间

        this.loading = true
        this.payDurationStart = this.cardData.startTime
        this.payDurationEnd = this.cardData.endTime
        infoInvoiceAmmount({startTime:this.cardData.startTime,endTime:this.cardData.endTime}).then(res=>{
            
            if(res.success){
              var tableData = res.data&&res.data.items||[]

              this.paybillData.tableData = tableData.filter(item => item&&item.makeDate)
              
              this.paybillData.serviceCharge = res.data.serviceCharge 
              this.dialogVisiblePay = true
              this.$refs.payBills.dialogVisPay = true
              
              
            }else{
              this.$message({type:'info',message:'请稍后请求'})
              this.paybillData.tableData = []
              this.paybillData.serviceCharge = ''
            }
            this.loading = false
        }).catch(err=>{
            this.loading = false
            this.$message({type:'error',message:'接口请求失败，请重试'})
        })
      },
      isActive(route) {
        return route.path === this.$route.path//是否当前页
      },
      deleteIt(){
        this.$confirm('要删除该条数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
        
          dropPayment(this.$route.query.id).then(res => {
            if(res.success){
              this.$message({
                type: 'success',
                message: '删除成功!',
                duration:1500,
                onClose:()=>{
                    var a = this.$store.state.tagsView.visitedViews
                    var view = {};
                    a.map(item => {if(item.name === 'applyDetail'){view=item}})
                    this.$message({
                          type: 'success',
                          message: '删除成功!',
                          onClose:()=>{
                            this.$store.dispatch('delVisitedViews', view).then((views) => {
                                if (this.isActive(view)) {
                                  const latestView = views.slice(-1)[0]
                                  if (latestView) {
                                    this.$router.push(latestView)
                                  } else {
                                    this.$router.push('/')
                                  }
                                }
                            })
                          }
                        })
                }
              })
              
            }else{
              this.$message({
                type: 'warn',
                message: '删除失败!'
              })
              this.needfresh()
            } 
            
          }).catch(err => {
            this.$message({
              type: 'warn',
              message: '删除失败!'
            })
            this.needfresh()
          })
        }).catch(()=>{
          // this.$message({
          //     type: 'info',
          //     message: '删除取消'
          //   })
            this.needfresh()
        })
      },
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
      //刷新页面
      needfresh() {
        this.buttonDisabled = false
        this.getCurrentTableData()
      },
      //获得当前数据
      getCurrentTableData(){
        this.loading=true;
         let params = {isRegisterflag:true}
        if(this.$route.query.id){
          params.id = this.$route.query.id
        }
         if(this.$route.query.processInstanceId){
          params.processInstanceId = this.$route.query.processInstanceId
        }
        getPaymentListAndDetail(params).then(res=>{
          if(res.success&&res.list&&res.list.length>0){
           this.dataSuccess = true
              this.cardData = res.list[0]
            
              let fileInfos = res.list[0].filePathList || []
              fileInfos.map(item=>{
                if(item.filePath){
                  item.path = item.filePath//itemCard组件，文件下载的参数为path
                  item.name = item.fileName
                }
                
              })
              let contractFilePathList = []
               getContractFiles({contractNo:res.list[0].contractNo}).then(res => {
                  if(res.success){
                    contractFilePathList = res.data
                    contractFilePathList.map(item=>{
                      if(item.filePath){
                        item.path = item.filePath//itemCard组件，文件下载的参数为path
                        item.name = item.fileName
                      }
                      
                    })
                    // this.cardData.contractFilePathList = contractFilePathList
                    this.$set(this.cardData,'contractFilePathList',contractFilePathList)
                    
                  }
                })
               var detailConfig = []
              if(this.cardData.moneyState==0){
                detailConfig = paymentInfoConfig.filter(config=>
                  config.paytype.includes('goods')
                )
              }else if(this.cardData.moneyState==2){
                detailConfig = paymentInfoConfig.filter(config=>
                  config.paytype.includes('service')
                )
              }
              this.paymentInfoConfig = [...detailConfig]
              
              
              // this.cardData.filePathList = fileInfos
               this.$set(this.cardData,'filePathList',fileInfos)
              if(this.cardData.id){
                paymentRecord({id:this.cardData.id}).then(res=>{
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
        
       
      
      },
    }
 }
</script>


