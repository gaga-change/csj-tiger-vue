<template>
<div>
  <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
      <template  v-if="cardData.paymentStatus == 4">
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
            @click="saveOrder(0,'ruleForm')">保存
        </el-button>
         <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
            @click="saveOrder(1,'ruleForm')">提交
        </el-button>
      </template> 
       <!-- <template  v-else-if="cardData.paymentStatus == 5">
         <template v-if="!editable">
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="()=>{this.editable = true;this.buttonDisabled=false}">编辑
          </el-button>
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="submitOrder">提交
          </el-button>
        </template>
          <template  v-else>
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="saveOrder(0,'ruleForm')">保存
          </el-button>
          <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentCreate')" v-loading="buttonDisabled"
              @click="saveOrder(1,'ruleForm')">提交
          </el-button>
        </template> 
      </template>  -->
      <template v-else-if="$route.query.from=='needWork'&&cardData.paymentStatus==5">
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentCheck')" v-loading="buttonDisabled" type="primary"
            @click="Modify('payCheck')">审核
          </el-button>
          <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentCheck')" v-loading="buttonDisabled" type="primary"
              @click="Modify('payReject')">驳回
          </el-button>  
      </template>
      <el-tag v-else>
        暂无操作
      </el-tag>
  </sticky>

   <invoice-detail :cardData="cardData"
    :tableData="tableData"  :name="name">
    <item-title text="实付信息"/>
    <template v-if="(cardData.paymentStatus == 4||editable)&&$route.query.from=='needWork'">
      
        <el-card class="simpleCard" shadow="never" body-style="padding:12px">
          <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="80px" label-postion="left">
             <el-row :gutter="10">
             <el-col :span="6">
              <el-form-item label="付款日期" prop="realPaymentDate">
                <el-date-picker
                  v-model="ruleForm.realPaymentDate"
                  type="date"
                  size="small"
                  placeholder="付款日期"
                  :editable="false">
                </el-date-picker>
              </el-form-item>
            </el-col>
               <el-col :span="6">
              <el-form-item label="结算方式" prop="paymentMode">
                <el-select v-model="ruleForm.paymentMode" size="small" filterable clearable placeholder="请选择结算方式" prefix-icon="el-icon-search">
                  <el-option
                    v-for="item in PaymentModeEnumFilter"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="货款金额" >
                <el-input type="text" v-model="ruleForm.applyPaymentAmt" disabled size="small" placeholder="货款金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="贴息">
                <el-input v-model="ruleForm.realInterestAmt" size="small" ></el-input>
              </el-form-item>
            </el-col>
         
            <el-col :span="6">
              <el-form-item label="实付金额" >
                <el-input type="text" size="small" disabled v-model="ruleForm.realPaymentAmt" ></el-input>
              </el-form-item>
            </el-col>
            </el-row>
          <el-row :gutter="10">
            <el-col :span="6" >
              <el-form-item label="备注">
                <el-input type="textarea" size="small" v-model="ruleForm.remarkInfo"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="6" >
              <el-form-item label="交易流水号">
                <el-input type="text" size="small" v-model="ruleForm.paymentRecordNo" ></el-input>
              </el-form-item>
            </el-col>
            </el-row>
          </el-form>
        </el-card>
      
    </template>
    <template v-else>
      <item-card :config="cardConfig" :loading="loading"   :cardData="cardData"  />
    </template>
 
    </invoice-detail>
    </div>
</template>

<script>
    import moment from 'moment';
    import { getPaymentListAndDetail, payRegister,payRegisterCommit, paymentRecord } from '@/api/pay'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { realPayInfoConfig } from '../components/config';
    import { MoneyStateEnum, MoneyTypeEnum,PaymentModeEnum } from '@/utils/enum'
    const name = "apply"
   
    let searchForm = {
      busiBillNo:'',
      contractNo:''
    }
    let PaymentModeEnumFilter = PaymentModeEnum.filter(item=>{
     return item.value<4
    })
    import InvoiceDetail from '../components/detail'
    import Modify from '../components/modify'
    export default {
      components: { InvoiceDetail, Sticky },
      data() {
        return {
          total:0,
          rules: {
             realPaymentDate: [
            { required: true, message: '请选择付款日期', trigger: 'change' }
            ],
            paymentMode: [
            { required: true, message: '请选择结算方式', trigger: 'change' }
            ],
          },
          loading:false,
          buttonDisabled:false,
          tableData: [],
          cardConfig:[],
          cardData:{},
          ruleForm:{
            realPaymentDate:'',//付款日期
            paymentMode:'',//结算方式,
            applyPaymentAmt:'',//货款金额
            realPaymentAmt:'',//实付金额
            realInterestAmt:'',//贴息
            remarkInfo:'',//备注
            paymentRecordNo:'',//交易流水号
          },
          editable:false,//区分提交和编辑
          name,
          searchForm,
          realPayInfoConfig,
          PaymentModeEnumFilter,
        }
      },

     created(){
       let cardConfig =[],paymentInfoConfigFilter=[];
      realPayInfoConfig.map(item=>{
        if(item.prop=='realPay'){
          item.userFormatter = this.formatter('realPay')
        }
        cardConfig.push(item)
      })
      this.cardConfig = cardConfig
    
      this.getCurrentTableData();  
      
    },
    watch:{
      ruleForm:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
              // this.ruleForm.realInterestAmt = (val.realInterestAmt-0).toFixed(1)
              val.realPaymentAmt = (val.applyPaymentAmt - val.realInterestAmt)||0
            },
            deep:true
        }
    },
    computed: {
    ...mapGetters([
      'mapConfig',
      'userInfo'
    ])},

    methods: {
      Modify,
      editReal(){
        this.editable = true
      },
      formatter(type,value){
            switch(type){
              case 'realPay': return  (row, column, cellValue, index)=>{
                
                return ((row.realPaymentAmt||0)-(row.realInterestAmt||0)).toFixed(2)
              };
              default:return value
            }
         
      },
      needfresh() {
        this.buttonDisabled = false
        this.editable = false
        this.getCurrentTableData()
      },
      saveOrder(type,formName){
      
         this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {...this.ruleForm}
            params.id = this.$route.query.id
            params.taskId=this.$route.query.taskId
            params.taskName=this.$route.query.taskName
            params.operator=this.userInfo.id
            params.operatorName=this.userInfo.truename
            params.fromSystemCode='CSJSCM'
            params.applyNo = this.cardData.applyNo
            if(type){
              params.flag = false
            }else{
              params.flag = true
            }
            this.buttonDisabled=true
            payRegister(params).then(res=>{
              console.log(res);
              
              this.needfresh()
            })
          } else {
            return false;
          }
        });
      
      },
      submitOrder(){
        this.buttonDisabled = true
           let params = {...this.ruleForm}
            params.id = this.$route.query.id
            params.taskId=this.$route.query.taskId
            params.taskName=this.$route.query.taskName
            params.operator=this.userInfo.id
            params.operatorName=this.userInfo.truename
            params.fromSystemCode='CSJSCM'
            params.applyNo = this.cardData.applyNo
            payRegisterCommit(params).then(res=>{
              this.needfresh()
            }).catch(err=>{
              this.needfresh();
            })
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
        
           
            this.cardData = res.list[0]
            let fileInfos = res.list[0].filePath || []
            fileInfos.map(item=>{
                if(item.url){
                  item.path = item.url//itemCard组件，文件下载的参数为path
                }        
            })
            console.log(6333);
            let { realPaymentDate,
            paymentMode,//结算方式,
            applyPaymentAmt,//货款金额
            realPaymentAmt,//实付金额
            realInterestAmt,//贴息
            remarkInfo,//备注
            paymentRecordNo,//交易流水号
            } = this.cardData
console.log(this.ruleForm,123123);
            this.ruleForm = { realPaymentDate,
            paymentMode,//结算方式,
            applyPaymentAmt,//货款金额
            realPaymentAmt,//实付金额
            realInterestAmt,//贴息
            remarkInfo,//备注
            paymentRecordNo,//交易流水号
            }
            
              this.cardData.filePath   = fileInfos
              if(this.cardData.id&&this.cardData.processInstanceId){
                paymentRecord({id:this.cardData.id,processInstanceId:this.cardData.processInstanceId}).then(res=>{
                      this.tableData = res.data            
                })
              }else{
                this.tableData = []
              }
          }
          this.loading=false;
          this.buttonDisabled = false
        }).catch(err=>{
            this.loading=false;
            this.buttonDisabled = false
        })
      }
    }
 }
</script>


