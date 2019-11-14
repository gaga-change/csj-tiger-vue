<template>
  <div>
    <el-dialog
      title="附加收支管理"
      :visible="visible"
      width="80%"
      @close="close"
      :before-close="handleClose"
    >
      <el-form
        ref="searchForm"
        labelWidth="120px"
        :model="searchForm"
        :inline="true"
      >
        <item-title>基础信息</item-title>
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
        <el-form-item
          label="是否有原始单据"
          prop="isHasOrder"
          :rules="[{ required: true, message: '必填项' }]"
        >
          <el-select
            style="width:200px"
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
        <el-form-item
          label="外部订单号"
          prop="busiBillNo"
        >
          <el-input
            style="width:200px"
            v-model="searchForm.busiBillNo"
            placeholder="请输入外部订单号"
            class="formitem"
            :disabled="busiBilldisabled"
          ></el-input>
        </el-form-item>
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
        <item-title>承运商信息</item-title>
        <el-form-item
          label="承运商"
          prop="consoildatorCode"
          :rules="[{ required: true, message:'请选择承运商' }]"
        >
          <el-select
            style="width: 200px;"
            v-model="searchForm.consoildatorCode"
            placeholder="请选择承运商"
            @change="handelConsoildatorChange"
            clearable
          >
            <el-option
              v-for="item in consoil"
              :label="item.consoildatorName"
              :key="item.consoildatorCode"
              :value="item.consoildatorCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="配送类型"
          prop="dispatchType"
        >
          <el-input
            style="width: 200px;"
            disabled="disabled"
            :value="searchForm.dispatchType | localEnum('dispatchType')"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="承运商编码"
          prop="consoildatorCode"
        >
          <el-input
            style="width: 200px;"
            disabled="disabled"
            :value="searchForm.consoildatorCode"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="结算方式"
          prop="settlementType"
          :rules="[{ required: true, message:'请选择' }]"
        >
          <el-select
            style="width:200px"
            v-model="searchForm.settlementType"
            clearable
            placeholder="请选择结算方式"
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
        <el-form-item
          label="物流单号"
          prop="logisticsOrderCode"
        >
          <el-input
            style="width:200px"
            v-model="searchForm.logisticsOrderCode"
            placeholder="请输入物流单号"
            class="formitem"
            :disabled="logisticsdisabled"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="计费方式"
          prop="chargeType"
        >
          <el-select
            v-model="searchForm.chargeType"
            clearable
            placeholder="请选择计费方式"
            class="formitem"
            style="width:200px"
            :loading="selectLogisticsExpenseLoading"
            @change="handelChargeTypeChange"
          >
            <el-option
              v-for="item in  mapConfig['getChargeType']"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <item-title>客户信息</item-title>
        <el-form-item
          label="客户名称"
          prop="customerName"
        >
          <el-input
            style="width:200px"
            placeholder="请输入客户名称"
            v-model="searchForm.customerName"
            maxlength="50"
          />
          <!-- <select-customer
            :label="'客户'"
            style="width:200px"
            @change="item => this.searchForm.customerName = item ? item.customerName : undefined"
            v-model="searchForm.customerCode"
            :ownerCode="searchForm.ownerCode"
          >
          </select-customer> -->
        </el-form-item>
        <el-form-item
          label="收件人"
          prop="arrivalLinkName"
        >
          <el-input
            style="width:200px"
            v-model="searchForm.arrivalLinkName"
            placeholder="请输入收件人"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="所在地区"
          prop="_addressArea"
        >
          <el-cascader
            style="width:200px"
            :options="Area"
            clearable
            v-model="searchForm._addressArea"
            placeholder="请选择"
            class="formitem"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item
          label="详细地址"
          prop="dispatchAddr"
        >
          <el-input
            style="width:200px"
            v-model="searchForm.dispatchAddr"
            placeholder="请输入详细地址"
            class="formitem"
          ></el-input>
        </el-form-item>
        <item-title>配送明细信息</item-title>
        <el-form-item
          label="箱数"
          prop="boxQty"
        >
          <el-input-number
            style="width:200px"
            placeholder="请输入箱数"
            v-model="searchForm.boxQty"
            :precision="0"
            :min="0"
            :max="99999999"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="重量"
          prop="skuWeight"
        >
          <el-input-number
            style="width:200px"
            placeholder="请输入重量"
            v-model="searchForm.skuWeight"
            :precision="3"
            :min="0"
            :max="99999999"
          ></el-input-number>
          <span class="ml5">kg</span>
        </el-form-item>
        <el-form-item
          label="体积"
          prop="skuVolume"
        >
          <el-input-number
            style="width:200px"
            placeholder="请输入体积"
            v-model="searchForm.skuVolume"
            :precision="3"
            :min="0"
            :max="99999999"
          ></el-input-number>
          <span class="ml5">M</span>
        </el-form-item>
        <el-form-item
          label="车牌号"
          prop="licensePlateNo"
        >
          <el-input
            style="width:200px"
            v-model="searchForm.licensePlateNo"
            placeholder="请输入车牌号"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="出发公里数"
          prop="startKilometrage"
        >
          <el-input-number
            style="width:200px"
            placeholder="请输入出发公里数"
            v-model="searchForm.startKilometrage"
            :precision="0"
            :min="0"
            :max="99999999"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="返回公里数"
          prop="returnKilometrage"
        >
          <el-input-number
            style="width:200px"
            placeholder="请输入返回公里数"
            v-model="searchForm.returnKilometrage"
            :precision="0"
            :min="0"
            :max="99999999"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="里程"
          prop="mileage"
        >
          <el-input-number
            style="width:200px"
            placeholder="请输入里程"
            v-model="searchForm.mileage"
            :precision="0"
            :min="0"
            :max="99999999"
          ></el-input-number>
        </el-form-item>
        <item-title>款项明细</item-title>
        <template>
          <template v-if="row">
            <el-form-item
              label="费用区分"
              prop="expenseName"
            >
              <el-input
                style="width:200px"
                :value="searchForm.expenseName"
                class="formitem"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              label="费用"
              prop="expenseAmt"
              :rules="[{ required: true, message:'请输入费用' }]"
            >
              <el-input-number
                style="width:200px"
                v-model="searchForm.expenseAmt"
                size="mini"
              ></el-input-number>
            </el-form-item>
          </template>
          <template v-else>
            <div
              v-for="(item, index) in searchForm.expenseCodeArr"
              :key="item.key"
            >
              <el-form-item
                label="费用区分"
                :prop="'expenseCodeArr.' + index + '.expenseCode'"
                :rules="[{ required: true, message: '必填项', trigger: 'blur' }]"
              >
                <el-select
                  style="width:200px"
                  v-model="item.expenseCode"
                  placeholder="请选择费用区分"
                  :loading="selectLogisticsExpenseLoading"
                  @change="val => handleChangeExpensCodeArr(val, item)"
                  clearable
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
                    :disabled="!!expenseCodealreadyChoose.find(v => v===item.expenseCode)"
                  >
                    <span style="float: left">{{ item.expenseName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px; padding-left:5px;">{{ item.expenseType | apiEnum(mapConfig, 'getExpenseTypeList') }}
                    </span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="费用"
                :prop="'expenseCodeArr.' + index + '.expenseAmt'"
                :rules="[{ required: true, message:'请输入费用' }]"
              >
                <el-input-number
                  style="width:200px"
                  v-model="item.expenseAmt"
                  size="mini"
                ></el-input-number>
              </el-form-item>
              <el-form-item>
                <el-link
                  type="primary"
                  @click="addExpenseCode"
                  v-if="index === searchForm.expenseCodeArr.length -1"
                >继续添加费用分区</el-link>
              </el-form-item>
              <el-form-item>
                <el-link
                  type="primary"
                  v-if="searchForm.expenseCodeArr.length !== 1"
                  @click="searchForm.expenseCodeArr.splice(index, 1)"
                >删除</el-link>
              </el-form-item>
            </div>
          </template>
        </template>
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
import { Area } from '@/utils/area'
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
      Area,
      serviceChargePickFormTableConfig,
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
        expenseName: null,
        isHasOrder: null,
        busiBillNo: null,
        logisticsOrderCode: null,
        consoildatorCode: null,
        consoildatorName: null,
        dispatchAddr: null,
        expenseAmt: undefined,
        settlementType: null,
        remarkInfo: null,
        arrivalLinkName: null,
        customerName: undefined,
        _addressArea: undefined,
        dispatchType: null, // 配送类型
        consoildatorCode: null, // 承运商编码
        chargeType: 2, // 计费方式
        boxQty: undefined, // 箱数
        skuWeight: undefined, // 重量
        skuVolume: undefined, // 体积
        licensePlateNo: null, // 车牌号
        startKilometrage: undefined, // 出发公里数
        returnKilometrage: undefined, // 返回公里数
        mileage: undefined, // 里程
        expenseCodeArr: [
          {
            expenseCode: undefined,
            expenseName: undefined,
            expenseAmt: undefined,
            key: Date.now()
          }
        ],
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
    // 已选的费用区分
    expenseCodealreadyChoose() {
      let temp = this.searchForm.expenseCodeArr || []
      return temp.map(v => v.expenseCode).filter(v => v)
    }
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
    handleChangeExpensCodeArr(val, item) {
      let temp = this.expenseEnum.find(v => v.expenseCode === val)
      item.expenseName = temp ? temp.expenseName : undefined
    },
    /** 添加费用分区 */
    addExpenseCode() {
      this.searchForm.expenseCodeArr.push({
        expenseCode: undefined,
        expenseAmt: undefined,
        expenseName: undefined,
        key: Date.now()
      });
    },
    /** 计费方式 改动监听 */
    handelChargeTypeChange(key) {
      if (this.row) return
      // 获取“指定承运商”的code值，没有的话就不处理
      let item = this.expenseEnum.find(v => v.expenseName === '指定承运商费用')
      if (!item) return
      if (key == 1) { // 指定承运商
        // 如果已选则不处理
        let alreadyExist = this.searchForm.expenseCodeArr.find(v => v.expenseCode === item.expenseCode)
        if (!alreadyExist) {
          // 看最后一个code是否未空，空的话就补给最后一个
          let one = this.searchForm.expenseCodeArr[this.searchForm.expenseCodeArr.length - 1]
          if (!one.expenseCode) {
            one.expenseCode = item.expenseCode
            one.expenseName = item.expenseName
          } else
            // 添加
            this.searchForm.expenseCodeArr.push({
              expenseCode: item.expenseCode,
              expenseName: item.expenseName,
              expenseAmt: undefined,
              key: Date.now()
            })
        }
      } else {
        // 删除 , 如果只有一项则清空处理
        let alreadyExist = this.searchForm.expenseCodeArr.find(v => v.expenseCode === item.expenseCode)
        if (alreadyExist) {
          if (this.searchForm.expenseCodeArr.length === 1) {
            this.searchForm.expenseCodeArr[0].expenseCode = undefined
            this.searchForm.expenseCodeArr[0].expenseName = undefined
          } else {
            this.searchForm.expenseCodeArr = this.searchForm.expenseCodeArr.filter(v => v.expenseCode !== item.expenseCode)
          }
        }
      }
    },
    /** 承运商 下拉框切换事件 更新绑定【consoildatorName】  */
    handelConsoildatorChange(code) {
      let item = this.consoil.find(v => v.consoildatorCode === code) || {}
      this.searchForm.consoildatorName = item.consoildatorName
      this.searchForm.dispatchType = item.dispatchType
      this.searchForm.consoildatorCode = item.consoildatorCode
    },
    /** 显示详情 */
    updateDetail() {
      if (this.row) {
        this.serviceChargeBillSelectDetailLoading = true
        serviceChargeBillSelectDetail(this.row.id).then(res => {
          this.serviceChargeBillSelectDetailLoading = false
          if (!res) return
          let detail = res.data
          Object.keys(this.searchForm).forEach(key => {
            this.$set(this.searchForm, key, detail[key] === null ? undefined : detail[key])
          })
          this.searchForm.expenseList = [
            {
              expenseCode: detail.expenseCode,
              expenseName: detail.expenseName,
              expenseAmt: detail.expenseAmt
            }
          ]
          // 省市区回显
          if (detail.arrivalProvince)
            this.searchForm._addressArea = [detail.arrivalProvince, detail.arrivalCity, detail.arrivalDistrict]
          this.searchForm.id = detail.id
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
          this.searchForm.chargeType = 2
          this.searchForm.expenseCodeArr = [{
            expenseCode: undefined,
            expenseAmt: undefined,
            expenseName: undefined,
            key: Date.now()
          }];
          delete this.searchForm.id
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
          if (!this.row) {
            /** 创建时 */
            params.expenseList = params.expenseCodeArr
            delete params.expenseCodeArr
          }
          // 处理省市区
          if (params._addressArea && params._addressArea.length > 0) {
            params.arrivalProvince = params._addressArea[0]
            params.arrivalCity = params._addressArea[1]
            params.arrivalDistrict = params._addressArea[2]
          }
          delete params._addressArea
          params.settlementDate = new Date(params.settlementDate).getTime()
          if (this.row) { // 编辑
            params.expenseList[0].expenseAmt = params.expenseAmt
            delete params.expenseAmt
          }
          api({
            ...params,
            id: this.row ? this.row.id : null,
          }).then(res => {
            this.serviceChargeBillSaveLoading = false
            if (!res) return
            this.$message.success('操作成功！')
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
