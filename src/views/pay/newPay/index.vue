<template lang="html">
  <div class="app-container">
    <el-form :model="payment" :rules="rules" ref="ruleForm" label-width="100px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="申请标题" prop="applyTitle">
            <el-input type="text" size="small" v-model="payment.applyTitle"/>
          </el-form-item>
        </el-col>
      <!-- </el-row>
      <el-row :gutter="20"> -->
        <el-col :span="6">
          <el-form-item label="收款方" prop="paymenterCode">
            <el-select v-model="payment.paymenterCode"
              :filter-method="cusCodeFilter"
              @clear="cusCodeFilter" 
              size="small"
              @focus="clearMark"
              @change="customerChange"
              clearable
              filterable placeholder="请选择客户名称">
              <el-option 
                value=""
               :disabled="true"
               v-if="nowCustomerConfig.length>0" >
                <span  class="codeNoStyle">企业编号</span>
                <span  class="codeNoStyle" style="width:260px">企业名称</span>
              </el-option>

              <el-option
                v-for="item in nowCustomerConfig"
                :key="item.paymenterCode"
                :label="item.paymenterName"
                :value="item.paymenterCode">
                <span class="codeNoStyle" >{{ item.paymenterCode }}</span>
                <span class="codeNoStyle" style="width:260px">{{ item.paymenterName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="款项性质" prop="moneyState">
            <el-select v-model="payment.moneyState"   :disabled="Boolean(this.$route.query.byOut)"    filterable clearable placeholder="请选择款项性质" size="small" prefix-icon="el-icon-search" @change="changeMoneyState">
              <el-option
                v-for="item in MoneyStateEnum"
                :key="item.value"
                :disabled="item.disabled"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="this.payment.moneyState === 0">
          <el-form-item label="款项类型" prop="moneyType" key="moneyType">  
            <el-select v-model="payment.moneyType" :disabled="false"  filterable clearable placeholder="请选择款项类型" size="small" prefix-icon="el-icon-search">
              <el-option
                v-for="item in MoneyTypeEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
       

        <el-col :span="6" v-if="this.payment.moneyState === 0">
          <el-form-item label="采购订单" prop="busiBillNo">
            <el-select v-model="payment.busiBillNo" :disabled="false" 
            :filter-method="cusBillFilter" 
            @focus="clearMark"
            @change="selectBusiBillNo" filterable  clearable placeholder="请选择采购订单" size="small" prefix-icon="el-icon-search">
              <el-option
                v-for="item in newBusiBillNoAll"
                :key="item.busiBillNo"
                :label="item.busiBillNo"
                :value="item.busiBillNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="this.payment.moneyState === 0">
          <el-form-item label="业务板块" prop="busiPlate">
            <el-select v-model="payment.busiPlate" disabled 
               size="small" prefix-icon="el-icon-search">
              <el-option
                v-for="item in busiPlateConfig"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <template v-if="payment.moneyState === 0">
            <el-form-item label="采购合同" prop="contractNo" >
              <el-input type="text" size="small" disabled v-model="payment.contractNo" @change="getContract"/>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="合同号" prop="contractNo" key="contract" :rules="[
                {  required: true, trigger: 'blur', message:'请输入合同号' }
              ]">
              <el-input type="text" size="small" v-model="payment.contractNo" v-on:blur="getContract"/>
            </el-form-item>
          </template>  
           <!-- <el-form-item :label="fileContractList.length+'个文件'"> -->
              <!-- <span v-show="fileContractList">{{fileContractList.length}}个文件</span> -->
            <span v-if="fileContractList&&fileContractList.length>0">
              <el-dropdown>
              <span class="el-dropdown-link">
                查看合同附件<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(v,i) in fileContractList" :key="v.filePath" >
                  <a class="el-dropdown-link"  target="blank"   :href="v.filePath" :download="v.fileName||`附件${i+1}`">{{v.fileName||`附件${i+1}`}}</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <!-- </el-form-item>  -->
        </el-col>
       
        <!-- <el-col :span="6">
          <el-form-item label="合同约定付款方式" label-width="120px" prop="paymentMode">
              <el-select v-model="payment.paymentMode" disabled filterable clearable placeholder="请选择款项性质" size="small" prefix-icon="el-icon-search">
              <el-option
                v-for="item in PaymentModeEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="6" v-if="this.payment.moneyState === 0">
          <el-form-item label="已付货款" prop="realPaymentAmt">
             <el-input type="text" size="small" disabled v-model="payment.realPaymentAmt"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <!-- <el-col :span="6">
          <el-form-item label="申请金额" prop="paymentAmt">
             <el-input type="text" size="small" :disabled="xingzhi==0" v-model="payment.paymentAccount"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="申请付款金额" prop="applyPaymentAmt" label-width="100px"  :rules="[
              { validator: checkAmt, required: true, trigger: 'blur' }
             ]">
             <el-input type="text" size="small"  v-model="payment.applyPaymentAmt" :style="{maxWidth:(this.payment.moneyState === 2?'120px':'300px')}" ></el-input>
             <el-button @click="getPayInfo" v-show="this.payment.moneyState === 2&&Boolean(this.$route.query.byOut)" size="small" style="display:inline-block" type="text">付款来源</el-button>
          </el-form-item>
        </el-col>
         <!-- <el-form-item label="其中:贴息" label-width="90px" prop="paymentAmt">
             <el-input type="text" size="small" :disabled="xingzhi!=0" v-model="payment.paymentAccount"></el-input>
          </el-form-item>
        </el-col> -->
       
         <el-col :span="8">
          <el-form-item label="要求付款日期" label-width="100px" prop="applyPaymentDate">
              <el-date-picker
              v-model="payment.applyPaymentDate"
              type="date"
              size="small"
              :editable="false"
              placeholder="选择日期时间"
              style="max-width:200px"
              align="right">
            </el-date-picker>
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
       <el-row :gutter="20">
          <el-col :span="6">
          <el-form-item label="收款方银行账户" label-width="100px" prop="receiveAccount">
             <el-input type="text" size="small" v-model="payment.receiveAccount"></el-input>
          </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收款方收款银行" label-width="100px" prop="receiveBank">
            <el-input type="text" size="small" v-model="payment.receiveBank"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备注" label-width="80px" prop="remarkInfo">
            <el-input type="textarea" size="small" :maxlength="100" v-model="payment.remarkInfo" placeholder="一百字以内"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-form-item>
          <el-button type="primary" @click="onSubmit(0)" size="small" :disabled="submitloading" v-loading="submitloading">保存</el-button>
          <el-button type="primary" @click="onSubmit(1)" size="small" :disabled="submitloading" v-loading="submitloading">提交</el-button>
        </el-form-item>
      </el-row>
    </el-form>
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
  import { addOrUpdatePayment, getPaymentListAndDetail, BusibillNoSelect } from '@/api/pay'
  import { mapGetters } from 'vuex'
  import moment from 'moment'
  import _  from 'lodash';
  import { PaymentModeEnum,MoneyTypeEnum,MoneyStateEnum, busiPlateConfig } from '@/utils/enum'
  import { infoCustomerInfo ,ordernoandcontractno,getSigningInformation,getSigningDetail,infoTaxno,saveFinaSaleInvoice,billingTypeDetails } from '@/api/invoicetigger/newoutputinvoice';

  import { getProvider, getAllProvider, infoInvoiceAmmount, getLastTime, getContractFiles} from '@/api/pay'

  import { MoneyReg } from '@/utils/validator'

  // import orderchoice from './Component/orderchoice'
  import PayBill from '../components/PayBill'
  const  payment = {
          id:'',//付款申请id.
          applyTitle:'',//申请标题.  
          paymenterCode:'',//收款方id.
          paymenterName:'',//付款方名称（客户姓名）.
          moneyState:0,//款项性质.
          moneyType:'',//款项类型.
          busiBillNo:'',//采购单号编号.
          busiPlate:'',//业务板块
          contractNo:'',//合同号.
          paymentMode:'',//付款方式.
          realPaymentAmt:'',//已付货款.
          applyPaymentAmt:'',//货款.
          applyPaymentDate:'',//申请付款日期
          receiveBank:'',//收款银行.
          receiveAccount:'',//收款账号.
          filePathList:[],
          fileNew:[],
          ownerCode:'',
          ownerName:'',
          remarkInfo:'',
        }
  //货物校验
  const goodsRules = {
     applyTitle:[
        { required: true, message: '请输入申请标题', trigger: 'blur' }
      ],
      paymenterCode: [
        { required: true, message: '请选择收款方', trigger: 'change' }
      ],
      // applyPaymentAmt: [
      //   { validator: checkAmtGoods, required: true, trigger: 'blur' }
      // ],
      moneyState: [
        { required: true, message: '请选择款项性质', trigger: 'change' }
      ],
      moneyType: [
        { required: true, message: '请选择款项类型', trigger: 'change' }
      ],
      busiBillNo: [
        { required: true, message: '请选择采购订单', trigger: 'change' }
      ],
      applyPaymentDate: [
        {  required: true, message: '请选择付款日期', trigger: 'change' }
      ],
  }

  //非货物校验
  const notGoodsRules = {
    applyTitle:[
        { required: true, message: '请输入申请标题', trigger: 'blur' }
      ],
      paymenterCode: [
        { required: true, message: '请选择收款方', trigger: 'change' }
      ],
      // applyPaymentAmt: [
      //   { validator: checkAmt, required: true, trigger: 'blur' }
      // ],
      moneyState: [
        { required: true, message: '请选择款项性质', trigger: 'change' }
      ],
      // contractNo: [
      //   { required: true, message: '请输入合同号', trigger: 'blur' }
      // ],
      applyPaymentDate: [
        {  required: true, message: '请选择付款日期', trigger: 'change' }
      ],
  }

  export default {
    name: 'newpayment',
    components: {
      // orderchoice,
      PayBill
    },
    data() {
      var checkDetail = (rule, value, callback) => {
        if (value.length > 20) {
          return callback(new Error('长度不能大于20'))
        }
        if (!Number(value)) {
          return callback(new Error('请输入数字'))
        }
        callback()
      }
      var checkAmt = (rule, value, callback) => {
        var a = this.payment.moneyState || 0
        if (!Number(value)) {
          return callback(new Error(`请输入货款`))
        }
        // if(value<0){
        //   return callback(new Error('货款为正数'))
        // }
        callback()
      }
      var moneyTypeFilter = MoneyTypeEnum.filter(item =>item.type.includes('receipt'))
      return {
        //枚举
        MoneyStateEnum,
        MoneyTypeEnum:moneyTypeFilter,
        PaymentModeEnum,
        busiPlateConfig,
        payment,
        rules: goodsRules,
        //上传文件相关
        dialogVisible: false,
        uploadUrl: '/webApi/fileupload/filetoserver', // 上传路径
        filePathList: [],
        uploadButtonVisible: false,
        dialogTableVisible: false,
        submitloading: false,
        fileNew:[],
        fileContractList:[],

        //客户账单相关
        customerConfig:[],
        customerAllConfig:[],//
        busiBillNoAll:[],
        customerFilterMark:'',//客户名称过滤标识
        billFilterMark:'',//订单筛选

        //对账单相关参数
        paybillData:{},
        disableButton:false,
        dialogVisiblePay:false,
        lastBillDate:'',
        payDurationStart:'',
        payDurationEnd:'',
        timeUsable:{
          start:true,
          end:false
        },
        //切换moneyState需要记录的值
        contractObj:{
          goods: '',
          service: '',
        },
        applyPaymentAmtObj:{
          goods:'',
          service:''
        },
        filesObj:{
          goods:'',
          service:'',
        },
        contractFiles:{
          goods:'',
          service:''
        }
      }
    },

    computed: {
      ...mapGetters({
        company: 'company',
        companyId: 'companyId',
        userInfo: 'userInfo',
        visitedViews: 'visitedViews',
        revstoreList: 'storeList',
        gridData: 'gysList'
      }),
      nowCustomerConfig:{
       get: function () {
        let value=this.customerFilterMark;
        if(this.payment.moneyState === 0){
          if((value!==0&&!value)||!this.customerConfig.length){
            return this.customerConfig
          } else{
            return this.customerConfig.filter(v=>v.paymenterCode.includes(value)||v.paymenterName.includes(value))
          }
        }else{
          if((value!==0&&!value)||!this.customerConfig.length){
            return this.customerAllConfig
          } else{
            return this.customerAllConfig.filter(v=>v.paymenterCode.includes(value)||v.paymenterName.includes(value))
          }
        }
       
       },
       set:function(){
 
       }
      },
      newBusiBillNoAll:{
       get: function () {
        let value=this.billFilterMark;
        if((value!==0&&!value)||!this.busiBillNoAll.length){
          return this.busiBillNoAll
        } else{
          return this.busiBillNoAll.filter(v=>v.busiBillNo.includes(value)||v.contractNo.includes(value))
        }
       },
       set:function(){
 
       }
      },
    },
    watch:{

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

      payment:{
        handler (val,oldVal){
          if(val.moneyState==0){
            this.rules = goodsRules
          }else{
            this.rules = notGoodsRules
          }
        },
        deep:true
      },
  
    },

    mounted(){
      console.log('mounted')
    },

    created() {
      console.log('created')
      // this.payment.moneyState = 0
      // this.$set('payment.moneyState',0)
      if (this.$route.query.id&&this.$route.query.from=='rebuild') {
        this.getDetail()
      }  else{
        this.payment={}
        this.fileNew =[]
        this.filePathList = []
      }

      this.getCustomInfo()  
    },

    activated(){
      // this.payment.moneyState = 0
      // this.$set('payment.moneyState',0)
       if (this.$route.query.id&&this.$route.query.from=='rebuild') {
        this.getDetail()
     } else if(this.$route.query.byOut){
        this.payment={}
        this.fileNew =[]
        this.filePathList = []
        let data= _.cloneDeep(this.payment);
        data.applyTitle=this.$route.query.applyTitle;
        data.moneyState=Number(this.$route.query.moneyState);
        data.applyPaymentAmt=Number(this.$route.query.applyPaymentAmt).toFixed(2);
        this.payment=data
      } else{
        this.payment={}
        this.fileNew =[]
        this.filePathList = []
      }
      this.getCustomInfo()
    },
    methods: {
      getContract(){
        if(this.payment.contractNo){
          getContractFiles({contractNo:this.payment.contractNo}).then(res => {
            if(res.success){
              this.fileContractList = res.data
              if(this.payment.moneyState == 0){
                this.contractFiles.goods = this.fileContractList
              }else if(this.payment.moneyState == 2){
                this.contractFiles.service = this.fileContractList
              }
            }
          })
        }
        
      },
      changeMoneyState(){

        
        if(this.payment.moneyState == 0){
          if(this.payment.contractNo != this.contractObj.goods){
            this.payment.contractNo = this.contractObj.goods
            
          }
          if(this.payment.applyPaymentAmt != this.applyPaymentAmtObj.goods){
            this.payment.applyPaymentAmt = this.applyPaymentAmtObj.goods
          }
         
          
          // if(this.payment.filePathList != this.filesObj.goods){
            this.payment.filePathList = [...this.filesObj.goods]
            this.fileNew = [...this.filesObj.goods]
            this.filePathList = [...this.filesObj.goods]
            this.fileContractList = [...this.contractFiles.goods]
            console.log(this.fileNew.length,this.payment.filePathList,this.filePathList.length,1);
            
          // }
        }else  if(this.payment.moneyState == 2){
          if(this.payment.contractNo != this.contractObj.service){
            this.payment.contractNo = this.contractObj.service
          }
          if(this.payment.applyPaymentAmt != this.applyPaymentAmtObj.service){
            this.payment.applyPaymentAmt = this.applyPaymentAmtObj.service
          }
          console.log(this.filesObj.service,2);
          
          // if(this.payment.filePathList != this.filesObj.service){
            this.payment.filePathList = [...this.filesObj.service]
            this.fileNew = [...this.filesObj.service]
            this.fileContractList = [...this.contractFiles.service]

          // }
        }
        this.$refs['ruleForm'].validate((valid) => {
          return false
          
        });
        
      },
      getPayInfo(){
        //跳转到来源
        this.$router.push({
           path:`/reconciliation/detail?id=${this.$route.query.reaconcliliationId}`,
        }) 
      },
      checkAmt(rule, value, callback){
        
        if (!Number(value)) {
          return callback(new Error(`请输入货款`))
        }
        // if(value<0){
        //   return callback(new Error('货款为正数'))
        // }
        callback()
      },
      clearMark(){
        this.customerFilterMark=''
        this.billFilterMark=''
      },
      customerChange(e){
        var customer = []
        
        if(this.payment.moneyState == 0){
          customer = [...this.customerConfig]
           
        }else if(this.payment.moneyState == 2){
          customer = [...this.customerAllConfig]
        }
        customer.map(item=>{
          
          if(item.paymenterCode==e){
            this.payment.paymenterName = item.paymenterName
          }
        })
        if(this.payment.paymenterCode){
            BusibillNoSelect({paymenterCode:this.payment.paymenterCode}).then(res=>{
              if(res.success){
                this.busiBillNoAll = res.data || []
              }
            })
          }
       
        
      },

      getCustomInfo(){
        // infoCustomerInfo().then(res=>{
        //   if(res.success){
        //     this.customerConfig=res.data||[]
        //   }
        // }).catch(err=>{

        // })
        
        getProvider().then(res=>{
          if(res.success){
            this.customerConfig=res.data||[]
          }
        }).catch(err=>{

        })
        getAllProvider().then(res=>{
          if(res.success){
            this.customerAllConfig=res.data||[]
          }
        }).catch(err=>{

        })
        
      },
      cusCodeFilter(value){
        this.customerFilterMark=value;
      },
      selectBusiBillNo(){
        let busiBillNo = this.payment.busiBillNo
        let newBusiBillNo = [...this.newBusiBillNoAll]
        newBusiBillNo.map(item=>{
          if(item.busiBillNo == busiBillNo){
            this.payment.contractNo = item.contractNo
            // this.payment.paymentMode = item.paymentMode
            this.payment.realPaymentAmt = item.paymentAmt
            this.payment.busiPlate = item.busiPlate
          }
          
        })
        this.getContract()
      },
      cusBillFilter(value){
        this.billFilterMark=value;
      },
      beforeUpload(file) {
        // 如果上传文件大于5M
        if (file.size > 5 * 1024 * 1024) {
          this.$message.error('上传附件不能大于5M')
          return false
        }
      },
      handleRemove(file, fileList) {
        this.fileNew = fileList
          if(this.payment.moneyState == 0){
          this.filesObj.goods = [...fileList]
        }else if(this.payment.moneyState == 2){
          this.filesObj.service = [...fileList]
        }
      },
      getDetail() {
        getPaymentListAndDetail(
         {id:this.$route.query.id}
        ).then(res => {
          if(res.success){
            let {...payment} = res.list[0]
            
            this.payment =  {
             ...payment
            }
            let fileList = [],temp = []
           
            if(res.list[0].filePathList&&res.list[0].filePathList.length>0){
              fileList = [...res.list[0].filePathList]
              this.filePathList = fileList
              this.payment.filePathList = fileList
              fileList.map(file=>{
                temp.push({name:file.fileName,url:file.filePath,...file})
              })
              this.fileNew = temp
            }else{
              this.filePathList = []
              this.payment.filePathList = []
              this.fileNew = []
            }
             if(payment.moneyState == 0){
              this.contractObj = {
                goods: payment.contractNo,
                service: '',
              },
              this.applyPaymentAmtObj = {
                goods:payment.applyPaymentAmt,
                service:''
              },
              this.filesObj = {
                goods:temp,
                service:'',
              }
            }else if(payment.moneyState == 2){
              this.contractObj = {
                goods: '',
                service: payment.contractNo,
              },
              this.applyPaymentAmtObj = {
                goods:'',
                service:payment.applyPaymentAmt
              },
              this.filesObj = {
                goods:'',
                service:temp,
              }
            }
            if(payment.contractNo){
              getContractFiles({contractNo:payment.contractNo}).then(res => {
                 if(res.success){
                  this.fileContractList = res.data
                }
              })
            }
          }
        
        }).catch(err => {
          console.log(err,1111)
        })
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
        // this.filenamelist = []
        // fileList.map(item => {
        //   this.filenamelist.push({name:item.name})
        // })
        if (res.code === '200') {
          this.fileNew=fileList   
          if(this.payment.moneyState == 0){
            this.filesObj.goods = [...fileList]
          }else if(this.payment.moneyState == 2){
            this.filesObj.service = [...fileList]
          } 
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
        
      },
      onSubmit(type) {
        
        var customer = []
        
        if(this.payment.moneyState == 0){
          customer = [...this.customerConfig]
          this.payment.ownerCode = 'EP201804150009';
          this.payment.ownerName = '诸暨裕大贸易有限公司';
          
        }else if(this.payment.moneyState == 2){
          customer = [...this.customerAllConfig]
          this.payment.ownerCode = 'EP201804150009';
          this.payment.ownerName = '诸暨裕大贸易有限公司';
          this.payment.busiPlate = ''
        }
        customer.map(item=>{
          if(item.paymenterCode==this.payment.paymenterCode){
            this.payment.paymenterName = item.paymenterName
          }
        })
        // if(this.payment.moneyState == 2){
        //   this.payment.startTime = this.$refs.payBills.payDurationStart
        //   this.payment.endTime = this.$refs.payBills.durationEnd
        //   if(!this.payment.endTime){
        //     this.$message({type:'error',message:'请选择结束对账单时间'})
        //     return
        //   }
        // }
        
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
          
            let postData = {...this.payment}
            // if(!this.filePathList.length){
            //   this.$message.error('附件不能为空');
            //   return ''
            // }
            this.submitloading = true
            postData.filePathList = this.filePathList
            postData.flag = type ? false : true
            let msg = '新建'
            msg = postData.id ? '修改' : '新建' 
            postData.operatorName = this.userInfo.truename
            postData.operator = this.userInfo.id
            postData.fromSystemCode = 'CSJSCM'

 
            delete postData.realPaymentAmt 


            addOrUpdatePayment(postData).then(
              res => {
                
                if (res.success&&res.data) {
                   this.contractObj={
                    goods: '',
                    service: '',
                  },
                  this.applyPaymentAmtObj={
                    goods:'',
                    service:''
                  },
                  this.filesObj={
                    goods:'',
                    service:'',
                  },
                  this.contractFiles={
                    goods:'',
                    service:''
                  }
                  this.$message({type:'success',message:`${msg}付款申请成功，1.5s后跳转至详情页`,duration:1500,onClose:()=>{
                     this.$router.push({
                          path: '/payment/apply/detail',
                          query: {
                            id: res.data
                          }
                        })
                  }})
                }else{
                   this.$message({type:'error',message:`${msg}付款申请失败`,duration:1000
                  })
                }
                this.submitloading = false
              }
            ).catch(err => {
              console.log(err)
              this.submitloading = false
            })
          } else {
            console.log('error submit!!')
            this.submitloading = false
            return false
          }
        })
      },
      onCancel() {
        this.payment = {
        }
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .codeNoStyle{
    float: left; 
    color: #8492a6; 
    font-size: 12px;
    width:150px;
    &:last-child{
      float: right;
    }
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
</style>