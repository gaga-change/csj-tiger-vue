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
                v-model="searchForm.expenseCode"
                placeholder="请选择费用区分"
              >
                <el-option
                  disabled
                  label="款项名称"
                  value="款项性质"
                >
                  <span style="float: left"> 款项名称</span>
                  <span style="float: right; ">款项性质
                  </span>
                </el-option>
                <el-option
                  v-for="item in expenseEnum"
                  :label="item.expenseName"
                  :key="item.expenseCode"
                  :value="item.expenseCode"
                >
                  <span style="float: left">{{ item.expenseName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px; padding-left:5px;">{{ item.expenseType | apiEnum(mapConfig, 'getExpenseTypeList') }}
                  </span>
                </el-option>
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
                @onfoucs="showmessage"
                v-model="searchForm.isHasOrder"
                placeholder="请选择"
                @change="hasOrderChange"
              >
                <el-option
                  v-for="item in isHasOrderList"
                  :label="item.value"
                  :key="item.id"
                  :value="item.id"
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
            >
              <el-input
                v-model="searchForm.busiBillNo"
                placeholder="请输入外部订单号"
                size="small"
                class="formitem"
                :disabled="busiBilldisabled"
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
            >
              <el-input
                v-model="searchForm.logisticsOrderCode"
                placeholder="请输入物流单号"
                size="small"
                class="formitem"
                :disabled="logisticsdisabled"
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
            >
              <el-select
                style="width: 200px;"
                v-model="searchForm.consoildatorCode"
                placeholder="请选择承运商"
              >
                <el-option
                  v-for="item in consoil"
                  :label="item.consoildatorName"
                  :key="item.consoildatorCode"
                  :value="item.consoildatorCode"
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
              prop="dispatchAddr"
            >
              <el-input
                v-model="searchForm.dispatchAddr"
                placeholder="请输入地址"
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
              prop="customerCode"
            >

              <select-customer
                :label="'客户'"
                v-model="searchForm.customerCode"
                :ownerCode="searchForm.ownerCode"
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
              prop="expenseAmt"
              :rules="[{ required: true, message:'请输入费用' }]"
            >
              <el-input-number
                v-model="searchForm.expenseAmt"
                :min="0"
                size="mini"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="结算方式"
              prop="settlementType"
              :rules="[{ required: true, message:'请选择' }]"
            >
              <el-select
                v-model="searchForm.settlementType"
                clearable
                placeholder="请选择结算方式"
                size="small"
                class="formitem"
              >
                <el-option
                  v-for="item in mapConfig['getSettlementType']"
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
        title="外部订单号"
        :visible.sync="selectVisiable"
        width="600"
        height="60%"
        append-to-body
      >
        <div v-if="selectVisiable">
          <select-outcode
            @select="selectChange"
            :ownerCode="searchForm.ownerCode"
          />
        </div>
      </el-dialog>
    </el-dialog>
    <el-dialog
      title="外部订单及物流单号"
      :visible.sync="logisticsVisible"
      width="600"
      height="60%"
      append-to-body
    >
      <div v-if="logisticsVisible">
        <select-logisticsorder
          @select="logisticsChange"
          :ownerCode="searchForm.ownerCode"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { serviceChargePickFormTableConfig } from '../config'
import { selectLogisticsExpense, serviceChargeBillSelectDetail, serviceChargeBillSave, serviceChargeBillUpdate } from '@/api'
import { consoilInfoList } from '@/api/carrier'
// import { outOrderNo, outRelativeNo } from '@/api/outgoing'
import selectCustomer from './selectCustomer'
import selectOutcode from './selectOutcode'
import selectLogisticsorder from './selectLogisticsorder'
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
  components: { selectCustomer, selectOutcode, selectLogisticsorder },
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
      searchForm: {
        ownerCode: null,
        ownerName: null,
        settlementDate: null,
        expenseCode: null,
        expenseName: null,
        isHasOrder: null,
        busiBillNo: null,
        logisticsOrderCode: null,
        consoildatorCode: null,
        dispatchAddr: null,
        customerCode: null,
        expenseAmt: null,
        settlementType: null,
        remarkInfo: null
      },
      isHasOrderList: [{ id: 0, value: '有外部订单' }, { id: 1, value: '有外部订单配送单' }, { id: 2, value: '无外部订单' }],
      consoil: [],
      busiBilldisabled: false,
      logisticsdisabled: false,
      selectVisiable: false,
      logisticsVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'mapConfig',
    ]),
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
    selectLogisticsExpense({}).then(res => {
      this.selectLogisticsExpenseLoading = false
      if (!res) return
      this.expenseEnum = res.data || []
    })
    this.getConsoilInfoList()
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
          this.searchForm = JSON.parse(JSON.stringify(detail))
          if (this.searchForm.isHasOrder == 1) {
            this.busiBilldisabled = true
            this.logisticsdisabled = true
          } else if (this.searchForm.isHasOrder == 0) {
            this.busiBilldisabled = true
            this.logisticsdisabled = false
          } else {
            this.busiBilldisabled = false
            this.logisticsdisabled = false
          }
        })
      } else {
        this.busiBilldisabled = false
        this.logisticsdisabled = false
      }
    },
    getConsoilInfoList() {
      consoilInfoList({ consoildatorState: 31, pageSize: 9999 })
        .then(res => {
          this.consoil = res.data && res.data.list
        })
        .catch(err => {
          console.error(err)
        })
    },
    showmessage() {
      if (!this.searchForm.ownerCode) {
        return this.$message.error('请选择货主！')
      }
    },
    hasOrderChange(val) {
      if (!this.searchForm.ownerCode) {
        this.searchForm.isHasOrder = null
        return this.$message.error('请选择货主！')
      }
      this.searchForm.busiBillNo = null
      this.searchForm.logisticsOrderCode = null
      if (val == 0) {
        this.selectVisiable = true
        this.busiBilldisabled = true
        this.logisticsdisabled = false
      } else if (val == 1) {
        this.logisticsVisible = true
        this.busiBilldisabled = true
        this.logisticsdisabled = true
      } else if (val == 2) {
        this.selectVisiable = false
        this.logisticsVisible = false
        this.busiBilldisabled = false
        this.logisticsdisabled = false
      }
    },
    selectChange(record) {
      this.selectVisiable = false
      this.searchForm.busiBillNo = record.busiBillNo
    },
    logisticsChange(val) {
      this.logisticsVisible = false
      this.searchForm.busiBillNo = val.busiBillNo
      this.searchForm.logisticsOrderCode = val.logisticsOrderCode
    },
    ownerCodeChange(value) {
      this.searchForm.isHasOrder = null
      this.searchForm.busiBillNo = null
      this.searchForm.logisticsOrderCode = null
    },
    /** 关闭窗口 */
    close() {
      if (this.visible) {
        this.$emit('update:visible', false)
        this.$nextTick(() => {
          this.$refs['searchForm'].resetFields()
          this.expenseList = []
        })
      }
    },
    confirm() {
      let api = !this.row ? serviceChargeBillSave : serviceChargeBillUpdate
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          let params = { ...this.searchForm }
          if (params.isHasOrder == 1 && (!params.busiBillNo || !params.logisticsOrderCode)) {
            return this.$message.error('外部订单/物流单号不能为空！')
          }
          if (params.isHasOrder == 0 && !params.busiBillNo) {
            return this.$message.error('外部订单不能为空！')
          }
          this.serviceChargeBillSaveLoading = true
          params.ownerName = this.mapConfig['ownerInfoMap'].find(v => v.key === params.ownerCode).value
          params.expenseName = this.expenseEnum.find(v => v.expenseCode === params.expenseCode).expenseName
          params.settlementDate = new Date(params.settlementDate).getTime()
          api({
            ...params,
            id: this.row ? this.row.id : null,
          }).then(res => {
            this.serviceChargeBillSaveLoading = false
            if (!res) return
            this.close()
            this.$emit('confirm')
          })
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
