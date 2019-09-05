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
        :model="form"
        ref="form"
        v-loading="serviceChargeBillSelectDetailLoading"
      >
        <el-form-item
          label="货主"
          :label-width="formLabelWidth"
          prop="ownerCode"
          :rules="[{ required: true, message: '必填项' }]"
        >
          <el-select
            style="width: 200px;"
            v-model="form.ownerCode"
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
          :label-width="formLabelWidth"
          prop="settlementMonth"
          :rules="[{ required: true, message: '必填项' }]"
        >
          <el-date-picker
            style="width: 200px;"
            v-model="form.settlementMonth"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label=""
          :label-width="formLabelWidth"
          style="height: auto"
        >
          <el-link
            type="primary"
            @click="innerVisible=true"
          >录入款项及金额</el-link>
          <div v-show="expenseList.length">
            <base-table2
              :showIndex="true"
              :config="serviceChargePickFormTableConfig"
              :data="expenseList"
              :showControl="true"
              :controlFixed="false"
            >
              <template slot-scope="scope">
                <div>
                  <el-link
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row, scope.index)"
                  >删除</el-link>
                </div>
              </template>
            </base-table2>
          </div>
        </el-form-item>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
          prop="remarkInfo"
        >
          <el-input
            style="width: 200px;"
            type="textarea"
            placeholder="请输入内容"
            v-model="form.remarkInfo"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
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
      formLabelInnerWidth: '80px'
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