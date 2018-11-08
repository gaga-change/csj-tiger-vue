<template lang="html">
  <div class="app-container">
    <el-form :model="receipt" :rules="rules" ref="ruleForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="6" v-if="receipt.id">
          <el-form-item label="收款单号">
            <div>{{receipt.id}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="付款方" prop="paymentName">
            <el-select v-model="receipt.paymentName" filterable clearable placeholder="请选择客户" size="small" prefix-icon="el-icon-search">
              <el-option
                v-for="item in cusName"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额" prop="paymentAmt">
            <el-input type="text" size="small" v-model="receipt.paymentAmt"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="付款方式" prop="paymentMode">
            <el-select v-model="receipt.paymentMode" filterable clearable placeholder="请选择客户" size="small" prefix-icon="el-icon-search">
              <el-option
                v-for="item in paymentModeItem"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="日期" prop="mount">
              <el-date-picker
              v-model="receipt.paymentDate"
              type="datetime"
              size="small"
              :editable="false"
              placeholder="选择日期时间"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="付款方银行" prop="paymentBank">
            <el-select v-model="receipt.paymentBank" filterable clearable placeholder="请选择" size="small" prefix-icon="el-icon-search">
              <el-option
                v-for="item in cusName"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交易流水" prop="paymentRecordNo">
            <el-input type="text" size="small" v-model="receipt.paymentRecordNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="付款方账户" prop="paymentAccount">
            <el-input type="text" size="small" v-model="receipt.paymentAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="附件">
             <el-button
              size="mini"
              type="primary"
              @click="importFile">
              {{enclosure.length ? '继续上传' : '上传附件'}}
            </el-button>
            <span v-show="enclosure">{{enclosure.length}}个文件</span>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="付款摘要" prop="paymentAbstract">
            <el-input type="textarea" size="small" v-model="receipt.paymentAbstract" rows='5'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-form-item>
          <el-button type="primary" @click="onSubmit(0)" size="small" :disabled="submitloading" v-loading="submitloading">保存</el-button>
          <el-button type="primary" @click="onSubmit(1)" size="small" :disabled="submitloading" v-loading="submitloading">提交</el-button>
          <el-button @click="onCancel" size="small">取消</el-button>
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
  import { addOrUpdateReceipt } from '@/api/receipt'
  import { mapGetters } from 'vuex'
  import { PaymentMode } from '@/utils/enum'
  // import orderchoice from './Component/orderchoice'
  export default {
    name: 'newreceivable',
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
          return callback(new Error('请输入数字'))
        }
        if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value)) {
          return callback(new Error('金额最多两位小数'))
        }
        callback()
      }
      return {
        receipt: {
           id:'',
           receiveNo:'',
           paymentName:'',
           paymentMode:'',
           paymentBank:'',
           paymentAccount:'',
           paymentAmt:'',
           paymentDate:'',
           paymentRecordNo:'',
           paymentAbstract:'',
           filePath:[],
        },
        rules: {
            paymentName: [
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
            paymentAccount: [
              { validator: checkDetail, required: true, trigger: 'blur' }
            ],
          
        },
        dialogVisible: false,
        uploadUrl: '/webApi/fileupload/filetoserver', // 上传路径
        fileList: [],
        uploadButtonVisible: false,
        dialogTableVisible: false,
        submitloading: false,
        paymentModeItem:PaymentMode,
      }
    },
    computed: {
      enclosure() {
        const url = []
        this.fileList.map(
          file => {
            // console.log(file)
            if (file.response) {
              url.push({ name: file.name, url: file.response.data })
            } else if (file.name && file.url) {
              url.push({ name: file.name, url: file.url })
            }
          }
        )
        return url
      },
     
     
      ...mapGetters({
        company: 'company',
        companyId: 'companyId',
        userInfo: 'userInfo',
        visitedViews: 'visitedViews',
        revstoreList: 'storeList',
        gridData: 'gysList'
      })
    },
    created() {
      if (!this.gridData.length) {
        this.$store.dispatch('GetGysList')
      }
      if (this.$route.query.id) {
        this.getDetail()
      }
    },
    methods: {
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
        getReceivableDetail({
          ticketno: this.$route.query.id
        }).then(res => {
          this.receivableform.receivable = res.data.data[0]
          this.fileList = JSON.parse(res.data.data[0].enclosure)
          console.log(res)
        }).catch(err => {
          console.log(err)
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
        console.log(res, file, fileList);
        this.filenamelist = []
        fileList.map(item => {
          this.filenamelist.push({name:item.name})
        })
        if (res.code === '200') {
          this.fileList.push(fileList)
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
            this.submitloading = true
            let postData = {...this.receipt}
            postData.filePath = this.fileList.join(',')
            post.isSubmit = type ? true : false
            let msg = '新建'
            msg = postData.id ? '修改' : '新建' 
            addOrUpdateReceipt(postData.receivable).then(
              res => {
                console.log(res)
                if (res.code === '200' && res.data) {
                  this.$confirm(msg + '收款单成功！', '提示', {
                    confirmButtonText: '详情',
                    cancelButtonText: '关闭',
                    type: 'success'
                  }).then(
                    _ => {
                      
                        this.$router.push({
                          path: '/receipt/receivabledetailDelivery',
                          params: {
                            ticketno: res.data
                          }
                        })
                    }
                  ).catch(_ => {
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

<style scoped>
  .line {
    text-align: center;
  }

  .dlink {
    color: #409EFF;
  }

  h3 {
    font-size: 14px;
    font-weight: normal;
  }
</style>