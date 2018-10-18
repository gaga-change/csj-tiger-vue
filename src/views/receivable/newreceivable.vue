<template lang="html">
  <div class="app-container">
    <el-form :model="receivableform" :rules="rules" ref="ruleForm" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="款项性质" prop="receivable.fundnature">
            <el-select v-model="receivableform.receivable.fundnature" filterable clearable placeholder="请选择款项性质" prefix-icon="el-icon-search">
              <el-option
                v-for="item in fundnature"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="receivableform.receivable.fundnature == 1">
          <el-form-item label="款项类型" prop="receivable.fundtype">
            <el-select v-model="receivableform.receivable.fundtype" filterable clearable placeholder="请选择款项类型" prefix-icon="el-icon-search">
              <el-option
                v-for="item in fundtype"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="receivableform.receivable.fundnature == 1">
        <el-col :span="8">
          <el-form-item label="关联销售单" prop="receivable.saleorder">
            <el-input type="text"  prefix-icon="el-icon-search" @focus="saleorderFocus" v-model="receivableform.receivable.saleorder"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同编号" prop="receivable.contractno">
            <el-input type="text" v-model="receivableform.receivable.contractno"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="结算方式" prop="receivable.settlementmethod">
            <el-select v-model="receivableform.receivable.settlementmethod" filterable clearable placeholder="请选择结算方式" prefix-icon="el-icon-search">
              <el-option
                v-for="item in settlementmethod"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款日期" prop="receivable.recdate">
            <el-date-picker
              v-model="receivableform.receivable.recdate"
              type="datetime"
              :editable="false"
              placeholder="选择日期时间"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款方" prop="receivable.payer">
            <el-select v-model="receivableform.receivable.payer" filterable clearable placeholder="请选择付款客户" prefix-icon="el-icon-search">
              <el-option
                v-for="item in gridData"
                :key="item.id"
                :label="item.name"
                :value="item.requestid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="本次收款金额" prop="receivable.recamount">
            <el-input type="number" v-model="receivableform.receivable.recamount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="上传附件">
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
        <el-col :span="8">
          <el-form-item label="现金折扣" prop="receivable.interestrate">
            <el-input type="number" v-model="receivableform.receivable.interestrate"  placeholder="请输入现金折扣"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结算金额" prop="receivable.settlementamount">
            <el-input type="text" :value="settlementamount" disabled></el-input>
            <span v-if="receivableform.receivable.fundnature == 1 && receivableform.receivable.saleorder">该笔销售订单应收{{receivableform.receivable.residualamount}}元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注" prop="receivable.memos">
            <el-input type="textarea" v-model="receivableform.receivable.memos" rows='5'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-form-item>
          <el-button type="primary" @click="onSubmit" v-loading="submitloading">新建收款单</el-button>
          <el-button @click="onCancel">取消</el-button>
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
    <el-dialog
      title="选择销售单"
      :visible.sync="orderchoiceshow"
      center
      width="80%">
      <orderchoice @subOrder="subOrder" @diClose="diClose"></orderchoice>
    </el-dialog>
  </div>
</template>

<script>
  import { addOrUpdateReceivable, getReceivableDetail } from '@/api/receivable'
  import { mapGetters } from 'vuex'
  import { parseTime, ReciveFundnature, SettlementMethod, ReciveFundtype, BusinessTypeData } from '@/utils'
  import orderchoice from './Component/orderchoice'
  export default {
    name: 'newreceivable',
    components: {
      orderchoice
    },
    data() {
      var checkDetail = (rule, value, callback) => {
        if (value.length > 15) {
          return callback(new Error('长度不能大于15'))
        }
        if (!parseFloat(value)) {
          return callback(new Error('请输入数字'))
        }
        if (this.receivableform.receivable.fundnature === '1' && parseFloat(value) > this.receivableform.receivable.residualamount) {
          return callback(new Error('收款金额不能超过应收金额'))
        }
        callback()
      }
      return {
        receivableform: {
          receivable: {
            checkadvice: '',
            checkdate: '',
            checkuser: '',
            contractno: '',
            createdate: '',
            createuser: '',
            enclosure: '',
            enterprise: '',
            enterprisename: '',
            fundnature: '',
            interestrate: '',
            isdelete: 0,
            memos: '',
            payer: '',
            payername: '',
            recamount: 0,
            recdate: '',
            receivables: '',
            receivablesname: '',
            saleorder: '',
            settlementmethod: '',
            status: 0,
            ticketno: ''
          }
        },
        rules: {
          receivable: {
            paydate: [
              { required: true, message: '请选择付款日期', trigger: 'change' }
            ],
            recdate: [
              { required: true, message: '请选择收款日期', trigger: 'change' }
            ],
            fundnature: [
              { required: true, message: '请选择款项性质', trigger: 'blur' }
            ],
            fundtype: [
              { required: true, message: '请选择款项类型', trigger: 'blur' }
            ],
            recamount: [
              { validator: checkDetail, required: true, trigger: 'blur' }
            ],
            contractno: [
              { required: true, message: '请输入合同编号', trigger: 'blur' }
            ],
            payer: [
              { required: true, message: '请选择付款方', trigger: 'change' }
            ],
            saleorder: [
              { required: true, message: '请输入销售单', trigger: 'change' }
            ],
            settlementmethod: [
              { required: true, message: '请选择结算方式', trigger: 'change' }
            ]
          }
        },
        dialogVisible: false,
        uploadUrl: '/webApi/fileupload/filetoserver', // 上传路径
        fileList: [],
        uploadButtonVisible: false,
        dialogTableVisible: false,
        multipleSelection: [],
        submitloading: false,
        fundnature: ReciveFundnature,
        fundtype: ReciveFundtype,
        settlementmethod: SettlementMethod,
        businesstypeData: BusinessTypeData,
        orderchoiceshow: false
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
      settlementamount() {
        return (parseFloat(this.receivableform.receivable.recamount) + (parseFloat(this.receivableform.receivable.interestrate) || 0)).toFixed(2)
      },
      getEntName() {
        let tname = ''
        if (this.gridData.length) {
          this.gridData.map(d => {
            if (d.requestid === this.receivableform.receivable.enterprise) {
              tname = d.name
            }
          })
        }
        return tname
      },
      getCusname() {
        let tname = ''
        if (this.gridData.length) {
          this.gridData.map(d => {
            if (d.requestid === this.receivableform.receivable.payer) {
              tname = d.name
            }
          })
        }
        return tname
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
    filters: {
      parseTime
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
      subOrder(row) {
        let currow = {}
        if (row && Object.keys(row).length) {
          currow = row
        }
        this.receivableform.receivable.saleorder = currow.ticketno
        this.receivableform.receivable.contractno = currow.contractno
        this.receivableform.receivable.payer = currow.customer
        this.receivableform.receivable.residualamount = currow.residualamount
        this.receivableform.receivable.enterprise = currow.enterprise
        this.receivableform.receivable.enterprisename = currow.enterprisename
      },
      saleorderFocus() {
        this.orderchoiceshow = true
      },
      diClose() {
        this.orderchoiceshow = false
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
          this.fileList = fileList
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.submitloading = true
            const view = this.visitedViews.filter(v => v.path === this.$route.path)
            const postData = JSON.parse(JSON.stringify(this.receivableform))
            postData.receivable.payername = this.getCusname
            postData.receivable.receivables = this.companyId
            postData.receivable.receivablesname = this.company
            postData.receivable.recdate = parseTime(this.receivableform.receivable.recdate)
            postData.receivable.createuser = this.userInfo.truename
            postData.receivable.settlementamount = this.settlementamount
            postData.receivable.enclosure = JSON.stringify(this.enclosure)
            console.log('send data: ' + JSON.stringify(postData))
             if(this.receivableform.receivable.residualamount<this.settlementamount){
            this.$message.error('结算金额不能大于该采购订单应付金额')
            this.submitloading = false
            return false
          }
            addOrUpdateReceivable(postData.receivable).then(
              res => {
                console.log(res)
                if (res.code === '200' && res.data) {
                  this.$confirm('新建收款单成功！', '提示', {
                    confirmButtonText: '详情',
                    cancelButtonText: '关闭',
                    type: 'success'
                  }).then(
                    _ => {
                      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                        this.$router.push({
                          name: 'receivabledetailDelivery',
                          params: {
                            ticketno: res.data
                          }
                        })
                      })
                    }
                  ).catch(_ => {
                    this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                      this.$router.push('/')
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
            return false
          }
        })
      },
      onCancel() {
        this.receivableform = {
          receivable: {}
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
