<template>
  <div>
    <el-dialog
      title="收派服务费"
      :visible="visible"
      width="80%"
      @close="close"
      :before-close="handleClose"
    >
      <el-form
        ref="searchForm"
        labelWidth="120px"
        :model="searchForm"
      >
        <el-row>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="货主"
              prop="ownerCode"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-select
                style="width: 200px;"
                v-model="searchForm.ownerCode"
                placeholder="请选择货主"
              >
                <el-option
                  v-for="item in mapConfig['ownerInfoMap']"
                  :label="item.value"
                  :key="item.key"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="结算日期"
              prop="settlementDate"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <el-date-picker
                style="width: 200px;"
                v-model="searchForm.settlementDate"
                type="date"
                placeholder="结算日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="费用区分"
              prop="expenseCode"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <el-select
                style="width: 200px;"
                v-model="searchForm.expenseCode"
                placeholder="请选择费用区分"
              >
                <el-option
                  v-for="item in mapConfig['ownerInfoMap']"
                  :label="item.value"
                  :key="item.key"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="是否有原始单据"
              prop="isHasOrder"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <el-select
                style="width: 200px;"
                v-model="searchForm.isHasOrder"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in mapConfig['ownerInfoMap']"
                  :label="item.value"
                  :key="item.key"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="外部订单号:"
              prop="busiBillNo"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-input
                v-model="searchForm.busiBillNo"
                placeholder="请输入外部订单号"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="物流单号:"
              prop="logisticsOrderCode"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-input
                v-model="searchForm.logisticsOrderCode"
                placeholder="请输入物流单号"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
           <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="承运商"
              prop="consoildatorCode"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <el-select
                style="width: 200px;"
                v-model="searchForm.consoildatorCode"
                placeholder="请选择承运商"
              >
                <el-option
                  v-for="item in mapConfig['ownerInfoMap']"
                  :label="item.value"
                  :key="item.key"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="地址:"
              prop="busiBillNo"
              :rules="[{ required: true, message: '该项为必填'}]"
            >
              <el-input
                v-model="searchForm.busiBillNo"
                placeholder="请输入外部订单号"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              :label="'客户'"
              label-width="90px"
              prop="arrivalCode"
              :rules="[{ required: true, message: '该项为必填'}]"
            >

              <select-customer
                :label="'客户'"
                v-model="searchForm.arrivalCode"
                :ownerCode="searchForm.ownerCode"
                :busiBillType="searchForm.busiBillType"
                @change="providerChange"
              >
              </select-customer>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="费用:"
              prop="arrivalLinkUser"
              :rules="[{ required: true, message:'请输入联系人' }]"
            >
              <el-input
                v-model="searchForm.arrivalLinkUser"
                placeholder="请输入联系人"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item label="结算方式">
              <el-select
                v-model="searchForm.sendOutRequire"
                clearable
                placeholder="请选择发货要求"
                size="small"
                class="formitem"
              >
                <el-option
                  v-for="item in mapConfig['ownerInfoMap']"
                  :label="item.name"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="备注"
              prop="remarkInfo"
            >
              <el-input
                style="width: 200px;"
                type="textarea"
                placeholder="请输入内容"
                v-model="searchForm.remarkInfo"
                maxlength="50"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close()">取 消</el-button>
        <el-button
          type="primary"
          @click="confirm"
          :loading="serviceChargeBillSaveLoading"
        >确 定</el-button>
      </div>
      <el-dialog
        width="400px"
        title="款项及金额"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form
          :model="innerForm"
          ref="innerForm"
        >
          <el-form-item
            label="款项名称"
            :label-width="formLabelInnerWidth"
            prop="expenseId"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <el-select
              style="width: 200px;"
              v-model="innerForm.expenseId"
              placeholder="请选择款项"
              :selectLogisticsExpenseLoading="selectLogisticsExpenseLoading"
            >
              <el-option
                v-for="item in expenseEnum"
                :label="item.expenseName"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="款项金额"
            :label-width="formLabelInnerWidth"
            prop="expenseAmt"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <el-input-number
              style="width: 200px;"
              placeholder="请输入金额"
              v-model="innerForm.expenseAmt"
              controls-position="right"
              :max="99999999"
              :precision="2"
            ></el-input-number>
            ￥
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="innerVisible=false;innerForm={}">取 消</el-button>
          <el-button
            type="primary"
            @click="handleAddExpense"
          >确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { serviceChargePickFormTableConfig } from '../config'
import { selectLogisticsExpense, serviceChargeBillSelectDetail, serviceChargeBillSave, serviceChargeBillUpdate } from '@/api'
import selectCustomer from './selectCustomer'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: false
    }
  },
  components: { selectCustomer },
  data() {
    return {
      serviceChargePickFormTableConfig,
      selectLogisticsExpenseLoading: false,
      serviceChargeBillSaveLoading: false,
      selectLogisticsExpenseLoading: false,
      serviceChargeBillSelectDetailLoading: false,
      dialogFormVisible: false,
      innerVisible: false,
      form: {
        ownerCode: '',
        settlementMonth: '',
        remarkInfo: '',
      },
      innerForm: {
        expenseAmt: undefined,
        expenseName: '',
      },
      expenseList: [],
      expenseEnum: [],
      formLabelWidth: '120px',
      formLabelInnerWidth: '80px',
      searchForm:{

      }
    }
  },
  computed: {
    ...mapGetters([
      'mapConfig',
    ])
  },
  watch: {
    visible(val) {
      if (val) {
        this.updateDetail()
      }
    }
  },
  created() {
    this.selectLogisticsExpenseLoading = true
    selectLogisticsExpense({ expenseType: 2 }).then(res => {
      this.selectLogisticsExpenseLoading = false
      if (!res) return
      let temp = res.data || []
      this.expenseEnum = temp.filter(v => v.expenseState === 2)
    })
  },
  methods: {
    /** 显示详情 */
    updateDetail() {
      if (this.row) {
        this.serviceChargeBillSelectDetailLoading = true
        serviceChargeBillSelectDetail(this.row.id).then(res => {
          this.serviceChargeBillSelectDetailLoading = false
          if (!res) return
          let detail = res.data
          this.form.ownerCode = detail.ownerCode
          this.form.settlementMonth = new Date(detail.settlementMonth)
          this.form.remarkInfo = detail.remarkInfo
          this.expenseList = detail.itemList
        })
      }
    },
    providerChange(provider) {
      this.selectProvider = provider
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.arrivalAddress = '';
      searchForm.arrivalLinkUser = '';
      searchForm.arrivalLinkTel = '';
      this.searchForm = searchForm;
      this.addrListConfig = [];
      let id = provider.id
      customerAddrInfo(provider.customerCode, this.searchForm.busiBillType).then(res => {
        if (res.success) {
          this.addrListConfig = Array.isArray(res.data) && res.data || [];
          const defaultAddress = this.addrListConfig.find(item => item.isDefault === 1) || {}
          this.$nextTick(() => {
            this.searchForm.arrivalAddress = defaultAddress.arrivalAddress
            this.arrivalAddressChange(defaultAddress.arrivalAddress)
          })
        }
      }).catch(err => {
      })
    },
    ownerCodeChange(value) {
      let searchForm = _.cloneDeep(this.searchForm);
      searchForm.arrivalCode = '';
      searchForm.arrivalAddress = '';
      searchForm.arrivalLinkUser = '';
      searchForm.arrivalLinkTel = '';
      searchForm.warehouseCode = '';
      searchForm.outWarehouseBillDetailList = [];
      this.searchForm = searchForm;
      this.addrListConfig = [];
      this.warehouseList.length = 0
      this.showStore({ ownerCode: value })
    },
    /** 关闭窗口 */
    close() {
      if (this.visible) {
        this.$emit('update:visible', false)
        this.$nextTick(() => {
          this.$refs['form'].resetFields()
          this.expenseList = []
        })
      }
    },
    confirm() {
      let api = !this.row ? serviceChargeBillSave : serviceChargeBillUpdate
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.expenseList.length) {
            return this.$message.error('请录入款项及金额！')
          }
          this.serviceChargeBillSaveLoading = true
          let params = { ...this.form }
          params.ownerName = this.mapConfig['ownerInfoMap'].find(v => v.key === params.ownerCode).value
          params.settlementMonth = new Date(params.settlementMonth).getTime()
          api({
            ...params,
            items: this.expenseList,
            id: this.row ? this.row.id : undefined,
          }).then(res => {
            this.serviceChargeBillSaveLoading = false
            if (!res) return
            this.close()
            this.$emit('confirm')
          })
        }
      })
    },
    /** 添加费用 */
    handleAddExpense() {
      this.$refs['innerForm'].validate((valid) => {
        if (valid) {
          let expense = this.expenseEnum.find(v => v.id === this.innerForm.expenseId)
          let newObj = { ...this.innerForm, expenseCode: expense.expenseCode, expenseName: expense.expenseName }
          if (newObj.expenseAmt <= 0) {
            return this.$message.error('款项金额必须大于0！')
          }
          if (this.expenseList.find(v => v.expenseName === newObj.expenseName)) {
            return this.$message.error(`款项【${newObj.expenseName}】已录入，不能重复添加！`)
          }
          delete newObj.id
          this.innerVisible = false
          this.$nextTick(() => {
            this.$refs['innerForm'].resetFields()
            this.innerForm = { expenseAmt: undefined }
          })
          this.expenseList.push(newObj)
        }
      })
    },
    handleDelete(row, index) {
      this.expenseList.splice(index, 1)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
}
</script>
