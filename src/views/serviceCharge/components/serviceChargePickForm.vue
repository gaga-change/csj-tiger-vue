<template>
  <div>
    <el-dialog
      title="收派服务费"
      :visible="visible"
      width="80%"
      @close="close"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item
          label="货主"
          :label-width="formLabelWidth"
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
          label="结算月份"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            style="width: 200px;"
            v-model="form.selectMonth"
            type="month"
            placeholder="选择月"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label=""
          :label-width="formLabelWidth"
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
            ></base-table2>
          </div>
        </el-form-item>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
        >
          <el-input
            style="width: 200px;"
            type="textarea"
            placeholder="请输入内容"
            v-model="form.remark"
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
        >确 定</el-button>
      </div>
      <el-dialog
        width="400px"
        title="款项及金额"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form :model="innerForm">
          <el-form-item
            label="款项名称"
            :label-width="formLabelInnerWidth"
          >
            <el-select
              style="width: 200px;"
              v-model="innerForm.expenseName"
              placeholder="请选择款项"
            >
              <el-option
                v-for="item in []"
                :label="item.value"
                :key="item.key"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="款项金额"
            :label-width="formLabelInnerWidth"
          >
            <el-input
              class="input-suffix-fa"
              style="width: 200px;"
              type="text"
              placeholder="请输入内容"
              v-model="innerForm.expenseAmt"
              maxlength="20"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="innerVisible=false">取 消</el-button>
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

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      serviceChargePickFormTableConfig,
      dialogFormVisible: false,
      innerVisible: false,
      form: {
        ownerCode: '',
        selectMonth: '',
        remark: '',
      },
      innerForm: {
        expenseAmt: '',
        expenseName: '',
      },
      expenseList: [],
      formLabelWidth: '120px',
      formLabelInnerWidth: '80px'
    }
  },
  computed: {
    ...mapGetters([
      'mapConfig',
    ])
  },
  methods: {
    close() {
      this.visible && this.$emit('update:visible', false)
    },
    confirm() {

    },
    /** 添加费用 */
    handleAddExpense() {
      let newObj = { ...this.innerForm }
      this.innerVisible = false
      this.expenseList.push(newObj)
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
