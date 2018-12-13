<template lang="html">
  <div class="app-container">
    <el-form :model="payment" :rules="rules" ref="ruleForm" label-width="70px" label-position="left">
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
            <el-select v-model="payment.moneyState" filterable clearable placeholder="请选择款项性质" size="small" prefix-icon="el-icon-search">
              <el-option
                v-for="item in MoneyStateEnum"
                :key="item.value"
                :label="item.name"
                :disabled="item.disabled"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="款项类型" prop="moneyType">
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
       
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
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
        <el-col :span="6">
          <el-form-item label="采购合同" prop="contractNo">
             <el-input type="text" size="small" disabled v-model="payment.contractNo" />
          </el-form-item>
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
        <el-col :span="6" v-if="true">
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
          <el-form-item label="申请货款金额" prop="applyPaymentAmt" label-width="120px">
             <el-input type="text" size="small" :disabled="false" v-model="payment.applyPaymentAmt"></el-input>
          </el-form-item>
        </el-col>
         <!-- <el-form-item label="其中:贴息" label-width="90px" prop="paymentAmt">
             <el-input type="text" size="small" :disabled="xingzhi!=0" v-model="payment.paymentAccount"></el-input>
          </el-form-item>
        </el-col> -->
       
         <el-col :span="8">
          <el-form-item label="要求付款日期" label-width="120px" prop="applyPaymentDate">
              <el-date-picker
              v-model="payment.applyPaymentDate"
              type="date"
              size="small"
              :editable="false"
              placeholder="选择日期时间"
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
            <span v-if="filePathList&&filePathList.length>0">
              <el-dropdown>
              <span class="el-dropdown-link">
                查看附件<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(v,i) in filePathList" :key="v.filePath" >
                  <a class="el-dropdown-link"  target="blank"   :href="v.filePath" :download="v.fileName||`附件${i+1}`">{{v.fileName||`附件${i+1}`}}</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="20">
          <el-col :span="6">
          <el-form-item label="收款方银行账户" label-width="120px" prop="receiveAccount">
             <el-input type="text" size="small" v-model="payment.receiveAccount"></el-input>
          </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收款方收款银行" label-width="120px" prop="receiveBank">
            <el-input type="text" size="small" v-model="payment.receiveBank"></el-input>
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
  import { addOrUpdatePayment, getPaymentListAndDetail,BusibillNoSelect } from '@/api/pay'
  import { mapGetters } from 'vuex'
  import { PaymentModeEnum,MoneyTypeEnum,MoneyStateEnum } from '@/utils/enum'
  import { infoCustomerInfo ,ordernoandcontractno,getSigningInformation,getSigningDetail,infoTaxno,saveFinaSaleInvoice,billingTypeDetails } from '@/api/invoicetigger/newoutputinvoice';
  import { getProvider } from '@/api/pay'
    import { MoneyReg } from '@/utils/validator'

  // import orderchoice from './Component/orderchoice'
  const  payment = {
          id:'',//付款申请id.
          applyTitle:'',//申请标题.  
          paymenterCode:'',//收款方id.
          paymenterName:'',//付款方名称（客户姓名）.
          moneyState:'',//款项性质.
          moneyType:'',//款项类型.
          busiBillNo:'',//采购单号编号.
          contractNo:'',//合同号.
          paymentMode:'',//付款方式.
          realPaymentAmt:'',//已付货款.
          applyPaymentAmt:'',//货款.
          applyPaymentDate:'',//申请付款日期
          receiveBank:'',//收款银行.
          receiveAccount:'',//收款账号.
          filePathList:[],
          fileNew:[]
        }
  export default {
    name: 'newpayment',
    // components: {
    //   orderchoice
    // },
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
        
        if (!Number(value)) {
          return callback(new Error('请输入货款'))
        }
        // if(value<0){
        //   return callback(new Error('货款为正数'))
        // }
        if (!MoneyReg.test(value)) {
          return callback(new Error('货款最多两位小数'))
        }
        callback()
      }
      return {
        MoneyStateEnum,
        MoneyTypeEnum,
        PaymentModeEnum,
        busiBillNoAll:[],
        payment,
        rules: {
          applyTitle:[
              { required: true, message: '请输入申请标题', trigger: 'blur' }
            ],
            paymenterCode: [
              { required: true, message: '请选择收款方', trigger: 'change' }
            ],
            applyPaymentAmt: [
              { validator: checkAmt, required: true, trigger: 'blur' }
            ],
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
          
        },
        dialogVisible: false,
        uploadUrl: '/webApi/fileupload/filetoserver', // 上传路径
        filePathList: [],
        uploadButtonVisible: false,
        dialogTableVisible: false,
        submitloading: false,
        customerConfig:[],
        busiBillNoAll:[],
        customerFilterMark:'',//客户名称过滤标识
        billFilterMark:'',//订单筛选
        fileNew:[],
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
        if((value!==0&&!value)||!this.customerConfig.length){
          return this.customerConfig
        } else{
          return this.customerConfig.filter(v=>v.paymenterCode.includes(value)||v.paymenterName.includes(value))
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
        console.log(this.filePathList,11111);
        
      }
    },
    created() {
      if (this.$route.query.id&&this.$route.query.from=='rebuild') {
        this.getDetail()
      }else{
        this.payment={}
        this.fileNew =[]
        this.filePathList = []
      }
      this.getCustomInfo()  
    },
    activated(){
       if (this.$route.query.id&&this.$route.query.from=='rebuild') {
        
        this.getDetail()
      }else{
        this.payment={}
        this.fileNew =[]
        this.filePathList = []
      }
      this.getCustomInfo()
    },
    methods: {
      clearMark(){
        this.customerFilterMark=''
        this.billFilterMark=''
      },
      customerChange(e){
        this.customerConfig.map(item=>{
          
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
          }
          
        })
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
            
            if(res.list[0].filePathList&&res.list[0].filePathList.length>0){
              let fileList = [...res.list[0].filePathList],temp = []
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
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
        
      },
      onSubmit(type) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
          
            let postData = {...this.payment}
            if(!this.filePathList.length){
              this.$message.error('附件不能为空');
              return ''
            }
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