<template>
<div>
  <sticky :className="'sub-navbar published'" style="margin-bottom: 20px">
    <template v-if="dataSuccess">
      <template v-if="(userInfo.roles.includes('superAdmin')||userInfo.roles.includes('cashier'))">
        <!-- 出纳操作 -->
         <template  v-if="(cardData.moneyState==2&&cardData.paymentStatus==3)||(cardData.moneyState==0&&cardData.paymentStatus==4)">
           <el-button @click="editReal" v-if="!editable" size="small"  type="primary">创建付款登记</el-button>
           <template v-else>
              <!-- <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentRegister')" v-loading="buttonDisabled"
              @click="saveOrder(0,'ruleForm')">保存
              </el-button> -->
              <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentRegister')" v-loading="buttonDisabled"
                  @click="saveOrder(1,'ruleForm')">提交
              </el-button>
           </template>
          
        </template>  
        <template v-else-if="cardData.registerStatus == 0||cardData.registerStatus == 9">
          <el-button @click="editReal" v-if="!editable" size="small"  type="primary">编辑</el-button>
           <template v-else>
              <!-- <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentRegister')" v-loading="buttonDisabled"
              @click="saveOrder(0,'ruleForm')">保存
              </el-button> -->
              <el-button  style="margin-left: 10px;" size="small"  type="primary" :disabled="buttonDisabled||!$haspermission('paymentRegister')" v-loading="buttonDisabled"
                  @click="saveOrder(1,'ruleForm')">提交
            </el-button>
           </template>
           
        </template> 
        <!-- $route.query.from=='needWork'&& 之前走工作流审核 -->
        <template v-else-if="cardData.registerStatus==5">
            <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentCheck')" v-loading="buttonDisabled" type="primary"
              @click="Modify('payCheckRegister')">审核
            </el-button>
            <el-button  style="margin-left: 10px;" size="small"  :disabled="buttonDisabled||!$haspermission('paymentReject')" v-loading="buttonDisabled" type="primary"
                @click="Modify('payRejectSingleRegister')">驳回
            </el-button>  
        </template>
        <!-- <el-tag v-else>
          暂无操作
        </el-tag> -->
        <el-button  style="margin-left: 10px;" size="small"  type="primary" 
              @click="makePrint">打印
          </el-button>
        </template>
      </template>
     
      <template v-else>
        <el-tag >
        暂无操作
      </el-tag>
      </template>
  </sticky>

   <invoice-detail :cardData="cardData" id="print"
    :tableData="tableData"  :name="name" :payment-info-config="paymentInfoConfig">
    <template v-if="cardData.moneyState == 2">
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
      <pay-bill :serviceCharge="paybillData.serviceCharge" :table-data="paybillData.tableData" ref="payBills" :dialog-visible-pay="dialogVisiblePay" :pay-duration-start="payDurationStart" :pay-duration-end="payDurationEnd" :time-usable="timeUsable">
      </pay-bill>
    </template>
    <template v-if="dataSuccess">
    <item-title text="实付信息"/>
    <!-- (cardData.moneyState==2&&cardData.paymentStatus==3)||(cardData.moneyState==0&&cardData.paymentStatus==4)||(cardData.registerStatus == 0||cardData.registerStatus == 9||editable)) -->
      <template v-if="editable&&(userInfo.roles.includes('cashier')||userInfo.roles.includes('superAdmin'))">
        
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
                    :disabled="!editable">
                  </el-date-picker>
                </el-form-item>
              </el-col>
                <el-col :span="6">
                <el-form-item label="结算方式" prop="paymentMode">
                  <el-select v-model="ruleForm.paymentMode" size="small" filterable clearable placeholder="请选择结算方式" prefix-icon="el-icon-search" :disabled="!editable">
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
                <el-form-item label="付款金额" prop="applyPaymentAmt">
                  <el-input type="number" v-model="ruleForm.applyPaymentAmt" :disabled='!editable||cardData.moneyType!=3' size="small" placeholder="付款金额"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="贴息" prop="realInterestAmt">
                  <el-input v-model="ruleForm.realInterestAmt" size="small" type="number" :disabled="!editable"></el-input>
                </el-form-item>
              </el-col>
          
              <el-col :span="6">
                <el-form-item label="实付金额" prop='realPaymentAmt'>
                  <el-input type="text" size="small" disabled v-model="ruleForm.realPaymentAmt" ></el-input>
                </el-form-item>
              </el-col>
              </el-row>
            <el-row :gutter="10">
              <el-col :span="6" >
                <el-form-item label="备注">
                  <el-input type="textarea" size="small" v-model="ruleForm.remarkInfo" :disabled="!editable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item label="交易流水号">
                  <el-input type="text" size="small" v-model="ruleForm.paymentRecordNo" :disabled="!editable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="附件">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="importFile">
                    {{filePathList.length ? '继续上传' : '上传附件'}}
                  </el-button>
                    <span v-show="filePathList">{{filePathList.length}}个文件</span>
                  
                </el-form-item>
              </el-col>
              </el-row>
            </el-form>
          </el-card>
        
      </template>
      <template v-else>
        <item-card :config="cardConfig" :loading="loading"   :cardData="cardData"  />
      </template>
    </template>
    </invoice-detail>
    <!-- 上传弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      center
      width="50%">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="uploadUrl"
        multiple
        :file-list = "fileNew"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        name="myFile"
        :on-change="handelUploadChange"
        :on-success="handleUploadSuccess"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-show="uploadButtonVisible">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">文件最大不能超过5M。 </div>
      </el-upload>
    </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment';
    import { getPaymentListAndDetail, payRegister,payRegisterCommit, paymentRecord, infoInvoiceAmmount, getPaymentRegisterData } from '@/api/pay'
    // import BaseTable from '@/components/Table'
    import { mapGetters } from 'vuex'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { realPayInfoConfig, paymentInfoConfig } from '../components/config';
    import { MoneyReg } from '@/utils/validator'
    import { MakePrint } from '@/utils/index'
    import { MoneyStateEnum, MoneyTypeEnum,PaymentModeEnum } from '@/utils/enum'
    import PayBill from '../components/PayBill'

    
    const name = "apply"
   
    let searchForm = {
      busiBillNo:'',
      contractNo:''
    }
    let PaymentModeEnumFilter = PaymentModeEnum.filter(item=>{
     return item.value<4
    })
     var checkAmt = (rule, value, callback) => {
        
        if (!Number(value)) {
          return callback(new Error('请输入付款金额'))
        }
        if (!MoneyReg.test(value)) {
          return callback(new Error('付款金额最多两位小数'))
        }
        callback()
      }
       var checkInAmt = (rule, value, callback) => {
        if(value == 0){

        }else{
          if (!Number(value)) {
            return callback(new Error('请输入贴息'))
          }
          if (!MoneyReg.test(value)) {
            return callback(new Error('贴息最多两位小数'))
          }
        }
        
        callback()
      }
    const returnPayReg = { realPaymentDate: [
            { required: true, message: '请选择付款日期', trigger: 'change' }
            ],
            paymentMode: [
            { required: true, message: '请选择结算方式', trigger: 'change' }
            ],realPaymentAmt: [
            { required: true, }
            ],
            applyPaymentAmt: [
              { validator: checkAmt, required: true, trigger: 'blur' }
            ],
            realInterestAmt: [
              { validator: checkInAmt, required: true, trigger: 'blur' }
            ]
    }
    const rulesReg =  {
            realPaymentDate: [
            { required: true, message: '请选择付款日期', trigger: 'change' }
            ],
            paymentMode: [
            { required: true, message: '请选择结算方式', trigger: 'change' }
            ],
          }
    import InvoiceDetail from '../components/detail'
    import Modify from '../components/modify'
    export default {
      components: { InvoiceDetail, Sticky, PayBill },
      data() {
       
        return {
          total:0,
          rules:rulesReg,
          loading:false,
          buttonDisabled:false,
          tableData: [],
          cardConfig:realPayInfoConfig,
          paymentInfoConfig:[],
          cardData:{},
          ruleForm:{
            realPaymentDate:'',//付款日期
            paymentMode:'',//结算方式,
            applyPaymentAmt:'',//付款金额
            realPaymentAmt:'',//实付金额
            realInterestAmt:'',//贴息
            remarkInfo:'',//备注
            paymentRecordNo:'',//交易流水号
          },
          editable:false,//区分提交和编辑
          name,
          searchForm,
          PaymentModeEnumFilter,
          dataSuccess:false,
           //上传文件相关
          dialogVisible: false,
          uploadUrl: '/webApi/fileupload/filetoserver', // 上传路径
          filePathList: [],
          uploadButtonVisible: false,
          fileNew:[],

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
    watch:{
      ruleForm:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
              // this.ruleForm.realInterestAmt = (val.realInterestAmt-0).toFixed(1)   
              val.realPaymentAmt = ((val.applyPaymentAmt - val.realInterestAmt)||0).toFixed(2)
            },
            deep:true
      },
       fileNew(){
        const url = []
        this.fileNew.map(
          file => {
            
            if (file.response) {
              url.push({ fileName: file.name, filePath: file.response.data })
            } else if (file.name && file.url) {
              url.push({ fileName: file.name, filePath: file.url })
            }
          }
        )
        
        this.filePathList = url

      },
      
    },
    computed: {
    ...mapGetters([
      'mapConfig',
      'userInfo'
    ])},

    methods: {
      Modify,
       beforeUpload(file) {
        // 如果上传文件大于5M
        if (file.size > 5 * 1024 * 1024) {
          this.$message.error('上传附件不能大于5M')
          return false
        }
      },
      handleRemove(file, fileList) {
        this.fileNew = fileList
      },
       importFile() {
        this.dialogVisible = true
      },
      submitUpload() {       
        this.$refs.upload.submit()
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择上传 1 个文件`)
      },
      handelUploadChange(file, fileList) {

        // 选择文件时显示上传按钮
        if (Object.keys(file).length && fileList.length) {
          this.uploadButtonVisible = true
        } else {
          this.uploadButtonVisible = false
        }
      },
      handleUploadSuccess(res, file, fileList) {
        if (res.code === '200') {
          this.fileNew=fileList   
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
        
      },
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
            }
            this.loading = false
        }).catch(err=>{
            this.loading = false
            this.$message({type:'error',message:'接口请求失败，请重试'})
        })
      },
     makePrint(){
       MakePrint(document.getElementById('print').innerHTML)
     },
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
            params.id = this.cardData.id
            params.taskId=this.$route.query.taskId
            params.taskName=this.$route.query.taskName
            params.operator=this.userInfo.id
            params.operatorName=this.userInfo.truename
            params.fromSystemCode='CSJSCM'
            params.applyNo = this.cardData.applyNo
            params.registerFileInfoList = [...this.filePathList]
            // if()
            if(this.cardData.finaPaymentRegisterId){
              params.finaPaymentRegisterId = this.cardData.finaPaymentRegisterId
            }
            if(type){
              params.flag = false
            }else{
              params.flag = true
            }
            this.buttonDisabled=true
            payRegister(params).then(res=>{
              
              this.needfresh()
            }).catch(err => {
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
            params.id = this.cardData.id
            //之前工作流参数
            // params.taskId=this.$route.query.taskId
            // params.taskName=this.$route.query.taskName
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
           this.loading=false;
          this.buttonDisabled = false
          
          if(res.success&&res.list&&res.list.length>0){
            this.dataSuccess = true
           
            this.cardData = res.list[0]
           
             let fileInfos = res.list[0].filePathList || []
             let registerFileInfos = res.list[0].registerFileInfoList || []
              
              fileInfos.map(item=>{
                if(item.filePath){
                  item.path = item.filePath//itemCard组件，文件下载的参数为path
                  item.name = item.fileName
                }
                
              })
            this.cardData.filePathList   = fileInfos
             registerFileInfos.map(item=>{
                if(item.filePath){
                  item.path = item.filePath//itemCard组件，文件下载的参数为path
                  item.url = item.filePath//filenew监听
                  item.name = item.fileName
                }
                
              })
            this.cardData.registerFileInfoList   = registerFileInfos
            this.fileNew = registerFileInfos
            

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
              
            let { realPaymentDate,
            paymentMode,//结算方式,
            applyPaymentAmt,//货款金额
            realPaymentAmt,//实付金额
            realInterestAmt,//贴息
            remarkInfo,//备注
            paymentRecordNo,//交易流水号
            } = this.cardData

            this.ruleForm = { realPaymentDate,
            paymentMode,//结算方式,
            applyPaymentAmt,//货款金额
            realPaymentAmt,//实付金额
            realInterestAmt,//贴息
            remarkInfo,//备注
            paymentRecordNo,//交易流水号
            }
            
              // this.cardData.moneyType = 3
            if(this.cardData.moneyType == 3){
              this.rules = returnPayReg
            }else{
              this.rules = rulesReg
            }
            if(this.cardData.id&&this.cardData.processInstanceId){
              paymentRecord({id:this.cardData.id,processInstanceId:this.cardData.processInstanceId}).then(res=>{
                this.tableData = res.data            
              })
            }else{
              this.tableData = []
            }
            if(this.cardData.finaPaymentRegisterId){
              this.loading = true
              getPaymentRegisterData({id:this.cardData.finaPaymentRegisterId}).then(res =>{
                this.loading = false
                if(res.success){
                  this.cardData.registerStatus = res.data.registerStatus
                  console.log(this.cardData.registerStatus,222222);
                  
                }else{
                  this.cardData.registerStatus = ''
                }
              }).catch(err => {
                this.cardData.registerStatus = ''
                this.loading = false
              })
            }
          }
         
        }).catch(err=>{
            this.loading=false;
            this.buttonDisabled = false
        })
      }
    }
 }
</script>


