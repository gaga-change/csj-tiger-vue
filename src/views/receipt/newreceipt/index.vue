<template lang="html">
  <div class="app-container">
    <el-form :model="receipt" :rules="rules" ref="ruleForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="8" v-if="receipt.id">
          <el-form-item label="收款单号">
            <div>{{receipt.receiveNo}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="付款方" prop="paymenterId">
            <el-select v-model="receipt.paymenterId"
              :filter-method="cusCodeFilter"
              @clear="cusCodeFilter" 
              @focus="clearCustomerFilterMark"
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
                :key="item.entNumber"
                :label="item.entName"
                :value="item.entNumber">
                <span class="codeNoStyle" >{{ item.entNumber }}</span>
                <span class="codeNoStyle" style="width:260px">{{ item.entName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="金额" prop="paymentAmt">
            <el-input type="text" size="small" v-model="receipt.paymentAmt"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="付款方式" prop="paymentMode">
            <el-select v-model="receipt.paymentMode" filterable clearable placeholder="请选择付款方式" size="small" prefix-icon="el-icon-search">
              <el-option
                v-for="item in paymentModeItem"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期" prop="mount">
              <el-date-picker
              v-model="receipt.paymentDate"
              type="date"
              size="small"
              :editable="false"
              placeholder="选择日期时间"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="付款方银行" prop="paymentBank">
             <el-input type="text" size="small" v-model="receipt.paymentBank"></el-input>
          </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="交易流水" prop="paymentRecordNo">
            <el-input type="text" size="small" v-model="receipt.paymentRecordNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="付款方账户" prop="paymentAccount">
            <el-input type="text" size="small" v-model="receipt.paymentAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="附件">
             <el-button
              size="mini"
              type="primary"
              @click="importFile">
              {{enclosure.length ? '继续上传' : '上传附件'}}
            </el-button>
            <span v-show="enclosure">{{enclosure.length}}个文件</span>
            <span v-if="enclosure&&enclosure.length>0">
              <el-dropdown>
              <span class="el-dropdown-link">
                查看附件<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(v,i) in enclosure" :key="v.url" >
                  <a class="el-dropdown-link"  target="blank"   :href="v.url" :download="v.name||`附件${i+1}`">{{v.name||`附件${i+1}`}}</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="20" style="height:120px">
        <el-col :span="8">
          <el-form-item label="付款摘要" prop="paymentAbstract">
            <el-input type="textarea" size="small" v-model="receipt.paymentAbstract" rows='5'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
        <el-form-item>
          <el-button type="primary" @click="onSubmit(0)" size="small" :disabled="submitloading" v-loading="submitloading">保存</el-button>
          <el-button type="primary" @click="onSubmit(1)" size="small" :disabled="submitloading" v-loading="submitloading">提交</el-button>
          <!-- <el-button @click="onCancel" size="small" v-loading="submitloading">取消</el-button> -->
        </el-form-item>
        </el-col>
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
        :file-list = "fileList"
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
  import { addOrUpdateReceipt, getReceiptDetail } from '@/api/receipt'
  import { mapGetters } from 'vuex'
  import { PaymentModeEnum } from '@/utils/enum'
  import { infoCustomerInfo ,ordernoandcontractno,getSigningInformation,getSigningDetail,infoTaxno,saveFinaSaleInvoice,billingTypeDetails } from '@/api/invoicetigger/newoutputinvoice';
  // import orderchoice from './Component/orderchoice'
  export default {
    name: 'newreceipt',
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
          return callback(new Error('金额请输入数字'))
        }
        if(value<0){
          return callback(new Error('金额请输入正数'))
        }
        if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value)) {
          return callback(new Error('金额最多两位小数'))
        }
        callback()
      }
      return {
        receipt: {
           id:'',
           receiveNo:'',//收款单号
           paymenterId:'',//付款方id
           paymenterName:'',//付款方名称（客户姓名）
           paymentMode:'',//付款方式
           paymentBank:'',//付款方银行
           paymentAccount:'',//付款方账号
           paymentAmt:'',//付款金额
           paymentDate:'',//付款日期
           paymentRecordNo:'',//交易流水号
           paymentAbstract:'',
           filePath:[],
        },
        rules: {
            paymenterId: [
              { required: true, message: '请选择付款方', trigger: 'change' }
            ],
            paymentAmt: [
              { validator: checkAmt, required: true, trigger: 'blur' }
            ],
            paymentMode: [
              { required: true, message: '请选择付款方式', trigger: 'blur' }
            ],
            paymentDate: [
              { required: true, message: '付款日期', trigger: 'blur' }
            ],
            // paymentAccount: [
            //   { validator: checkDetail, required: true, trigger: 'blur' }
            // ],
          
        },
        dialogVisible: false,
        uploadUrl: '/webApi/fileupload/filetoserver', // 上传路径
        fileList: [],
        uploadButtonVisible: false,
        dialogTableVisible: false,
        submitloading: false,
        paymentModeItem:PaymentModeEnum,
        customerConfig:[],
        customerFilterMark:'',//客户名称过滤标识
      }
    },
    computed: {
      enclosure() {
        const url = []
        this.fileList.map(
          file => {
            console.log(file,file.response,file.name && file.url,'item')
            if (file.response) {
              url.push({ name: file.name, url: file.response.data })
            } else if (file.name && file.url) {
              url.push({ name: file.name, url: file.url })
            }
          }
        )
        console.log(url,'url');
        
        return url
      },
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
          return this.customerConfig.filter(v=>v.entNumber.includes(value)||v.entName.includes(value))
        }
       },
       set:function(){
 
       }
      },
    },
    created() {
      // if (!this.gridData.length) {
      //   this.$store.dispatch('GetGysList')
      // }
      
      
      if (this.$route.query.id&&this.$route.query.from=='rebuild') {
        this.getDetail()
      }else{
        this.receipt={}
      }
      this.getCustomInfo()
    },
    activated(){

       if (this.$route.query.id&&this.$route.query.from=='rebuild') {
        
        this.getDetail()
      }else{
        this.receipt={}
      }
      this.getCustomInfo()
    },
    methods: {
      customerChange(e){
        this.customerConfig.map(item=>{
          
          
          if(item.entNumber==e){
            this.receipt.paymenterName = item.entName
          }
        })
      },

      getCustomInfo(){
        infoCustomerInfo().then(res=>{
          if(res.success){
            this.customerConfig=res.data||[]
          }
        }).catch(err=>{

        })
      },
      cusCodeFilter(value){
        this.customerFilterMark=value;
      },
      clearCustomerFilterMark(){
        this.customerFilterMark = ''
      },
      beforeUpload(file) {
        // 如果上传文件大于5M
        if (file.size > 5 * 1024 * 1024) {
          this.$message.error('上传附件不能大于5M')
          return false
        }
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      getDetail() {
        getReceiptDetail(
         this.$route.query.id
        ).then(res => {
          if(res.success){
            let {
              id,
              receiveNo,//收款单号
              paymenterId,//付款方id
              paymenterName,//付款方名称（客户姓名）
              paymentMode,//付款方式
              paymentBank,//付款方银行
              paymentAccount,//付款方账号
              paymentAmt,//付款金额
              paymentDate,//付款日期
              paymentRecordNo,//交易流水号
              paymentAbstract,
            } = res.data.finaReceiveDO
            console.log(id,123123123213123);
            
            this.receipt =  {
              id,
              receiveNo,//收款单号
              paymenterId,//付款方id
              paymenterName,//付款方名称（客户姓名）
              paymentMode,//付款方式
              paymentBank,//付款方银行
              paymentAccount,//付款方账号
              paymentAmt,//付款金额
              paymentDate,//付款日期
              paymentRecordNo,//交易流水号
              paymentAbstract,
            }
            if(res.data.fileInfos&&res.data.fileInfos.length>0){
              this.fileList = res.data.fileInfos
              this.receipt.filePath = res.data.fileInfos
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
        console.log(res, file, fileList,12);
        // this.filenamelist = []
        // fileList.map(item => {
        //   this.filenamelist.push({name:item.name})
        // })
        if (res.code === '200') {
          this.fileList=fileList
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
        console.log(this.fileList,'file');
        
      },
      onSubmit(type) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let postData = {...this.receipt}

            if(!this.enclosure.length){
              this.$message.error('附件不能为空');
              return ''
            }
             this.submitloading = true

            postData.filePath = this.enclosure
            postData.isSubmit = type ? true : false
            let msg = '新建'
            msg = postData.id ? '修改' : '新建' 
            addOrUpdateReceipt(postData).then(
              res => {
                if (res.success&&res.data&&res.data.id) {
                  this.$confirm(msg + '收款单成功！', '提示', {
                    confirmButtonText: '详情',
                    cancelButtonText: '关闭',
                    type: 'success'
                  }).then(
                    _ => {
                        this.$router.push({
                          path: '/receipt/register/detail',
                          query: {
                            id: res.data.id
                          }
                        })
                    }
                  ).catch(_ => {
                    this.$router.push({
                      path: '/receipt/register/detail',
                      query: {
                       id: res.data.id
                      }
                    })
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
        this.receipt = {
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